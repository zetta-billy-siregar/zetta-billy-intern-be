// *************** IMPORT LIBRARY ***************
const mongoose = require('mongoose');
const { ApolloError } = require('apollo-server-express');

// *************** IMPORT MODULE ***************
const Student = require('./student.model');

// *************** QUERY ***************
/**
 * Fetch all students who are not soft-deleted.
 *
 * @async
 * @function GetAllStudents
 * @returns {Promise<Array>} - List of students not marked as deleted.
 */
async function GetAllStudents() {
  // *************** Fetch all students where status is not 'deleted', sorted by creation date in descending order
  return await Student.find({ status: { $ne: 'deleted' } })
    .sort({ created_at: -1 });
}

/**
 * Fetch a single student by ID.
 *  
 * @async
 * @function GetOneStudent
 * @param {Object} _ - Unused resolver root.
 * @param {Object} args - Arguments containing student ID.
 * @param {string} args.id - Student ID to find.
 * @return {Promise<Object|null>} - Student document or null.
 */
async function GetOneStudent(_, { id }) {
  // *************** Validate ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApolloError('Invalid student ID', 'BAD_USER_INPUT');
  }
  // *************** Fetch student by ID, ensuring it is not marked as deleted
  const student = await Student.findById(id);
  if (!student || student.status === 'deleted') {
    throw new ApolloError('Student not found or has been deleted', 'NOT_FOUND');
  }
  console.log(`[GraphQL] getOneStudent → id: ${id}`);
  return await Student.findById(id);
}

/**
 * Create a new student with basic validation.
 * @async
 * @function CreateStudent
 * @param {Object} _ - Unused resolver root.
 * @param {Object} args - Arguments to create student.
 * @param {string} args.first_name - First name of the student.
 * @param {string} args.last_name - Last name of the student.
 * @param {string} args.email - Email of the student.
 * @param {string} args.date_of_birth - Date of birth in YYYY-MM-DD format.
 * @param {string} args.school_id - ID of the school the student belongs to.
 * @returns {Promise<Object>} - Created student.
 * @throws {ApolloError} - If required fields are missing, school_id is invalid, or date_of_birth is in the wrong format.
 * @throws {ApolloError} - If there is an internal server error during the creation process.
 */
async function CreateStudent(_, { input }) {
  // *************** Destructure arguments
  const { first_name, last_name, email, date_of_birth, school_id } = input;
  // *************** Validate first_name fields
  if (!first_name) {
    throw new ApolloError('Missing required field: first_name', 'BAD_USER_INPUT');
  }
  // *************** Validate last_name fields
  if (!last_name) {
    throw new ApolloError('Missing required field: last_name', 'BAD_USER_INPUT');
  }
  // *************** Validate email fields
  if (!email) {
    throw new ApolloError('Missing required field: email', 'BAD_USER_INPUT');
  }
  // *************** Validate email format using a regex & This regex checks for a basic email format
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    throw new ApolloError('Invalid email format', 'BAD_USER_INPUT');
  }
  // *************** Validate school_id fields
  if (!school_id) {
    throw new ApolloError('Missing required field: school_id', 'BAD_USER_INPUT');
  }
  // *************** Validate school_id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(school_id)) {
    throw new ApolloError('Invalid school_id format', 'BAD_USER_INPUT');
  }
  // *************** Validate date_of_birth format
  if (date_of_birth && isNaN(Date.parse(date_of_birth))) {
    throw new ApolloError('Invalid date_of_birth format, use YYYY-MM-DD', 'BAD_USER_INPUT');
  }
  // *************** Create new student document
  const student = await Student.create({
    first_name,
    last_name,
    email,
    date_of_birth,
    school_id,
  });
  try {
    console.log(`[GraphQL] createStudent → ${student.first_name} (${student.email})`);
    return student;
  } catch (error) {
    console.error(`[GraphQL] createStudent Error →`, error);
    throw new ApolloError('Failed to create student', 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Update an existing student by ID.
 *
 * @async
 * @function UpdateStudent
 * @param {Object} _ - Unused resolver root.
 * @param {Object} args - Arguments to update student.
 * @param {string} args.id - ID of the student to update.
 * @param {Object} updates - Fields to update in the student document.
 * @returns {Promise<Object>} - Updated student document.
 * @throws {ApolloError} - If there is an internal server error during the update process.
 */
async function UpdateStudent(_, { id, ...updates }) {
  // ***************Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApolloError('Invalid student ID', 'BAD_USER_INPUT');
  }
  // *************** Validate email format if provided
  if (updates.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(updates.email)) {
    throw new ApolloError('Invalid email format', 'BAD_USER_INPUT');
  }
  // *************** Validate date_of_birth format
  if (updates.date_of_birth && isNaN(Date.parse(updates.date_of_birth))) {
    throw new ApolloError('Invalid date_of_birth format, use YYYY-MM-DD', 'BAD_USER_INPUT');
  }
  // *************** Validate status value
  if (updates.status && !['active'].includes(updates.status)) {
    throw new ApolloError('Invalid status value', 'BAD_USER_INPUT');
  }
  // *************** Update student by ID with new values
  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, updates, { new: true });
    console.log(`[GraphQL] updateStudent → id: ${id}`);
    return updatedStudent;
  } catch (error) {
    console.error(`[GraphQL] updateStudent Error →`, error);
    throw new ApolloError('Failed to update student', 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Soft-delete a student by ID.
 *
 * @async
 * @function DeleteStudent
 * @param {Object} _ - Unused resolver root.
 * @param {Object} args - Arguments containing student ID.
 * @param {string} args.id - ID of the student to delete.
 * @returns {Promise<Object>} - Updated student document with status set to 'deleted'.
 * @throws {ApolloError} - If there is an internal server error during the deletion process.
 */
async function DeleteStudent(_, { id }) {
  // *************** Validate ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApolloError('Invalid student ID', 'BAD_USER_INPUT');
  }
  // *************** Soft-delete student by setting status to 'deleted' and updating deleted_at timestamp
  try {
    console.log(`[GraphQL] deleteStudent → id: ${id}`);
    return await Student.findByIdAndUpdate(id, {
      status: 'deleted',
      deleted_at: new Date()
    }, { new: true });
  } catch (error) {
    console.error(`[GraphQL] deleteStudent Error →`, error);
    throw new ApolloError('Failed to delete student', 'INTERNAL_SERVER_ERROR');
  }
};

// *************** STUDENT RESOLVERS EXPORT ***************
const studentResolvers = {
  Query: {
    GetAllStudents,
    GetOneStudent,
  },
  Mutation: {
    createStudent: CreateStudent,
    updateStudent: UpdateStudent,
    deleteStudent: DeleteStudent,
  }
};

// *************** EXPORT MODULE ***************
module.exports = { resolvers: studentResolvers };
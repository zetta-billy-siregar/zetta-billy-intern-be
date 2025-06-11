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
  return await Student.find({ status: { $ne: 'deleted' } })
    .sort({ created_at: -1 })
    // .populate('school_id', 'short_name long_name address status')
    // .select('-__v -deleted_at'); 
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
async function CreateStudent(_, args) {
  try {
    const { first_name, last_name, email, date_of_birth, school_id } = args;
    if (!first_name || !last_name || !email || !date_of_birth || !school_id) {
      throw new ApolloError('Missing required fields', 'BAD_USER_INPUT');
    }
    if (!mongoose.Types.ObjectId.isValid(school_id)) {
  throw new ApolloError('Invalid school_id format', 'BAD_USER_INPUT');
    }
    if (date_of_birth && isNaN(Date.parse(date_of_birth))) {
  throw new ApolloError('Invalid date_of_birth format, use YYYY-MM-DD', 'BAD_USER_INPUT');
    }

    const student = await Student.create({
      first_name,
      last_name,
      email,
      date_of_birth,
      school_id,
    });
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
  // ***************Validate ID and updates
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApolloError('Invalid student ID', 'BAD_USER_INPUT');
  }
  if (updates.date_of_birth && isNaN(Date.parse(updates.date_of_birth))) {
    throw new ApolloError('Invalid date_of_birth format, use YYYY-MM-DD', 'BAD_USER_INPUT');
  }
  if (updates.status && !['active', 'inactive', 'deleted'].includes(updates.status)) {
    throw new ApolloError('Invalid status value', 'BAD_USER_INPUT');
  }
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
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApolloError('Invalid student ID', 'BAD_USER_INPUT');
  }
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
}

// *************** EXPORT MODULE ***************
module.exports = { GetAllStudents, GetOneStudent, CreateStudent, UpdateStudent, DeleteStudent };
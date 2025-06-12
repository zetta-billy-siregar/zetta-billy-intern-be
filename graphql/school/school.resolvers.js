// *************** IMPORT LIBRARY ***************
const mongoose = require('mongoose');
const { ApolloError } = require('apollo-server-express');

// *************** IMPORT MODULE ***************
const School = require('./school.model');

// *************** QUERY ***************

/**
 * Get all schools with status 'active' or 'inactive'
 * @async
 * @returns {Promise<Array>}
 * @throws {ApolloError} - If database operation fails
 */
async function GetAllSchools() {
  // *************** Fetch all schools with status 'active' and sort by createdAt in descending order
  return await School.find({
    status: { $in: ['active'] }
  }).sort({ createdAt: -1 });
}

/**
 * Get one school by ID
 * 
 * @async
 * @param {Object} _
 * @param {Object} args
 * @param {string} args.id
 * @returns {Promise<Object|null>}
 */
async function GetOneSchool(_, { id }) {
  // *************** Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApolloError('Invalid school ID', 'BAD_USER_INPUT');
  }

  return await School.findById(id);
}

// *************** MUTATION ***************

/**
 * Create a new school entry
 * 
 * @async
 * @param {Object} _
 * @param {Object} args
 * @param {string} args.name
 * @param {string} args.address
 * @param {string} args.status
 * @returns {Promise<Object>}
 */
async function CreateSchool(_, { input }) {
  const { name, address, status } = input;
  // *************** Validate name length
  if (name.length < 3 || name.length > 50) {
    throw new ApolloError('Name must be between 3 and 50 characters', 'BAD_USER_INPUT');
  }
  // *************** Create the school document
  try {
    const school = await School.create({ name, address, status });
    console.log(`[GraphQL] createSchool → ${school.name}`);
    return school;
  } catch (error) {
    console.error(`[GraphQL] createSchool Error →`, error);
    throw new ApolloError('Failed to create school', 'INTERNAL_SERVER_ERROR');
  }
}


/**
 * Update a school by ID
 * 
 * @async
 * @param {Object} _
 * @param {Object} args
 * @param {string} args.id
 * @param {Object} args.updates
 * @returns {Promise<Object>}
 */
async function UpdateSchool(_, { id, ...updates }) {
  // *************** Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApolloError('Invalid school ID', 'BAD_USER_INPUT');
  }
  // *************** Validate name updates
  if (updates.name && (updates.name.length < 3 || updates.name.length > 50)) {
    throw new ApolloError('Name must be between 3 and 50 characters', 'BAD_USER_INPUT');
  }
  // *************** Validate status update
  if (updates.status && !['active'].includes(updates.status)) {
    throw new ApolloError('Status must be "active"', 'BAD_USER_INPUT');
  }
  // *************** Update the school document with new values
  try {
    const updated = await School.findByIdAndUpdate(id, updates, { new: true });
    console.log(`[GraphQL] updateSchool → ${id}`);
    return updated;
  } catch (error) {
    console.error(`[GraphQL] updateSchool Error →`, error);
    throw new ApolloError('Failed to update school', 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Soft delete a school by marking status as 'deleted'
 * 
 * @async
 * @param {Object} _
 * @param {Object} args
 * @param {string} args.id
 * @returns {Promise<Object|null>}
 */
async function DeleteSchool(_, { id }) {
  // *************** Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApolloError('Invalid school ID', 'BAD_USER_INPUT');
  }
  // *************** Attempt to find and update the school document & to set status to 'deleted' and mark the deletion time
  try {
    const deletedSchool = await School.findByIdAndUpdate(id, {
      status: 'deleted',
      deleted_at: new Date()
    }, { new: true });

    console.log(`[GraphQL] deleteSchool → ${id}`);
    return deletedSchool;
  } catch (error) {
    console.error(`[GraphQL] deleteSchool Error →`, error);
    throw new ApolloError('Failed to delete school', 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Resolve students for a given school using DataLoader.
 * Optimized to batch and cache requests, avoiding N+1 problem.
 *
 * @async
 * @function ResolveStudentsUsingLoader
 * @param {Object} parent - The parent school object.
 * @param {Object} _args - GraphQL arguments (unused).
 * @param {Object} context - GraphQL context containing loaders.
 * @returns {Promise<Array>} - List of students associated with the school.
 * @throws {ApolloError} - If fetching students fails.
 */
async function ResolveStudentsUsingLoader(parent, _args, context) {
  // *************** Validate parent object
  if (!parent || !parent.id) {
    throw new ApolloError('Invalid school data', 'BAD_USER_INPUT');
  }
  // *************** Use DataLoader to fetch students for the school
  try {
    const students = await context.loaders.studentLoader.load(parent.id);
    console.log(`[DataLoader] Loaded students for school_id: ${parent.id}`);
    return students;
  } catch (error) {
    console.error(`[DataLoader] Failed to load students for school_id: ${parent.id}`, error);
    throw new ApolloError('Failed to load students for school', 'INTERNAL_SERVER_ERROR');
  }
}

// *************** SCHOOL RESOLVERS EXPORT ***************
const schoolResolvers = {
  Query: {
    GetAllSchools: GetAllSchools,
    GetOneSchool: GetOneSchool
  },
  Mutation: {
    createSchool: CreateSchool,
    updateSchool: UpdateSchool,
    deleteSchool: DeleteSchool
  },
  School: {
    students: ResolveStudentsUsingLoader
  }
};

// *************** EXPORT MODULE ***************
module.exports = { resolvers: schoolResolvers };
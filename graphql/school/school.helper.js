// *************** IMPORT LIBRARY ***************
const mongoose = require('mongoose');
const { ApolloError } = require('apollo-server-express');

// *************** IMPORT MODULE ***************
const School = require('./school.model');

// *************** QUERY ***************

/**
 * Get all schools with status 'active' or 'inactive'
 * @sync
 * @returns {Promise<Array>}
 * @throws {ApolloError} - If database operation fails
 */
async function GetAllSchools() {
  return await School.find({
    status: { $in: ['active'] }
  }).sort({ createdAt: -1 });
}

/**
 * Get one school by ID
 * 
 * @sync
 * @param {Object} _
 * @param {Object} args
 * @param {string} args.id
 * @returns {Promise<Object|null>}
 */
async function GetOneSchool(_, { id }) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApolloError('Invalid school ID', 'BAD_USER_INPUT');
  }

  return await School.findById(id);
}

// *************** MUTATION ***************

/**
 * Create a new school entry
 * 
 * @sync
 * @param {Object} _
 * @param {Object} args
 * @param {string} args.name
 * @param {string} args.address
 * @param {string} args.status
 * @returns {Promise<Object>}
 */
async function CreateSchool(_, args) {
  const { short_name, long_name, address, status } = args;

  if (!short_name || !long_name || !status) {
    throw new ApolloError('Fields "name" and "status" are required', 'BAD_USER_INPUT');
  }

  try {
    const school = await School.create({ short_name, long_name, address, status });
    console.log(`[GraphQL] createSchool → ${school.short_name}`);
    return school;
  } catch (error) {
    console.error(`[GraphQL] createSchool Error →`, error);
    throw new ApolloError('Failed to create school', 'INTERNAL_SERVER_ERROR');
  }
}


/**
 * Update a school by ID
 * @param {Object} _
 * @param {Object} args
 * @param {string} args.id
 * @param {Object} args.updates
 * @returns {Promise<Object>}
 */
async function UpdateSchool(_, { id, ...updates }) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApolloError('Invalid school ID', 'BAD_USER_INPUT');
  }
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
 * @param {Object} _
 * @param {Object} args
 * @param {string} args.id
 * @returns {Promise<Object|null>}
 */
async function DeleteSchool(_, { id }) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApolloError('Invalid school ID', 'BAD_USER_INPUT');
  }

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


// *************** EXPORT MODULE ***************
module.exports = {
  GetAllSchools,
  GetOneSchool,
  CreateSchool,
  UpdateSchool,
  DeleteSchool,
};

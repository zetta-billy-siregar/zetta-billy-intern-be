// *************** IMPORT LIBRARY ***************
const mongoose = require('mongoose');
const { ApolloError } = require('apollo-server-express');

// *************** IMPORT MODULE ***************
const User = require('./user.model');

// *************** QUERY ***************

/**
 * Fetch all users who are not soft-deleted.
 *
 * @async
 * @function GetAllUsers
 * @returns {Promise<Array>} - List of users not marked as deleted.
 */
async function GetAllUsers() {
  return await User.find({ status: 'active' });
}

/**
 * Fetch a single user by ID.
 *
 * @async
 * @function GetOneUser
 * @param {Object} _ - Unused resolver root.
 * @param {Object} args - Arguments containing user ID.
 * @param {string} args.id - User ID to find.
 * @returns {Promise<Object|null>} - User document or null.
 */
async function GetOneUser(_, { id }) {
  return await User.findById(id);
}

// *************** MUTATION ***************

/**
 * Create a new user with basic validation.
 *
 * @async
 * @function CreateUser
 * @param {Object} _ - Unused resolver root.
 * @param {Object} args - Arguments to create user.
 * @param {string} args.first_name
 * @param {string} args.last_name
 * @param {string} args.email
 * @param {string} args.role
 * @returns {Promise<Object>} - Created user.
 * @throws {ApolloError} - If required fields are missing or DB fails.
 */
async function CreateUser(_, args) {
  const { first_name, last_name, email, role, status } = args;

  if (!first_name || !last_name || !email || !role || !status) {
    throw new ApolloError('All fields are required', 'BAD_USER_INPUT');
  }

  try {
    const user = await User.create({
      first_name,
      last_name,
      email,
      role,
      status,
      password: 'testing123' 
    });

    console.log(`[GraphQL] createUser → ${user.first_name} (${user.email})`);
    return user;
  } catch (error) {
    console.error(`[GraphQL] createUser Error →`, error);
    throw new ApolloError('Failed to create user', 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Update user data by ID.
 *
 * @async
 * @function UpdateUser
 * @param {Object} _ - Unused resolver root.
 * @param {Object} args - Arguments containing update info.
 * @param {string} args.id - User ID to update.
 * @returns {Promise<Object|null>} - Updated user or null.
 * @throws {ApolloError} - If update fails.
 */
async function UpdateUser(_, { id, ...updates }) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApolloError('Invalid user ID', 'BAD_USER_INPUT');
  }
  try {
    console.log(`[GraphQL] updateUser → id: ${id}`);
    return await User.findByIdAndUpdate(id, updates, { new: true });
  } catch (error) {
    console.error(`[GraphQL] updateUser Error →`, error);
    throw new ApolloError('Failed to update user', 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Soft delete a user by setting deleted_at.
 *
 * @async
 * @function DeleteUser
 * @param {Object} _ - Unused resolver root.
 * @param {Object} args - Arguments containing user ID.
 * @param {string} args.id - ID of the user to soft delete.
 * @returns {Promise<Object|null>} - Updated user or null.
 * @throws {ApolloError} - If deletion fails.
 */
async function DeleteUser(_, { id }) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApolloError('Invalid user ID', 'BAD_USER_INPUT');
  }
  try {
    console.log(`[GraphQL] deleteUser → id: ${id}`);
    return await User.findByIdAndUpdate(id, {
      status: 'deleted',
      deleted_at: new Date()
    }, { new: true });
  } catch (error) {
    console.error(`[GraphQL] deleteUser Error →`, error);
    throw new ApolloError('Failed to delete user', 'INTERNAL_SERVER_ERROR');
  }
}

// *************** EXPORT MODULE ***************
module.exports = {
  GetAllUsers,
  GetOneUser,
  CreateUser,
  UpdateUser,
  DeleteUser
};

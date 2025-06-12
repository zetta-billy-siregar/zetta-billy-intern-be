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
  // *************** Fetch all users with status 'active'
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
  // *************** Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApolloError('Invalid user ID', 'BAD_USER_INPUT');
  }
  // *************** Fetch user by ID
  console.log(`[GraphQL] getOneUser → id: ${id}`);
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
async function CreateUser(_, { input }) {
  const { first_name, last_name, email, role, status } = input;
  // *************** Validate first_name and last_name
  if (!first_name || !last_name) {
    throw new ApolloError('Fields "first_name" and "last_name" are required', 'BAD_USER_INPUT');
  }
  // *************** Validate role
  if (!['admin', 'student', 'teacher'].includes(role)) {
    throw new ApolloError('Invalid role', 'BAD_USER_INPUT');
  }
  // *************** Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApolloError('Invalid email format', 'BAD_USER_INPUT');
  }
  // *************** Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApolloError('User already exists', 'BAD_USER_INPUT');
  }
  // *************** Validate status user
  if (status !== 'active' && status !== 'deleted') {
    throw new ApolloError('Invalid status', 'BAD_USER_INPUT');
  }
  // *************** Create the user document
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
  // *************** Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApolloError('Invalid user ID', 'BAD_USER_INPUT');
  }
  // *************** Validate email update
  if (updates.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(updates.email)) {
      throw new ApolloError('Invalid email format', 'BAD_USER_INPUT');
    }
    // Check if the email already exists for another user
    const existingUser = await User.findOne({ email: updates.email, _id: { $ne: id } });
    if (existingUser) {
      throw new ApolloError('Email already in use', 'BAD_USER_INPUT');
    }
  }
  // *************** Validate role update
  if (updates.role && !['admin', 'student', 'teacher'].includes(updates.role)) {
    throw new ApolloError('Invalid role', 'BAD_USER_INPUT');
  }
  // *************** Update the user document with new values
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
  // *************** Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApolloError('Invalid user ID', 'BAD_USER_INPUT');
  }
  // *************** Attempt to find and update the user document & to set status to 'deleted' and mark the deletion time
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

// *************** USER RESOLVERS EXPORT ***************
const userResolvers = {
  Query: {
    GetAllUsers: GetAllUsers,
    GetOneUser: GetOneUser
  },
  Mutation: {
    createUser: CreateUser,
    updateUser: UpdateUser,
    deleteUser: DeleteUser
  }
};

// *************** EXPORT MODULE ***************
module.exports =  { resolvers: userResolvers };
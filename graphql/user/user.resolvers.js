// *************** QUERY ***************
/**
 * GraphQL resolvers for the User entity.
 *
 * @function users
 * @function user
 * @function createUser
 * @function updateUser
 * @function deleteUser
 * @param {Object} _ - The parent resolver (unused).
 * @param {Object} args - The arguments provided to each resolver function.
 * @param {string} args.id - The MongoDB ObjectId of the user (for single fetch, update, and delete).
 * @param {string} args.firstName - First name of the user (for creation/update).
 * @param {string} args.lastName - Last name of the user (for creation/update).
 * @param {string} args.email - Email of the user (for creation/update).
 * @param {string} args.role - Role assigned to the user (for creation/update).
 * @param {boolean} args.deletedAt - Used internally to mark user as soft-deleted.
 * @returns {Promise<Array|Object|null>} - A promise resolving to one or many user documents.
 * @throws {ApolloError} - If an operation fails or a user is not found.
 */

// *************** IMPORT HELPER FUNCTION ***************
const {
  GetAllUsers,
  GetOneUser,
  CreateUser,
  UpdateUser,
  DeleteUser
} = require('./user.helper');

const userResolvers = {
  Query: {
    users: GetAllUsers,
    user: GetOneUser
  },
  Mutation: {
    createUser: CreateUser,
    updateUser: UpdateUser,
    deleteUser: DeleteUser
  }
};

// *************** EXPORT MODULE ***************
module.exports =  { resolvers: userResolvers };
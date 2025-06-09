// *************** IMPORT MODULE ***************
const User = require('./user.model');

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
const resolvers = {
  Query: {
    users: () => User.find({ deletedAt: null }),
    user: (_, { id }) => User.findById(id),
  },
  Mutation: {
    createUser: (_, args) => User.create(args),
    updateUser: async (_, { id, ...updates }) => {
      return await User.findByIdAndUpdate(id, updates, { new: true });
    },
    deleteUser: async (_, { id }) => {
      return await User.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
    },
  },
};

module.exports = { resolvers };
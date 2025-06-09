// *************** IMPORT MODULE ***************
const School = require('./school.model');
const Student = require('../student/student.model');

// *************** QUERY ***************
/**
 * GraphQL resolvers for the School entity.
 *
 * @function schools
 * @function school
 * @function createSchool
 * @function updateSchool
 * @function deleteSchool
 * @function School.students
 * @param {Object} _ - The parent resolver (unused in root queries/mutations).
 * @param {Object} args - The arguments passed to the resolver.
 * @param {string} args.id - The MongoDB ObjectId of the school (used in single fetch, update, delete).
 * @param {string} args.name - Name of the school (create/update).
 * @param {string} [args.address] - Optional address of the school (create/update).
 * @param {Object} parent - Parent object passed to nested resolvers (used in School.students).
 * @returns {Promise<Array|Object|null>} - Resolves to school document(s) or related student list.
 * @throws {ApolloError} - If any database operation fails.
 */
const resolvers = {
  Query: {
    schools: () => School.find(),
    school: (_, { id }) => School.findById(id),
  },
  Mutation: {
    createSchool: (_, args) => School.create(args),
    updateSchool: async (_, { id, ...updates }) => {
      return await School.findByIdAndUpdate(id, updates, { new: true });
    },
    deleteSchool: async (_, { id }) => {
      return await School.findByIdAndDelete(id);
    },
  },
  School: {
    students: (parent) => Student.find({ schoolId: parent.id, deletedAt: null }),
  },
};

module.exports = { resolvers };
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

// *************** IMPORT HELPER FUNCTION ***************
const {
  GetAllSchools,
  GetOneSchool,
  CreateSchool,
  UpdateSchool,
  DeleteSchool,
} = require('./school.helper');

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
    students: (parent, _args, context) => context.loaders.studentLoader.load(parent.id)
  }
};

// *************** EXPORT MODULE ***************
module.exports = { resolvers: schoolResolvers };
// *************** QUERY ***************
/**
 * GraphQL resolvers for the Student entity.
 *
 * @function students
 * @function student
 * @function createStudent
 * @function updateStudent
 * @function deleteStudent
 * @param {Object} _ - The parent resolver (not used).
 * @param {Object} args - The arguments passed to the resolver.
 * @param {string} args.id - The MongoDB ObjectId of the student (used in single fetch, update, delete).
 * @param {string} args.firstName - First name of the student (create/update).
 * @param {string} args.lastName - Last name of the student (create/update).
 * @param {string} args.email - Email of the student (create/update).
 * @param {Date} [args.dateOfBirth] - Optional date of birth (create/update).
 * @param {string} args.schoolId - ID of the school the student belongs to (create).
 * @returns {Promise<Array|Object|null>} - A promise resolving to a list or single student document.
 * @throws {ApolloError} - If any database operation fails.
 */

// *************** IMPORT HELPER FUNCTION ***************
const {
  GetAllStudents,
  GetOneStudent,
  CreateStudent,
  UpdateStudent,
  DeleteStudent
} = require('./student.helper');

const studentResolvers = {
  Query: {
    GetAllStudents: GetAllStudents,
    GetOneStudent: GetOneStudent
  },
  Mutation: {
    createStudent: CreateStudent,
    updateStudent: UpdateStudent,
    deleteStudent: DeleteStudent
  }
};

// *************** EXPORT MODULE ***************
module.exports = { resolvers: studentResolvers };
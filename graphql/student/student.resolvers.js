// *************** IMPORT MODULE ***************
const Student = require('./student.model');

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
const resolvers = {
  Query: {
    students: () => Student.find({ deletedAt: null }),
    student: (_, { id }) => Student.findById(id),
  },
  Mutation: {
    createStudent: (_, args) => Student.create(args),
    updateStudent: async (_, { id, ...updates }) => {
      return await Student.findByIdAndUpdate(id, updates, { new: true });
    },
    deleteStudent: async (_, { id }) => {
      return await Student.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
    },
  },
};

module.exports = { resolvers };
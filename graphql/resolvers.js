// *************** IMPORT LIBRARY ***************
const userResolvers = require('./user/user.resolver');
const studentResolvers = require('./student/student.resolver');
const schoolResolvers = require('./school/school.resolver');

// *************** EXPORT MODULE ***************
module.exports = {
  Query: {
    ...userResolvers.Query,
    ...studentResolvers.Query,
    ...schoolResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...studentResolvers.Mutation,
    ...schoolResolvers.Mutation,
  },
};

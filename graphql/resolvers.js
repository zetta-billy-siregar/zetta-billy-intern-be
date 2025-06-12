// *************** IMPORT LIBRARY ***************
const UserResolvers = require('./user/user.resolvers');
const StudentResolvers = require('./student/student.resolvers');
const SchoolResolvers = require('./school/school.resolvers');

// *************** EXPORT MODULE ***************
module.exports = {
  Query: {
    ...UserResolvers.Query,
    ...StudentResolvers.Query,
    ...SchoolResolvers.Query,
  },
  Mutation: {
    ...UserResolvers.Mutation,
    ...StudentResolvers.Mutation,
    ...SchoolResolvers.Mutation,
  },
};

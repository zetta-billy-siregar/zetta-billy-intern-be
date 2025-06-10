// *************** IMPORT MODULE ***************
const { gql } = require('apollo-server');
const userTypeDefs = require('./user/user.typedef');
const studentTypeDefs = require('./student/student.typedef');
const schoolTypeDefs = require('./school/school.typedef');

// *************** EXPORT MODULE ***************
module.exports = gql`
  scalar Date

  ${userTypeDefs}
  ${studentTypeDefs}
  ${schoolTypeDefs}

  type Query {
    users: [User]
    user(id: ID!): User

    students: [Student]
    student(id: ID!): Student

    schools: [School]
    school(id: ID!): School
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, role: String!): User
    updateUser(id: ID!, firstName: String, lastName: String, email: String, role: String): User
    deleteUser(id: ID!): User

    createStudent(firstName: String!, lastName: String!, email: String!, dateOfBirth: Date, schoolId: ID!): Student
    updateStudent(id: ID!, firstName: String, lastName: String, email: String, dateOfBirth: Date): Student
    deleteStudent(id: ID!): Student

    createSchool(name: String!, address: String): School
    updateSchool(id: ID!, name: String, address: String): School
    deleteSchool(id: ID!): School
  }
`;

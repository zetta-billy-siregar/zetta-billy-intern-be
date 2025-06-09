const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Student {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    dateOfBirth: String
    schoolId: ID!
    deletedAt: String
  }

  extend type Query {
    students: [Student]
    student(id: ID!): Student
  }

  extend type Mutation {
    createStudent(firstName: String!, lastName: String!, email: String!, dateOfBirth: String, schoolId: ID!): Student
    updateStudent(id: ID!, firstName: String, lastName: String, email: String, dateOfBirth: String): Student
    deleteStudent(id: ID!): Student
  }
`;

module.exports = { typeDefs };
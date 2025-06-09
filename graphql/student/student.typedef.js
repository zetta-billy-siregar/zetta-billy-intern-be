const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Student {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    date_of_birth: String
    status: String!
    school_id: ID!
    deleted_at: String
  }

  extend type Query {
    students: [Student]
    student(id: ID!): Student
  }

  extend type Mutation {
    createStudent(first_name: String!, last_name: String!, email: String!, date_of_birth: String, status: String!, school_id: ID!): Student
    updateStudent(id: ID!, first_name: String, last_name: String, email: String, date_of_birth: String): Student
    deleteStudent(id: ID!): Student
  }
`;

module.exports = { typeDefs };
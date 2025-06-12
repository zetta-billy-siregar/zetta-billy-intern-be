// *************** IMPORT LIBRARY ***************
const { gql } = require('apollo-server-express');

const typeDefs = gql`

  # *************** STUDENT TYPE ***************
  type Student {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    date_of_birth: String
    status: String
    school_id: ID!
    created_at: String
    updated_at: String
  }

  input StudentInput {
    first_name: String!
    last_name: String!
    email: String!
    date_of_birth: String
    status: String
    school_id: ID!
  }

  extend type Query {
    GetAllStudents: [Student]
    GetOneStudent(id: ID!): Student
  }

  extend type Mutation {
    createStudent(input: StudentInput!): Student
    updateStudent(id: ID!, first_name: String, last_name: String, email: String, date_of_birth: String, status: String): Student
    deleteStudent(id: ID!): Student
  }
`;

// *************** EXPORT MODULE ***************
module.exports = { typeDefs };
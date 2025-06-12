// *************** IMPORT LIBRARY ***************
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type School {
    id: ID!
    name: String!
    address: String
    status: String!
    students: [Student]
  }

  input SchoolInput {
    name: String!
    address: String
    status: String!
  }

  extend type Query {
    GetAllSchools: [School]
    GetOneSchool(id: ID!): School
  }

  extend type Mutation {
    createSchool(input: SchoolInput!): School
    updateSchool(id: ID!, name: String!, address: String): School
    deleteSchool(id: ID!): School
  }
`;

// *************** EXPORT MODULE ***************
module.exports = { typeDefs };
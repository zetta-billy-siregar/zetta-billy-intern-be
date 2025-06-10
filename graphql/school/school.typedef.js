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

  extend type Query {
    schools: [School]
    school(id: ID!): School
  }

  extend type Mutation {
    createSchool(name: String!, address: String, status: String!): School
    updateSchool(id: ID!, name: String!, address: String, status: String!): School
    deleteSchool(id: ID!): School
  }
`;

module.exports = { typeDefs };
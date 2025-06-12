// *************** IMPORT LIBRARY ***************
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    role: String!
    status: String!
  }
  input UserInput {
    first_name: String!
    last_name: String!
    email: String!
    role: String!
    status: String!
  }

  extend type Query {
    GetAllUsers: [User]
    GetOneUser(id: ID!): User
  }

  extend type Mutation {
    createUser(input: UserInput!): User
    updateUser(id: ID!, first_name: String, last_name: String, email: String, role: String): User
    deleteUser(id: ID!): User
  }
`;

// *************** EXPORT MODULE ***************
module.exports = { typeDefs };
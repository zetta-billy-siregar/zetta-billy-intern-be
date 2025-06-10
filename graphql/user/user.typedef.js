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

  extend type Query {
    users: [User]
    user(id: ID!): User
  }

  extend type Mutation {
    createUser(first_name: String!, last_name: String!, status: String!, email: String!, role: String!): User
    updateUser(id: ID!, first_name: String, last_name: String, email: String, role: String): User
    deleteUser(id: ID!): User
  }
`;

// *************** EXPORT MODULE ***************
module.exports = { typeDefs };
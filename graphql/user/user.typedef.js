const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    role: String!
    deletedAt: String
  }

  extend type Query {
    users: [User]
    user(id: ID!): User
  }

  extend type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, role: String!): User
    updateUser(id: ID!, firstName: String, lastName: String, email: String, role: String): User
    deleteUser(id: ID!): User
  }
`;

module.exports = { typeDefs };
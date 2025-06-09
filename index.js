// *************** IMPORT LIBRARY ***************
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

// *************** IMPORT APP & DB CONNECTOR ***************
const connectToDatabase = require('./utils/Database');

// *************** IMPORT MODELS ***************
require('./graphql/student/student.model');
require('./graphql/school/school.model');
require('./graphql/user/user.model');

// *************** IMPORT typedefs and resolvers ***************
const { typeDefs: userTypeDefs } = require('./graphql/user/user.typedef');
const { resolvers: userResolvers } = require('./graphql/user/user.resolvers');

const { typeDefs: studentTypeDefs } = require('./graphql/student/student.typedef');
const { resolvers: studentResolvers } = require('./graphql/student/student.resolvers');

const { typeDefs: schoolTypeDefs } = require('./graphql/school/school.typedef');
const { resolvers: schoolResolvers } = require('./graphql/school/school.resolvers');

// *************** DEFINE BASE TYPEDEF
const { gql } = require('apollo-server-express');
const baseTypeDefs = gql`
  scalar Date

  type Query
  type Mutation
`;

// *************** MERGE typedefs & resolvers
const typeDefs = mergeTypeDefs([baseTypeDefs, userTypeDefs, studentTypeDefs, schoolTypeDefs]);
const resolvers = mergeResolvers([userResolvers, studentResolvers, schoolResolvers]);

// *************** START SERVER AFTER DB CONNECTED
async function startServer() {
  try {
    await connectToDatabase();

    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await server.start();
    server.applyMiddleware({ app });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();


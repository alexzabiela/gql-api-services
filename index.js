import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express from "express";
import cors from "cors";

const data = require('./data.json'); // assuming your JSON file is data.json

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);

// GraphQL schema
const typeDefs = gql`
  type Service {
    id: Int
    title: String
    image: String
    description: String
  }

  type Query {
    services: [Service]
  }
`;

// Resolvers define the technique for fetching the types in the schema
const resolvers = {
  Query: {
    services: () => data.services,
  },
};

const startApolloServer = async(app, httpServer) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer(app, httpServer);

export default httpServer;
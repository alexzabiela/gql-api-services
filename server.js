const { ApolloServer, gql } = require('apollo-server');
const data = require('./data.json'); // assuming your JSON file is data.json

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

// Create the Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

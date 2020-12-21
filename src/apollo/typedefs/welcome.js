import { gql } from 'apollo-server-micro';

const typeDefs = gql`
  type Message {
    message: String
  }

  extend type Query {
    greeting: Message
  }
`;

const resolvers = {
  Query: {
    greeting: () => ({ message: 'Yokoso' })
  },
};

module.exports.welcomeDefs = typeDefs;
module.exports.welcomeResolvers = resolvers;

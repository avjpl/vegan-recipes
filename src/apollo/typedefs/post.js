import { gql } from 'apollo-server-micro';

import { GraphQLObject } from '../types';
import { mapPost } from '../mappings';

const typeDefs = gql`
  type POST {
    id: ID!
    title: String!
    slug: String!
    image: String
    body: Object!
    recipe: String!
  }

  extend type Query {
    post: [POST!]!
  }
`;

const resolvers = {
  Object: GraphQLObject,
  Query: {
    post: async (_, __, { dataSources: { contentfulAPI } }) => {
      const { items } = await contentfulAPI.getEntries('blogPost');
      return items.map(mapPost);
    },
  },
};

module.exports.postDefs = typeDefs;
module.exports.postResolvers = resolvers;

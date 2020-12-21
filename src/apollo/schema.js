import { makeExecutableSchema } from 'apollo-server-micro';
import { merge } from 'lodash';

import schemaDirectives from './directives';
import typeDefs from './typedefs/typeDefs';
import { postDefs, postResolvers } from './typedefs/post';

export const schema = makeExecutableSchema({
  typeDefs: [typeDefs, postDefs],
  resolvers: [merge(postResolvers)],
  schemaDirectives,
});

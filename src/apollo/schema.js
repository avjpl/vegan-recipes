import { makeExecutableSchema } from 'apollo-server-micro';
import { merge } from 'lodash';

import schemaDirectives from './directives';
import typeDefs from './typedefs/typeDefs';
import { welcomeDefs, welcomeResolvers } from './typedefs/welcome';

export const schema = makeExecutableSchema({
  typeDefs: [typeDefs, welcomeDefs],
  resolvers: [merge(welcomeResolvers)],
  schemaDirectives,
});

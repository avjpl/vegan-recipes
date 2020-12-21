import { ApolloServer } from 'apollo-server-micro';

import { schema } from '../../apollo/schema';

const apolloServer = new ApolloServer({
  schema,
  dataSources: () => {
    return {};
  },
  context: async () => {
    return {};
  },
});

const hanndler = apolloServer.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default hanndler;


import { gql } from 'apollo-server-micro';

const typeDefs = gql`
  directive @date(
    defaultFormat: String = "Do MMMM YYYY"
  ) on FIELD_DEFINITION

  scalar Date

  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  type Subscription {
    _empty: String
  }
`;

export default typeDefs;

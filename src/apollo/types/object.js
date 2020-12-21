import { GraphQLScalarType } from 'graphql';

export const GraphQLObject = new GraphQLScalarType({
  name: 'Object',
  description: 'Description of my custom scalar type',
  serialize(value) {
    return value;
  },
  parseValue(value) {
    return value;
  }
});

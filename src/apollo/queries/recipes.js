import gql from 'graphql-tag';

export const RECIPES_QUERY = gql`
  query recipes {
    recipes: post {
      id
      title
      slug
      body
    }
  }
`;

export const RECIPE_QUERY = gql`
  query recipes($id: Stirng!) {
    recipes: post(id: $id) {
      id
      title
      body
    }
  }
`;

import gql from 'graphql-tag';

export const RECIPES_QUERY = gql`
  query recipes {
    recipes: posts {
      id
      title
      slug,
      image {
        file {
          url
          details {
            image
          }
        }
      }
    }
  }
`;

export const RECIPE_QUERY = gql`
  query($slug: String!) {
    recipe: post(slug: $slug) {
      id
      title
      slug
      body
      video
      image {
        file {
          url
          details {
            image
          }
          type
        }
      }
    }
  }
`;

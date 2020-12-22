import Image from 'next/image';
import propTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Layout from '../../components/layout';
import { initializeApollo } from '../../apollo/client';
import { RECIPES_QUERY, RECIPE_QUERY } from '../../apollo/queries';

import css from './post.module.css';

export default function Recipe({ slug }) {
  const {
    data: { recipe } = {}, loading, error,
  } = useQuery(RECIPE_QUERY, {
    variables: { slug },
  });

  if (error) return <div>Errored</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <Layout>
      <h1>{recipe.title}</h1>
      <div className={css.recipe__image}>
        <Image src={`https:${recipe.image.file.url}`} layout='fill' />
      </div>
      {documentToReactComponents(recipe?.body)}
      { recipe.video && <p>{recipe.video}</p> }
    </Layout>
  );
}

Recipe.propTypes = {
  slug: propTypes.string.isRequired
};

export async function getStaticPaths() {
  const apolloClient = initializeApollo();

  const { data: { recipes } = {} } = await apolloClient.query({
    query: RECIPES_QUERY,
  });

  return {
    paths: recipes.map(recipe => {
      return {
        params: { slug: recipe.slug }
      };
    }),
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: RECIPE_QUERY,
    variables: { slug: params.slug }
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      slug: params.slug,
    },
  };
}

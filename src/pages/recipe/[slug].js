import Image from 'next/image';
import propTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import ReactPlayer from 'react-player';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import { initializeApollo } from '../../apollo/client';
import { RECIPES_QUERY, RECIPE_QUERY } from '../../apollo/queries';

import css from './recipe.module.css';

export default function Recipe({ slug }) {
  const {
    data: { recipe } = {}, loading, error,
  } = useQuery(RECIPE_QUERY, {
    variables: { slug },
  });

  if (error) return <div>Errored</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div className={css.recipe}>
      <h1>{recipe.title}</h1>

      <Image src={`https:${recipe.image.file.url}`} {...recipe.image.file.details.image} />

      <div className={css.recipe__body}>
        {documentToReactComponents(recipe?.body)}
      </div>

      {
        recipe.video && 
        <div className={css.recipe__video}>
          <ReactPlayer url={recipe.video} />
        </div>
      }
    </div>
  );
}

Recipe.propTypes = {
  slug: propTypes.string.isRequired,
};

export async function getStaticPaths() {
  const apolloClient = initializeApollo();

  const { data: { recipes } = {} } = await apolloClient.query({
    query: RECIPES_QUERY,
  });

  return {
    paths: recipes.map(recipe => ({
      params: { slug: recipe.slug },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: RECIPE_QUERY,
    variables: { slug: params.slug },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      slug: params.slug,
    },
  };
}

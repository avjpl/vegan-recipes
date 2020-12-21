import Image from 'next/image';
import { useQuery } from '@apollo/client';

import Layout from '../components/layout';
import { initializeApollo } from '../apollo/client';
import { RECIPES_QUERY } from '../apollo/queries';

import css from './index.module.css';

export default function Recipes() {
  const {
    data: { recipes } = {}, loading, error,
  } = useQuery(RECIPES_QUERY);

  if (error) return <div>Errored</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <Layout>
      {
        recipes?.map(recipe => {
          return (
            <div className={css.recipe} key={recipe.id}>
              <h2 className={css.recipe__title}>{recipe.title}</h2>
              <div className={css.recipe__image}>
                <Image src={'https://placeimg.com/640/480/tech'} layout="fill" />
              </div>
            </div>
          );
        })
      }
    </Layout>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: RECIPES_QUERY,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

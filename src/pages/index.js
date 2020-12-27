import Layout from '../components/layout';
import Recipes from '../components/recipe/recipes';
import { initializeApollo } from '../apollo/client';
import { RECIPES_QUERY } from '../apollo/queries';

export default function Index() {
  return (
    <Layout>
      <Recipes />
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

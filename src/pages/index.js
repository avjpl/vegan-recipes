import { useQuery } from '@apollo/client';

import Layout from '../components/layout';
import { initializeApollo } from '../apollo/client';
import { GREETING_QUERY } from '../apollo/queries/greeting';

import css from './index.module.css';

export default function Home() {
  const {
    data: { greeting } = {}, loading, error,
  } = useQuery(GREETING_QUERY);

  if (error) return <div>Errored</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <Layout>
      <div className={css.welcome__message}>{ greeting.message }</div>
    </Layout>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GREETING_QUERY,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

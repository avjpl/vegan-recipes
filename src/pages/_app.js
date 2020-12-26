import { AnimatePresence } from 'framer-motion';
import { ApolloProvider } from '@apollo/client';
import propTypes from 'prop-types';

import { useApollo } from '../apollo/client';

import '../styles/css/index.css';

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} />
      </AnimatePresence>
    </ApolloProvider>
  );
}

MyApp.propTypes = {
  Component: propTypes.oneOfType([propTypes.func, propTypes.object]).isRequired,
  pageProps: propTypes.object
};

export default MyApp;

import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

const ApolloProviderWrapper = (mocks) => ({ children }) => {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  );
};

const customRender = (ui, { mocks, options } = {}) =>
  render(ui, { wrapper: ApolloProviderWrapper(mocks), ...options });

export { customRender as render };
  
export * from '@testing-library/react';

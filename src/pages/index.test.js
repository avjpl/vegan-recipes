import { render } from 'test-utils';

import Home from './index';
import { GREETING_QUERY } from '../apollo/queries/greeting';

const mocks = [
  {
    request: {
      query: GREETING_QUERY,
    },
    result: {
      data: {
        greeting: {
          message: 'Yokoso',
        },
      },
    }
  },
];

test('shoudl have loading message', async () => {
  const { getByText } = render(<Home />, { mocks });

  expect(getByText('Loading...')).toBeInTheDocument();
});

test('should have welcome message', async () => {
  const { findByText } = render(<Home />, { mocks });

  const message = await findByText('Yokoso');
  expect(message).toBeInTheDocument();
});

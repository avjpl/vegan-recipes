import { render, waitFor, act } from 'test-utils';

import Home from '../pages/index';
import { RECIPES_QUERY } from '../apollo/queries';

jest.mock('next/link', () => ({ children }) => children);

const mocks = [
  {
    request: {
      query: RECIPES_QUERY,
    },
    result: {
      data: {
        recipes: [
          {
            id: 1,
            title: 'title 1',
            slug: '',
            image: {
              file: {
                url: '//images.ctfassets.net/fake.img',
                details: {
                  image: {}
                }
              }
            },
          },
          {
            id: 2,
            title: 'title 2',
            slug: '',
            image: {
              file: {
                url: '//images.ctfassets.net/fake.img',
                details: {
                  image: {}
                }
              }
            },
          },
        ],
      },
    }
  },
];

describe('recipes', () => {
  test('shoudl have loading message', async () => {
    const { getByText } = render(<Home />, { mocks });
  
    expect(getByText('Loading...')).toBeInTheDocument();
  });
  
  test('should render 2 recipes', async () => {
    act(() => { render(<Home />, { mocks }); });
    
    await waitFor(() => {
      expect(document.querySelectorAll('.recipe')).toHaveLength(2);
    });
  });
});

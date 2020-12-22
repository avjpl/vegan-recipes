import { render, waitFor, act } from 'test-utils';

import Home from './index';
import { RECIPES_QUERY } from '../apollo/queries';

jest.mock('next/image', () => {
  const ImageMock = () => <div />;

  return ImageMock;
});

jest.mock('next/link', () => {
  const LinkMock = () => <div />;

  return LinkMock;
});

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
                url: '',
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
                url: '',
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

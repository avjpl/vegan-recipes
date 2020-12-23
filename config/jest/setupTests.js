/*
  Work around due to Image componennt failing:
  https://github.com/vercel/next.js/issues/18415#issuecomment-718180659
*/
process.env = {
  ...process.env,
  __NEXT_IMAGE_OPTS: {
    deviceSizes: [960],
    imageSizes: [],
    domains: ['images.ctfassets.net'],
    path: '/_next/image',
    loader: 'default',
  },
};
// optional: configure or set up a testing framework before each test
// if you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// used for __tests__/testing-library.js
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

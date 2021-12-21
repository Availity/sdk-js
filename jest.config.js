module.exports = {
  testPathIgnorePatterns: ['/node_modules', '<rootDir>/plopfile.js', '/lib/', '/dist/', '/docs/'],

  collectCoverageFrom: ['packages/**/*.{js,ts}'],
  coveragePathIgnorePatterns: ['/node_modules/', '/coverage/', '/dist/', '/docs/', '/lib/', '.d.ts'],

  testEnvironment: 'jest-environment-jsdom-global',
  testURL: 'http://localhost:8080',

  globals: {
    jsdom: true,
  },
};

module.exports = {
  testPathIgnorePatterns: [
    '<rootDir>.*(node_modules)(?!.*@availity.*).*$',
    '<rootDir>/plopfile.js',
    '/lib/',
    '/docs/',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
    '/dist/',
    '/docs/',
    '/lib/',
  ],
  testEnvironment: 'jest-environment-jsdom-global',
  testURL: 'http://localhost:8080',
  globals: {
    jsdom: true,
  },
};

module.exports = {
  testPathIgnorePatterns: [
    '<rootDir>.*(node_modules)(?!.*@availity.*).*$',
    '<rootDir>/plopfile.js',
    '/packages/docs/',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
    '/dist/',
    '/packages/docs/',
  ],
  testEnvironment: 'jest-environment-jsdom-global',
  testURL: 'http://localhost:8080',
  globals: {
    jsdom: true,
  },
};

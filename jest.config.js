module.exports = {
  testPathIgnorePatterns: [
    '<rootDir>.*(node_modules)(?!.*@availity.*).*$',
    '<rootDir>/plopfile.js',
  ],
  testEnvironment: 'jest-environment-jsdom-global',
  testURL: 'http://localhost:8080',
  globals: {
    jsdom: true,
  },
};

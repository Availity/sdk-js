module.exports = {
  testPathIgnorePatterns: ['<rootDir>.*(node_modules)(?!.*@availity.*).*$'],
  testEnvironment: 'jest-environment-jsdom-global',
  testURL: 'http://localhost',
  globals: {
    jsdom: true,
  },
};

module.exports = {
  displayName: 'env-var',
  preset: '../../jest.preset.js',
  testEnvironment: 'jest-environment-jsdom-global',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
    jsdom: true,
  },
  coverageDirectory: '../../coverage/env-var',
};

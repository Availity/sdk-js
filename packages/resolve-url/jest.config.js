module.exports = {
  displayName: 'resolve-url',
  preset: '../../jest.preset.js',
  testEnvironment: 'jest-environment-jsdom-global',
  testURL: 'https://dev.local/',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
    jsdom: true,
  },
  coverageDirectory: '../../coverage/resolve-url',
  coverageReporters: ['json'],
};

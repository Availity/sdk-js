module.exports = {
  displayName: 'message-core',
  preset: '../../jest.preset.js',
  testEnvironment: 'jest-environment-jsdom-global',
  testURL: 'https://dev.local:9999',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
    jsdom: true,
  },
  coverageDirectory: '../../coverage/message-core',
  coverageReporters: ['json'],
};

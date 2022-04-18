module.exports = {
  displayName: 'upload-core',
  preset: '../../jest.preset.js',
  testEnvironment: 'jest-environment-jsdom-global',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
    jsdom: true,
  },
  coverageDirectory: '../../coverage/upload-core',
};

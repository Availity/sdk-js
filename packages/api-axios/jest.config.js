module.exports = {
  displayName: 'api-axios',
  preset: '../../jest.preset.js',
  testURL: 'http://localhost:8080',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  coverageDirectory: '../../coverage/api-axios',
};

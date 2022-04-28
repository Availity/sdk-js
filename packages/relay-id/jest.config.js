module.exports = {
  displayName: 'relay-id',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  coverageDirectory: '../../coverage/relay-id',
  coverageReporters: ['json'],
};

module.exports = {
  displayName: 'authorizations-core',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  coverageDirectory: '../../coverage/authorizations-core',
  coverageReporters: ['json'],
};

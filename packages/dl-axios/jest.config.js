module.exports = {
  displayName: 'dl-axios',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  coverageDirectory: '../../coverage/dl-axios',
  coverageReporters: ['json'],
};

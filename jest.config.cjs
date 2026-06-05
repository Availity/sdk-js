const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  transform: {
    '^.+\\.(ts|js)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  transformIgnorePatterns: ['node_modules/(?!axios|uuid|@bundled-es-modules/*)'],
  moduleFileExtensions: ['ts', 'js'],
  preset: '../../jest.preset.cjs',
  testEnvironment: 'jest-environment-jsdom',
  coverageReporters: ['json-summary'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/../../' }),
  },
  setupFiles: ['../../jest.polyfills.cjs'],
};

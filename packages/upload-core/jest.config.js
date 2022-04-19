const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('../../tsconfig.json');

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
  coverageReporters: ['json'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/../../' }),
};

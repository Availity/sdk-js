const global = require('../../jest.config.cjs');

module.exports = {
  ...global,
  displayName: 'upload-core',
  coverageDirectory: '../../coverage/upload-core',
  coveragePathIgnorePatterns: ['/mocks/*'],
};

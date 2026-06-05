const global = require('../../jest.config.cjs');

module.exports = {
  ...global,
  testURL: 'http://localhost:8080',
  displayName: 'api-axios',
  coverageDirectory: '../../coverage/api-axios',
};

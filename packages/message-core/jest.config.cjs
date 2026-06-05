const global = require('../../jest.config.cjs');

module.exports = {
  ...global,
  testURL: 'https://dev.local:9999',
  displayName: 'message-core',
  coverageDirectory: '../../coverage/message-core',
};

const global = require('../../jest.config');

module.exports = {
  ...global,
  testURL: 'https://dev.local:9999',
  displayName: 'message-core',
  coverageDirectory: '../../coverage/message-core',
};

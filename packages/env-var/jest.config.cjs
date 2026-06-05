const global = require('../../jest.config.cjs');

module.exports = {
  ...global,
  displayName: 'env-var',
  coverageDirectory: '../../coverage/env-var',
};

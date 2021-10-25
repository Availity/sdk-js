const { getRules } = require('./dockyard');

describe('dockyard', () => {
  test('getRules', () => {
    expect(getRules).toBeDefined();
  });
});

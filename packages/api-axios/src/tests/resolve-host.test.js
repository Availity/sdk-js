import resolveHost from '../resolve-host';

describe('resolve-host', () => {
  test('return host if provided', () => {
    const host = 'local';
    expect(resolveHost(host)).toBe('local');
  });

  test('return empty string if not in cloud', () => {
    const window = {
      location: {
        hostname: 'localhost',
      },
    };

    expect(resolveHost('', window)).toBe('');
  });
});

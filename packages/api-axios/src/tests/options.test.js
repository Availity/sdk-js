import options from '../options';

describe('Api options', () => {
  test('should be defined', () => {
    expect(options).toBeDefined();
    expect(options.API).toBeDefined();
    expect(options.MS).toBeDefined();
  });
});

import avModule from '..';

describe('api module', () => {
  test('should be defined', () => {
    expect(avModule).toBeDefined();
  });
  test("should be 'availity.api'", () => {
    expect(avModule).toBe('availity.api');
  });
});

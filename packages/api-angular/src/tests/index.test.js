import AvApi from '../';

describe('api module', () => {
  test('AvApi should be defined', () => {
    expect(AvApi).toBeDefined();
  });
  test("AvApi should be 'availity.api'", () => {
    expect(AvApi).toBe('availity.api');
  });
});

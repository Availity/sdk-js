import AvNavigation from '../navigation';

const mockHttp = jest.fn(() => Promise.resolve({}));

describe('AvNavigation', () => {
  let api;

  test('should be defined', () => {
    api = new AvNavigation({ http: mockHttp });
    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvNavigation({
      http: mockHttp,
      promise: Promise,
    });
    expect(api).toBeDefined();
  });
});

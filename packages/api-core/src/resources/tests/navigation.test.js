import AvNavigation from '../navigation';

const mockHttp = jest.fn(() => Promise.resolve({}));

describe('AvNavigation', () => {
  let api;

  test('should be defined', () => {
    api = new AvNavigation(mockHttp, Promise, {});
    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvNavigation(mockHttp, Promise);
    expect(api).toBeDefined();
  });
});

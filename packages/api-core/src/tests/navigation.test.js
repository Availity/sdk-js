import { AvNavigation } from '../index';

const mockHttp = jest.fn(() => Promise.resolve({}));

describe('AvNavigation', () => {
  let TestApi;

  test('AvNavigation should be defined', () => {
    TestApi = new AvNavigation(mockHttp, Promise, {});
    expect(TestApi).toBeDefined();
  });

  test('AvNavigation should handle no config passed in', () => {
    TestApi = new AvNavigation(mockHttp, Promise);
    expect(TestApi).toBeDefined();
  });
});

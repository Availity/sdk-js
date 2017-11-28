import AvSpaces from '../spaces';

const mockHttp = jest.fn(() => Promise.resolve({}));

describe('AvSpaces', () => {
  let TestApi;

  test('AvSpaces should be defined', () => {
    TestApi = new AvSpaces(mockHttp, Promise, {});
    expect(TestApi).toBeDefined();
  });

  test('AvSpaces should handle no config passed in', () => {
    TestApi = new AvSpaces(mockHttp, Promise);
    expect(TestApi).toBeDefined();
  });
});

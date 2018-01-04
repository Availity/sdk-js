import AvNavigation from '../navigation';

const mockHttp = jest.fn(() => Promise.resolve({}));
const mockMerge = jest.fn((...args) => Object.assign(...args));

describe('AvNavigation', () => {
  let api;

  test('should be defined', () => {
    api = new AvNavigation(mockHttp, Promise, mockMerge, {});
    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvNavigation(mockHttp, Promise, mockMerge);
    expect(api).toBeDefined();
  });
});

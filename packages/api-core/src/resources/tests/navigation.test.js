import AvNavigation from '../navigation';

const mockHttp = jest.fn(() => Promise.resolve({}));
const mockMerge = jest.fn((...args) => Object.assign(...args));

describe('AvNavigation', () => {
  let api;

  test('should be defined', () => {
    api = new AvNavigation({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });
    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvNavigation({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
    });
    expect(api).toBeDefined();
  });
});

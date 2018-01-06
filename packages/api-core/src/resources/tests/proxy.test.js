import AvProxy from '../proxy';

const mockHttp = jest.fn(() => Promise.resolve({}));
const mockMerge = jest.fn((...args) => Object.assign(...args));

describe('AvProxy', () => {
  let api;

  test('AvProxy should be defined', () => {
    api = new AvProxy({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: { tenant: 'healthplan' },
    });
    expect(api).toBeDefined();
  });

  test('AvProxy should throw an error if config does not have tenant', () => {
    expect(() => {
      api = new AvProxy({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        config: {},
      });
    }).toThrow('Must specify tenant name for Proxy');
  });
});

import AvProxy from '../proxy';

const mockHttp = jest.fn(() => Promise.resolve({}));

describe('AvProxy', () => {
  let api;

  test('AvProxy should be defined', () => {
    api = new AvProxy({ http: mockHttp, ...{ tenant: 'healthplan' } });
    expect(api).toBeDefined();
  });

  test('AvProxy should throw an error if config does not have tenant', () => {
    expect(() => {
      api = new AvProxy({ http: mockHttp });
    }).toThrow('Must specify tenant name for Proxy');
  });
});

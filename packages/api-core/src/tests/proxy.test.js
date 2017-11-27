import { AvProxy } from '../index';

const mockHttp = jest.fn(() => Promise.resolve({}));

describe('AvProxy', () => {
  let TestApi;

  test('AvProxy should be defined', () => {
    TestApi = new AvProxy(mockHttp, Promise, { tenant: 'healthplan' });
    expect(TestApi).toBeDefined();
  });

  test('AvProxy should throw an error if config does not have tenant', () => {
    expect(() => {
      TestApi = new AvProxy(mockHttp, Promise);
    }).toThrow('Must specify tenant name for Proxy');
  });
});

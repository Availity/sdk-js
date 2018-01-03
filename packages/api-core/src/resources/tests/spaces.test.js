import AvSpaces from '../spaces';

const mockHttp = jest.fn(() => Promise.resolve({}));

const get = jest.fn(() =>
  Promise.resolve({
    status: 200,
    data: {
      name: 'foo',
    },
  })
);

describe('AvSpaces', () => {
  let api;

  beforeEach(() => {
    api = new AvSpaces(mockHttp, Promise, {});
    api.get = get;
  });

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('should parse space id', () => {
    const spaceId = api.parseSpaceId('?foo=bar&spaceId=12345');
    expect(spaceId).toEqual('12345');
  });

  test('should get name from spaces resource', async () => {
    const name = await api.getSpaceName('1');
    expect(name).toEqual('foo');
  });
});

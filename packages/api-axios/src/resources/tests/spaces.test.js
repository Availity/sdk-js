import AvSpacesApi from '../spaces';

const get = jest.fn(() =>
  Promise.resolve({
    status: 200,
    data: {
      name: 'foo',
    },
  })
);

describe('AvSpacesApi', () => {
  let api;

  beforeEach(() => {
    api = new AvSpacesApi();
    api.get = get;
  });

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('url should be correct', () => {
    expect(api.getUrl(api.config())).toBe('/api/sdk/platform/v1/spaces');
  });

  test('should parse space id', () => {
    const spaceId = api.parseSpaceId('?foo=bar&spaceId=12345');
    expect(spaceId).toEqual('12345');
  });

  test('should get name from spaces resource', async () => {
    const name = await api.getSpaceName('1');
    expect(name).toEqual('foo');

    await expect(api.getSpaceName()).rejects.toThrow('[spaceId] must be defined');
  });
});

import AvStashApi from '../stash';

describe('AvStashApi', () => {
  let api;

  beforeEach(() => {
    api = new AvStashApi();
    api.create = jest.fn();
    window.open = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('url should be correct', () => {
    expect(api.getUrl(api.config())).toBe('/cloud/web/appl/stash/v1/session/data');
  });

  test('url should include id when provided', () => {
    expect(api.getUrl(api.config(), 'abc-123')).toBe('/cloud/web/appl/stash/v1/session/data/abc-123');
  });

  test('launch throws when linkTo is not provided', async () => {
    await expect(() => api.launch({ key: 'value' })).rejects.toThrow('linkTo is required and was not provided');
  });

  test('launch throws when stash API does not return a session ID', async () => {
    api.create.mockResolvedValue({ data: {} });
    await expect(() => api.launch({ key: 'value' }, '/apps/target')).rejects.toThrow(
      'Failed to retrieve session ID from Stash API'
    );
  });

  test('launch posts params and opens target URL with sessionId', async () => {
    api.create.mockResolvedValue({ data: { id: 'abc-123' } });
    const sessionId = await api.launch({ key: 'value' }, '/apps/target');

    expect(api.create).toHaveBeenCalledWith({ key: 'value' });
    expect(window.open).toHaveBeenCalledWith('/apps/target?sessionId=abc-123', '_top');
    expect(sessionId).toBe('abc-123');
  });

  test('launch appends sessionId with & when linkTo already has query params', async () => {
    api.create.mockResolvedValue({ data: { id: 'xyz-789' } });
    await api.launch({ foo: 'bar' }, '/apps/target/#/?spaceId=12345');

    expect(window.open).toHaveBeenCalledWith('/apps/target/#/?spaceId=12345&sessionId=xyz-789', '_top');
  });

  test('launch returns the session ID', async () => {
    api.create.mockResolvedValue({ data: { id: 'session-456' } });
    const result = await api.launch({}, '/apps/target');
    expect(result).toBe('session-456');
  });
});

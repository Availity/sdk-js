import AvApi from '@availity/api-axios';

import stashLaunch from '..';

jest.mock('@availity/api-axios');

describe('stashLaunch', () => {
  let mockCreate;

  beforeEach(() => {
    mockCreate = jest.fn();
    AvApi.mockImplementation(() => ({ create: mockCreate }));
    window.open = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('linkTo is required', async () => {
    await expect(() => stashLaunch({ key: 'value' })).rejects.toThrow(
      'linkTo is required and was not provided'
    );
  });

  test('throws when stash API does not return a session ID', async () => {
    mockCreate.mockResolvedValue({ data: {} });
    await expect(() => stashLaunch({ key: 'value' }, '/apps/target')).rejects.toThrow(
      'Failed to retrieve session ID from Stash API'
    );
  });

  test('throws when server responds with error', async () => {
    mockCreate.mockRejectedValue({ response: { status: 500 } });
    await expect(() => stashLaunch({ key: 'value' }, '/apps/target')).rejects.toThrow(
      'The server responded with an error'
    );
  });

  test('throws when no response received', async () => {
    mockCreate.mockRejectedValue({ request: {} });
    await expect(() => stashLaunch({ key: 'value' }, '/apps/target')).rejects.toThrow(
      'No response received'
    );
  });

  test('throws when request setup fails', async () => {
    mockCreate.mockRejectedValue(new Error('network error'));
    await expect(() => stashLaunch({ key: 'value' }, '/apps/target')).rejects.toThrow(
      'An error occurred while setting up request, check your configurations'
    );
  });

  test('posts params to stash API and opens target URL with sessionId', async () => {
    mockCreate.mockResolvedValue({ data: { id: 'abc-123' } });
    const sessionId = await stashLaunch({ key: 'value' }, '/apps/target');

    expect(mockCreate).toHaveBeenCalledWith({ key: 'value' });
    expect(window.open).toHaveBeenCalledWith('/apps/target?sessionId=abc-123', '_top');
    expect(sessionId).toBe('abc-123');
  });

  test('appends sessionId with & when linkTo already has query params', async () => {
    mockCreate.mockResolvedValue({ data: { id: 'xyz-789' } });
    await stashLaunch({ foo: 'bar' }, '/apps/target/#/?spaceId=12345');

    expect(window.open).toHaveBeenCalledWith('/apps/target/#/?spaceId=12345&sessionId=xyz-789', '_top');
  });

  test('returns the session ID', async () => {
    mockCreate.mockResolvedValue({ data: { id: 'session-456' } });
    const result = await stashLaunch({}, '/apps/target');
    expect(result).toBe('session-456');
  });

  test('allows overriding the stash API URL', async () => {
    mockCreate.mockResolvedValue({ data: { id: 'custom-123' } });
    await stashLaunch({ key: 'value' }, '/apps/target', { stashUrl: '/custom/stash/endpoint' });

    expect(AvApi).toHaveBeenCalledWith({ url: '/custom/stash/endpoint', api: false });
    expect(window.open).toHaveBeenCalledWith('/apps/target?sessionId=custom-123', '_top');
  });
});

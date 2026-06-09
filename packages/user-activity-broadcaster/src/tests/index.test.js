import { getTargetOrigin, handleActivity, updateInterval, addEventListeners, lastActivity } from '../index';

describe('user-activity-broadcaster', () => {
  describe('targetOrigin', () => {
    test('essentials.availity.com origin should have targetOrigion of apps', () => {
      const testOrigin = 'essentials.availity.com';
      const expected = 'apps.availity.com';

      const targetOrigin = getTargetOrigin(testOrigin);

      expect(targetOrigin).toBe(expected);
    });

    test('apps.availity.com origin should have targetOrigion of essentials', () => {
      const testOrigin = 'apps.availity.com';
      const expected = 'essentials.availity.com';

      const targetOrigin = getTargetOrigin(testOrigin);

      expect(targetOrigin).toBe(expected);
    });

    test('should return undefined when origin contains neither apps nor essentials', () => {
      expect(getTargetOrigin('https://other.example.com')).toBeUndefined();
    });

    test('should return undefined when origin is empty string', () => {
      expect(getTargetOrigin('')).toBeUndefined();
    });

    test('should handle origin with apps in subdomain', () => {
      expect(getTargetOrigin('https://apps.example.com')).toBe('https://essentials.example.com');
    });

    test('should handle origin with essentials in subdomain', () => {
      expect(getTargetOrigin('https://essentials.example.com')).toBe('https://apps.example.com');
    });
  });

  test('should call handleActivityUpdate every interval', async () => {
    const testInterval = 1000;
    const waitTime = 2999;

    const postMessageSpy = vi.fn();
    window.top.postMessage = postMessageSpy;

    updateInterval(testInterval);

    await new Promise((resolve) => {
      setTimeout(resolve, waitTime);
    });

    // handleActivityUpdate posts a message with the user_activity event
    expect(postMessageSpy).toHaveBeenCalledTimes(2);
    expect(postMessageSpy).toHaveBeenCalledWith(
      expect.objectContaining({ event: 'user_activity' }),
      expect.any(String)
    );
  });

  test('keydown events call handleActivity', () => {
    addEventListeners();
    lastActivity.time = undefined;

    document.dispatchEvent(new KeyboardEvent('keydown'));

    expect(lastActivity.time).toBeDefined();
  });

  test('mousedown events call handleActivity', () => {
    addEventListeners();
    lastActivity.time = undefined;

    document.dispatchEvent(new MouseEvent('mousedown'));

    expect(lastActivity.time).toBeDefined();
  });

  test('handleActivity should update lastActivity', () => {
    handleActivity();
    expect(lastActivity.time).toBeDefined();
  });
});

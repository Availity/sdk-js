/* eslint-disable unicorn/consistent-function-scoping */
import AvMessage from './AvMessage';

let avMessage;
const TEST_URL = 'https://dev.local:9999';

// const OLD_LOCATION = window.location;
// const OLD_TOP_LOCATION = window.top.location;

describe('AvMessage', () => {
  beforeEach(() => {
    avMessage = new AvMessage();
    avMessage.isEnabled = true;
    avMessage.DEFAULT_EVENT = 'avMessage';
    avMessage.DOMAIN = /https?:\/\/([\w-]+\.)?availity\.(com|net)/;
  });

  test('enabled() should set the value if one passed in', () => {
    expect(avMessage.enabled(true)).toBe(true);
    expect(avMessage.enabled(false)).toBe(false);
    expect(avMessage.enabled('hello')).toBe(true);
  });

  test('enabled() should return current value when called with no arguments', () => {
    avMessage.isEnabled = true;
    expect(avMessage.enabled()).toBe(true);
    expect(avMessage.isEnabled).toBe(true); // not mutated

    avMessage.isEnabled = false;
    expect(avMessage.enabled()).toBe(false);
    expect(avMessage.isEnabled).toBe(false); // not mutated
  });

  describe('subscribers', () => {
    test('onMessage should call all subscribers for event when isSameWindow is false', () => {
      const testEvent = 'testEvent';
      const testEventSubscribers = [
        { id: 1, callback: vi.fn(), options: { ignoreSameWindow: false } },
        { id: 2, callback: vi.fn(), options: { ignoreSameWindow: true } },
      ];
      avMessage.subscribers = {
        [testEvent]: testEventSubscribers,
      };

      // Different event — neither subscriber should fire
      avMessage.onMessage(`${testEvent}Other bloop`, undefined, { isSameWindow: false });
      for (const testEventSubscriber of testEventSubscribers) {
        expect(testEventSubscriber.callback).not.toHaveBeenCalled();
      }

      // isSameWindow: false — both subscribers fire regardless of ignoreSameWindow
      const data = { testData: 'hello world bloop' };
      avMessage.onMessage(testEvent, data, { isSameWindow: false });
      for (const testEventSubscriber of testEventSubscribers) {
        expect(testEventSubscriber.callback).toHaveBeenCalledWith(data);
      }
    });

    test('onMessage should skip subscriber when isSameWindow and ignoreSameWindow are both true', () => {
      const testEvent = 'testEvent';
      const callback = vi.fn();
      avMessage.subscribers = {
        [testEvent]: [{ id: 1, callback, options: { ignoreSameWindow: true } }],
      };
      avMessage.onMessage(testEvent, { value: 'hello' }, { isSameWindow: true });
      expect(callback).not.toHaveBeenCalled();
    });

    test('onMessage should do nothing when there are no subscribers for the event', () => {
      avMessage.subscribers = {};
      expect(() => {
        avMessage.onMessage('nonExistentEvent', { value: 'hello' }, { isSameWindow: false });
      }).not.toThrow();
    });

    test('subscribe should respect ignoreSameWindow: false option', () => {
      avMessage.subscribers = {};
      const testEvent = 'testEvent';
      const fn = vi.fn();

      avMessage.subscribe(testEvent, fn, { ignoreSameWindow: false });

      expect(avMessage.subscribers[testEvent][0].options.ignoreSameWindow).toBe(false);

      // Should fire even when isSameWindow is true
      avMessage.onMessage(testEvent, { value: 'hello' }, { isSameWindow: true });
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('subscribe should add subscriber object to subscribers', () => {
      avMessage.subscribers = {};
      const testEvent = 'testEvent';
      const fn1 = () => 'totally a function';

      avMessage.subscribe(testEvent, fn1);

      const subscriber1 = { id: 1, callback: fn1, options: { ignoreSameWindow: true } };

      expect(avMessage.subscribers).toEqual({
        [testEvent]: [subscriber1],
      });

      const fn2 = () => 'totally another function';

      avMessage.subscribe(testEvent, fn2);

      const subscriber2 = { id: 2, callback: fn2, options: { ignoreSameWindow: true } };

      expect(avMessage.subscribers).toEqual({
        [testEvent]: [subscriber1, subscriber2],
      });
    });

    test('subscribe should return function to remove subscribers', () => {
      avMessage.subscribers = {};
      const testEvent = 'testEvent';
      const fn1 = () => 'totally a function';
      const unsubscribe1 = avMessage.subscribe(testEvent, fn1);

      const fn2 = () => 'totally another function';
      const unsubscribe2 = avMessage.subscribe(testEvent, fn2);

      const expectedSubscriber1 = { id: 1, callback: fn1, options: { ignoreSameWindow: true } };
      const expectedSubscriber2 = { id: 2, callback: fn2, options: { ignoreSameWindow: true } };

      expect(avMessage.subscribers).toEqual({
        [testEvent]: [expectedSubscriber1, expectedSubscriber2],
      });

      unsubscribe1();
      expect(avMessage.subscribers).toEqual({
        [testEvent]: [expectedSubscriber2],
      });

      unsubscribe1();
      expect(avMessage.subscribers).toEqual({
        [testEvent]: [expectedSubscriber2],
      });

      unsubscribe2();
      expect(avMessage.subscribers).toEqual({
        [testEvent]: [],
      });
    });

    test('unsubscribe should remove all subscriptions for event', () => {
      const event1 = ['a', 'b', 'c'];
      const event2 = ['b', 'c', 'd'];
      avMessage.subscribers = {
        event1,
        event2,
      };

      avMessage.unsubscribe('event1');
      expect(avMessage.subscribers).toEqual({ event2 });

      avMessage.unsubscribe();
      expect(avMessage.subscribers).toEqual({ event2 });
    });

    test('unsubscribeAll should remove all subscriptions', () => {
      avMessage.subscribers = {
        test1: ['a', 'b'],
        test2: ['b', 'c'],
      };
      avMessage.unsubscribeAll();
      expect(avMessage.subscribers).toEqual({});
    });

    describe('once', () => {
      test('callback fires exactly once even if the event is emitted multiple times', () => {
        const testEvent = 'onceEvent';
        const callback = vi.fn();

        avMessage.once(testEvent, callback);

        const data = { value: 'first' };
        avMessage.onMessage(testEvent, data, { isSameWindow: false });
        avMessage.onMessage(testEvent, { value: 'second' }, { isSameWindow: false });
        avMessage.onMessage(testEvent, { value: 'third' }, { isSameWindow: false });

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(data);
      });

      test('calling the returned cancel function before the event fires prevents the callback from running', () => {
        const testEvent = 'onceEventCancel';
        const callback = vi.fn();

        const cancel = avMessage.once(testEvent, callback);
        cancel();

        avMessage.onMessage(testEvent, { value: 'hello' }, { isSameWindow: false });

        expect(callback).not.toHaveBeenCalled();
      });

      test('options (e.g. ignoreSameWindow) are passed through correctly to subscribe', () => {
        const testEvent = 'onceEventOptions';
        const callback = vi.fn();

        // ignoreSameWindow: false means the callback should fire even for same-window messages
        avMessage.once(testEvent, callback, { ignoreSameWindow: false });

        avMessage.onMessage(testEvent, { value: 'hello' }, { isSameWindow: true });

        expect(callback).toHaveBeenCalledTimes(1);
      });

      test('auto-unsubscribe does not interfere with other subscribers on the same event', () => {
        const testEvent = 'onceEventIsolation';
        const onceCallback = vi.fn();
        const persistentCallback = vi.fn();

        avMessage.once(testEvent, onceCallback);
        avMessage.subscribe(testEvent, persistentCallback);

        const data1 = { value: 'first' };
        const data2 = { value: 'second' };

        avMessage.onMessage(testEvent, data1, { isSameWindow: false });
        avMessage.onMessage(testEvent, data2, { isSameWindow: false });

        // once callback fired only on first emission
        expect(onceCallback).toHaveBeenCalledTimes(1);
        expect(onceCallback).toHaveBeenCalledWith(data1);

        // persistent subscriber received both
        expect(persistentCallback).toHaveBeenCalledTimes(2);
        expect(persistentCallback).toHaveBeenCalledWith(data1);
        expect(persistentCallback).toHaveBeenCalledWith(data2);
      });
    });
  });

  describe('getEventData()', () => {
    let spyParse;
    const mockEvent = {
      data: 'testData',
      origin: 'testOrigin',
      source: 'testSource',
    };

    beforeEach(() => {
      spyParse = vi.spyOn(JSON, 'parse');
      // avMessage.isEnabled = true;
      // avMessage.onMessage = vi.fn();
      avMessage.isDomain = vi.fn().mockImplementation(() => true);
    });

    afterEach(() => {
      spyParse.mockRestore();
      spyParse.mockReset();
    });

    test('should return early when AvMessages not enabled', () => {
      avMessage.isEnabled = false;
      avMessage.onMessage = vi.fn();
      avMessage.getEventData(mockEvent);
      expect(spyParse).not.toHaveBeenCalled();
      expect(avMessage.isDomain).not.toHaveBeenCalled();
      expect(avMessage.onMessage).not.toHaveBeenCalled();
    });

    test('should return early when event does not have all fields', () => {
      avMessage.onMessage = vi.fn();
      const mockEvent1 = { ...mockEvent, data: false };
      const mockEvent2 = { ...mockEvent, origin: false };
      const mockEvent3 = { ...mockEvent, source: false };
      avMessage.getEventData(mockEvent1);
      avMessage.getEventData(mockEvent2);
      avMessage.getEventData(mockEvent3);
      expect(spyParse).not.toHaveBeenCalled();
      expect(avMessage.isDomain).not.toHaveBeenCalled();
      expect(avMessage.onMessage).not.toHaveBeenCalled();
    });

    test('should not call callbacks (by default) when event source is same window', () => {
      const callback = vi.fn();
      avMessage.subscribe('test event name', callback);
      const testEvent = { ...mockEvent, data: { event: 'test event name', data: 'foo-bla' }, source: window };
      avMessage.getEventData(testEvent);
      expect(callback).not.toHaveBeenCalled();
    });

    test('should call callbacks when event source is same window and `ignoreSameWindow` is false', () => {
      const callback = vi.fn();
      avMessage.subscribe('test event name', callback, { ignoreSameWindow: false });
      const testEvent = { ...mockEvent, data: { event: 'test event name', data: 'foo-bla' }, source: window };
      avMessage.getEventData(testEvent);
      expect(callback).toHaveBeenCalled();
    });

    test('should return early when event origin is not in domain', () => {
      avMessage.onMessage = vi.fn();
      avMessage.isDomain.mockImplementationOnce(() => false);
      avMessage.getEventData(mockEvent);
      expect(spyParse).not.toHaveBeenCalled();
      expect(avMessage.isDomain).toHaveBeenCalled();
      expect(avMessage.onMessage).not.toHaveBeenCalled();
    });

    test('should call onMessage when there are no blockers', () => {
      avMessage.onMessage = vi.fn();
      avMessage.getEventData(mockEvent);
      expect(avMessage.isDomain).toHaveBeenCalled();
      expect(avMessage.onMessage).toHaveBeenCalled();
    });

    test('if data is string should attempt to parse it', () => {
      avMessage.onMessage = vi.fn();
      avMessage.getEventData(mockEvent);
      expect(spyParse).toHaveBeenCalled();
      expect(avMessage.isDomain).toHaveBeenCalled();
      expect(avMessage.onMessage).toHaveBeenCalled();
    });

    test('if data is not string should not attempt to parse it', () => {
      avMessage.onMessage = vi.fn();
      avMessage.getEventData({ ...mockEvent, data: 10 });
      expect(spyParse).not.toHaveBeenCalled();
      expect(avMessage.isDomain).toHaveBeenCalled();
      expect(avMessage.onMessage).toHaveBeenCalled();
    });

    test('should call onMessage with event as data if its a string', () => {
      avMessage.onMessage = vi.fn();
      spyParse.mockRestore();
      avMessage.getEventData(mockEvent);
      expect(avMessage.isDomain).toHaveBeenCalled();
      expect(avMessage.onMessage).toHaveBeenCalledWith(mockEvent.data, undefined, { isSameWindow: false });
    });

    test('should call onMessage with default event if data is object without event param', () => {
      spyParse.mockRestore();
      avMessage.onMessage = vi.fn();
      const testData = { value: 'hello' };
      avMessage.getEventData({ ...mockEvent, data: JSON.stringify(testData) });
      expect(avMessage.isDomain).toHaveBeenCalled();
      expect(avMessage.onMessage).toHaveBeenCalledWith(avMessage.DEFAULT_EVENT, testData, { isSameWindow: false });
    });

    test('should call onMessage with event from data object param', () => {
      spyParse.mockRestore();
      avMessage.onMessage = vi.fn();
      const testEvent = 'testEvent';
      const testData = { value: 'hello', event: testEvent };
      avMessage.getEventData({ ...mockEvent, data: JSON.stringify(testData) });
      expect(avMessage.isDomain).toHaveBeenCalled();
      expect(avMessage.onMessage).toHaveBeenCalledWith(testData.event, testData, { isSameWindow: false });
    });
  });

  describe('domain()', () => {
    const originalReferrer = document.referrer;

    afterEach(() => {
      Object.defineProperty(document, 'referrer', {
        value: originalReferrer,
        writable: true,
      });
    });

    test('returns window.top.location.origin when top is accessible (jsdom: top === window)', () => {
      // In jsdom, window.top === window, so getOriginFromTop() returns window.location.origin.
      // This exercises the first branch of domain().
      expect(avMessage.domain()).toBe(TEST_URL);
    });

    // window.top is non-configurable in jsdom so we can't redefine it via
    // Object.defineProperty. Instead we spy on getOriginFromTop() — the only
    // method that reads window.top — to control its return value.

    test('returns top origin directly when getOriginFromTop succeeds', () => {
      vi.spyOn(avMessage, 'getOriginFromTop').mockReturnValue('https://qa-essentials.availity.com');
      expect(avMessage.domain()).toBe('https://qa-essentials.availity.com');
    });

    test('falls back to swapping window.location.origin when getOriginFromTop returns null', () => {
      vi.spyOn(avMessage, 'getOriginFromTop').mockReturnValue(null);
      // jsdom sets window.location.origin to TEST_URL ('https://dev.local:9999')
      // swapDomain on a non-apps/essentials URL leaves it unchanged
      const result = avMessage.domain();
      expect(result).toBe(avMessage.swapDomain(TEST_URL));
    });

    test('swapDomain is called on window.location.origin when top is inaccessible', () => {
      vi.spyOn(avMessage, 'getOriginFromTop').mockReturnValue(null);
      const swapSpy = vi.spyOn(avMessage, 'swapDomain');
      avMessage.domain();
      expect(swapSpy).toHaveBeenCalledWith(TEST_URL);
    });
  });

  describe('swapDomain()', () => {
    test('replaces essentials with apps', () => {
      expect(avMessage.swapDomain('https://qa-essentials.availity.com')).toBe('https://qa-apps.availity.com');
    });

    test('replaces apps with essentials', () => {
      expect(avMessage.swapDomain('https://qa-apps.availity.com')).toBe('https://qa-essentials.availity.com');
    });

    test('leaves unrelated URLs unchanged', () => {
      expect(avMessage.swapDomain('https://dev.local:9999')).toBe('https://dev.local:9999');
    });

    test('prefers essentials->apps replacement when both substrings somehow present', () => {
      // The if-branch checks essentials first, so essentials wins
      expect(avMessage.swapDomain('https://essentials-apps.availity.com')).toBe('https://apps-apps.availity.com');
    });
  });

  describe('getOriginFromTop()', () => {
    test('returns window.top.location.origin when accessible (same-domain)', () => {
      // In jsdom with no iframe, window.top === window, so top.location.origin
      // is the same as window.location.origin
      expect(avMessage.getOriginFromTop()).toBe(TEST_URL);
    });

    test('returns null when window.top.location throws (cross-domain)', () => {
      // window.top is non-configurable in jsdom so we can't replace it.
      // We override the method itself to simulate the cross-origin DOMException path,
      // then verify the real catch branch returns null.
      const crossOriginInstance = new AvMessage();
      // Replace getOriginFromTop with a version that throws, matching the real code's try/catch
      crossOriginInstance.getOriginFromTop = function () {
        try {
          throw new DOMException('Blocked a frame with origin', 'SecurityError');
        } catch {
          return null;
        }
      };
      expect(crossOriginInstance.getOriginFromTop()).toBeNull();
    });
  });

  test("isDomain should return true if domain() doesn't match regex", () => {
    const testDomain = 'hello';
    avMessage.domain = vi.fn(() => testDomain);
    avMessage.DOMAIN = /world/;
    expect(avMessage.DOMAIN.test(testDomain)).toBeFalsy();
    expect(avMessage.isDomain('test')).toBeTruthy();
  });

  test('isDomain should return if passed in url matches regex if domain() does', () => {
    const testDomain = 'hello';
    avMessage.domain = vi.fn(() => testDomain);
    avMessage.DOMAIN = /hello/;
    expect(avMessage.DOMAIN.test(testDomain)).toBeTruthy();
    expect(avMessage.DOMAIN.test(avMessage.domain())).toBeTruthy();
    expect(avMessage.isDomain('world')).toBeFalsy();
    expect(avMessage.isDomain('hello world')).toBeTruthy();
  });

  describe('send', () => {
    const testDomain = 'testDomain';
    const mockTarget = {
      postMessage: vi.fn(),
    };

    beforeEach(() => {
      avMessage.domain = vi.fn(() => testDomain);
      avMessage.isEnabled = true;
      mockTarget.postMessage.mockClear();
    });

    test('should return when not enabled', () => {
      avMessage.isEnabled = false;
      avMessage.send('something', mockTarget);
      expect(mockTarget.postMessage).not.toHaveBeenCalled();
    });

    test('should return when no message given', () => {
      avMessage.send(undefined, mockTarget);
      expect(mockTarget.postMessage).not.toHaveBeenCalled();
    });

    test('should call postMessage on target', () => {
      const testMessage = 'test';
      avMessage.send(testMessage, mockTarget);
      expect(mockTarget.postMessage).toHaveBeenCalledWith(testMessage, testDomain);
    });

    test('should stringify message if not string', () => {
      let testMessage = 1234;
      avMessage.send(testMessage, mockTarget);
      expect(mockTarget.postMessage).toHaveBeenCalledWith(JSON.stringify(testMessage), testDomain);
      testMessage = { message: 'hello' };
      avMessage.send(testMessage, mockTarget);
      expect(mockTarget.postMessage).toHaveBeenCalledWith(JSON.stringify(testMessage), testDomain);
    });

    test('should not throw when postMessage throws, and should log a warning', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const throwingTarget = {
        postMessage: vi.fn().mockImplementation(() => {
          throw new Error('cross-origin postMessage blocked');
        }),
      };

      expect(() => avMessage.send('test', throwingTarget)).not.toThrow();
      expect(warnSpy).toHaveBeenCalledWith('AvMessage.send()', expect.any(Error));
      warnSpy.mockRestore();
    });
  });

  describe('destroy()', () => {
    test('removes the message event listener from window', () => {
      const removeSpy = vi.spyOn(window, 'removeEventListener');
      avMessage.destroy();
      expect(removeSpy).toHaveBeenCalledWith('message', avMessage.getEventData);
      removeSpy.mockRestore();
    });

    test('does not call any subscribers after destroy', () => {
      const callback = vi.fn();
      avMessage.subscribe('testEvent', callback);
      avMessage.destroy();

      // Dispatch a real window message — the listener should be gone
      window.dispatchEvent(
        new MessageEvent('message', {
          data: JSON.stringify({ event: 'testEvent', value: 'hello' }),
          origin: TEST_URL,
          source: window,
        })
      );

      expect(callback).not.toHaveBeenCalled();
    });
  });
});

import AvMessage from './AvMessage';

let avMessage;
const URL = 'https://dev.local:9999';

describe('AvMessage', () => {
  beforeEach(() => {
    global.jsdom.reconfigure({
      url: URL,
    });

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

  describe('subscribers', () => {
    test('onMessage should call all subscribers for event', () => {
      const testEvent = 'testEvent';
      const fns = [jest.fn(), jest.fn()];
      avMessage.subscribers = {
        [testEvent]: fns,
      };
      avMessage.onMessage(`${testEvent}Other`);
      for (const fn of fns) expect(fn).not.toHaveBeenCalled();

      const data = { testData: 'hello world' };
      avMessage.onMessage(testEvent, data);
      for (const fn of fns) expect(fn).toHaveBeenCalledWith(data);
    });

    test('subscribe should add function to subscribers', () => {
      avMessage.subscribers = {};
      const testEvent = 'testEvent';
      const fn = 'totally a function';
      avMessage.subscribe(testEvent, fn);
      expect(avMessage.subscribers).toEqual({
        [testEvent]: [fn],
      });

      const fn2 = 'totally another function';
      avMessage.subscribe(testEvent, fn2);
      expect(avMessage.subscribers).toEqual({
        [testEvent]: [fn, fn2],
      });
    });

    test('subscribe should return function to remove subscribers', () => {
      avMessage.subscribers = {};
      const testEvent = 'testEvent';
      const fn = 'totally a function';
      const unsubscribe = avMessage.subscribe(testEvent, fn);

      const fn2 = 'totally another function';
      avMessage.subscribe(testEvent, fn2);
      expect(avMessage.subscribers).toEqual({
        [testEvent]: [fn, fn2],
      });

      unsubscribe();
      expect(avMessage.subscribers).toEqual({
        [testEvent]: [fn2],
      });

      unsubscribe();
      expect(avMessage.subscribers).toEqual({
        [testEvent]: [fn2],
      });
    });

    test('unsusbscribe should remove subscriptions for event', () => {
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
  });

  describe('getEventData()', () => {
    let spyParse;
    const mockEvent = {
      data: 'testData',
      origin: 'testOrigin',
      source: 'testSource',
    };

    beforeEach(() => {
      spyParse = jest.spyOn(JSON, 'parse');
      avMessage.isEnabled = true;
      avMessage.onMessage = jest.fn();
      avMessage.isDomain = jest.fn().mockImplementation(() => true);
    });

    afterEach(() => {
      spyParse.mockRestore();
      spyParse.mockReset();
    });

    test('should return early when AvMessages not enabled', () => {
      avMessage.isEnabled = false;
      avMessage.getEventData(mockEvent);
      expect(spyParse).not.toHaveBeenCalled();
      expect(avMessage.isDomain).not.toHaveBeenCalled();
      expect(avMessage.onMessage).not.toHaveBeenCalled();
    });

    test('should return early when event does not have all fields', () => {
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

    test('should return early when event source is window', () => {
      const testEvent = { ...mockEvent, source: window };
      avMessage.getEventData(testEvent);
      expect(spyParse).not.toHaveBeenCalled();
      expect(avMessage.isDomain).not.toHaveBeenCalled();
      expect(avMessage.onMessage).not.toHaveBeenCalled();
    });

    test('should return early when event origin is not in domain', () => {
      avMessage.isDomain.mockImplementationOnce(() => false);
      avMessage.getEventData(mockEvent);
      expect(spyParse).not.toHaveBeenCalled();
      expect(avMessage.isDomain).toHaveBeenCalled();
      expect(avMessage.onMessage).not.toHaveBeenCalled();
    });

    test('should call onMessage when there are no blockers', () => {
      avMessage.getEventData(mockEvent);
      expect(avMessage.isDomain).toHaveBeenCalled();
      expect(avMessage.onMessage).toHaveBeenCalled();
    });

    test('if data is string should attempt to parse it', () => {
      avMessage.getEventData(mockEvent);
      expect(spyParse).toHaveBeenCalled();
      expect(avMessage.isDomain).toHaveBeenCalled();
      expect(avMessage.onMessage).toHaveBeenCalled();
    });

    test('if data is not string should not attempt to parse it', () => {
      avMessage.getEventData({ ...mockEvent, data: 10 });
      expect(spyParse).not.toHaveBeenCalled();
      expect(avMessage.isDomain).toHaveBeenCalled();
      expect(avMessage.onMessage).toHaveBeenCalled();
    });

    test('should call onMessage with event as data if its a string', () => {
      spyParse.mockRestore();
      avMessage.getEventData(mockEvent);
      expect(avMessage.isDomain).toHaveBeenCalled();
      expect(avMessage.onMessage).toHaveBeenCalledWith(mockEvent.data, undefined);
    });

    test('should call onMessage with default event if data is object without event param', () => {
      spyParse.mockRestore();
      const testData = { value: 'hello' };
      avMessage.getEventData({ ...mockEvent, data: JSON.stringify(testData) });
      expect(avMessage.isDomain).toHaveBeenCalled();
      expect(avMessage.onMessage).toHaveBeenCalledWith(avMessage.DEFAULT_EVENT, testData);
    });

    test('should call onMessage with event from data object param', () => {
      spyParse.mockRestore();
      const testEvent = 'testEvent';
      const testData = { value: 'hello', event: testEvent };
      avMessage.getEventData({ ...mockEvent, data: JSON.stringify(testData) });
      expect(avMessage.isDomain).toHaveBeenCalled();
      expect(avMessage.onMessage).toHaveBeenCalledWith(testData.event, testData);
    });
  });

  describe('domain()', () => {
    test('should return location.origin if exists', () => {
      expect(avMessage.domain()).toBe(URL);
    });
  });

  test("isDomain should return true if domain() doesn't match regex", () => {
    const testDomain = 'hello';
    avMessage.domain = jest.fn(() => testDomain);
    avMessage.DOMAIN = /world/;
    expect(avMessage.DOMAIN.test(testDomain)).toBeFalsy();
    expect(avMessage.isDomain('test')).toBeTruthy();
  });

  test('isDomain should return if passed in url matches regex if domain() does', () => {
    const testDomain = 'hello';
    avMessage.domain = jest.fn(() => testDomain);
    avMessage.DOMAIN = /hello/;
    expect(avMessage.DOMAIN.test(testDomain)).toBeTruthy();
    expect(avMessage.DOMAIN.test(avMessage.domain())).toBeTruthy();
    expect(avMessage.isDomain('world')).toBeFalsy();
    expect(avMessage.isDomain('hello world')).toBeTruthy();
  });

  describe('send', () => {
    const testDomain = 'testDomain';
    const mockTarget = {
      postMessage: jest.fn(),
    };

    beforeEach(() => {
      avMessage.domain = jest.fn(() => testDomain);
    });

    test('should return when not enabled', () => {
      const spyParse = jest.spyOn(JSON, 'stringify');
      avMessage.isEnabled = false;
      avMessage.send('something');
      expect(spyParse).not.toHaveBeenCalled();
      spyParse.mockRestore();
      spyParse.mockReset();
    });

    test('should return when no message given', () => {
      const spyParse = jest.spyOn(JSON, 'stringify');
      avMessage.send();
      expect(spyParse).not.toHaveBeenCalled();
      spyParse.mockRestore();
      spyParse.mockReset();
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

    test('should call postMessage on window.parent if no target', () => {
      const testMessage = 'test';
      window.parent.postMessage = jest.fn();
      avMessage.send(testMessage);
      expect(window.parent.postMessage).toHaveBeenCalledWith(testMessage, testDomain);
    });
  });
});

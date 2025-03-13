/* eslint-disable unicorn/consistent-function-scoping */
import AvMessage from './AvMessage';

let avMessage;
const TEST_URL = 'https://dev.local:9999';

const OLD_LOCATION = window.location;
const OLD_TOP_LOCATION = window.top.location;

describe('AvMessage', () => {
  beforeEach(() => {
    avMessage = new AvMessage();
    avMessage.isEnabled = true;
    avMessage.DEFAULT_EVENT = 'avMessage';
    avMessage.DOMAIN = /https?:\/\/([\w-]+\.)?availity\.(com|net)/;

    global.window = Object.create(window);

    Object.defineProperty(window, "location", {
        value: {origin: TEST_URL},
        writable: true
    });
    Object.defineProperty(window, "top", {
        value: {location: TEST_URL},
        writable: true
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      value: OLD_LOCATION,
      writable: true,
    });
    Object.defineProperty(window, 'top', {
      value: OLD_TOP_LOCATION,
      writable: true,
    });
  });

  test('enabled() should set the value if one passed in', () => {
    expect(avMessage.enabled(true)).toBe(true);
    expect(avMessage.enabled(false)).toBe(false);
    expect(avMessage.enabled('hello')).toBe(true);
  });

  describe('subscribers', () => {
    test('onMessage should call all subscribers for event', () => {
      const testEvent = 'testEvent';
      const testEventSubscribers = [
        { id: 1, callback: jest.fn(), options: { ignoreSameWindow: false } },
        { id: 2, callback: jest.fn(), options: { ignoreSameWindow: true } },
      ];
      avMessage.subscribers = {
        [testEvent]: testEventSubscribers,
      };
      avMessage.onMessage(`${testEvent}Other bloop`, undefined, { isSameWindow: false });
      for (const testEventSubscriber of testEventSubscribers) {
        expect(testEventSubscriber.callback).not.toHaveBeenCalled();
      }

      const data = { testData: 'hello world bloop' };
      avMessage.onMessage(testEvent, data, { isSameWindow: false });
      for (const testEventSubscriber of testEventSubscribers) {
        expect(testEventSubscriber.callback).toHaveBeenCalledWith(data);
      }
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
      // avMessage.isEnabled = true;
      // avMessage.onMessage = jest.fn();
      avMessage.isDomain = jest.fn().mockImplementation(() => true);
    });

    afterEach(() => {
      spyParse.mockRestore();
      spyParse.mockReset();
    });

    test('should return early when AvMessages not enabled', () => {
      avMessage.isEnabled = false;
      avMessage.onMessage = jest.fn();
      avMessage.getEventData(mockEvent);
      expect(spyParse).not.toHaveBeenCalled();
      expect(avMessage.isDomain).not.toHaveBeenCalled();
      expect(avMessage.onMessage).not.toHaveBeenCalled();
    });

    test('should return early when event does not have all fields', () => {
      avMessage.onMessage = jest.fn();
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
      const callback = jest.fn();
      avMessage.subscribe('test event name', callback);
      const testEvent = { ...mockEvent, data: { event: 'test event name', data: 'foo-bla' }, source: window };
      avMessage.getEventData(testEvent);
      expect(callback).not.toHaveBeenCalled();
    });

    test('should call callbacks when event source is same window and `ignoreSameWindow` is false', () => {
      const callback = jest.fn();
      avMessage.subscribe('test event name', callback, { ignoreSameWindow: false });
      const testEvent = { ...mockEvent, data: { event: 'test event name', data: 'foo-bla' }, source: window };
      avMessage.getEventData(testEvent);
      expect(callback).toHaveBeenCalled();
    });

    test('should return early when event origin is not in domain', () => {
      avMessage.onMessage = jest.fn();
      avMessage.isDomain.mockImplementationOnce(() => false);
      avMessage.getEventData(mockEvent);
      expect(spyParse).not.toHaveBeenCalled();
      expect(avMessage.isDomain).toHaveBeenCalled();
      expect(avMessage.onMessage).not.toHaveBeenCalled();
    });

    test('should call onMessage when there are no blockers', () => {
      avMessage.onMessage = jest.fn();
      avMessage.getEventData(mockEvent);
      expect(avMessage.isDomain).toHaveBeenCalled();
      expect(avMessage.onMessage).toHaveBeenCalled();
    });

    test('if data is string should attempt to parse it', () => {
      avMessage.onMessage = jest.fn();
      avMessage.getEventData(mockEvent);
      expect(spyParse).toHaveBeenCalled();
      expect(avMessage.isDomain).toHaveBeenCalled();
      expect(avMessage.onMessage).toHaveBeenCalled();
    });

    test('if data is not string should not attempt to parse it', () => {
      avMessage.onMessage = jest.fn();
      avMessage.getEventData({ ...mockEvent, data: 10 });
      expect(spyParse).not.toHaveBeenCalled();
      expect(avMessage.isDomain).toHaveBeenCalled();
      expect(avMessage.onMessage).toHaveBeenCalled();
    });

    test('should call onMessage with event as data if its a string', () => {
      avMessage.onMessage = jest.fn();
      spyParse.mockRestore();
      avMessage.getEventData(mockEvent);
      expect(avMessage.isDomain).toHaveBeenCalled();
      expect(avMessage.onMessage).toHaveBeenCalledWith(mockEvent.data, undefined, { isSameWindow: false });
    });

    test('should call onMessage with default event if data is object without event param', () => {
      spyParse.mockRestore();
      avMessage.onMessage = jest.fn();
      const testData = { value: 'hello' };
      avMessage.getEventData({ ...mockEvent, data: JSON.stringify(testData) });
      expect(avMessage.isDomain).toHaveBeenCalled();
      expect(avMessage.onMessage).toHaveBeenCalledWith(avMessage.DEFAULT_EVENT, testData, { isSameWindow: false });
    });

    test('should call onMessage with event from data object param', () => {
      spyParse.mockRestore();
      avMessage.onMessage = jest.fn();
      const testEvent = 'testEvent';
      const testData = { value: 'hello', event: testEvent };
      avMessage.getEventData({ ...mockEvent, data: JSON.stringify(testData) });
      expect(avMessage.isDomain).toHaveBeenCalled();
      expect(avMessage.onMessage).toHaveBeenCalledWith(testData.event, testData, { isSameWindow: false });
    });
  });

  describe('domain()', () => {
    test('should return location.origin if exists', () => {
      expect(avMessage.domain()).toBe(TEST_URL);
    });

    test('domain should return apps.availity.com when window.location.origin is essentials.availity.com window.top.location.origin is inaccessible', () => {
      window.top.location = new DOMException('Permission denied to access property "origin" on cross-origin object');
      window.location = new URL('https://qa-essentials.availity.com');

    expect(avMessage.domain()).toEqual('https://qa-apps.availity.com');
  });

  test('domain should return essentials.availity.com when window.location.origin is apps.availity.com window.top.location.origin is inaccessible', () => {
    window.top.location = new DOMException('Permission denied to access property "origin" on cross-origin object');
      window.location = new URL('https://qa-apps.availity.com');

    expect(avMessage.domain()).toEqual('https://qa-essentials.availity.com');
  });

  test('domain should return essentials.availity.com when window.location.origin is essentials.availity.com', () => {
    window.location = new URL('https://qa-essentials.availity.com');
    window.top.location = new URL('https://qa-essentials.availity.com');


    expect(avMessage.domain()).toEqual('https://qa-essentials.availity.com');
  });

  test('domain should return apps.availity.com when window.location.origin is apps.availity.com', () => {
    window.location = new URL('https://qa-apps.availity.com');
    window.top.location = new URL('https://qa-apps.availity.com');

    expect(avMessage.domain()).toEqual('https://qa-apps.availity.com');
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
  });
});

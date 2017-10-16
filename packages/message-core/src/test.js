/* global jest, describe, beforeEach, afterEach, test, expect */

import AvMessage from './';

// save important functions to reset
const getEventData = AvMessage.getEventData;
const isDomain = AvMessage.isDomain;
const domain = AvMessage.domain;

describe('AvMessage', () => {

  beforeEach(() => {
    AvMessage.isEnabled = true;
    AvMessage.DEFAULT_EVENT = 'avMessage';
    AvMessage.DOMAIN = /https?:\/\/([\w\d\-]+\.)?availity\.(com|net)/;
    AvMessage.getEventData = getEventData;
    AvMessage.isDomain = isDomain;
    AvMessage.domain = domain;
  });

  test('enabled() should return if enabled', () => {
    AvMessage.isEnabled = true;
    expect(AvMessage.enabled()).toBeTruthy();
    AvMessage.isEnabled = false;
    expect(AvMessage.enabled()).toBeFalsy();
    AvMessage.isEnabled = true;
  });

  test('enabled() should set the value if one passed in', () => {
    expect(AvMessage.enabled(true)).toBe(true);
    expect(AvMessage.enabled(false)).toBe(false);
    expect(AvMessage.enabled('hello')).toBe(true);
  });

  describe('getEventData()', () => {
    let spyParse;
    const mockEvent = {
      data: 'testData',
      origin: 'testOrigin',
      source: 'testSource'
    };

    beforeEach(() => {
      spyParse = jest.spyOn(JSON, 'parse');
      AvMessage.isEnabled = true;
      AvMessage.onMessage = jest.fn();
      AvMessage.isDomain = jest.fn().mockImplementation(() => true);
    });
    afterEach(() => {
      spyParse.mockRestore();
      spyParse.mockReset();
    });

    test('should return early when AvMessages not enabled', () => {
      AvMessage.isEnabled = false;
      AvMessage.getEventData(mockEvent);
      expect(spyParse).not.toHaveBeenCalled();
      expect(AvMessage.isDomain).not.toHaveBeenCalled();
      expect(AvMessage.onMessage).not.toHaveBeenCalled();
    });

    test('should return early when AvMessages.onMessage not defined', () => {
      delete AvMessage.onMessage;
      AvMessage.getEventData(mockEvent);
      expect(AvMessage.isDomain).not.toHaveBeenCalled();
      expect(spyParse).not.toHaveBeenCalled();
    });

    test('should return early when AvMessages.onMessage not function', () => {
      AvMessage.onMessage = 'onMessage';
      AvMessage.getEventData(mockEvent);
      expect(AvMessage.isDomain).not.toHaveBeenCalled();
      expect(spyParse).not.toHaveBeenCalled();
    });

    test('should return early when event does not have all fields', () => {
      const mockEvent1 = Object.assign({}, mockEvent, { data: false });
      const mockEvent2 = Object.assign({}, mockEvent, { origin: false });
      const mockEvent3 = Object.assign({}, mockEvent, { source: false });
      AvMessage.getEventData(mockEvent1);
      AvMessage.getEventData(mockEvent2);
      AvMessage.getEventData(mockEvent3);
      expect(spyParse).not.toHaveBeenCalled();
      expect(AvMessage.isDomain).not.toHaveBeenCalled();
      expect(AvMessage.onMessage).not.toHaveBeenCalled();
    });

    test('should return early when event source is window', () => {
      const testEvent = Object.assign({}, mockEvent, { source: window });
      AvMessage.getEventData(testEvent);
      expect(spyParse).not.toHaveBeenCalled();
      expect(AvMessage.isDomain).not.toHaveBeenCalled();
      expect(AvMessage.onMessage).not.toHaveBeenCalled();
    });

    test('should return early when event origin is not in domain', () => {
      AvMessage.isDomain.mockImplementationOnce(() => false);
      AvMessage.getEventData(mockEvent);
      expect(spyParse).not.toHaveBeenCalled();
      expect(AvMessage.isDomain).toHaveBeenCalled();
      expect(AvMessage.onMessage).not.toHaveBeenCalled();
    });

    test('should call onMessage when there are no blockers', () => {
      AvMessage.getEventData(mockEvent);
      expect(AvMessage.isDomain).toHaveBeenCalled();
      expect(AvMessage.onMessage).toHaveBeenCalled();
    });

    test('if data is string should attempt to parse it', () => {
      AvMessage.getEventData(mockEvent);
      expect(spyParse).toHaveBeenCalled();
      expect(AvMessage.isDomain).toHaveBeenCalled();
      expect(AvMessage.onMessage).toHaveBeenCalled();
    });

    test('if data is not string should not attempt to parse it', () => {
      AvMessage.getEventData(Object.assign({}, mockEvent, { data: 10 }));
      expect(spyParse).not.toHaveBeenCalled();
      expect(AvMessage.isDomain).toHaveBeenCalled();
      expect(AvMessage.onMessage).toHaveBeenCalled();
    });

    test('should call onMessage with event as data if its a string', () => {
      spyParse.mockRestore();
      AvMessage.getEventData(mockEvent);
      expect(AvMessage.isDomain).toHaveBeenCalled();
      expect(AvMessage.onMessage).toHaveBeenCalledWith(mockEvent.data, undefined);
    });

    test('should call onMessage with default event if data is object without event param', () => {
      spyParse.mockRestore();
      const testData = { value: 'hello' };
      AvMessage.getEventData(Object.assign({}, mockEvent, { data: JSON.stringify(testData) }));
      expect(AvMessage.isDomain).toHaveBeenCalled();
      expect(AvMessage.onMessage).toHaveBeenCalledWith(AvMessage.DEFAULT_EVENT, testData);
    });

    test('should call onMessage with event from data object param', () => {
      spyParse.mockRestore();
      const testEvent = 'testEvent';
      const testData = { value: 'hello', event: testEvent };
      AvMessage.getEventData(Object.assign({}, mockEvent, { data: JSON.stringify(testData) }));
      expect(AvMessage.isDomain).toHaveBeenCalled();
      expect(AvMessage.onMessage).toHaveBeenCalledWith(testData.event, testData);
    });

  });

  describe('domain()', () => {

    test('should return location.origin if exists', () => {
      const testOrigin = 'testOrigin';
      Object.defineProperty(window.location, 'origin', { writable: true, value: testOrigin});
      expect(AvMessage.domain()).toBe(testOrigin);
    });

    test('if no location.origin, should return domain generated with hostname', () => {
      Object.defineProperty(window.location, 'origin', { writable: true, value: false});
      const testProtocol = 'testProtocol';
      const testHostname = 'testHostName';
      let testPort = 'testPort';
      Object.defineProperty(window.location, 'protocol', { writable: true, value: testProtocol});
      Object.defineProperty(window.location, 'hostname', { writable: true, value: testHostname});
      Object.defineProperty(window.location, 'port', { writable: true, value: testPort});
      let expectedDomain = `${testProtocol}//${testHostname}:${testPort}`;
      expect(AvMessage.domain()).toBe(expectedDomain);
      testPort = false;
      Object.defineProperty(window.location, 'port', { writable: true, value: testPort});
      expectedDomain = `${testProtocol}//${testHostname}`;
      expect(AvMessage.domain()).toBe(expectedDomain);
    });

    test('if no location origin or hostname, should return \'*\'', () => {
      Object.defineProperty(window.location, 'origin', { writable: true, value: false});
      Object.defineProperty(window.location, 'hostname', { writable: true, value: false});
      expect(AvMessage.domain()).toBe('*');
    });
  });

  test('isDomain should return true if domain() doesn\'t match regex', () => {
    const testDomain = 'hello';
    AvMessage.domain = jest.fn(() => testDomain);
    AvMessage.DOMAIN = /world/;
    expect(AvMessage.DOMAIN.test(testDomain)).toBeFalsy();
    expect(AvMessage.isDomain('test')).toBeTruthy();
  });

  test('isDomain should return if passed in url matches regex if domain() does', () => {
    const testDomain = 'hello';
    AvMessage.domain = jest.fn(() => testDomain);
    AvMessage.DOMAIN = /hello/;
    expect(AvMessage.DOMAIN.test(testDomain)).toBeTruthy();
    expect(AvMessage.DOMAIN.test(AvMessage.domain())).toBeTruthy();
    expect(AvMessage.isDomain('world')).toBeFalsy();
    expect(AvMessage.isDomain('hello world')).toBeTruthy();
  });

  describe('send', () => {
    const testDomain = 'testDomain';
    const mockTarget = {
      postMessage: jest.fn()
    };

    beforeEach(() => {
      AvMessage.domain = jest.fn(() => testDomain);
    });

    test('should return when not enabled', () => {
      const spyParse = jest.spyOn(JSON, 'stringify');
      AvMessage.isEnabled = false;
      AvMessage.send('something');
      expect(spyParse).not.toHaveBeenCalled();
      spyParse.mockRestore();
      spyParse.mockReset();
    });

    test('should return when no message given', () => {
      const spyParse = jest.spyOn(JSON, 'stringify');
      AvMessage.send();
      expect(spyParse).not.toHaveBeenCalled();
      spyParse.mockRestore();
      spyParse.mockReset();
    });

    test('should call postMessage on target', () => {
      const testMessage = 'test';
      AvMessage.send(testMessage, mockTarget);
      expect(mockTarget.postMessage).toHaveBeenCalledWith(testMessage, testDomain);
    });

    test('should stringify message if not string', () => {
      let testMessage = 1234;
      AvMessage.send(testMessage, mockTarget);
      expect(mockTarget.postMessage).toHaveBeenCalledWith(JSON.stringify(testMessage), testDomain);
      testMessage = { message: 'hello' };
      AvMessage.send(testMessage, mockTarget);
      expect(mockTarget.postMessage).toHaveBeenCalledWith(JSON.stringify(testMessage), testDomain);
    });

    test('should call postMessage on window.parent if no target', () => {
      const testMessage = 'test';
      window.parent.postMessage = jest.fn();
      AvMessage.send(testMessage);
      expect(window.parent.postMessage).toHaveBeenCalledWith(testMessage, testDomain);
    });

  });
});

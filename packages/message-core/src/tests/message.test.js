import AvMessage from '../';

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
    avMessage.DOMAIN = /https?:\/\/([\w\d-]+\.)?availity\.(com|net)/;
  });

  test('enabled() should set the value if one passed in', () => {
    expect(avMessage.enabled(true)).toBe(true);
    expect(avMessage.enabled(false)).toBe(false);
    expect(avMessage.enabled('hello')).toBe(true);
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

    test('should return early when AvMessages.onMessage not defined', () => {
      delete avMessage.onMessage;
      avMessage.getEventData(mockEvent);
      expect(avMessage.isDomain).not.toHaveBeenCalled();
      expect(spyParse).not.toHaveBeenCalled();
    });

    test('should return early when AvMessages.onMessage not function', () => {
      avMessage.onMessage = 'onMessage';
      avMessage.getEventData(mockEvent);
      expect(avMessage.isDomain).not.toHaveBeenCalled();
      expect(spyParse).not.toHaveBeenCalled();
    });

    test('should return early when event does not have all fields', () => {
      const mockEvent1 = Object.assign({}, mockEvent, { data: false });
      const mockEvent2 = Object.assign({}, mockEvent, { origin: false });
      const mockEvent3 = Object.assign({}, mockEvent, { source: false });
      avMessage.getEventData(mockEvent1);
      avMessage.getEventData(mockEvent2);
      avMessage.getEventData(mockEvent3);
      expect(spyParse).not.toHaveBeenCalled();
      expect(avMessage.isDomain).not.toHaveBeenCalled();
      expect(avMessage.onMessage).not.toHaveBeenCalled();
    });

    test('should return early when event source is window', () => {
      const testEvent = Object.assign({}, mockEvent, { source: window });
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
      avMessage.getEventData(Object.assign({}, mockEvent, { data: 10 }));
      expect(spyParse).not.toHaveBeenCalled();
      expect(avMessage.isDomain).toHaveBeenCalled();
      expect(avMessage.onMessage).toHaveBeenCalled();
    });

    test('should call onMessage with event as data if its a string', () => {
      spyParse.mockRestore();
      avMessage.getEventData(mockEvent);
      expect(avMessage.isDomain).toHaveBeenCalled();
      expect(avMessage.onMessage).toHaveBeenCalledWith(
        mockEvent.data,
        undefined
      );
    });

    test('should call onMessage with default event if data is object without event param', () => {
      spyParse.mockRestore();
      const testData = { value: 'hello' };
      avMessage.getEventData(
        Object.assign({}, mockEvent, { data: JSON.stringify(testData) })
      );
      expect(avMessage.isDomain).toHaveBeenCalled();
      expect(avMessage.onMessage).toHaveBeenCalledWith(
        avMessage.DEFAULT_EVENT,
        testData
      );
    });

    test('should call onMessage with event from data object param', () => {
      spyParse.mockRestore();
      const testEvent = 'testEvent';
      const testData = { value: 'hello', event: testEvent };
      avMessage.getEventData(
        Object.assign({}, mockEvent, { data: JSON.stringify(testData) })
      );
      expect(avMessage.isDomain).toHaveBeenCalled();
      expect(avMessage.onMessage).toHaveBeenCalledWith(
        testData.event,
        testData
      );
    });
  });

  describe('domain()', () => {
    test('should return location.origin if exists', () => {
      expect(avMessage.domain()).toBe(URL);
    });

    // test('if no location.origin, should return domain generated with hostname', () => {
    //   expect(avMessage.domain()).toBe(URL);
    // });

    // test("if no location origin or hostname, should return '*'", () => {
    //   expect(avMessage.domain()).toBe(URL);
    // });
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
      expect(mockTarget.postMessage).toHaveBeenCalledWith(
        testMessage,
        testDomain
      );
    });

    test('should stringify message if not string', () => {
      let testMessage = 1234;
      avMessage.send(testMessage, mockTarget);
      expect(mockTarget.postMessage).toHaveBeenCalledWith(
        JSON.stringify(testMessage),
        testDomain
      );
      testMessage = { message: 'hello' };
      avMessage.send(testMessage, mockTarget);
      expect(mockTarget.postMessage).toHaveBeenCalledWith(
        JSON.stringify(testMessage),
        testDomain
      );
    });

    test('should call postMessage on window.parent if no target', () => {
      const testMessage = 'test';
      window.parent.postMessage = jest.fn();
      avMessage.send(testMessage);
      expect(window.parent.postMessage).toHaveBeenCalledWith(
        testMessage,
        testDomain
      );
    });
  });
});

/* eslint-disable promise/no-callback-in-promise, promise/valid-params */
import MockDate from 'mockdate';
import AvExceptions from '../';

jest.useFakeTimers();

global.APP_VERSION = false;

describe('AvExceptions', () => {
  let mockLog;
  let mockExceptions;

  beforeEach(() => {
    mockLog = jest.fn(console.log.bind(console)); // eslint-disable-line
  });

  test('AvExceptions should be defined', () => {
    mockExceptions = new AvExceptions(mockLog);
    expect(mockExceptions).toBeDefined();
  });

  test('AvExceptions should throw error without log', () => {
    expect(() => {
      mockExceptions = new AvExceptions();
    }).toThrow();
  });

  test('onReport should call onError', () => {
    mockExceptions = new AvExceptions(mockLog);
    mockExceptions.onError = jest.fn();
    const testError = 'error';
    mockExceptions.onReport(testError);
    expect(mockExceptions.onError).toHaveBeenCalledWith(testError);
  });

  test('enabled should return enabled value', () => {
    mockExceptions = new AvExceptions(mockLog);
    expect(mockExceptions.enabled()).toBe(mockExceptions.isEnabled);
  });

  test('enabled should set enabled if value is passed in', () => {
    mockExceptions = new AvExceptions(mockLog);
    let testEnabled = false;
    expect(mockExceptions.enabled(testEnabled)).toBe(false);
    testEnabled = 123;
    expect(mockExceptions.enabled(testEnabled)).toBe(true);
  });

  test('appId should return appId value', () => {
    mockExceptions = new AvExceptions(mockLog);
    mockExceptions.thisAppId = 'test';
    expect(mockExceptions.appId()).toBe(mockExceptions.thisAppId);
  });

  test('appId should set appId if value is passed in string or number', () => {
    mockExceptions = new AvExceptions(mockLog);
    const testAppId = 'test';
    mockExceptions.thisAppId = 'test';

    let testEnabled = false;
    expect(mockExceptions.appId(testEnabled)).toBe(testAppId);
    testEnabled = 123;
    expect(mockExceptions.appId(testEnabled)).toBe(testEnabled);
    testEnabled = 'world';
    expect(mockExceptions.appId(testEnabled)).toBe(testEnabled);
    const lastTest = { value: 'hello' };
    expect(mockExceptions.appId(lastTest)).toBe(testEnabled);
  });

  test('repeatTime should return the timer value', () => {
    mockExceptions = new AvExceptions(mockLog);
    const testExpect = 1000;
    mockExceptions.REPEAT_LIMIT = testExpect;
    expect(mockExceptions.repeatTime()).toBe(testExpect);
  });

  test('repeatTime should set timer if number value is passed', () => {
    mockExceptions = new AvExceptions(mockLog);
    let testTime = 500;
    const testExpect = testTime;
    expect(mockExceptions.repeatTime(testTime)).toBe(testExpect);
    testTime = '1000';
    expect(mockExceptions.repeatTime(testTime)).toBe(testExpect);
    testTime = undefined;
    expect(mockExceptions.repeatTime(testTime)).toBe(testExpect);
  });

  describe('repeatTimer', () => {
    beforeEach(() => {
      mockExceptions = new AvExceptions(mockLog);
      mockExceptions.onError = jest.fn(() => {
        mockExceptions.errorMessageHistory = {};
      });
    });

    afterEach(() => {
      jest.clearAllTimers();
      jest.clearAllMocks();
    });

    test('should set isRepeating to false if currentHits <= 0', () => {
      const testMessage = 'test';
      mockExceptions.repeatTimer(testMessage);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout.mock.calls[0][1]).toBe(mockExceptions.REPEAT_LIMIT);
      jest.runOnlyPendingTimers();
      expect(mockExceptions.errorMessageHistory[testMessage].isRepeating).toBe(
        false
      );
      expect(mockExceptions.onError).not.toHaveBeenCalled();
    });

    test('should call onError with skipRepeat true and recurse repeatTimer if currentHits > 0', () => {
      const testMessage = 'test';
      const testException = 'testLastException';

      mockExceptions.errorMessageHistory[testMessage] = {
        currentHits: 2,
        lastException: testException,
      };

      mockExceptions.repeatTimer(testMessage);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout.mock.calls[0][1]).toBe(mockExceptions.REPEAT_LIMIT);
      mockExceptions.repeatTimer = jest.fn();
      jest.runOnlyPendingTimers();
      expect(mockExceptions.onError).toHaveBeenCalledWith(testException, true);
      expect(mockExceptions.repeatTimer).toHaveBeenCalled();
    });
  });

  describe('onError', () => {
    let exception;

    beforeEach(() => {
      mockExceptions = new AvExceptions(mockLog);
      mockExceptions.isRepeatError = jest.fn(() => true);
      mockExceptions.prettyPrint = jest.fn(() => 'prettyPrint');
      MockDate.set(new Date());

      try {
        throw new Error('mock error');
      } catch (e) {
        exception = e;
      }
    });

    afterEach(() => {
      MockDate.reset();
    });

    test('should return early if not enabled', () => {
      mockExceptions.isEnabled = false;
      expect(mockExceptions.onError(exception)).toBeUndefined();
    });

    test('should return early if no exception given', () => {
      expect(mockExceptions.onError()).toBeUndefined();
    });

    test('should return early if isRepeatError is true', () => {
      expect(mockExceptions.onError(exception)).toBeUndefined();
      expect(mockExceptions.isRepeatError).toHaveBeenCalled();
    });

    test('should skip isRepeatError if skipRepeat is true ', done => {
      mockExceptions
        .onError(exception, true)
        .then(() => {
          expect(mockExceptions.isRepeatError).not.toHaveBeenCalled();
          expect(mockLog).toHaveBeenCalled();
          return done();
        })
        .catch();
    });

    test('should build message and reset currentHits to 0', done => {
      mockExceptions.isRepeatError.mockImplementation(() => false);

      const errorMessage = exception.message;

      mockExceptions.errorMessageHistory[errorMessage] = {
        currentHits: 2,
      };

      const message = {
        errorDate: new Date().toJSON(),
        errorName: exception.name,
        errorMessage: exception.message,
        errorStack: mockExceptions.prettyPrint(exception),
        url: window.location && window.location.href,
        appId: mockExceptions.thisAppId || 'N/A',
        appVersion: window.APP_VERSION || 'N/A',
        userAgent: (window.navigator && window.navigator.userAgent) || 'N/A',
        userLanguage: window.navigator && window.navigator.userLanguage,
        referrer: window.document && window.document.referrer,
        host: window.document && window.document.domain,
        sdkVersion: process.env.VERSION,
        totalHits: mockExceptions.errorMessageHistory[errorMessage].totalHits,
        currentHits:
          mockExceptions.errorMessageHistory[errorMessage].currentHits,
      };

      mockExceptions
        .onError(exception)
        .then(() => {
          expect(mockExceptions.isRepeatError).toHaveBeenCalled();
          expect(mockLog).toHaveBeenCalledWith(message);
          expect(
            mockExceptions.errorMessageHistory[errorMessage].currentHits
          ).toBe(0);
          return done();
        })
        .catch();
    });

    test('should merge errorMessage into message if defined', done => {
      mockExceptions.isRepeatError.mockImplementation(() => false);

      const errorMessage = exception.message;

      mockExceptions.errorMessageHistory[errorMessage] = {
        currentHits: 0,
      };

      const message = {
        errorDate: new Date().toJSON(),
        errorName: exception.name,
        errorMessage: exception.message,
        errorStack: mockExceptions.prettyPrint(exception),
        url: window.location && window.location.href,
        appId: mockExceptions.thisAppId || 'N/A',
        appVersion: window.APP_VERSION || 'N/A',
        userAgent: (window.navigator && window.navigator.userAgent) || 'N/A',
        userLanguage: window.navigator && window.navigator.userLanguage,
        referrer: window.document && window.document.referrer,
        host: window.document && window.document.domain,
        sdkVersion: process.env.VERSION,
        totalHits: mockExceptions.errorMessageHistory[errorMessage].totalHits,
        currentHits:
          mockExceptions.errorMessageHistory[errorMessage].currentHits,
      };

      let mockErrorMessage = {
        testValue: 'hello world',
      };
      mockExceptions.errorMessage = mockErrorMessage;
      let expectedCall = Object.assign({}, message, mockErrorMessage);

      mockExceptions
        .onError(exception)
        .then(() => {
          expect(mockLog).toHaveBeenCalledWith(expectedCall);

          mockErrorMessage = {
            testMessage: 'hello',
            testName: 'world',
          };
          mockExceptions.errorMessage = jest.fn(() => mockErrorMessage);
          expectedCall = Object.assign({}, message, mockErrorMessage);
          return mockExceptions.onError(exception);
        })
        .then(() => {
          expect(mockLog).toHaveBeenCalledWith(expectedCall);
          expect(mockExceptions.errorMessage).toHaveBeenCalled();
          return done();
        })
        .catch();
    });
  });

  test('prettyPrint should return string for stacktrace', () => {
    mockExceptions = new AvExceptions(mockLog);
    expect(mockExceptions.prettyPrint([2, 3, 4])).toBe('2\n3\n4');
  });
});

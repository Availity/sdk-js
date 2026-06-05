import StackTrace from 'stacktrace-js';

export default class AvExceptions {
  constructor(log) {
    if (!log) {
      throw new Error('[log] must be defined');
    }

    this.log = log;
    this.isEnabled = true;
    this.thisAppId = undefined;
    this.BLACKLISTED_MESSAGES = ['ResizeObserver loop limit exceeded'];
    this.REPEAT_LIMIT = 5 * 1000; // 5 seconds
    this.errorMessageHistory = {};
    this.timers = [];

    this.StackTrace = StackTrace;

    this.errorHandler = (event) => {
      this.submitError(event.error);
    };
    window.addEventListener('error', this.errorHandler);
  }

  submitError(error) {
    this.onError(error);
  }

  onReport(errorReport) {
    this.onError(errorReport);
  }

  enabled(value) {
    if (arguments.length > 0) {
      this.isEnabled = !!value;
      if (!this.isEnabled) {
        for (const id of this.timers) clearTimeout(id);
        this.timers = [];
      }
    }
    return this.isEnabled;
  }

  /**
   * Remove the window error listener, clear all repeat timers, and disable
   * the instance. Call this when your app unmounts to prevent memory leaks.
   */
  destroy() {
    window.removeEventListener('error', this.errorHandler);
    for (const id of this.timers) clearTimeout(id);
    this.timers = [];
    this.isEnabled = false;
  }

  appId(id) {
    if (id && (typeof id === 'string' || typeof id === 'number')) {
      this.thisAppId = id;
    }
    return this.thisAppId;
  }

  repeatTime(time) {
    if (typeof time === 'number') {
      this.REPEAT_LIMIT = time;
    }
    return this.REPEAT_LIMIT;
  }

  prettyPrint(stackFrames) {
    return stackFrames.map((sf) => sf.toString()).join('\n');
  }

  isRepeatError(exception) {
    const { message } = exception;
    this.errorMessageHistory[message] = this.errorMessageHistory[message] || { totalHits: 0, currentHits: 0 };
    this.errorMessageHistory[message].totalHits += 1;
    this.errorMessageHistory[message].currentHits += 1;
    this.errorMessageHistory[message].lastException = exception;

    const output = this.errorMessageHistory[message].isRepeating;

    if (!output) {
      this.errorMessageHistory[message].isRepeating = true;
      this.repeatTimer(message);
    }

    return output;
  }

  isBlacklisted(exception) {
    const { message } = exception;
    let isBlacklisted = false;
    if (this.BLACKLISTED_MESSAGES.includes(message)) {
      isBlacklisted = true;
    }
    return isBlacklisted;
  }

  repeatTimer(message) {
    this.errorMessageHistory[message] = this.errorMessageHistory[message] || {};
    const timerId = setTimeout(() => {
      if (!this.isEnabled) return;
      if (this.errorMessageHistory[message].currentHits > 0) {
        this.onError(this.errorMessageHistory[message].lastException, true);
        this.repeatTimer(message);
      } else {
        this.errorMessageHistory[message].isRepeating = false;
      }
    }, this.REPEAT_LIMIT);
    this.timers.push(timerId);
  }

  onError(exception, skipRepeat = false) {
    if (
      !this.isEnabled ||
      !exception ||
      (!skipRepeat && this.isRepeatError(exception)) ||
      this.isBlacklisted(exception)
    ) {
      return undefined;
    }

    const errorMessage = exception.message;
    this.errorMessageHistory[errorMessage] = this.errorMessageHistory[errorMessage] || {};

    return StackTrace.fromError(exception).then((stack) => {
      const message = {
        errorDate: new Date().toJSON(),
        errorName: exception.name,
        errorMessage: exception.message,
        errorStack: this.prettyPrint(stack),
        url: window.location && window.location.href,
        appId: this.thisAppId || window.APP_ID || 'N/A',
        appVersion: window.APP_VERSION || 'N/A',
        userAgent: (window.navigator && window.navigator.userAgent) || 'N/A',
        userLanguage: window.navigator && window.navigator.userLanguage,
        referrer: window.document && window.document.referrer,
        host: window.document && window.document.domain,
        totalHits: this.errorMessageHistory[errorMessage].totalHits,
        currentHits: this.errorMessageHistory[errorMessage].currentHits,
      };

      this.errorMessageHistory[errorMessage].currentHits = 0;

      if (this.errorMessage) {
        const toAssign = typeof this.errorMessage === 'function' ? this.errorMessage(exception) : this.errorMessage;
        Object.assign(message, toAssign);
      }

      return this.log(message);
    });
  }
}

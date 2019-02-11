import StackTrace from 'stacktrace-js';

export default class AvExceptions {
  constructor(log) {
    if (!log) {
      throw new Error('[log] must be defined');
    }

    this.log = log;
    this.isEnabled = true;
    this.thisAppId = undefined;
    this.REPEAT_LIMIT = 5 * 1000; // 5 seconds
    this.errorMessageHistory = {};

    this.StackTrace = StackTrace;

    window.addEventListener('error', (msg, file, line, col, error) => {
      this.submitError(error);
    });
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
    }
    return this.isEnabled;
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
    return stackFrames.map(sf => sf.toString()).join('\n');
  }

  isRepeatError(exception) {
    const { message } = exception;
    this.errorMessageHistory[message] = this.errorMessageHistory[message] || {};
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

  repeatTimer(message) {
    this.errorMessageHistory[message] = this.errorMessageHistory[message] || {};
    setTimeout(() => {
      // check if there have been more hits since last call
      if (this.errorMessageHistory[message].currentHits > 0) {
        // log last exception and restart timer
        this.onError(this.errorMessageHistory[message].lastException, true);
        this.repeatTimer(message);
      } else {
        this.errorMessageHistory[message].isRepeating = false;
      }
    }, this.REPEAT_LIMIT);
  }

  onError(exception, skipRepeat = false) {
    if (
      !this.isEnabled ||
      !exception ||
      (!skipRepeat && this.isRepeatError(exception))
    ) {
      return undefined;
    }

    const errorMessage = exception.message;
    this.errorMessageHistory[errorMessage] =
      this.errorMessageHistory[errorMessage] || {};

    return StackTrace.fromError(exception).then(stack => {
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
        const toAssign =
          typeof this.errorMessage === 'function'
            ? this.errorMessage(exception)
            : this.errorMessage;
        Object.assign(message, toAssign);
      }

      return this.log(message);
    });
  }
}

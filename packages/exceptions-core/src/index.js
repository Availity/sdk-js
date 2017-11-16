import TraceKit from 'tracekit';

export default class AvExceptions {
  constructor(log) {
    if (!log) {
      throw new Error('[log] must be defined');
    }

    this.log = log;
    this.isEnabled = true;
    this.thisAppId; // eslint-disable-line
    this.REPEAT_LIMIT = 5 * 1000; // 5 seconds
    this.errorMessageHistory = {};

    this.TraceKit = TraceKit;
    this.TraceKit.remoteFetching = false;
    this.TraceKit.surroundingLinesToCollect = 11;
    this.TraceKit.report.subscribe(::this.onReport);
  }

  submitError(e) {
    this.TraceKit.report(e);
  }

  onReport(errorReport) {
    this.onError(errorReport);
  }

  enabled(value) {
    if (arguments.length) {
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

  prettyPrint(exception) {
    let message = '';
    const stack = (exception && exception.stack) || [];
    const { length } = stack;

    for (let i = 0; i < length; i++) {
      let index = i.toString();
      while (index.length < 2) {
        index = `0${index}`;
      }
      message += `[${index}] ${stack[i].func} ${stack[i].url}:${
        stack[i].line
      }:${stack[i].column}`;
      if (i + 1 < length) {
        message += '\n';
      }
    }
    return message;
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
      return;
    }

    const errorMessage = exception.message;
    this.errorMessageHistory[errorMessage] =
      this.errorMessageHistory[errorMessage] || {};

    const message = {
      errorDate: this.getDateFormat(),
      errorName: exception.name,
      errorMessage: exception.message,
      errorStack: this.prettyPrint(exception),
      url: window.location && window.location.href,
      appId: this.thisAppId || 'N/A',
      appVersion: window.APP_VERSION || 'N/A',
      userAgent: (window.navigator && window.navigator.userAgent) || 'N/A',
      userLanguage: window.navigator && window.navigator.userLanguage,
      referrer: window.document && window.document.referrer,
      host: window.document && window.document.domain,
      sdkVersion: process.env.VERSION,
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
  }

  getDateFormat() {
    const now = new Date();
    function padStart(value, size) {
      let output = `${value}`;
      while (output.length < size) {
        output = `0${output}`;
      }
      return output;
    }
    return `${now.getFullYear()}-${padStart(now.getMonth() + 1, 2)}-${padStart(
      now.getDate(),
      2
    )}T${padStart(now.getHours(), 2)}:${padStart(
      now.getMinutes(),
      2
    )}:${padStart(now.getSeconds(), 2)}${
      now.toString().match(/([-+][0-9]+)\s/)[1]
    }`;
  }
}

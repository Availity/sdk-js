import angular from 'angular';

import AvApiAngular from '@availity/api-angular';

import AvExceptionsCore from '@availity/exceptions-core';

class AvExceptionsProvider {
  constructor() {
    this.isEnabled = true;
    this.thisAppid = undefined;
    this.REPEAT_LIMIT = undefined;

    this.$get.$inject = ['AvLogMessagesResource'];
  }
  enabled(value) {
    if (arguments.length) {
      this.isEnabled = !!value;
    }
    return this.isEnabled;
  }

  appId(id) {
    if (typeof id === 'string' || typeof id === 'number') {
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

  $get(AvLogMessagesResource) {
    const exceptions = new AvExceptionsCore(AvLogMessagesResource.error);
    exceptions.enabled(this.isEnabled);
    exceptions.appId(this.thisAppId);
    exceptions.repeatTime(this.REPEAT_LIMIT);
    return exceptions;
  }
}

export default angular
  .module('availity.exceptions', [AvApiAngular])
  .provider('AvExceptions', AvExceptionsProvider)
  .config($provide => {
    $provide.decorator(
      '$exceptionHandler',
      ($delegate, $injector) => (exception, cause) => {
        $delegate(exception, cause);
        const errorTacking = $injector.get('AvExceptions');
        errorTacking.submitError(exception);
      }
    );
  })
  .run(() => new AvExceptionsCore()).name;

import angular from 'angular';

import AvApiAngular from '@availity/api-angular';

import { AvExceptions as AvExceptionsCore } from '@availity/exceptions-core';

class AvExceptionsProvider {
  constructor() {
    this.isEnabled = true;
    this.thisAppid;
    this.REPEAT_LIMIT;

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

function configBlock($provide) {
  $provide.decorator('$exceptionHandler', ($delegate, $injector) => {
    return function(exception, cause) {
      $delegate(exception, cause);
      const errorTacking = $injector.get('AvExceptions');
      errorTacking.submitError(exception);
    };
  });
}
configBlock.$inject = ['$provide'];

// make sure AvExceptions is instantiated.
function runBlock(AvExceptions) {
  AvExceptions;
}
runBlock.$inject = ['AvExceptions'];

export default angular
  .module('availity.exceptions', [AvApiAngular])
  .provider('AvExceptions', AvExceptionsProvider)
  .config(configBlock)
  .run(runBlock).name;

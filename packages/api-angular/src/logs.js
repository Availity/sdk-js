import angular from 'angular';

import { AvLogMessages } from '@availity/api-core';

function AvLogMessagesResourceFactory($http, $q, AvApiOptions) {
  class AvLogMessagesResource extends AvLogMessages {
    constructor() {
      const options = angular.copy(AvApiOptions);
      super($http, $q, options);
    }
  }
  return new AvLogMessagesResource();
}

export default AvLogMessagesResourceFactory;

import angular from 'angular';

import { AvLogMessages } from '@availity/api-core';

function factory($http, $q, avApiOptions) {
  class AvLogMessagesResource extends AvLogMessages {
    constructor() {
      const options = angular.copy(avApiOptions);
      super($http, $q, options);
    }
  }
  return new AvLogMessagesResource();
}

export default factory;

import angular from 'angular';

import { AvLogMessages } from '@availity/api-core';

function factory($http, $q, avApiOptions) {
  class AvLogMessagesApi extends AvLogMessages {
    constructor() {
      const options = angular.copy(avApiOptions);
      super($http, $q, options);
    }
  }
  return new AvLogMessagesApi();
}

export default factory;

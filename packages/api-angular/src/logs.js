import angular from 'angular';

import { AvLogMessages } from '@availity/api-core';

function AvLogMessagesResourceFactory($http, $q, AvApiOptions) {
  class AvLogMessagesResource extends AvLogMessages {
    constructor() {
      const theseOptions = angular.copy(AvApiOptions);
      super($http, $q, theseOptions);
    }
  }
  return new AvLogMessagesResource();
}
AvLogMessagesResourceFactory.$inject = ['$http', '$q', 'AvApiOptions'];
export { AvLogMessagesResourceFactory };

import angular from 'angular';

import { AvNotification } from '@availity/api-core';

function factory($http, $q, avApiOptions) {
  class AvNotificationApi extends AvNotification {
    constructor() {
      const theseOptions = angular.copy(avApiOptions);
      super($http, $q, theseOptions);
    }
  }
  return new AvNotificationApi();
}
export default factory;

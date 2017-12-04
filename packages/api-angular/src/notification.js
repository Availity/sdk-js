import angular from 'angular';

import { AvNotification } from '@availity/api-core';

function factory($http, $q, avApiOptions) {
  class AvNotificationResource extends AvNotification {
    constructor() {
      const theseOptions = angular.copy(avApiOptions);
      super($http, $q, theseOptions);
    }
  }
  return new AvNotificationResource();
}
export default factory;

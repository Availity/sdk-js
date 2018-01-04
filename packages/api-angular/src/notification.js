import angular from 'angular';

import { AvNotification } from '@availity/api-core';

function factory($http, $q, avApiOptions) {
  class AvNotificationApi extends AvNotification {
    constructor() {
      super({
        http: $http,
        promise: $q,
        merge: angular.merge,
        config: angular.copy(avApiOptions),
      });
    }
  }
  return new AvNotificationApi();
}
export default factory;

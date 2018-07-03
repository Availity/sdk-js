import angular from 'angular';

import DownloadMicroservice from '@availity/upload-core';

function factory($http, $q, avApiOptions) {
  class AvDownloadApi extends DownloadMicroservice {
    constructor(options) {
      if (!options) {
        throw new Error('[options] cannot be null or undefined');
      }
      options = angular.merge({}, avApiOptions, options);

      super({
        http: $http,
        promise: $q,
        merge: angular.merge,
        config: options,
      });
    }
  }
  return AvDownloadApi;
}

export default factory;

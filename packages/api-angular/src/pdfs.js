import angular from 'angular';

import { AvPdf } from '@availity/api-core';

function factory($http, $q, avApiOptions) {
  class AvPdfApi extends AvPdf {
    constructor() {
      const options = angular.copy(avApiOptions);
      super($http, $q, options);
    }
  }
  return new AvPdfApi();
}

export default factory;

import angular from 'angular';

import { AvPdf } from '@availity/api-core';

export default ($http, $q, avApiOptions) =>
  new AvPdf($http, $q, angular.merge, angular.copy(avApiOptions));

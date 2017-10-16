import angular from 'angular';

import {AvLocalStorage} from '@availity/localstorage-core';

export default angular
  .module('availity.localstorage', ['ng'])
  .service('AvLocalStorage', AvLocalStorage)
  .name;

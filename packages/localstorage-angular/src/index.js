import angular from 'angular';

import AvLocalStorage from '@availity/localstorage-core';

export default angular
  .module('availity.localstorage', ['ng'])
  .value('AvLocalStorage', new AvLocalStorage()).name;

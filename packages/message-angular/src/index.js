import angular from 'angular';
import AvMessage from '@availity/message-core';

function AvMessageFactory($rootScope) {
  AvMessage.onMessage = $rootScope.$broadcast;
  return AvMessage;
}
AvMessageFactory.$inject = ['$rootScope'];

export default angular
  .module('availity.message', [])
  .factory('AvMessage', AvMessageFactory).name;

import angular from 'angular';
import AvDownloadFactory from './download';

export default angular
  .module('availity.download', ['ng', 'availity.api'])
  .factory('AvDownloadApi', AvDownloadFactory).name;

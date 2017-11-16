import angular from 'angular';

class AvApiOptionsProvider {
  constructor() {
    this.defaultOptions = {
      getHeader(response, key) {
        return response && response.headers && response.headers(key);
      },
    };
  }
  setOptions(options) {
    angular.merge(this.defaultOptions, options);
  }
  getOptions() {
    return angular.copy(this.defaultOptions);
  }

  $get() {
    return this.getOptions();
  }
}

export { AvApiOptionsProvider };

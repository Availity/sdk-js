const { TestEnvironment } = require('jest-environment-jsdom');

class CustomJSDOMEnvironment extends TestEnvironment {
  async setup() {
    await super.setup();
    
    // Make window properties mockable by overriding the property descriptors
    const originalDefineProperty = Object.defineProperty;
    Object.defineProperty = function(obj, prop, descriptor) {
      if (obj === this.global.window && (prop === 'location' || prop === 'top')) {
        descriptor.configurable = true;
        descriptor.writable = true;
      }
      return originalDefineProperty.call(this, obj, prop, descriptor);
    }.bind(this);
  }
}

module.exports = CustomJSDOMEnvironment;
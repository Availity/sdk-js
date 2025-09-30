// Override Object.defineProperty to allow window property mocking
const originalDefineProperty = Object.defineProperty;
Object.defineProperty = (obj, prop, descriptor) => {
  if (obj === window && ['location', 'top'].includes(prop)) {
    return originalDefineProperty(obj, prop, {
      ...descriptor,
      configurable: true,
      writable: true
    });
  }
  return originalDefineProperty(obj, prop, descriptor);
};
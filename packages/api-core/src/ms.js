class AvMicroservice {
  constructor(http, promise, config) {
    if (!http || !config || !promise) {
      throw new Error('[http], [promise] and [config] and must be defined');
    }
  }
}

export default AvMicroservice;

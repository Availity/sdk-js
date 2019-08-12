function isRequired(isRequired = true, msg) {
  return this.test({
    name: 'isRequired',
    exclusive: true,
    message: msg || 'This field is required.',
    test(value) {
      if (isRequired) {
        if (typeof value === 'number') {
          return value !== undefined;
        }
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        // String ( If you want to check for null add nullable )
        return value !== undefined && value !== '';
      }
      return true;
    },
  });
}

export default isRequired;

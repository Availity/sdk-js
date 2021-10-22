const NANP_REGEXP = /^(\+?1[\s.-]?)?\(?[2-9]\d{2}[\s).-]?\s?[2-9]\d{2}[\s.-]?\d{4}$/;

function phone(msg) {
  return this.test({
    name: 'phone',
    exclusive: true,
    message: msg || 'This field is invalid',
    test(value) {
      if (!value) return true;

      return NANP_REGEXP.test(value);
    },
  });
}

export default phone;

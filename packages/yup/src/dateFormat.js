import moment from 'moment';

export default function(format = 'MM/DD/YYYY', msg) {
  // Can't use arrow function because we rely on 'this' referencing yup's internals
  return this.test({
    name: 'format',
    exclusive: true, // Validation errors don't stack
    // NOTE: Intentional use of single quotes - yup will handle the string interpolation
    message: msg || 'This field is invalid.',
    test(value) {
      const date = moment(
        value,
        ['MM/DD/YYYY', format, 'MMDDYYYY', 'YYYYMMDD'],
        true
      );
      return date.isValid();
    },
  });
}

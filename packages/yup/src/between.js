import moment from 'moment';

export default function({ min, max, format = 'MM/DD/YYYY' }, msg) {
  const minDate = moment(
    min,
    ['MM/DD/YYYY', format, 'MMDDYYYY', 'YYYYMMDD'],
    true
  );

  const maxDate = moment(
    max,
    ['MM/DD/YYYY', format, 'MMDDYYYY', 'YYYYMMDD'],
    true
  );

  // Can't use arrow function because we rely on 'this' referencing yup's internals
  return this.test({
    name: 'between',
    exclusive: true, // Validation errors don't stack
    // NOTE: Intentional use of single quotes - yup will handle the string interpolation
    message:
      msg ||
      `Date must be between ${minDate.format(format)} and ${maxDate.format(
        format
      )}`,
    test(value) {
      const date = moment(
        value,
        ['MM/DD/YYYY', format, 'MMDDYYYY', 'YYYYMMDD'],
        true
      );

      return date.isBetween(minDate, maxDate);
    },
  });
}

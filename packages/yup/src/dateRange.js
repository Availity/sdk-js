import moment from 'moment';
import get from 'lodash.get';

export default function(
  { min, max, format = 'MM/DD/YYYY', start = 'startDate', end = 'endDate' },
  msg
) {
  const minDate = moment(min, format, true);

  const maxDate = moment(max, format, true);

  // Can't use arrow function because we rely on 'this' referencing yup's internals
  return this.test({
    name: 'dateRange',
    exclusive: true, // Validation errors don't stack
    // NOTE: Intentional use of single quotes - yup will handle the string interpolation
    message:
      msg ||
      `Date Range must be between ${minDate.format(
        format
      )} and ${maxDate.format(format)}`,
    test(value) {
      if (!value) return false;
      let startDate = get(value, start);
      let endDate = get(value, end);

      if (!startDate || !endDate) return false;

      startDate = moment(startDate, format, true);

      endDate = moment(endDate, format, true);

      return (
        startDate.isValid() &&
        endDate.isValid() &&
        endDate.isSameOrAfter(startDate) &&
        startDate.isSameOrAfter(minDate) &&
        endDate.isSameOrBefore(maxDate)
      );
    },
  });
}

import dayjs from 'dayjs';
import get from 'lodash.get';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default function(
  { min, max, format = 'MM/DD/YYYY', start = 'startDate', end = 'endDate' },
  msg
) {
  const minDate = dayjs(min, format, true);

  const maxDate = dayjs(max, format, true);

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

      startDate = dayjs(startDate, format, true);

      endDate = dayjs(endDate, format, true);

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

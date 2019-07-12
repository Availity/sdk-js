import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

export default function({ min, max, format = 'MM/DD/YYYY' }, msg) {
  const minDate = dayjs(min, format, true);

  const maxDate = dayjs(max, format, true);

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
      const date = dayjs(value, format, true);

      return date.isBetween(minDate, maxDate);
    },
  });
}

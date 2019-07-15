import * as yup from 'yup';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

const defaultOpts = {
  format: 'MM/DD/YYYY',
};

export default class DateSchema extends yup.mixed {
  constructor({ format = 'MM/DD/YYYY' } = defaultOpts) {
    super({
      type: 'date',
    });

    this.format = format;

    this.withMutation(() => {
      this.transform(function mutate(value) {
        const date = dayjs(value, format);
        return date;
      });
    });
  }

  typeError() {
    return this.test({
      message: 'Date is invalid.',
      name: 'typeError',
      test(value) {
        if (value !== undefined && !this.schema.isType(value)) {
          return false;
        }
        return true;
      },
    });
  }

  _typeCheck(value) {
    return value.isValid();
  }

  min(min, message) {
    const minDate = dayjs(min, this.format);

    return this.test({
      message:
        message || `Date must come after ${minDate.format(this.format)}.`,
      name: 'min',
      exclusive: true,
      params: { min },
      test(value) {
        return value === null || minDate.isSameOrBefore(value, 'MM/DD/YYYY');
      },
    });
  }

  max(max, message) {
    const maxDate = dayjs(max, this.format);

    return this.test({
      message:
        message || `Date must come before ${maxDate.format(this.format)}.`,
      name: 'max',
      exclusive: true,
      params: { max },
      test(value) {
        return value === null || maxDate.isSameOrAfter(value);
      },
    });
  }

  between(min, max, msg) {
    const minDate = dayjs(min, this.format);

    const maxDate = dayjs(max, this.format);

    // Can't use arrow function because we rely on 'this' referencing yup's internals
    return this.test({
      name: 'between',
      exclusive: true, // Validation errors don't stack
      // NOTE: Intentional use of single quotes - yup will handle the string interpolation
      message:
        msg ||
        `Date must be between ${minDate.format(
          this.format
        )} and ${maxDate.format(this.format)}.`,
      test(value) {
        return value.isBetween(minDate, maxDate);
      },
    });
  }
}

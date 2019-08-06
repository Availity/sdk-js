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

const formats = ['YYYY-MM-DD', 'MMDDYYYY', 'YYYYMMDD'];

export default class DateSchema extends yup.mixed {
  constructor({ format = 'MM/DD/YYYY' } = defaultOpts) {
    super({
      type: 'date',
    });

    this.format = format;
    this.getValidDate = this.getValidDate.bind(this);

    this.withMutation(() => {
      this.transform(function mutate(value) {
        return this.getValidDate(value);
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

  getValidDate(value) {
    let date = dayjs(value, this.format);

    if (!date.isValid()) {
      let i;
      for (i = 0; i < formats.length; i++) {
        date = dayjs(value, formats[i]);

        if (date.isValid()) return date;
      }
    }

    return date;
  }

  min(min, message) {
    const minDate = this.getValidDate(min);

    return this.test({
      message:
        message || `Date must come after ${minDate.format(this.format)}.`,
      name: 'min',
      exclusive: true,
      params: { min },
      test(value) {
        if (!min || !minDate.isValid()) {
          return true;
        }
        return value === null || minDate.isSameOrBefore(value, 'MM/DD/YYYY');
      },
    });
  }

  max(max, message) {
    const maxDate = this.getValidDate(max);

    return this.test({
      message:
        message || `Date must come before ${maxDate.format(this.format)}.`,
      name: 'max',
      exclusive: true,
      params: { max },
      test(value) {
        if (!max || !maxDate.isValid()) {
          return true;
        }
        return value === null || maxDate.isSameOrAfter(value);
      },
    });
  }

  isRequired(isRequired = true, msg) {
    return this.test({
      name: 'isRequired',
      exclusive: true,
      message: msg || 'This field is required.',
      test(value) {
        if (!isRequired) {
          return true;
        }

        return value !== undefined;
      },
    });
  }

  between(min, max, msg) {
    const minDate = this.getValidDate(min);

    const maxDate = this.getValidDate(max);

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
        if (!min || !max || !minDate.isValid() || !maxDate.isValid()) {
          return true;
        }

        return value.isBetween(minDate, maxDate);
      },
    });
  }
}

import dayjs from 'dayjs';
import get from 'lodash.get';
import * as yup from 'yup';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import merge from 'merge-options-es5';

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const defaultOptions = {
  startKey: 'startDate',
  endKey: 'endDate',
  format: 'MM/DD/YYYY',
};

export default class DateRangeSchema extends yup.mixed {
  constructor(options) {
    super({
      type: 'dateRange',
    });

    const { startKey, endKey, format } = merge({}, defaultOptions, options);

    this.startKey = startKey;
    this.endKey = endKey;
    this.format = format;

    this.withMutation(() => {
      this.transform(function mutate(value) {
        const start = get(value, startKey);
        const end = get(value, endKey);

        if (!end || !start) {
          throw new yup.ValidationError('Start and End Date are required.');
        }

        const startDate = dayjs(get(value, startKey), format);
        const endDate = dayjs(get(value, endKey), format);

        return { startDate, endDate };
      });
    });

    return this.test({
      message: 'Start date must come before end date.',
      name: 'startBeforeEnd',
      exclusive: true,
      test({ startDate, endDate }) {
        return startDate.isSameOrBefore(endDate);
      },
    });
  }

  min(min, message) {
    const { format } = this;

    const minDate = dayjs(min, format);
    return this.test({
      message:
        message || `Date Range must start after ${minDate.format(format)}`,
      name: 'min',
      exclusive: true,
      params: { min },
      test({ startDate }) {
        return minDate.isValid() && minDate.isSameOrBefore(startDate);
      },
    });
  }

  max(max, message) {
    const { format } = this;

    const maxDate = dayjs(max, format);

    return this.test({
      message:
        message || `Date Range must end before ${maxDate.format(format)}`,
      name: 'min',
      exclusive: true,
      params: { max },
      test({ endDate }) {
        return maxDate.isValid() && maxDate.isSameOrAfter(endDate);
      },
    });
  }

  between(min, max, message) {
    const { format } = this;

    const minDate = dayjs(min, format);
    const maxDate = dayjs(max, format);

    return this.test({
      message:
        message ||
        `Date Range must be between ${minDate.format(
          format
        )} and ${maxDate.format(format)}`,
      name: 'min',
      exclusive: true,
      params: { max },
      test({ startDate, endDate }) {
        return (
          maxDate.isValid() &&
          minDate.isValid() &&
          maxDate.isSameOrAfter(endDate) &&
          minDate.isSameOrBefore(startDate)
        );
      },
    });
  }

  typeError() {
    return this.test({
      message: 'Date Range is invalid.',
      name: 'typeError',
      test(value) {
        if (value !== undefined && !this.schema.isType(value)) {
          return false;
        }
        return true;
      },
    });
  }

  _typeCheck({ startDate, endDate }) {
    return startDate.isValid() && endDate.isValid();
  }
}

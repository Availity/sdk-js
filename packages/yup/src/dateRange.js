import moment from 'moment';
import get from 'lodash.get';
import * as yup from 'yup';
import merge from 'merge-options-es5';

const defaultOptions = {
  startKey: 'startDate',
  endKey: 'endDate',
  format: 'MM/DD/YYYY',
};

const defaultValue = {};

const formats = ['YYYY-MM-DD', 'MMDDYYYY', 'YYYYMMDD'];

export default class DateRangeSchema extends yup.mixed {
  constructor(options) {
    super({
      type: 'dateRange',
    });

    const { startKey, endKey, format } = merge({}, defaultOptions, options);

    this.startKey = startKey;
    this.endKey = endKey;
    this.format = format;
    this.getValidDate = this.getValidDate.bind(this);

    this.withMutation(() => {
      this.transform(function mutate(value) {
        const start = get(value, startKey);
        const end = get(value, endKey);

        let startDate;
        let endDate;
        if (start) {
          startDate = this.getValidDate(start);
        }

        if (end) {
          endDate = this.getValidDate(end);
        }

        return { startDate, endDate };
      });
    });

    return this.test({
      message: 'Start date must come before end date.',
      name: 'startBeforeEnd',
      exclusive: true,
      test({ startDate, endDate } = defaultValue) {
        if (!startDate || !endDate) {
          return true;
        }

        return startDate.isSameOrBefore(endDate);
      },
    });
  }

  getValidDate(value) {
    return moment(value, [this.format, ...formats], true);
  }

  distance({ min, max } = defaultValue) {
    return this.test({
      name: 'distance',
      exclusive: true,
      params: { min, max },
      test({ endDate, startDate } = defaultValue) {
        if ((!min && !max) || !startDate || !endDate) return true;

        if (max) {
          if (endDate.isAfter(startDate.add(max.value, max.units), 'day')) {
            return new yup.ValidationError(
              max.errorMessage ||
                `The end date must be within ${max.value} ${max.units}${
                  max.value > 1 ? 's' : ''
                } of the start date`,
              {
                startDate,
                endDate,
              },
              this.path
            );
          }
        }
        if (min) {
          if (endDate.isBefore(startDate.add(min.value, min.units), 'day')) {
            return new yup.ValidationError(
              min.errorMessage ||
                `The end date must be greater than ${min.value} ${min.units}${
                  min.value > 1 ? 's' : ''
                } of the start date`,
              { startDate, endDate },
              this.path
            );
          }
        }

        return true;
      },
    });
  }

  min(min, message) {
    const { format } = this;

    const minDate = this.getValidDate(min);
    return this.test({
      message:
        message || `Date Range must start after ${minDate.format(format)}`,
      name: 'min',
      exclusive: true,
      params: { min },
      test({ startDate } = defaultValue) {
        if (!startDate || !min) {
          return true;
        }
        return minDate.isValid() && minDate.isSameOrBefore(startDate);
      },
    });
  }

  max(max, message) {
    const { format } = this;

    const maxDate = this.getValidDate(max);

    return this.test({
      message:
        message || `Date Range must end before ${maxDate.format(format)}`,
      name: 'min',
      exclusive: true,
      params: { max },
      test({ endDate } = defaultValue) {
        if (!endDate || !max) return true;
        return maxDate.isValid() && maxDate.isSameOrAfter(endDate);
      },
    });
  }

  between(min, max, message) {
    const { format } = this;

    const minDate = this.getValidDate(min);
    const maxDate = this.getValidDate(max);

    return this.test({
      message:
        message ||
        `Date Range must be between ${minDate.format(
          format
        )} and ${maxDate.format(format)}`,
      name: 'min',
      exclusive: true,
      params: { min, max },
      test({ startDate, endDate } = defaultValue) {
        if (!startDate || !endDate || !min || !max) return true;
        return (
          maxDate.isValid() &&
          minDate.isValid() &&
          maxDate.isSameOrAfter(endDate) &&
          minDate.isSameOrBefore(startDate)
        );
      },
    });
  }

  isRequired(isRequired = true, msg) {
    return this.test({
      name: 'isRequired',
      exclusive: true,
      message: msg || 'This field is required.',
      test({ startDate, endDate } = defaultValue) {
        return !isRequired || (startDate && endDate);
      },
    });
  }

  typeError() {
    return this.test({
      name: 'typeError',
      exclusive: true,
      test({ startDate, endDate } = defaultValue) {
        const errors = [];

        if ((!startDate || !endDate) && (startDate || endDate)) {
          errors.push('Start and End Date are required.');
        }

        if (startDate && !startDate.isValid()) {
          errors.push('Start Date is invalid.');
        }

        if (endDate && !endDate.isValid()) {
          errors.push('End Date is invalid.');
        }

        return errors.length > 0
          ? new yup.ValidationError(errors, { startDate, endDate }, this.path)
          : true;
      },
    });
  }

  _typeCheck({ startDate, endDate } = defaultValue) {
    return startDate && endDate && startDate.isValid() && endDate.isValid();
  }
}

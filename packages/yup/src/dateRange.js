import moment from 'moment';
import get from 'lodash.get';
import { mixed, ValidationError } from 'yup';
import merge from 'merge-options-es5';

const defaultOptions = {
  startKey: 'startDate',
  endKey: 'endDate',
  format: 'MM/DD/YYYY',
};

const defaultValue = {};

const formats = ['YYYY-MM-DD', 'MMDDYYYY', 'YYYYMMDD'];

export default class DateRangeSchema extends mixed {
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

  distance({
    min: {
      value: minValue,
      units: minUnits = 'day',
      errorMessage: minErrorMessage,
    } = {},
    max: {
      value: maxValue,
      units: maxUnits = 'day',
      errorMessage: maxErrorMessage,
    } = {},
  } = defaultValue) {
    return this.test({
      name: 'distance',
      exclusive: true,
      test({ endDate, startDate } = defaultValue) {
        if ((!minValue && !maxValue) || !startDate || !endDate) return true;

        if (maxValue) {
          if (endDate.isAfter(startDate.add(maxValue, maxUnits), 'day')) {
            return new ValidationError(
              maxErrorMessage ||
                `The end date must be within ${maxValue} ${maxUnits}${
                  maxValue > 1 ? 's' : ''
                } of the start date`,
              {
                startDate,
                endDate,
              },
              this.path
            );
          }
        }
        if (minValue) {
          if (endDate.isBefore(startDate.add(minValue, minUnits), 'day')) {
            return new ValidationError(
              minErrorMessage ||
                `The end date must be greater than ${minValue} ${minUnits}${
                  minValue > 1 ? 's' : ''
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
        message ||
        `Date Range must start on or after ${minDate.format(format)}`,
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
        message || `Date Range must end on or before ${maxDate.format(format)}`,
      name: 'max',
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
      name: 'between',
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
          ? new ValidationError(errors, { startDate, endDate }, this.path)
          : true;
      },
    });
  }

  _typeCheck({ startDate, endDate } = defaultValue) {
    return startDate && endDate && startDate.isValid() && endDate.isValid();
  }
}

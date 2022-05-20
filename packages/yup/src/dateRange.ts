import { MixedSchema, ValidationError } from 'yup';
import moment, { unitOfTime } from 'moment';
import type { Moment } from 'moment';
import get from 'lodash/get';
import merge from 'lodash/merge';

const defaultOptions = {
  startKey: 'startDate',
  endKey: 'endDate',
  format: 'MM/DD/YYYY',
};

const formats = ['YYYY-MM-DD', 'YYYYMMDD', 'MMDDYYYY', 'MM-DD-YYYY', 'MM/DD/YYYY'];

export default class DateRangeSchema extends MixedSchema<DateRange> {
  startKey: string;

  endKey: string;

  format: string;

  constructor(options?: Options) {
    super({
      type: 'dateRange',
    });

    const { startKey, endKey, format } = merge({}, defaultOptions, options);

    // Assign them here so we can use in schema.transform
    this.startKey = startKey;
    this.endKey = endKey;
    this.format = format;

    this.withMutation((schema) => {
      schema.transform(function mutate(value) {
        const start = get(value, startKey);
        const end = get(value, endKey);

        return {
          startDate: start ? schema.getValidDate(start) : start,
          endDate: end ? schema.getValidDate(end) : end,
          supportedFormats: [schema.format, ...formats],
        };
      });
    });
  }

  /**
   * Convert the string to a moment object
   */
  getValidDate(value: string | Date | Moment) {
    return moment(value, [this.format, ...formats], true);
  }

  /**
   * Validate based on min and max distance between dates
   */
  distance({
    min: { value: minValue, units: minUnits = 'day', errorMessage: minErrorMessage } = { value: 0 },
    max: { value: maxValue, units: maxUnits = 'day', errorMessage: maxErrorMessage } = { value: 0 },
  }: DistanceOptions = {}) {
    return this.test({
      name: 'distance',
      exclusive: true,
      test({ endDate, startDate } = {}) {
        // check if we have min or max set and if both dates are present
        if ((!minValue && !maxValue) || !startDate || !endDate) return true;

        // if we have a max then check distance between end and start
        if (maxValue && endDate.isAfter(startDate.add(maxValue, maxUnits), 'day')) {
          return new ValidationError(
            maxErrorMessage ||
              `The end date must be within ${maxValue} ${maxUnits}${maxValue > 1 ? 's' : ''} of the start date`,
            {
              startDate,
              endDate,
            },
            this.path
          );
        }

        // if we have a min the check distance between end and start
        if (minValue && endDate.isBefore(startDate.add(minValue, minUnits), 'day')) {
          return new ValidationError(
            minErrorMessage ||
              `The end date must be greater than ${minValue} ${minUnits}${minValue > 1 ? 's' : ''} of the start date`,
            { startDate, endDate },
            this.path
          );
        }

        return true;
      },
    });
  }

  /**
   * Validate start date is after given min
   */
  min(min: string, message?: string) {
    return this.test({
      message: message || (({ min }: { min: string }) => `Date Range must start on or after ${min}`),
      name: 'min',
      exclusive: true,
      params: { min },
      test({ startDate, supportedFormats } = {}) {
        // Only validate if startDate and min are defined
        if (!startDate || !min) return true;

        // Otherwise check if min is correct format and is after given startDate
        const minDate = moment(min, supportedFormats, true);

        return minDate.isValid() && minDate.isSameOrBefore(startDate);
      },
    });
  }

  /**
   * Validate end date is before given max
   */
  max(max: string, message?: string) {
    // const maxDate = this.getValidDate(max);

    return this.test({
      message: message || (({ max }: { max: string }) => `Date Range must end on or before ${max}`),
      name: 'max',
      exclusive: true,
      params: { max },
      test({ endDate, supportedFormats } = {}) {
        // return true when no endDate given or max set
        if (!endDate || !max) return true;

        // otherwise check if max is correct format and is after given endDate
        const maxDate = moment(max, supportedFormats, true);

        return maxDate.isValid() && maxDate.isSameOrAfter(endDate);
      },
    });
  }

  /**
   * Validate dates are between the set min and max
   */
  between(min: string, max: string, message?: string) {
    // const minDate = this.getValidDate(min);
    // const maxDate = this.getValidDate(max);

    return this.test({
      message:
        message || (({ min, max }: { min: string; max: string }) => `Date Range must be between ${min} and ${max}`),
      name: 'between',
      exclusive: true,
      params: { min, max },
      test({ startDate, endDate, supportedFormats } = {}) {
        if (!startDate || !endDate || !min || !max) return true;

        const minDate = moment(min, supportedFormats, true);
        const maxDate = moment(max, supportedFormats, true);

        return (
          maxDate.isValid() && minDate.isValid() && maxDate.isSameOrAfter(endDate) && minDate.isSameOrBefore(startDate)
        );
      },
    });
  }

  /**
   * Set the field to be required or not
   */
  isRequired(isRequired = true, msg?: string) {
    return this.test({
      name: 'isRequired',
      exclusive: true,
      message: msg || 'This field is required.',
      test({ startDate, endDate } = {}) {
        return !isRequired || !!(startDate && endDate);
      },
    });
  }

  typeError({ message }: { message: string }) {
    return this.test({
      name: 'typeError',
      exclusive: true,
      test({ startDate, endDate } = {}) {
        // Set to `any` to pass to ValidationErrors. Docs state string[] is accepted,
        // but types do not allow string[]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errors: any = [];

        if ((!startDate || !endDate) && (startDate || endDate)) {
          errors.push(message || 'Start and End Date are required.');
        }

        if (startDate && endDate && !startDate.isSameOrBefore(endDate)) {
          errors.push('Start date must come before end date.');
        }

        if (startDate && !startDate.isValid()) {
          errors.push('Start Date is invalid.');
        }

        if (endDate && !endDate.isValid()) {
          errors.push('End Date is invalid.');
        }

        return errors.length > 0 ? new ValidationError(errors, { startDate, endDate }, this.path) : true;
      },
    });
  }

  _typeCheck(range: { startDate?: Moment; endDate?: Moment } = {}): range is DateRange {
    const { startDate, endDate } = range;

    return !!startDate && !!endDate && startDate.isValid() && endDate.isValid();
  }
}

type Options = { startKey?: string; endKey?: string; format?: string };
type DateRange = { startDate?: Moment; endDate?: Moment; supportedFormats?: string[] };
type DistanceValue = {
  value: number;
  units?: unitOfTime.DurationConstructor;
  errorMessage?: string;
};
type DistanceOptions = { min?: DistanceValue; max?: DistanceValue };

export const dateRange = (opts?: Options): DateRangeSchema => new DateRangeSchema(opts);

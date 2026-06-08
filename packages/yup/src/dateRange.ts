import { MixedSchema, ValidationError } from 'yup';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import getByPath from './getByPath';

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const isPlainObject = (val: unknown): val is Record<string, unknown> =>
  val !== null && typeof val === 'object' && !Array.isArray(val);

function deepMerge<T extends Record<string, unknown>>(target: T, ...sources: Record<string, unknown>[]): T {
  const result: Record<string, unknown> = { ...target };
  for (const source of sources) {
    if (isPlainObject(source)) {
      for (const key of Object.keys(source)) {
        result[key] =
          isPlainObject(source[key]) && isPlainObject(result[key])
            ? deepMerge(result[key] as Record<string, unknown>, source[key] as Record<string, unknown>)
            : source[key];
      }
    }
  }
  return result as T;
}

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
    const { startKey, endKey, format } = deepMerge(defaultOptions, options ?? {});

    super({
      type: 'dateRange',
      check: (range: unknown): range is DateRange => {
        if (!range || typeof range !== 'object') return false;
        const { startDate, endDate } = range as Record<string, unknown>;
        return (
          !!startDate &&
          !!endDate &&
          dayjs.isDayjs(startDate) &&
          dayjs.isDayjs(endDate) &&
          startDate.isValid() &&
          endDate.isValid()
        );
      },
    });

    this.startKey = startKey;
    this.endKey = endKey;
    this.format = format;

    this.withMutation((schema) => {
      schema.transform(function mutate(value) {
        const start = getByPath(value, startKey);
        const end = getByPath(value, endKey);

        return {
          startDate: start ? (schema as DateRangeSchema).getValidDate(start as string) : start,
          endDate: end ? (schema as DateRangeSchema).getValidDate(end as string) : end,
          supportedFormats: [(schema as DateRangeSchema).format, ...formats],
        };
      });
    });
  }

  getValidDate(value: string | Date | dayjs.Dayjs): dayjs.Dayjs {
    if (dayjs.isDayjs(value)) return value;
    if (value instanceof Date) return dayjs(value);
    const allFormats = [this.format, ...formats];
    for (const fmt of allFormats) {
      const d = dayjs(value, fmt, true);
      if (d.isValid()) return d;
    }
    return dayjs(value, allFormats[0], true);
  }

  distance({
    min: { value: minValue, units: minUnits = 'day', errorMessage: minErrorMessage } = { value: 0 },
    max: { value: maxValue, units: maxUnits = 'day', errorMessage: maxErrorMessage } = { value: 0 },
  }: DistanceOptions = {}) {
    return this.test({
      name: 'distance',
      exclusive: true,
      test({ endDate, startDate } = {}) {
        if ((!minValue && !maxValue) || !startDate || !endDate) return true;

        if (maxValue && endDate.isAfter(startDate.add(maxValue, maxUnits), 'day')) {
          return new ValidationError(
            maxErrorMessage ||
              `The end date must be within ${maxValue} ${maxUnits}${maxValue > 1 ? 's' : ''} of the start date`,
            { startDate, endDate },
            this.path
          );
        }

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

  min(min: string, message?: string) {
    return this.test({
      message: message || (({ min }: { min: string }) => `Date Range must start on or after ${min}`),
      name: 'min',
      exclusive: true,
      params: { min },
      test({ startDate, supportedFormats } = {}) {
        if (!startDate || !min) return true;
        const minDate = parseDateWithFormats(min, supportedFormats);
        return minDate.isValid() && minDate.isSameOrBefore(startDate, 'day');
      },
    });
  }

  max(max: string, message?: string) {
    return this.test({
      message: message || (({ max }: { max: string }) => `Date Range must end on or before ${max}`),
      name: 'max',
      exclusive: true,
      params: { max },
      test({ endDate, supportedFormats } = {}) {
        if (!endDate || !max) return true;
        const maxDate = parseDateWithFormats(max, supportedFormats);
        return maxDate.isValid() && maxDate.isSameOrAfter(endDate, 'day');
      },
    });
  }

  between(min: string, max: string, message?: string) {
    return this.test({
      message:
        message || (({ min, max }: { min: string; max: string }) => `Date Range must be between ${min} and ${max}`),
      name: 'between',
      exclusive: true,
      params: { min, max },
      test({ startDate, endDate, supportedFormats } = {}) {
        if (!startDate || !endDate || !min || !max) return true;
        const minDate = parseDateWithFormats(min, supportedFormats);
        const maxDate = parseDateWithFormats(max, supportedFormats);
        return (
          maxDate.isValid() && minDate.isValid() && maxDate.isSameOrAfter(endDate, 'day') && minDate.isSameOrBefore(startDate, 'day')
        );
      },
    });
  }

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errors: any = [];

        if ((!startDate || !endDate) && (startDate || endDate)) {
          errors.push(message || 'Start and End Date are required.');
        }

        if (startDate && endDate && !startDate.isSameOrBefore(endDate, 'day')) {
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
}

function parseDateWithFormats(value: string, supportedFormats?: string[]): dayjs.Dayjs {
  const fmts = supportedFormats || formats;
  for (const fmt of fmts) {
    const d = dayjs(value, fmt, true);
    if (d.isValid()) return d;
  }
  return dayjs(value, fmts[0], true);
}

type Options = { startKey?: string; endKey?: string; format?: string };
type DateRange = { startDate?: dayjs.Dayjs; endDate?: dayjs.Dayjs; supportedFormats?: string[] };
type DurationUnit = 'day' | 'week' | 'month' | 'year' | 'hour' | 'minute' | 'second' | 'millisecond';
type DistanceValue = {
  value: number;
  units?: DurationUnit;
  errorMessage?: string;
};
type DistanceOptions = { min?: DistanceValue; max?: DistanceValue };

export const dateRange = (opts?: Options): DateRangeSchema => new DateRangeSchema(opts);

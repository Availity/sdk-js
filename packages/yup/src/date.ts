import { MixedSchema } from 'yup';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

export type AvDate = dayjs.Dayjs & { _originalInput?: string };

const defaultFormats = ['YYYY-MM-DD', 'YYYYMMDD', 'MMDDYYYY', 'MM-DD-YYYY', 'MM/DD/YYYY'];

export default class AvDateSchema extends MixedSchema<AvDate> {
  _validFormats: string[];

  constructor({ format = [], typeError = 'The date entered is in an invalid format.' }: Options = {}) {
    const formats = Array.isArray(format) ? format : [format];
    const validFormats = [...defaultFormats, ...formats];

    super({
      type: 'avDate',
      check: (value: unknown): value is AvDate =>
        dayjs.isDayjs(value) && (value.isValid() || (value as AvDate)._originalInput === ''),
    });

    this._validFormats = validFormats;

    this.withMutation((schema) => {
      schema.typeError(typeError);

      schema.transform(function transform(value, originalValue) {
        if (value && this.isType(value)) {
          return value;
        }
        const parsed = parseDate(originalValue, (schema as AvDateSchema)._validFormats);
        (parsed as AvDate)._originalInput = originalValue;
        return parsed;
      });
    });
  }

  min(min: string, message?: string) {
    return this.test({
      message: ({ min: minDate }) => message || `Date must be ${minDate} or later.`,
      name: 'min',
      exclusive: true,
      params: { min },
      test(value) {
        if (!min || !value || !value.isValid()) return true;
        return value.isSameOrAfter(dayjs(min, defaultFormats, true), 'day');
      },
    });
  }

  max(max: string, message?: string) {
    return this.test({
      message: ({ max: maxDate }) => message || `Date must be ${maxDate} or earlier.`,
      name: 'max',
      exclusive: true,
      params: { max },
      test(value) {
        if (!max || !value || !value.isValid()) return true;
        return value.isSameOrBefore(dayjs(max, defaultFormats, true), 'day');
      },
    });
  }

  between(min: string, max: string, message?: string, inclusivity: Inclusivity = '()') {
    return this.test({
      name: 'between',
      exclusive: true,
      message: ({ min: minDate, max: maxDate }) => message || `Date must be between ${minDate} and ${maxDate}.`,
      params: { min, max },
      test(value) {
        if (!value || !value.isValid() || !min || !max) return true;
        return value.isBetween(dayjs(min, defaultFormats, true), dayjs(max, defaultFormats, true), 'day', inclusivity);
      },
    });
  }

  /**
   * Validate the date is in the past (before today)
   */
  past(message?: string) {
    return this.test({
      name: 'past',
      exclusive: true,
      message: message || 'Date must be in the past.',
      test(value) {
        if (!value || !value.isValid()) return true;
        return value.isBefore(dayjs(), 'day');
      },
    });
  }

  /**
   * Validate the date is in the future (after today)
   */
  future(message?: string) {
    return this.test({
      name: 'future',
      exclusive: true,
      message: message || 'Date must be in the future.',
      test(value) {
        if (!value || !value.isValid()) return true;
        return value.isAfter(dayjs(), 'day');
      },
    });
  }

  isRequired(isRequired = true, message?: string) {
    return this.test({
      name: 'isRequired',
      exclusive: true,
      message: message || 'This field is required.',
      test(value) {
        if (!isRequired) return true;
        return value ? !!(value as AvDate)._originalInput : false;
      },
    });
  }
}

function parseDate(value: string, formats: string[]): dayjs.Dayjs {
  for (const fmt of formats) {
    const d = dayjs(value, fmt, true);
    if (d.isValid()) return d;
  }
  return dayjs(value, formats[0], true);
}

export type Inclusivity = '()' | '[)' | '(]' | '[]';
type Options = { format?: string | string[]; typeError?: string };

export const avDate = (options?: Options) => new AvDateSchema(options);

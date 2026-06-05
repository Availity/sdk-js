import { MixedSchema } from 'yup';
import moment from 'moment';
import type { Moment } from 'moment';

const defaultFormats = ['YYYY-MM-DD', 'YYYYMMDD', 'MMDDYYYY', 'MM-DD-YYYY', 'MM/DD/YYYY'];

export default class MomentDateSchema extends MixedSchema<Moment> {
  _validFormats: string[];

  constructor({ format = [], typeError = 'The date entered is in an invalid format.' }: Options = {}) {
    const formats = Array.isArray(format) ? format : [format];
    const validFormats = [...defaultFormats, ...formats];

    super({
      type: 'avDate',
      check: (value: unknown): value is Moment =>
        moment.isMoment(value) && (value.isValid() || (value as unknown as { _i: string })._i === ''),
    });

    this._validFormats = validFormats;

    this.withMutation((schema) => {
      schema.typeError(typeError);

      schema.transform(function transform(value, originalValue) {
        if (value && this.isType(value)) {
          return value;
        }
        return moment(originalValue, (schema as MomentDateSchema)._validFormats, true);
      });
    });
  }

  /**
   * Validate if the date is on or after a specified min
   */
  min(min: string, message?: string) {
    return this.test({
      message: ({ min: minDate }) => message || `Date must be ${minDate} or later.`,
      name: 'min',
      exclusive: true,
      params: { min },
      test(value) {
        if (!min || !value || !value.isValid()) {
          return true;
        }
        return value.isSameOrAfter(min);
      },
    });
  }

  /**
   * Validate if the date is on or before a specified max
   */
  max(max: string, message?: string) {
    return this.test({
      message: ({ max: maxDate }) => message || `Date must be ${maxDate} or earlier.`,
      name: 'max',
      exclusive: true,
      params: { max },
      test(value) {
        if (!max || !value || !value.isValid()) {
          return true;
        }
        return value.isSameOrBefore(max);
      },
    });
  }

  /**
   * Validate if the date is between a specified min or max
   */
  between(min: string, max: string, message?: string, inclusivity: Inclusivity = '()') {
    return this.test({
      name: 'between',
      exclusive: true,
      message: ({ min: minDate, max: maxDate }) => message || `Date must be between ${minDate} and ${maxDate}.`,
      params: { min, max },
      test(value) {
        if (!value || !value.isValid() || !min || !max) {
          return true;
        }

        return value.isBetween(min, max, undefined, inclusivity);
      },
    });
  }

  /**
   * Set if the field is required and add a custom message
   */
  isRequired(isRequired = true, message?: string) {
    return this.test({
      name: 'isRequired',
      exclusive: true,
      message: message || 'This field is required.',
      test(value) {
        if (!isRequired) {
          return true;
        }
        return value ? !!(value as unknown as { _i: string })._i : false;
      },
    });
  }
}

export type Inclusivity = '()' | '[)' | '(]' | '[]';
type Options = { format?: string | string[]; typeError?: string };

export const avDate = (options?: Options) => new MomentDateSchema(options);

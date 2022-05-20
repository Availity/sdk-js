import { MixedSchema } from 'yup';
import moment from 'moment';
import type { Moment } from 'moment';

const defaultFormats = ['YYYY-MM-DD', 'YYYYMMDD', 'MMDDYYYY', 'MM-DD-YYYY', 'MM/DD/YYYY'];

export default class MomentDateSchema extends MixedSchema<Moment> {
  _validFormats: string[];

  constructor({ format = [], typeError = 'The date entered is in an invalid format.' }: Options = {}) {
    super({ type: 'avDate' });

    const formats = Array.isArray(format) ? format : [format];
    this._validFormats = [...defaultFormats, ...formats];

    this.withMutation((schema) => {
      // Set error message for when _typeCheck fails
      schema.typeError(typeError);

      // Transform value into a moment object
      schema.transform(function transform(value, originalValue) {
        if (value && this.isType(value)) {
          return value;
        }
        return moment(originalValue, schema._validFormats, true);
      });
    });
  }

  // Check if the date is a valid moment object or an empty string
  _typeCheck(value: unknown): value is Moment {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return moment.isMoment(value) && (value.isValid() || value._i === '');
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
        // First check if min is defined and we have a valid date
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
        // First check if max is defined and we have a valid date
        if (!max || !value || !value.isValid()) {
          return true;
        }
        return value.isSameOrBefore(max);
      },
    });
  }

  /**
   * Validate if the date is between a specified min or max
   *
   * For Inlcusivity: `[]` === include & `()` === exclude
   */
  between(min: string, max: string, message?: string, inclusivity: Inclusivity = '()') {
    return this.test({
      name: 'between',
      exclusive: true,
      message: ({ min: minDate, max: maxDate }) => message || `Date must be between ${minDate} and ${maxDate}.`,
      params: { min, max },
      test(value) {
        // First check if min and max are defined and we have a valid date
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return value ? !!value._i : false;
      },
    });
  }
}

export type Inclusivity = '()' | '[)' | '(]' | '[]';
type Options = { format?: string | string[]; typeError?: string };

export const avDate = (options?: Options) => new MomentDateSchema(options);

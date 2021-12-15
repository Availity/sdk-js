import * as yup from 'yup';

import { dateRange } from './dateRange';
import { avDate } from './date';

export { avDate, dateRange };

declare module 'yup' {
  interface StringSchema<T extends string | null | undefined = string> extends yup.StringSchema<T> {
    isRequired(required?: boolean, errorMessage?: string): StringSchema<T>;
    npi(errorMessage?: string): StringSchema<T>;
    phone(errorMessage?: string): StringSchema<T>;
  }

  interface ArraySchema<T> extends yup.ArraySchema<T[]> {
    isRequired(required?: boolean, errorMessage?: string): ArraySchema<T>;
  }

  interface NumberSchema<T extends number | null | undefined = number> extends yup.NumberSchema<T> {
    isRequired(required?: boolean, errorMessage?: string): NumberSchema<T>;
    npi(errorMessage?: string): NumberSchema<T>;
    phone(errorMessage?: string): NumberSchema<T>;
  }

  interface ObjectSchema<TShape extends Record<string, any>> extends yup.ObjectSchema<TShape> {
    isRequired(required?: boolean, errorMessage?: string): ObjectSchema<TShape>;
  }
}

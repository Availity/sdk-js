import * as yup from 'yup';
import './dateRange';
import './date';

declare module 'yup' {

  interface StringSchema<T extends string | null | undefined = string>
    extends Schema<T> {
    isRequired(required?: boolean, errorMessage?: string): StringSchema<T>;
    npi(errorMessage?: string): StringSchema<T>;
  }

  interface ArraySchema<T> extends BasicArraySchema<T[]>{
    isRequired(required?: boolean, errorMessage?: string): ArraySchema<T>;
  }

  interface NumberSchema<T extends number | null | undefined = number>
    extends Schema<T> {
    isRequired(required?: boolean, errorMessage?: string): NumberSchema<T>;
    npi(errorMessage?: string): NumberSchema<T>;
  }

}

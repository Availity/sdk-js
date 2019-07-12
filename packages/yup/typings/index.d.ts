import * as yup from 'yup';

declare module 'yup' {
  type DateRangeOptions = {
    min: string;
    max: string;
    format?: string;
  };

  interface StringSchema<T extends string | null | undefined = string>
    extends Schema<T> {
    isRequired(required?: boolean, errorMessage?: string): StringSchema<T>;
    dateFormat(format?: string, errorMessage?: string): StringSchema<T>;
    between(options: DateRangeOptions, errorMessage?: string): StringSchema<T>;
    npi(errorMessage?: string): StringSchema<T>;
  }
  interface ObjectSchema<T extends object | null | undefined = object>
    extends Schema<T> {
    dateRange(
      options: DateRangeOptions,
      errorMessage?: string
    ): ObjectSchema<T>;
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

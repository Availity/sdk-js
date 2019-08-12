import * as yup from 'yup';

declare module 'yup' {
  interface DateOpts {
    format?: string | 'MM/DD/YYYY';
  }

  interface DateSchema<T extends string | null | undefined = string>
    extends MixedSchema<T> {
    min(date: string, errorMessage?: string): DateRangeSchema<T>;
    max(date: string, errorMessage?: string): DateRangeSchema<T>;
    between(
      minDate: string,
      maxDate: string,
      errorMessage?: string
    ): DateSchema<T>;
    isRequired(required?: boolean, errorMessage?: string): DateSchema<T>;
  }

  export interface DateSchemaConstructor {
    (opts: DateOpts): DateSchema;
    new (opts: DateOpts): DateSchema;
  }

  export const date: DateSchemaConstructor;
}

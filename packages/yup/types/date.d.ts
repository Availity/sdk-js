import * as yup from 'yup';

declare module 'yup' {
  interface DateOpts {
    format?: string | 'MM/DD/YYYY';
  }

  interface AvDateSchema<T extends string | null | undefined = string> extends MixedSchema<T> {
    min(date: string, errorMessage?: string): DateRangeSchema<T>;
    max(date: string, errorMessage?: string): DateRangeSchema<T>;
    between(minDate: string, maxDate: string, errorMessage?: string): AvDateSchema<T>;
    isRequired(required?: boolean, errorMessage?: string): AvDateSchema<T>;
  }

  export interface AvDateSchemaConstructor {
    (opts: DateOpts): AvDateSchema;
    new (opts: DateOpts): AvDateSchema;
  }

  export const avDate: AvDateSchemaConstructor;
}

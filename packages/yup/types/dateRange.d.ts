import * as yup from 'yup';

declare module 'yup' {
  type DateRangeObject = {
    [startDate: any]: string;
    [endDate: any]: string;
  };

  interface DateRangeOpts {
    startKey?: string | 'startDate';
    endKey?: string | 'endKey';
    format?: string | 'MM/DD/YYYY';
  }

  type DistanceValue = {
    value: number;
    units?: string;
    errorMessage?: string;
  };

  type DistanceOpts = {
    min?: DistanceValue;
    max?: DistanceValue;
  };

  interface DateRangeSchema<T extends DateRangeObject | null | undefined = DateRangeObject> extends MixedSchema<T> {
    min(date: string, errorMessage?: string): DateRangeSchema<T>;
    max(date: string, errorMessage?: string): DateRangeSchema<T>;
    between(minDate: string, maxDate: string, errorMessage?: string): DateRangeSchema<T>;
    isRequired(required?: boolean, errorMessage?: string): DateRangeSchema<T>;
    distance(distanceOpts: DistanceOpts): DateRangeSchema<T>;
  }

  export interface DateRangeSchemaConstructor {
    (opts: DateRangeOpts): DateRangeSchema;
    new (opts: DateRangeOpts): DateRangeSchema;
  }

  export const dateRange: DateRangeSchemaConstructor;
}

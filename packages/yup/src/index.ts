import { addMethod, array, number, object, string, Schema, ArraySchema, NumberSchema, ObjectSchema, StringSchema } from 'yup';

import isRequired from './isRequired';
import npi from './npi';
import phone from './phone';

export { avDate } from './date';
export { dateRange } from './dateRange';

addMethod(array, 'isRequired', isRequired);
addMethod(number, 'isRequired', isRequired);
addMethod(object, 'isRequired', isRequired);
addMethod(string, 'isRequired', isRequired);

addMethod(number, 'npi', npi);
addMethod(string, 'npi', npi);

addMethod(number, 'phone', phone);
addMethod(string, 'phone', phone);

// Add definitions to yup
declare module 'yup' {
  interface StringSchema {
    isRequired(required?: boolean, errorMessage?: string): this;
    npi(errorMessage?: string): this;
    phone(errorMessage?: string): this;
  }

  interface NumberSchema {
    isRequired(required?: boolean, errorMessage?: string): this;
    npi(errorMessage?: string): this;
    phone(errorMessage?: string): this;
  }

  interface ArraySchema<TIn, TContext, TDefault, TFlags> {
    isRequired(required?: boolean, errorMessage?: string): this;
  }

  interface ObjectSchema<TIn, TContext, TDefault, TFlags> {
    isRequired(required?: boolean, errorMessage?: string): this;
  }
}

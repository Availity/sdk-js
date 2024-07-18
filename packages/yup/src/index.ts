import { addMethod, array, number, object, string } from 'yup';
import { AnyObject, Maybe, Optionals } from 'yup/lib/types';
import BaseSchema, { AnySchema } from 'yup/lib/schema';
import { Asserts, TypeOf } from 'yup/lib/util/types';
import { AssertsShape, ObjectShape, TypeOfShape } from 'yup/lib/object';
import Lazy from 'yup/lib/Lazy';

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
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends BaseSchema<TType, TContext, TOut> {
    isRequired(required?: boolean, errorMessage?: string): StringSchema<TType, TContext>;
    npi(errorMessage?: string): StringSchema<TType, TContext>;
    phone(errorMessage?: string): StringSchema<TType, TContext>;
  }

  interface NumberSchema<
    TType extends Maybe<number> = number | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends BaseSchema<TType, TContext, TOut> {
    isRequired(required?: boolean, errorMessage?: string): NumberSchema<TType, TContext, TOut>;
    npi(errorMessage?: string): NumberSchema<TType, TContext, TOut>;
    phone(errorMessage?: string): NumberSchema<TType, TContext, TOut>;
  }

  interface ArraySchema<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends AnySchema | Lazy<any, any>,
    C extends AnyObject = AnyObject,
    TIn extends Maybe<TypeOf<T>[]> = TypeOf<T>[] | undefined,
    TOut extends Maybe<Asserts<T>[]> = Asserts<T>[] | Optionals<TIn>
  > extends BaseSchema<TIn, C, TOut> {
    isRequired(required?: boolean, errorMessage?: string): ArraySchema<T, C, TIn, TOut>;
  }

  interface ObjectSchema<
    TShape extends ObjectShape,
    TContext extends AnyObject = AnyObject,
    TIn extends Maybe<TypeOfShape<TShape>> = TypeOfShape<TShape>,
    TOut extends Maybe<AssertsShape<TShape>> = AssertsShape<TShape> | Optionals<TIn>
  > extends BaseSchema<TIn, TContext, TOut> {
    isRequired(required?: boolean, errorMessage?: string): ObjectSchema<TShape, TContext, TIn, TOut>;
  }
}

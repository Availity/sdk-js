import { addMethod, array, number, object, string } from 'yup';
import AvDateSchema from './date';
import DateRangeSchema from './dateRange';
import isRequired from './isRequired';
import npi from './npi';
import phone from './phone';

export const avDate = (opts) => new AvDateSchema(opts);
export const dateRange = (opts) => new DateRangeSchema(opts);

addMethod(array, 'isRequired', isRequired);
addMethod(number, 'isRequired', isRequired);
addMethod(object, 'isRequired', isRequired);
addMethod(string, 'isRequired', isRequired);

addMethod(number, 'npi', npi);
addMethod(string, 'npi', npi);

addMethod(number, 'phone', phone);
addMethod(string, 'phone', phone);

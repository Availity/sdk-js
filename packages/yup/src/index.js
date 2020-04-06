import { addMethod, array, number, object, string } from 'yup';
import isRequired from './isRequired';
import npi from './npi';
import phone from './phone';
import AvDate from './date';
import DateRange from './dateRange';

export const avDate = opts => new AvDate(opts);
export const dateRange = opts => new DateRange(opts);

addMethod(string, 'isRequired', isRequired);
addMethod(number, 'isRequired', isRequired);
addMethod(array, 'isRequired', isRequired);
addMethod(object, 'isRequired', isRequired);

addMethod(string, 'npi', npi);
addMethod(number, 'npi', npi);

addMethod(string, 'phone', phone);
addMethod(number, 'phone', phone);

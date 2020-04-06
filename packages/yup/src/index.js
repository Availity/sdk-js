import * as yup from 'yup';
import isRequired from './isRequired';
import npi from './npi';
import phone from './phone';
import AvDate from './date';
import DateRange from './dateRange';

export const avDate = opts => new AvDate(opts);
export const dateRange = opts => new DateRange(opts);

yup.addMethod(yup.string, 'isRequired', isRequired);
yup.addMethod(yup.number, 'isRequired', isRequired);
yup.addMethod(yup.array, 'isRequired', isRequired);
yup.addMethod(yup.object, 'isRequired', isRequired);

yup.addMethod(yup.string, 'npi', npi);
yup.addMethod(yup.number, 'npi', npi);

yup.addMethod(yup.string, 'phone', phone);
yup.addMethod(yup.number, 'phone', phone);

import * as yup from 'yup';
import between from './src/between';
import isRequired from './src/isRequired';
import npi from './src/npi';
import DayjsDate from './src/date';
import DateRange from './src/dateRange';

yup.addMethod(yup.string, 'isRequired', isRequired);
yup.addMethod(yup.number, 'isRequired', isRequired);
yup.addMethod(yup.array, 'isRequired', isRequired);

yup.addMethod(yup.string, 'between', between);

yup.addMethod(yup.string, 'npi', npi);
yup.addMethod(yup.number, 'npi', npi);

yup.date = opts => new DayjsDate(opts);
yup.dateRange = opts => new DateRange(opts);

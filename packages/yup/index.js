import * as yup from 'yup';
import dateRange from './src/dateRange';
import dateFormat from './src/dateFormat';
import between from './src/between';
import isRequired from './src/isRequired';
import npi from './src/npi';

yup.addMethod(yup.string, 'isRequired', isRequired);
yup.addMethod(yup.number, 'isRequired', isRequired);
yup.addMethod(yup.array, 'isRequired', isRequired);

yup.addMethod(yup.object, 'dateRange', dateRange);
yup.addMethod(yup.string, 'dateFormat', dateFormat);
yup.addMethod(yup.string, 'between', between);

yup.addMethod(yup.string, 'npi', npi);
yup.addMethod(yup.number, 'npi', npi);

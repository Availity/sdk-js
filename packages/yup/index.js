import * as yup from 'yup';
import isRequired from './src/isRequired';
import npi from './src/npi';

yup.addMethod(yup.string, 'isRequired', isRequired);
yup.addMethod(yup.number, 'isRequired', isRequired);
yup.addMethod(yup.array, 'isRequired', isRequired);

yup.addMethod(yup.string, 'npi', npi);
yup.addMethod(yup.number, 'npi', npi);

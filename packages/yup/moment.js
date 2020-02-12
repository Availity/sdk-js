import * as yup from 'yup';
import './src/index';

import MomentDate from './src/date';
import DateRange from './src/dateRange';

yup.avDate = opts => new MomentDate(opts);
yup.dateRange = opts => new DateRange(opts);

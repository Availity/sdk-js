import * as yup from 'yup';
import './index';

import MomentDate from './src/date';
import DateRange from './src/dateRange';

yup.date = opts => new MomentDate(opts);
yup.dateRange = opts => new DateRange(opts);

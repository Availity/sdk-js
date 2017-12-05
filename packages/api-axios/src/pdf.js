import axios from 'axios';
import { AvPdf } from '@availity/api-core';

export default new AvPdf(axios, Promise);

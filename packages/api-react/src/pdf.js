import axios from 'axios/dist/axios';
import { AvPdf } from '@availity/api-core';

export default new AvPdf(axios, Promise);

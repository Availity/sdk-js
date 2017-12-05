import axios from 'axios/dist/axios';
import { AvNavigation } from '@availity/api-core';

export default new AvNavigation(axios, Promise);

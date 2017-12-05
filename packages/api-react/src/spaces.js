import axios from 'axios/dist/axios';
import { AvSpaces } from '@availity/api-core';

export default new AvSpaces(axios, Promise);

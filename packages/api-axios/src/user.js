import axios from 'axios/dist/axios';
import { AvUsers } from '@availity/api-core';

export default new AvUsers(axios, Promise);

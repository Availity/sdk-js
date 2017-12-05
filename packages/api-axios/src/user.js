import axios from 'axios';
import { AvUsers } from '@availity/api-core';

export default new AvUsers(axios, Promise);

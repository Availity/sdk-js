import axios from 'axios/dist/axios';
import { AvPermissions } from '@availity/api-core';

export default new AvPermissions(axios, Promise);

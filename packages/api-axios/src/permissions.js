import axios from 'axios';
import { AvPermissions } from '@availity/api-core';

export default new AvPermissions(axios, Promise);

import axios from 'axios/dist/axios';
import { AvUserPermissions } from '@availity/api-core';

export default new AvUserPermissions(axios, Promise);

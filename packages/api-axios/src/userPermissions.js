import axios from 'axios';
import { AvUserPermissions } from '@availity/api-core';

export default new AvUserPermissions(axios, Promise);

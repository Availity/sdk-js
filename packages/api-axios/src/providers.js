import axios from 'axios/dist/axios';

import { AvProviders } from '@availity/api-core';

export default new AvProviders(axios, Promise);

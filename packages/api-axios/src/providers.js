import axios from 'axios';

import { AvProviders } from '@availity/api-core';

export default new AvProviders(axios, Promise);

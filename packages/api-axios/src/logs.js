import axios from 'axios/dist/axios';

import { AvLogMessages } from '@availity/api-core';

export default new AvLogMessages(axios, Promise);

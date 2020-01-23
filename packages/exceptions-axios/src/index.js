import { avLogMessagesApi } from '@availity/api-axios';

import AvExceptionsCore from '@availity/exceptions-core';

const avExceptionsAxios = new AvExceptionsCore(avLogMessagesApi.error);

export default avExceptionsAxios;

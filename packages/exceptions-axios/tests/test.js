import AvExceptionsCore from '@availity/exceptions-core';
import { avLogMessagesApi } from '@availity/api-axios';
import avExceptionsAxios from '../src/index';

describe('AvExceptionsAxios', () => {
  test('avExceptionsAxios be an instance of AvExceptionsCore', () => {
    expect(avExceptionsAxios).toBeInstanceOf(AvExceptionsCore);
  });

  test('avExceptionsAxios should be api-axios avLogMessagesApi error function', () => {
    expect(avExceptionsAxios.log).toBe(avLogMessagesApi.error);
  });
});

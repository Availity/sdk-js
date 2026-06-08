import { object } from 'yup';

import AvDateSchema, { avDate } from '../date';

describe('Date', () => {
  test('min validates', async () => {
    const schema = object().shape({
      date: avDate().min('2022-01-01'),
    });

    // Fail
    await expect(schema.validate({ date: '2021-01-01' })).rejects.toThrow('Date must be 2022-01-01 or later');

    // Pass
    await expect(schema.validate({ date: '2022-01-01' })).resolves.toBeDefined();
    await expect(schema.validate({ date: '2022-01-02' })).resolves.toBeDefined();
  });

  test('min allows custom error message', async () => {
    const errorMessage = 'There was an error';
    const schema = object().shape({
      date: avDate().min('2022-01-01', errorMessage),
    });

    // Fail
    await expect(schema.validate({ date: '2021-01-01' })).rejects.toThrow(errorMessage);

    // Pass
    await expect(schema.validate({ date: '2022-01-01' })).resolves.toBeDefined();
    await expect(schema.validate({ date: '2022-01-02' })).resolves.toBeDefined();
  });

  test('max validates', async () => {
    const schema = object().shape({
      date: avDate().max('2022-01-01'),
    });

    // Fail
    await expect(schema.validate({ date: '2022-01-02' })).rejects.toThrow('Date must be 2022-01-01 or earlier');
    // Pass
    await expect(schema.validate({ date: '2022-01-01' })).resolves.toBeDefined();
    await expect(schema.validate({ date: '2021-12-31' })).resolves.toBeDefined();
  });

  test('max allows custom error message', async () => {
    const errorMessage = 'There was an error';
    const schema = object().shape({
      date: avDate().max('2022-01-01', errorMessage),
    });

    // Fail
    await expect(schema.validate({ date: '2022-01-02' })).rejects.toThrow(errorMessage);
    // Pass
    await expect(schema.validate({ date: '2022-01-01' })).resolves.toBeDefined();
    await expect(schema.validate({ date: '2021-12-31' })).resolves.toBeDefined();
  });

  test('between validates', async () => {
    const min = '2022-01-01';
    const max = '2022-12-31';
    const errorMessage = `Date must be between ${min} and ${max}.`;

    const schema = object().shape({
      date: avDate().between(min, max),
    });

    // Fail
    await expect(schema.validate({ date: '2022-01-01' })).rejects.toThrow(errorMessage);
    await expect(schema.validate({ date: '2022-12-31' })).rejects.toThrow(errorMessage);
    // Pass
    await expect(schema.validate({ date: '2022-01-02' })).resolves.toBeTruthy();
    await expect(schema.validate({ date: '2022-12-30' })).resolves.toBeTruthy();
  });

  test('between allows custom inclusivity', async () => {
    const min = '2022-01-01';
    const max = '2022-01-31';
    const errorMessage = `Date must be between ${min} and ${max}.`;

    const schema = object().shape({
      '()': avDate().between(min, max, undefined, '()'),
      '(]': avDate().between(min, max, undefined, '(]'),
      '[)': avDate().between(min, max, undefined, '[)'),
      '[]': avDate().between(min, max, undefined, '[]'),
    });

    // Fail
    await expect(schema.validate({ '()': min })).rejects.toThrow(errorMessage);
    await expect(schema.validate({ '()': max })).rejects.toThrow(errorMessage);
    await expect(schema.validate({ '(]': min })).rejects.toThrow(errorMessage);
    await expect(schema.validate({ '(]': '2022-02-01' })).rejects.toThrow(errorMessage);
    await expect(schema.validate({ '[)': '2021-01-31' })).rejects.toThrow(errorMessage);
    await expect(schema.validate({ '[)': max })).rejects.toThrow(errorMessage);
    await expect(schema.validate({ '[]': '2021-01-31' })).rejects.toThrow(errorMessage);
    await expect(schema.validate({ '[]': '2022-02-01' })).rejects.toThrow(errorMessage);
    // Pass
    await expect(schema.validate({ '()': '2022-01-02' })).resolves.toBeTruthy();
    await expect(schema.validate({ '(]': max })).resolves.toBeTruthy();
    await expect(schema.validate({ '[)': min })).resolves.toBeTruthy();
    await expect(schema.validate({ '[]': min })).resolves.toBeTruthy();
    await expect(schema.validate({ '[]': max })).resolves.toBeTruthy();
  });

  test('between allows custom error message', async () => {
    const min = '2022-01-01';
    const max = '2022-12-31';
    const errorMessage = 'There was an error';
    const schema = object().shape({
      date: avDate().between(min, max, errorMessage),
    });

    // Fail
    await expect(schema.validate({ date: '2022-01-01' })).rejects.toThrow(errorMessage);
    await expect(schema.validate({ date: '2022-12-31' })).rejects.toThrow(errorMessage);
    // Pass
    await expect(schema.validate({ date: '2022-01-02' })).resolves.toBeTruthy();
    await expect(schema.validate({ date: '2022-12-30' })).resolves.toBeTruthy();
  });

  test('isRequired validates', async () => {
    const schema = object().shape({
      date: avDate().isRequired(true),
      notRequired: avDate().isRequired(false),
    });

    // Fail
    await expect(schema.validate({ date: '' })).rejects.toThrow('This field is required.');
    await expect(schema.validate({ date: undefined })).rejects.toThrow('This field is required.');

    // Pass
    await expect(schema.validate({ date: '2022-01-01' })).resolves.toBeDefined();
  });

  test('isRequired allows custom error message', async () => {
    const errorMessage = 'There was an error';
    const schema = object().shape({
      date: avDate().isRequired(true, errorMessage),
    });

    // Fail
    await expect(schema.validate({ date: '' })).rejects.toThrow(errorMessage);
    await expect(schema.validate({ date: undefined })).rejects.toThrow(errorMessage);

    // Pass
    await expect(schema.validate({ date: '2022-01-01' })).resolves.toBeDefined();
  });

  test('do not allow unsupported formats', async () => {
    const schema = object().shape({
      date: avDate(),
    });

    await expect(schema.validate({ date: '2022 01 01' })).rejects.toThrow('The date entered is in an invalid format.');
  });

  test('allow adding additional formats', async () => {
    const schema = object().shape({
      date: avDate({ format: ['YYYY MM DD'] }),
      other: avDate({ format: 'YYYY MM DD' }),
    });

    await expect(schema.validate({ date: '2022 01 01' })).resolves.toBeDefined();
    await expect(schema.validate({ date: '2022 01 01' })).resolves.toBeDefined();
  });

  test('allow customizing typeError message', async () => {
    const typeError = 'This is an error';
    const schema = object().shape({
      date: avDate({ typeError }),
      other: avDate().typeError(typeError),
    });

    await expect(schema.validate({ date: '2022 01 01' })).rejects.toThrow(typeError);
    await expect(schema.validate({ other: '2022 01 01' })).rejects.toThrow(typeError);
  });

  test('can chain validation', async () => {
    const schema = object().shape({
      date: avDate().min('2022-01-01').max('2022-01-31').isRequired(),
      other: avDate().between('2022-01-01', '2022-01-31').isRequired(false),
    });

    // Fail
    await expect(schema.validate({ date: '2021-12-31' })).rejects.toThrow('Date must be 2022-01-01 or later'); // min
    await expect(schema.validate({ date: '2022-02-01' })).rejects.toThrow('Date must be 2022-01-31 or earlier'); // max
    await expect(schema.validate({ date: '2022-01-03', other: '2021-12-31' })).rejects.toThrow(
      'Date must be between 2022-01-01 and 2022-01-31'
    ); // between
    await expect(schema.validate({ date: '2022-01-03', other: '2022-02-01' })).rejects.toThrow(
      'Date must be between 2022-01-01 and 2022-01-31'
    ); // between
    await expect(schema.validate({ date: '' })).rejects.toThrow('This field is required'); // isRequired

    // Pass
    await expect(schema.validate({ date: '2022-01-03' })).resolves.toBeTruthy(); // min and max
    await expect(schema.validate({ date: '2022-01-03', other: '2022-01-03' })).resolves.toBeTruthy(); // between
    await expect(schema.validate({ date: '2022-01-03', other: '' })).resolves.toBeTruthy(); // isRequired
  });

  test('validates conditionally', async () => {
    const schema = object({
      other: avDate(),
      date: avDate().when('other', ([other]: [string], schema: AvDateSchema) => (other ? schema.min(other) : schema)),
    });

    await expect(schema.isValid({ other: '12/01/2020', date: '12/31/2020' })).resolves.toBeTruthy();
    await expect(schema.isValid({ other: '12/01/2020', date: '12/31/2019' })).resolves.toBeFalsy();
    await expect(schema.isValid({ date: '12/31/2019' })).resolves.toBeTruthy();
  });

  test('past validates', async () => {
    const schema = object().shape({
      date: avDate().past(),
    });

    // Fail - future date
    await expect(schema.validate({ date: '01/01/2099' })).rejects.toThrow('Date must be in the past.');

    // Fail - today's date
    const today = new Date();
    const todayStr = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${today.getFullYear()}`;
    await expect(schema.validate({ date: todayStr })).rejects.toThrow('Date must be in the past.');

    // Pass - past date
    await expect(schema.validate({ date: '01/01/2020' })).resolves.toBeDefined();

    // Pass - invalid date skips validation
    await expect(schema.validate({ date: '' })).resolves.toBeDefined();
  });

  test('past allows custom error message', async () => {
    const errorMessage = 'Must be a past date';
    const schema = object().shape({
      date: avDate().past(errorMessage),
    });

    await expect(schema.validate({ date: '01/01/2099' })).rejects.toThrow(errorMessage);
  });

  test('future validates', async () => {
    const schema = object().shape({
      date: avDate().future(),
    });

    // Fail - past date
    await expect(schema.validate({ date: '01/01/2020' })).rejects.toThrow('Date must be in the future.');

    // Fail - today's date
    const today = new Date();
    const todayStr = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${today.getFullYear()}`;
    await expect(schema.validate({ date: todayStr })).rejects.toThrow('Date must be in the future.');

    // Pass - future date
    await expect(schema.validate({ date: '01/01/2099' })).resolves.toBeDefined();

    // Pass - invalid date skips validation
    await expect(schema.validate({ date: '' })).resolves.toBeDefined();
  });

  test('future allows custom error message', async () => {
    const errorMessage = 'Must be a future date';
    const schema = object().shape({
      date: avDate().future(errorMessage),
    });

    await expect(schema.validate({ date: '01/01/2020' })).rejects.toThrow(errorMessage);
  });

  test('min works with MM/DD/YYYY format', async () => {
    const schema = object().shape({
      date: avDate().min('12/15/2022'),
    });

    await expect(schema.validate({ date: '12/14/2022' })).rejects.toThrow('Date must be 12/15/2022 or later');
    await expect(schema.validate({ date: '12/15/2022' })).resolves.toBeDefined();
  });

  test('handles null input', async () => {
    const schema = object().shape({
      date: avDate().isRequired(),
    });

    await expect(schema.validate({ date: null })).rejects.toThrow('The date entered is in an invalid format.');
  });
});

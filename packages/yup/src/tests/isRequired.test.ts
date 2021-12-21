import { array, number, object, string } from 'yup';

import '..';

describe('isRequired', () => {
  test('should extend string schema', async () => {
    const required = string().isRequired();
    expect(await required.isValid('test')).toBe(true);
    expect(await required.isValid('')).toBe(false);
    expect(await required.isValid(undefined)).toBe(false);

    const notRequired = string().isRequired(false);
    expect(await notRequired.isValid('test')).toBe(true);
    expect(await notRequired.isValid('')).toBe(true);
    expect(await notRequired.isValid(undefined)).toBe(true);
  });

  test('should extend number schema', async () => {
    const required = number().isRequired();
    expect(await required.isValid(0)).toBe(true);
    expect(await required.isValid(1)).toBe(true);
    expect(await required.isValid(undefined)).toBe(false);
    expect(await required.isValid(null)).toBe(false);

    const notRequired = number().isRequired(false);
    expect(await notRequired.isValid(0)).toBe(true);
    expect(await notRequired.isValid(1)).toBe(true);
    expect(await notRequired.isValid(undefined)).toBe(true);
    expect(await notRequired.isValid(null)).toBe(false);
  });

  test('should extend array schema', async () => {
    const required = array().isRequired();
    expect(await required.isValid(['test'])).toBe(true);
    expect(await required.isValid([])).toBe(false);
    expect(await required.isValid(undefined)).toBe(false);
    expect(await required.isValid(null)).toBe(false);

    const notRequired = array().isRequired(false);
    expect(await notRequired.isValid(['test'])).toBe(true);
    expect(await notRequired.isValid([])).toBe(true);
    expect(await notRequired.isValid(undefined)).toBe(true);
    expect(await notRequired.isValid(null)).toBe(false);
  });

  test('should extend object schema', async () => {
    const required = object().isRequired();
    expect(await required.isValid({})).toBe(true);
    expect(await required.isValid(undefined)).toBe(false);
    expect(await required.isValid(null)).toBe(false);

    const notRequired = object().isRequired(false);
    expect(await notRequired.isValid({})).toBe(true);
    expect(await notRequired.isValid(undefined)).toBe(true);
    expect(await notRequired.isValid(null)).toBe(false);
  });

  test('should accept null input', async () => {
    const stringSchema = string().isRequired().nullable();
    expect(await stringSchema.isValid(null)).toBe(true);

    const numberSchema = number().isRequired().nullable();
    expect(await numberSchema.isValid(null)).toBe(true);

    const arraySchema = array().isRequired().nullable();
    expect(await arraySchema.isValid(null)).toBe(true);

    const objectSchema = object().isRequired().nullable();
    expect(await objectSchema.isValid(null)).toBe(true);
  });

  test('should render custom error message', async () => {
    const schema = string().isRequired();
    await expect(schema.validate(undefined)).rejects.toThrow('This field is required.');

    const custom = string().isRequired(true, 'Test Error Message');
    await expect(custom.validate(undefined)).rejects.toThrow('Test Error Message');
  });
});

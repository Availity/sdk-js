import { number, string } from 'yup';

import '..';

describe('npi', () => {
  test('should be valid for empty input', async () => {
    const stringSchema = string().npi();
    expect(await stringSchema.isValid('')).toBe(true);
    expect(await stringSchema.isValid(undefined)).toBe(true);
    expect(await stringSchema.isValid(null)).toBe(false);

    const numSchema = number().npi();
    expect(await numSchema.isValid(0)).toBe(true);
    expect(await numSchema.isValid(undefined)).toBe(true);
    expect(await numSchema.isValid(null)).toBe(false);
  });

  test('should accept null input', async () => {
    const stringSchema = string().npi().nullable();
    expect(await stringSchema.isValid(null)).toBe(true);

    const numSchema = number().npi().nullable();
    expect(await numSchema.isValid(null)).toBe(true);
  });

  test('should identify invalid input', async () => {
    const stringSchema = string().npi();
    expect(await stringSchema.isValid('1234')).toBe(false);

    const numSchema = number().npi();
    expect(await numSchema.isValid(1234)).toBe(false);
  });

  test('should be invalid if NPI contains non-digits', async () => {
    const schema = string().npi();
    expect(await schema.isValid('i2eh56789o')).toBe(false);
  });

  test('should be invalid if NPI is not 10 digits in length', async () => {
    const stringSchema = string().npi();
    expect(await stringSchema.isValid('123456789')).toBe(false);
    expect(await stringSchema.isValid('12345678901')).toBe(false);

    const numSchema = number().npi();
    expect(await numSchema.isValid(123456789)).toBe(false);
    expect(await numSchema.isValid(12345678901)).toBe(false);
  });

  test('should be invalid if NPI does not start with a 1, 2, 3, or 4', async () => {
    const stringSchema = string().npi();
    expect(await stringSchema.isValid('5678901234')).toBe(false);

    const numSchema = number().npi();
    expect(await numSchema.isValid(5678901234)).toBe(false);
  });

  test('should be invalid if NPI checksum does not match check digit', async () => {
    const schema = string().npi();
    expect(await schema.isValid('1234567890')).toBe(false);

    const numSchema = number().npi();
    expect(await numSchema.isValid(1234567890)).toBe(false);
  });

  test('should be valid if NPI is valid', async () => {
    const stringSchema = string().npi();
    expect(await stringSchema.isValid('1234567893')).toBe(true);

    const numSchema = number().npi();
    expect(await numSchema.isValid(1234567893)).toBe(true);
  });

  test('should render custom error message', async () => {
    const stringSchema = string().npi('Test Error Message');
    await expect(stringSchema.validate('123')).rejects.toThrow('Test Error Message');

    const numSchema = number().npi('Test Error Message');
    await expect(numSchema.validate(123)).rejects.toThrow('Test Error Message');
  });
});

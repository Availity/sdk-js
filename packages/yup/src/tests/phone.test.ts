import { number, string } from 'yup';

import '..';

describe('phone', () => {
  test('should accept empty string', async () => {
    const schema = string().phone();

    expect(await schema.isValid('')).toBe(true);
    expect(await schema.isValid(undefined)).toBe(true);
  });

  test('should accept no number', async () => {
    const schema = number().phone();

    expect(await schema.isValid(0)).toBe(true);
    expect(await schema.isValid(undefined)).toBe(true);
  });

  test('should accept null input', async () => {
    const noNullString = string().phone();
    expect(await noNullString.isValid(null)).toBe(false);

    const noNullNumber = number().phone();
    expect(await noNullNumber.isValid(null)).toBe(false);

    const nullableString = string().phone().nullable();
    expect(await nullableString.isValid(null)).toBe(true);

    const nullableNum = number().phone().nullable();
    expect(await nullableNum.isValid(null)).toBe(true);
  });

  test('should not accept less than 10 digits', async () => {
    const numberSchema = number().phone();
    expect(await numberSchema.isValid(123456789)).toBe(false);

    const stringSchema = string().phone();
    expect(await stringSchema.isValid('123456789')).toBe(false);
  });

  test('should accept country code of "+1" and variations', async () => {
    const schema = string().phone();

    expect(await schema.isValid('+14444444444')).toBe(true);
    expect(await schema.isValid('14444444444')).toBe(true);
    expect(await schema.isValid('+1 4444444444')).toBe(true);
    expect(await schema.isValid('1 4444444444')).toBe(true);
  });

  test('must be 10 digits without country code', async () => {
    const schema = number().phone();

    expect(await schema.isValid('4444444444')).toBe(true);
    expect(await schema.isValid('444 444 4444')).toBe(true);
    expect(await schema.isValid('44444444445')).toBe(false);
  });

  test('can be formatted', async () => {
    const schema = string().phone();

    expect(await schema.isValid('(444) 444-4444')).toBe(true);
    expect(await schema.isValid('+1 (444) 444-4444')).toBe(true);
    expect(await schema.isValid('444-444-4444')).toBe(true);
    expect(await schema.isValid('+1 444-444-4444')).toBe(true);
    expect(await schema.isValid('444.444.4444')).toBe(true);
    expect(await schema.isValid('(444) 444 4444')).toBe(true);
  });

  test('should display custom error message', async () => {
    const schema = number().phone('Custom Error Message');
    await expect(schema.validate('123321')).rejects.toThrow('Custom Error Message');
  });
});

import { number, string } from 'yup';
import '..';

describe('phone', () => {
  test('should accept empty string', async () => {
    const schema = string().phone();
    const valid = await schema.isValid('');
    expect(valid).toBe(true);
  });

  test('should accept no number', async () => {
    const schema = number().phone();
    const valid = await schema.isValid();
    expect(valid).toBe(true);
  });

  test('should accept null input', async () => {
    const schema = string().phone().nullable();
    const valid = await schema.isValid();
    expect(valid).toBe(true);
  });

  test('should not accept less than 10 digits', async () => {
    const schema = number().phone();
    const valid = await schema.isValid('123456789');
    expect(valid).toBe(false);
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

import * as yup from 'yup';
import '..';

describe('npi', () => {
  test('should be valid for empty input', async () => {
    const schema = yup.string().npi();

    const valid = await schema.isValid('');

    expect(valid).toBe(true);
  });

  test('should be valid for no number', async () => {
    const schema = yup.number().npi();

    const valid = await schema.isValid();

    expect(valid).toBe(true);
  });

  test('should accept null input', async () => {
    const schema = yup
      .string()
      .npi()
      .nullable();

    const valid = await schema.isValid(null);

    expect(valid).toBe(true);
  });

  test('should be invalid for invalid input', async () => {
    const schema = yup.string().npi();

    const valid = await schema.isValid('1234');

    expect(valid).toBe(false);
  });

  test('should be invalid if NPI contains non-digits', async () => {
    const schema = yup.number().npi();
    const valid = await schema.isValid('i2eh56789o');
    expect(valid).toBe(false);
    });

  test('should be invalid if NPI is not 10 digits in length', async () => {
    const schema = yup.number().npi();
    let valid = await schema.isValid('123456789');
    expect(valid).toBe(false);

    valid = await schema.isValid('12345678901');
    expect(valid).toBe(false);
  });

  test('should be invalid if NPI does not start with a 1, 2, 3, or 4', async () => {
    const schema = yup.number().npi();
    const valid = await schema.isValid('5678901234');
    expect(valid).toBe(false);
  });

  test('should be invalid if NPI checksum does not match check digit', async () => {
    const schema = yup.number().npi();
    const valid = await schema.isValid('1234567890');
    expect(valid).toBe(false);
  });

  test('should be valid if NPI is valid', async () => {
    const schema = yup.number().npi();
    const valid = await schema.isValid('1234567893');
    expect(valid).toBe(true);
  });

  test('should render custom error message', async () => {
    const schema = yup.number().npi('Test Error Message');

    await expect(schema.validate('123')).rejects.toThrow(
      'Test Error Message'
    );
  });
});

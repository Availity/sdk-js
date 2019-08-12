import * as yup from 'yup';
import '..';

describe('isRequired', () => {
  test('should return error on empty input', async () => {
    const schema = yup.string().isRequired();

    const valid = await schema.isValid('');

    expect(valid).toBe(false);
  });

  test('should return error on no number', async () => {
    const schema = yup.number().isRequired();

    const valid = await schema.isValid(null);

    expect(valid).toBe(false);
  });

  test('should return error on empty array', async () => {
    const schema = yup.array().isRequired();

    const valid = await schema.isValid([]);

    expect(valid).toBe(false);
  });

  test('should accept null input', async () => {
    const schema = yup
      .string()
      .isRequired(true)
      .nullable();

    const valid = await schema.isValid(null);

    expect(valid).toBe(true);
  });

  test('should accept input', async () => {
    const schema = yup.string().isRequired(true);

    const valid = await schema.isValid('Test');

    expect(valid).toBe(true);
  });

  test('should render custom error message', async () => {
    const schema = yup.string().isRequired(true, 'Test Error Message');

    await expect(schema.validate()).rejects.toThrow('Test Error Message');
  });
});

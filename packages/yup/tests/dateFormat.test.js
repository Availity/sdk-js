import * as yup from 'yup';
import '..';

describe('date', () => {
  test('should validate', async () => {
    const schema = yup
      .string()
      .dateFormat()
      .required();

    const valid = await schema.isValid('12/12/2012');

    expect(valid).toBe(true);
  });

  test('should return error if invalid', async () => {
    const schema = yup
      .string()
      .dateFormat()
      .required();

    const valid = await schema.isValid('12/12/201');
    expect(valid).toBe(false);
  });

  test('should render custom error message', async () => {
    const schema = yup.string().dateFormat('MM/DD/YYYY', 'Test Error Message');

    await expect(schema.validate('12/02/202')).rejects.toThrow(
      'Test Error Message'
    );
  });
});

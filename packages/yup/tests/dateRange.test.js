import * as yup from 'yup';
import '..';

describe('date', () => {
  test('should validate', async () => {
    const schema = yup
      .object()
      .shape({
        startDate: yup.string().isRequired(),
        endDate: yup.string().isRequired(),
      })
      .dateRange({
        min: '12/10/2012',
        max: '12/13/2012',
      });

    const valid = await schema.isValid({
      startDate: '12/11/2012',
      endDate: '12/12/2012',
    });

    expect(valid).toBe(true);
  });

  test('should return error if invalid', async () => {
    const schema = yup
      .string()
      .dateFormat()
      .required();

    const valid = await schema.isValid('12/12/20122');

    expect(valid).toBe(false);
  });

  test('should render custom error message', async () => {
    const schema = yup.string().dateFormat('MM/DD/YYYY', 'Test Error Message');

    await expect(schema.validate('12/02/20122')).rejects.toThrow(
      'Test Error Message'
    );
  });
});

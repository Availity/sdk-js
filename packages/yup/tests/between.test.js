import * as yup from 'yup';
import '..';

describe('date', () => {
  test('should validate', async () => {
    const schema = yup.string().between({
      min: '12/10/2012',
      max: '12/13/2012',
    });

    const valid = await schema.isValid('12/11/2012');

    expect(valid).toBe(true);
  });
});

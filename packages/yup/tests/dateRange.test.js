import '..';
import * as yup from 'yup';

describe('DateRange', () => {
  test('start comes before end', async () => {
    const schema = yup.dateRange();

    await expect(
      schema.validate({
        startDate: '12/14/2012',
        endDate: '12/13/2012',
      })
    ).rejects.toThrow('Start date must come before end date.');
  });

  test('Invalid Dates', async () => {
    const schema = yup.dateRange();

    try {
      await schema.validate({
        startDate: '',
        endDate: '12/14/2012',
      });
    } catch (error) {
      expect(error.message).toBe('Start and End Date are required.');
    }
  });

  test('defines min', async () => {
    const schema = yup.dateRange().min('12/12/2012');

    const valid = await schema.isValid({
      startDate: '12/13/2012',
      endDate: '12/14/2012',
    });

    expect(valid).toBe(true);
  });

  test('errors on invalid', async () => {
    const schema = yup.dateRange().min('12/12/2012');

    const valid = await schema.isValid({
      startDate: '12/11/2012',
      endDate: '12/13/2012',
    });

    expect(valid).toBe(false);
  });
});

describe('date', () => {
  test('should validate', async () => {
    const schema = yup.dateRange({
      min: '12/10/2012',
      max: '12/13/2012',
    });

    const valid = await schema.isValid({
      startDate: '12/11/2012',
      endDate: '12/12/2012',
    });

    expect(valid).toBe(true);
  });

  test('should work with custom value keys', async () => {
    const schema = yup.dateRange({
      min: '12/10/2012',
      max: '12/13/2012',
      start: 'helloDate',
      end: 'worldDate',
    });

    const valid = await schema.isValid({
      helloDate: '12/11/2012',
      worldDate: '12/12/2012',
    });

    expect(valid).toBe(true);
  });
});

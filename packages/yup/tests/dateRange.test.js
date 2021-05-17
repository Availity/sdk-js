import { dateRange } from '../src';

describe('DateRange', () => {
  test('start comes before end', async () => {
    const schema = dateRange();

    await expect(
      schema.validate({
        startDate: '12/14/2012',
        endDate: '12/13/2012',
      })
    ).rejects.toThrow('Start date must come before end date.');
  });

  test('Invalid Dates', async () => {
    const schema = dateRange();

    await expect(
      schema.validate({
        startDate: '',
        endDate: '12/14/2012',
      })
    ).rejects.toThrow('Start and End Date are required.');
  });

  test('defines min', async () => {
    const schema = dateRange().min('12/12/2012');

    const valid = await schema.isValid({
      startDate: '12/13/2012',
      endDate: '12/14/2012',
    });

    expect(valid).toBe(true);
  });

  test('errors on invalid', async () => {
    const schema = dateRange().min('12/12/2012');

    const valid = await schema.isValid({
      startDate: '12/11/2012',
      endDate: '12/13/2012',
    });

    expect(valid).toBe(false);
  });
});

describe('date', () => {
  test('should validate', async () => {
    const schema = dateRange().between('12/10/2012', '12/13/2012');

    const valid = await schema.isValid({
      startDate: '12/11/2012',
      endDate: '12/12/2012',
    });

    expect(valid).toBe(true);
  });

  test('should work with custom value keys', async () => {
    const schema = dateRange({
      startKey: 'helloDate',
      endKey: 'worldDate',
    }).between('12/10/2012', '12/13/2012');

    const valid = await schema.isValid({
      helloDate: '12/11/2012',
      worldDate: '12/12/2012',
    });

    expect(valid).toBe(true);
  });

  test('should validate distance', async () => {
    const schema = dateRange().distance({
      min: {
        value: 5,
        units: 'day',
      },
    });

    let valid = await schema.isValid({
      startDate: '12/11/2012',
      endDate: '12/13/2012',
    });

    expect(valid).toBe(false);

    valid = await schema.isValid({
      startDate: '12/11/2012',
      endDate: '12/18/2012',
    });

    expect(valid).toBe(true);
  });
});

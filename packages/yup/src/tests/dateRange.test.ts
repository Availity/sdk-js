import { object, string } from 'yup';

import { dateRange } from '..';
import DateRangeSchema from '../dateRange';

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

  test('Custom type error message', async () => {
    const schema = dateRange().typeError({ message: 'Custom Error Message' });

    await expect(
      schema.validate({
        startDate: '',
        endDate: '12/14/2012',
      })
    ).rejects.toThrow('Custom Error Message');
  });

  test('startDate comes after min', async () => {
    const schema = dateRange().min('12/12/2012');

    const valid = await schema.isValid({
      startDate: '12/13/2012',
      endDate: '12/14/2012',
    });

    const invalid = await schema.isValid({
      startDate: '12/11/2012',
      endDate: '12/14/2012',
    });

    expect(valid).toBe(true);
    expect(invalid).toBe(false);
  });

  test('dates are between given range', async () => {
    const schema = dateRange().between('12/10/2012', '12/13/2012');

    const valid = await schema.isValid({
      startDate: '12/11/2012',
      endDate: '12/12/2012',
    });

    const invalid = await schema.isValid({
      startDate: '12/09/2012',
      endDate: '12/13/2012',
    });

    expect(valid).toBe(true);
    expect(invalid).toBe(false);
  });

  test('allow custom startDate and endDate keys', async () => {
    const schema = dateRange({
      startKey: 'helloDate',
      endKey: 'worldDate',
    }).isRequired();

    const valid = await schema.isValid({
      helloDate: '12/11/2012',
      worldDate: '12/12/2012',
    });

    const invalid = await schema.isValid({
      startDate: '12/11/2012',
      endDate: '12/12/2012',
    });

    expect(valid).toBe(true);
    expect(invalid).toBe(false);
  });

  test('getValidDate returns moment object', () => {
    const schema = new DateRangeSchema();

    // valid formats
    expect(schema.getValidDate('12/12/2012').isValid()).toBe(true);
    expect(schema.getValidDate('2012-12-12').isValid()).toBe(true);
    expect(schema.getValidDate('12122012').isValid()).toBe(true);
    expect(schema.getValidDate('20121212').isValid()).toBe(true);
    expect(schema.getValidDate(new Date()).isValid()).toBe(true);

    // invalid formats
    // @ts-expect-error: testing invalid input
    expect(schema.getValidDate(null).isValid()).toBe(false);
    // @ts-expect-error: testing invalid input
    expect(schema.getValidDate(undefined).isValid()).toBe(false);
    expect(schema.getValidDate('').isValid()).toBe(false);
    expect(schema.getValidDate('foo').isValid()).toBe(false);
  });

  test('validates conditionally', async () => {
    const schema = object().shape({
      min: string(),
      max: string(),
      // @ts-expect-error: yup types are not correct and complain about this being invalid syntax
      range: dateRange().when(['min', 'max'], (min: string, max: string, schema: DateRangeSchema) =>
        min !== '' ? schema.min(min) : schema.max(max)
      ),
    });

    // Valid
    // min present and startDate is after
    expect(
      await schema.isValid({
        range: {
          startDate: '12/13/2012',
          endDate: '12/14/2012',
        },
        min: '12/12/2012',
      })
    ).toBe(true);
    // max is present and endDate is before
    expect(
      await schema.isValid({
        range: {
          startDate: '12/13/2012',
          endDate: '12/14/2012',
        },
        max: '12/15/2012',
      })
    ).toBe(true);

    // Invalid
    // min is present and startDate is before
    expect(
      await schema.isValid({
        range: {
          startDate: '12/11/2012',
          endDate: '12/14/2012',
        },
        min: '12/12/2012',
      })
    ).toBe(false);
    // max is present and endDate is afterwards
    expect(
      await schema.isValid({
        range: {
          startDate: '12/13/2012',
          endDate: '12/14/2012',
        },
        max: '12/13/2012',
      })
    ).toBe(true);
  });

  test('should validate distance', async () => {
    const schema = dateRange().distance({
      min: {
        value: 5,
        units: 'day',
      },
    });

    const valid = await schema.isValid({
      startDate: '12/11/2012',
      endDate: '12/18/2012',
    });

    const invalid = await schema.isValid({
      startDate: '12/11/2012',
      endDate: '12/13/2012',
    });

    expect(valid).toBe(true);
    expect(invalid).toBe(false);
  });
});

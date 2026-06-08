import { object, string } from 'yup';

import DateRangeSchema, { dateRange } from '../dateRange';

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

  test('getValidDate returns dayjs object', () => {
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
      range: dateRange().when(['min', 'max'], ([min, max]: [string, string], schema: DateRangeSchema) => {
        if (min) schema = schema.min(min);
        if (max) schema = schema.max(max);
        return schema;
      }),
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
    // max is present and endDate is after max
    expect(
      await schema.isValid({
        range: {
          startDate: '12/13/2012',
          endDate: '12/14/2012',
        },
        max: '12/13/2012',
      })
    ).toBe(false);
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

  test('endDate comes before max', async () => {
    const schema = dateRange().max('12/15/2012');

    const valid = await schema.isValid({
      startDate: '12/11/2012',
      endDate: '12/14/2012',
    });

    const invalid = await schema.isValid({
      startDate: '12/11/2012',
      endDate: '12/16/2012',
    });

    expect(valid).toBe(true);
    expect(invalid).toBe(false);
  });

  test('max allows custom error message', async () => {
    const schema = dateRange().max('12/15/2012', 'End date is too late');

    await expect(
      schema.validate({
        startDate: '12/11/2012',
        endDate: '12/16/2012',
      })
    ).rejects.toThrow('End date is too late');
  });

  test('min allows custom error message', async () => {
    const schema = dateRange().min('12/15/2012', 'Start date is too early');

    await expect(
      schema.validate({
        startDate: '12/11/2012',
        endDate: '12/16/2012',
      })
    ).rejects.toThrow('Start date is too early');
  });

  test('between allows custom error message', async () => {
    const schema = dateRange().between('12/10/2012', '12/13/2012', 'Dates out of range');

    await expect(
      schema.validate({
        startDate: '12/09/2012',
        endDate: '12/12/2012',
      })
    ).rejects.toThrow('Dates out of range');
  });

  test('distance validates max', async () => {
    const schema = dateRange().distance({
      max: {
        value: 30,
        units: 'day',
      },
    });

    const valid = await schema.isValid({
      startDate: '12/01/2012',
      endDate: '12/20/2012',
    });

    const invalid = await schema.isValid({
      startDate: '12/01/2012',
      endDate: '01/15/2013',
    });

    expect(valid).toBe(true);
    expect(invalid).toBe(false);
  });

  test('distance validates min and max together', async () => {
    const schema = dateRange().distance({
      min: { value: 3, units: 'day' },
      max: { value: 10, units: 'day' },
    });

    // Valid - 5 days apart
    expect(
      await schema.isValid({
        startDate: '12/01/2012',
        endDate: '12/06/2012',
      })
    ).toBe(true);

    // Invalid - too short (1 day)
    expect(
      await schema.isValid({
        startDate: '12/01/2012',
        endDate: '12/02/2012',
      })
    ).toBe(false);

    // Invalid - too long (15 days)
    expect(
      await schema.isValid({
        startDate: '12/01/2012',
        endDate: '12/16/2012',
      })
    ).toBe(false);
  });

  test('distance custom error messages', async () => {
    const schema = dateRange().distance({
      min: { value: 5, units: 'day', errorMessage: 'Too short' },
      max: { value: 10, units: 'day', errorMessage: 'Too long' },
    });

    await expect(
      schema.validate({ startDate: '12/01/2012', endDate: '12/02/2012' })
    ).rejects.toThrow('Too short');

    await expect(
      schema.validate({ startDate: '12/01/2012', endDate: '12/20/2012' })
    ).rejects.toThrow('Too long');
  });

  test('isRequired validates', async () => {
    const schema = dateRange().isRequired();

    // Invalid - missing dates
    expect(await schema.isValid({})).toBe(false);
    expect(await schema.isValid({ startDate: '12/01/2012' })).toBe(false);
    expect(await schema.isValid({ endDate: '12/01/2012' })).toBe(false);

    // Valid
    expect(
      await schema.isValid({ startDate: '12/01/2012', endDate: '12/02/2012' })
    ).toBe(true);
  });

  test('isRequired allows custom error message', async () => {
    const schema = dateRange().isRequired(true, 'Range is required');

    await expect(schema.validate({})).rejects.toThrow('Range is required');
  });

  test('isRequired can be disabled', async () => {
    const schema = dateRange().isRequired(false);

    expect(await schema.isValid({})).toBe(true);
  });
});

import { avDate } from '..';

const INVALID = 'Date is invalid.';

const defaults = {};

const validate = async (date, { format, min, max, message, inclusivity, customErrorMessage } = defaults) => {
  let schema = avDate({
    format,
  });

  if (min && !max) {
    schema = schema.min(min, message);
  }

  if (max && !min) {
    schema = schema.max(max, message);
  }

  if (min && max) {
    schema = inclusivity ? schema.between(min, max, message, inclusivity) : schema.between(min, max, message);
  }

  if (customErrorMessage) {
    schema = schema.typeError(customErrorMessage);
  }

  return schema.validate(date);
};

describe('Date', () => {
  test('valid', async () => {
    await expect(validate('12/12/2012')).resolves.toBeTruthy();
    await expect(validate('12-12-2012')).resolves.toBeTruthy();
    await expect(validate('2012/12/12', { format: 'YYYY/MM/DD' })).resolves.toBeTruthy();
    await expect(validate('20121212', { format: 'YYYYMMDD' })).resolves.toBeTruthy();
  });

  test('invalid', async () => {
    await expect(validate('2012')).rejects.toThrow(INVALID);
    await expect(validate('12-2012')).rejects.toThrow(INVALID);
    await expect(validate('12-2012-12')).rejects.toThrow(INVALID);
    await expect(validate('invalid-date')).rejects.toThrow(INVALID);
    await expect(validate('01/01/20011')).rejects.toThrow(INVALID);

    // Allow user to clear date field without showing typeError
    await expect(validate('')).resolves.toBeTruthy();

    // With custom message
    await expect(validate('invalid-date', { customErrorMessage: 'custom error message' })).rejects.toThrow(
      'custom error message'
    );
  });

  test('min date', async () => {
    await expect(
      validate('12/12/2012', {
        min: '12/11/2012',
      })
    ).resolves.toBeTruthy();

    await expect(
      validate('12/12/2012', {
        min: '12/12/2012',
      })
    ).resolves.toBeTruthy();

    await expect(
      validate('12/10/2012', {
        min: '12/11/2012',
      })
    ).rejects.toThrow(`Date must be 12/11/2012 or later.`);

    await expect(
      validate('2012/12/12', {
        min: '2012/12/11',
        format: 'YYYY/MM/DD',
      })
    ).resolves.toBeTruthy();

    await expect(
      validate('2012/12/10', {
        min: '2012/12/11',
        format: 'YYYY/MM/DD',
      })
    ).rejects.toThrow();
  });

  test('max date', async () => {
    await expect(
      validate('12/11/2012', {
        max: '12/12/2012',
      })
    ).resolves.toBeTruthy();

    await expect(
      validate('12/12/2012', {
        max: '12/12/2012',
      })
    ).resolves.toBeTruthy();

    await expect(
      validate('12/12/2012', {
        max: '12/11/2012',
      })
    ).rejects.toThrow(`Date must be 12/11/2012 or earlier.`);

    await expect(
      validate('2012/12/11', {
        max: '2012/12/11',
        format: 'YYYY/MM/DD',
      })
    ).resolves.toBeTruthy();

    await expect(
      validate('2012/12/12', {
        max: '2012/12/11',
        format: 'YYYY/MM/DD',
      })
    ).rejects.toThrow();
  });

  test('between', async () => {
    await expect(
      validate('12/11/2012', {
        max: '12/12/2012',
        min: '12/10/2012',
      })
    ).resolves.toBeTruthy();

    await expect(
      validate('12/12/2012', {
        min: '12/12/2012',
        max: '12/13/2012',
      })
    ).rejects.toThrow(`Date must be between 12/12/2012 and 12/13/2012.`);

    await expect(
      validate('2012/12/11', {
        max: '2012/12/13',
        min: '2012/12/10',
        format: 'YYYY/MM/DD',
      })
    ).resolves.toBeTruthy();

    await expect(
      validate('2012/12/13', {
        min: '2012/12/11',
        max: '2012/12/12',
        format: 'YYYY/MM/DD',
      })
    ).rejects.toThrow();

    await expect(
      validate('2012/12/12', {
        max: '2012/12/12',
        min: '2012/12/10',
        format: 'YYYY/MM/DD',
        inclusivity: '(]',
      })
    ).resolves.toBeTruthy();
  });
});

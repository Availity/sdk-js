import flattenObject from '../flattenObject';

describe('AvApi', () => {
  test('should flatten', () => {
    const obj = {
      int: 123,
      obj: {
        string: 'string',
      },
    };

    const flatObj = flattenObject(obj);
    expect(flatObj.int).toBe('123');
    expect(flatObj['obj.string']).toBe('string');
  });

  test('handles undefined', () => {
    const obj = {
      int: 0,
      false: false,
      undefined,
      obj: {
        int: 123,
        string: 'string',
      },
    };

    const flatObj = flattenObject(obj);
    expect(flatObj.int).toBe('0');
    expect(flatObj.false).toBe('false');
    expect(flatObj['obj.string']).toBe('string');
    expect(flatObj.undefined).toBeUndefined();
  });
});

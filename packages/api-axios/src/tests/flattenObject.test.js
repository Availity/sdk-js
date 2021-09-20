import flattenObject, { parseValue } from '../flatten-object';

describe('flatten-object', () => {
  test('parse a value', () => {
    let value;
    expect(parseValue(value)).toBeUndefined();

    value = null;
    expect(parseValue(value)).toBeNull();

    value = {};
    expect(parseValue(value)).toEqual('[object Object]');
  });

  test('flatten an object', () => {
    const value = { foo: 'bar', bar: { baz: 'buzz' } };
    const flattened = flattenObject(value);
    expect(flattened['bar.baz']).toEqual('buzz');
  });
});

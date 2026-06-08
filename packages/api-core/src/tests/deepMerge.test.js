import deepMerge from '../deepMerge';

describe('deepMerge', () => {
  test('merges flat objects', () => {
    expect(deepMerge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
  });

  test('overrides primitive values', () => {
    expect(deepMerge({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
  });

  test('deeply merges nested objects', () => {
    const result = deepMerge({ a: { b: 1, c: 2 } }, { a: { b: 3, d: 4 } });
    expect(result).toEqual({ a: { b: 3, c: 2, d: 4 } });
  });

  test('handles multiple sources', () => {
    const result = deepMerge({ a: 1 }, { b: 2 }, { c: 3 });
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  test('later sources override earlier ones', () => {
    const result = deepMerge({ a: 1 }, { a: 2 }, { a: 3 });
    expect(result).toEqual({ a: 3 });
  });

  test('does not mutate target', () => {
    const target = { a: { b: 1 } };
    const result = deepMerge(target, { a: { c: 2 } });
    expect(target).toEqual({ a: { b: 1 } });
    expect(result).toEqual({ a: { b: 1, c: 2 } });
  });

  test('arrays are replaced, not merged', () => {
    expect(deepMerge({ a: [1, 2] }, { a: [3] })).toEqual({ a: [3] });
  });

  test('handles empty target', () => {
    expect(deepMerge({}, { a: { b: 1 } })).toEqual({ a: { b: 1 } });
  });

  test('skips non-object sources', () => {
    expect(deepMerge({ a: 1 }, null, undefined, { b: 2 })).toEqual({ a: 1, b: 2 });
  });

  test('replaces object with primitive', () => {
    expect(deepMerge({ a: { b: 1 } }, { a: 'string' })).toEqual({ a: 'string' });
  });

  test('replaces primitive with object', () => {
    expect(deepMerge({ a: 'string' }, { a: { b: 1 } })).toEqual({ a: { b: 1 } });
  });

  test('deeply nested merge', () => {
    const result = deepMerge({ a: { b: { c: 1, d: 2 }, e: 3 } }, { a: { b: { c: 10, f: 4 } } });
    expect(result).toEqual({ a: { b: { c: 10, d: 2, f: 4 }, e: 3 } });
  });
});

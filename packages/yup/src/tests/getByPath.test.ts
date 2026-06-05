import getByPath from '../getByPath';

describe('getByPath', () => {
  it('should get a top-level property', () => {
    expect(getByPath({ name: 'test' }, 'name')).toBe('test');
  });

  it('should get a nested property', () => {
    expect(getByPath({ a: { b: { c: 'deep' } } }, 'a.b.c')).toBe('deep');
  });

  it('should return undefined for missing path', () => {
    expect(getByPath({ a: 1 }, 'b.c')).toBeUndefined();
  });

  it('should return undefined when obj is null', () => {
    expect(getByPath(null, 'a')).toBeUndefined();
  });

  it('should return undefined when obj is undefined', () => {
    expect(getByPath(undefined, 'a.b')).toBeUndefined();
  });
});

import getByPath from './getByPath';
import setByPath from './setByPath';

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
});

describe('setByPath', () => {
  it('should set a top-level property', () => {
    const obj = {};
    setByPath(obj, 'name', 'test');
    expect(obj.name).toBe('test');
  });

  it('should set a nested property', () => {
    const obj = {};
    setByPath(obj, 'a.b.c', 'deep');
    expect(obj.a.b.c).toBe('deep');
  });

  it('should overwrite existing values', () => {
    const obj = { a: { b: 'old' } };
    setByPath(obj, 'a.b', 'new');
    expect(obj.a.b).toBe('new');
  });

  it('should create intermediate objects', () => {
    const obj = { a: null };
    setByPath(obj, 'a.b', 'value');
    expect(obj.a.b).toBe('value');
  });

  it('should return the original object', () => {
    const obj = {};
    const result = setByPath(obj, 'x', 1);
    expect(result).toBe(obj);
  });
});

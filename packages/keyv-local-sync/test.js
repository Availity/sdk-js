import Keyv from './';

describe('Keyv', () => {
  test('should exist', () => {
    expect(Keyv).toBeDefined();

    expect(() => {
      Keyv();
    }).toThrow();

    expect(() => {
      new Keyv(); // eslint-disable-line
    }).not.toThrow();
  });

  test('Keyv accepts storage adapters', () => {
    const store = new Map();
    const keyv = new Keyv({ store });
    expect(store.size).toBe(0);
    keyv.set('foo', 'bar');
    expect(keyv.get('foo')).toBe('bar');
    expect(store.size).toBe(1);
  });

  test('Keyv passes tll info to stores', () => {
    const store = new Map();
    store.set = jest.fn();
    const keyv = new Keyv({ store });
    keyv.set('foo', 'bar', 100);
    expect(store.set.mock.calls[0][2]).toBe(100);
  });

  test('Keyv respects default tll option', () => {
    const { now } = Date;

    Date.now = jest.fn(() => 0);
    const store = new Map();
    const keyv = new Keyv({ store, ttl: 100 });
    keyv.set('foo', 'bar');
    expect(keyv.get('foo')).toBe('bar');

    Date.now = jest.fn(() => 150);
    expect(keyv.get('foo')).toBeUndefined();

    Date.now = now;
  });

  test('.set(key, val, ttl) overwrites default tll option', () => {
    const { now } = Date;

    Date.now = jest.fn(() => 0);

    const store = new Map();
    const keyv = new Keyv({ store, ttl: 200 });
    keyv.set('foo', 'bar');
    keyv.set('fizz', 'buzz', 100);
    keyv.set('ping', 'pong', 300);
    expect(keyv.get('foo')).toBe('bar');
    expect(keyv.get('fizz')).toBe('buzz');
    expect(keyv.get('ping')).toBe('pong');

    Date.now = jest.fn(() => 150);
    expect(keyv.get('foo')).toBe('bar');
    expect(keyv.get('fizz')).toBe(undefined);
    expect(keyv.get('ping')).toBe('pong');

    Date.now = jest.fn(() => 250);
    expect(keyv.get('foo')).toBe(undefined);
    expect(keyv.get('ping')).toBe('pong');
    Date.now = jest.fn(() => 350);
    expect(keyv.get('ping')).toBe(undefined);

    Date.now = now;
  });

  test('.set(key, val, ttl) where ttl is "0" overwrites default tll option and sets key to never expire', () => {
    const { now } = Date;

    Date.now = jest.fn(() => 0);
    const store = new Map();
    const keyv = new Keyv({ store, ttl: 200 });
    keyv.set('foo', 'bar', 0);
    expect(keyv.get('foo')).toBe('bar');

    Date.now = jest.fn(() => 250);
    expect(keyv.get('foo')).toBe('bar');

    Date.now = now;
  });

  test('.get(key) handles when the key is not in the store', () => {
    const store = new Map();
    const keyv = new Keyv({ store });
    expect(keyv.get('foo')).toBeUndefined();
  });

  test('.clear() empties the store', () => {
    const store = new Map();
    const keyv = new Keyv({ store });
    expect(store.size).toBe(0);
    keyv.set('foo', 'bar');
    expect(keyv.get('foo')).toBe('bar');
    expect(store.size).toBe(1);
    keyv.clear();
    expect(keyv.get('foo')).toBeUndefined();
    expect(store.size).toBe(0);
  });
});

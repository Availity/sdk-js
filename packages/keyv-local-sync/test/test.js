import test from 'ava';
import tk from 'timekeeper';
import Keyv from 'this';

test.serial('Keyv is a class', t => {
  t.is(typeof Keyv, 'function');
  t.throws(() => Keyv()); // eslint-disable-line new-cap
  t.notThrows(() => new Keyv());
});

test.serial('Keyv accepts storage adapters', t => {
  const store = new Map();
  const keyv = new Keyv({ store });
  t.is(store.size, 0);
  keyv.set('foo', 'bar');
  t.is(keyv.get('foo'), 'bar');
  t.is(store.size, 1);
});

test.serial('Keyv passes tll info to stores', t => {
  t.plan(1);
  const store = new Map();
  const storeSet = store.set;
  store.set = (key, val, ttl) => {
    t.is(ttl, 100);
    storeSet.call(store, key, val, ttl);
  };
  const keyv = new Keyv({ store });
  keyv.set('foo', 'bar', 100);
});

test.serial('Keyv respects default tll option', t => {
  const store = new Map();
  const keyv = new Keyv({ store, ttl: 100 });
  keyv.set('foo', 'bar');
  t.is(keyv.get('foo'), 'bar');
  tk.freeze(Date.now() + 150);
  t.is(keyv.get('foo'), undefined);
  tk.reset();
});

test.serial('.set(key, val, ttl) overwrites default tll option', t => {
  const startTime = Date.now();
  tk.freeze(startTime);
  const store = new Map();
  const keyv = new Keyv({ store, ttl: 200 });
  keyv.set('foo', 'bar');
  keyv.set('fizz', 'buzz', 100);
  keyv.set('ping', 'pong', 300);
  t.is(keyv.get('foo'), 'bar');
  t.is(keyv.get('fizz'), 'buzz');
  t.is(keyv.get('ping'), 'pong');
  tk.freeze(startTime + 150);
  t.is(keyv.get('foo'), 'bar');
  t.is(keyv.get('fizz'), undefined);
  t.is(keyv.get('ping'), 'pong');
  tk.freeze(startTime + 250);
  t.is(keyv.get('foo'), undefined);
  t.is(keyv.get('ping'), 'pong');
  tk.freeze(startTime + 350);
  t.is(keyv.get('ping'), undefined);
  tk.reset();
});

test.serial(
  '.set(key, val, ttl) where ttl is "0" overwrites default tll option and sets key to never expire',
  t => {
    const startTime = Date.now();
    tk.freeze(startTime);
    const store = new Map();
    const keyv = new Keyv({ store, ttl: 200 });
    keyv.set('foo', 'bar', 0);
    t.is(keyv.get('foo'), 'bar');
    tk.freeze(startTime + 250);
    t.is(keyv.get('foo'), 'bar');
    tk.reset();
  }
);

test.serial('.get(key) handles when the key is not in the store', t => {
  const store = new Map();
  const keyv = new Keyv({ store });
  t.is(keyv.get('foo'), undefined);
  tk.reset();
});

test.serial('.clear() empties the store', t => {
  const store = new Map();
  const keyv = new Keyv({ store });
  t.is(store.size, 0);
  keyv.set('foo', 'bar');
  t.is(keyv.get('foo'), 'bar');
  t.is(store.size, 1);
  keyv.clear();
  t.is(keyv.get('foo'), undefined);
  t.is(store.size, 0);
  tk.reset();
});

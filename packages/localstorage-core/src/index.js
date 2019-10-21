export const get = key => {
  // checks if localStorage is supported, then attempt to parse JSON keys
  const value = window.localStorage.getItem(key);
  let output;
  try {
    output = JSON.parse(value);
  } catch (error) {
    output = value;
  }
  return output;
};

export const set = (key, value) => {
  // checks if localStorage is supported, stringifies non-strings before setting value
  const setValue = typeof value === 'string' ? value : JSON.stringify(value);
  window.localStorage.setItem(key, setValue);
};

export const remove = key => {
  // wrapper to remove Item
  window.localStorage.removeItem(key);
};

export const getKeys = searchKey => {
  // get all keys that match this string or regex
  const regexString =
    searchKey instanceof RegExp ? searchKey : new RegExp(searchKey);
  if (regexString) {
    const output = [];
    const { length } = window.localStorage;
    for (let i = 0; i < length; i++) {
      const thisKey = window.localStorage.key(i);
      if (regexString.test(thisKey)) {
        output.push(thisKey);
      }
    }
    return output;
  }

  return undefined;
};

export const removeKeys = searchKey => {
  // remove all keys that match this string or regex
  const removeKeys = getKeys(searchKey);
  removeKeys.forEach(key => {
    remove(key);
  });
};

export const getSessionBust = () => {
  return get('avCacheBust');
};

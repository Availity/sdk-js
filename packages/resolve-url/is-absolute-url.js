// Borrowed from https://github.com/sindresorhus/is-absolute-url to make IE11 compatible
const isAbsoluteUrl = url => {
  if (typeof url !== 'string') {
    throw new TypeError(`Expected a \`string\`, got \`${typeof url}\``);
  }

  return /^[a-z][a-z\d+.-]*:/.test(url);
};

export default isAbsoluteUrl;

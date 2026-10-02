// Borrowed from https://github.com/sindresorhus/is-absolute-url to make IE11 compatible

/**
 * Checks whether a URL is absolute (has a scheme like `http:`, `https:`, `mailto:`, etc.).
 *
 * @param url The URL string to test.
 * @returns `true` if the URL is absolute, `false` if relative.
 * @throws {TypeError} If `url` is not a string.
 *
 * @example
 * isAbsoluteUrl('https://example.com') // true
 * isAbsoluteUrl('/foo/bar')            // false
 */
const isAbsoluteUrl = (url: string) => {
  if (typeof url !== 'string') {
    throw new TypeError(`Expected a \`string\`, got \`${typeof url}\``);
  }

  return /^[a-z][a-z\d+.-]*:/.test(url);
};

export default isAbsoluteUrl;

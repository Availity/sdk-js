// From https://github.com/sindresorhus/is-absolute-url/blob/master/test.js
import isAbsoluteUrl from './is-absolute-url';

describe('is-absolute-url', () => {
  it('should be absolute url', () => {
    expect(isAbsoluteUrl('http://sindresorhus.com')).toBeTruthy();
    expect(isAbsoluteUrl('https://sindresorhus.com')).toBeTruthy();
    expect(isAbsoluteUrl('file://sindresorhus.com')).toBeTruthy();
    expect(isAbsoluteUrl('mailto:someone@example.com')).toBeTruthy();
    expect(
      isAbsoluteUrl('data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D')
    ).toBeTruthy();
  });

  it('should be relative url', () => {
    expect(isAbsoluteUrl('//sindresorhus.com')).toBeFalsy();
    expect(isAbsoluteUrl('/foo/bar')).toBeFalsy();
    expect(isAbsoluteUrl('foo/bar')).toBeFalsy();
    expect(isAbsoluteUrl('foo')).toBeFalsy();
  });
});

import resolveUrl from '..';

describe('resolve-url', () => {
  test('should resolve relative url', () => {
    const fullUrl = resolveUrl({ relative: '/a/b/c' });
    expect(fullUrl).toBe(`http://localhost/a/b/c`);
  });

  test('should resolve absolute url', () => {
    const fullUrl = resolveUrl({ relative: 'https://dev.local/a/b/c' });
    expect(fullUrl).toBe('https://dev.local/a/b/c');
  });
  test('should join urls with missing slash', () => {
    // missing forward slash in relative url
    let fullUrl = resolveUrl({ relative: 'a/b/c' });
    expect(fullUrl).toBe('http://localhost/a/b/c');

    // missing forward slash in base url
    fullUrl = resolveUrl({ relative: '/a/b/c' });
    expect(fullUrl).toBe('http://localhost/a/b/c');

    // missing forward slash in relative and base url
    fullUrl = resolveUrl({ relative: 'a/b/c' });
    expect(fullUrl).toBe('http://localhost/a/b/c');
  });

  test('should resolve relative url against explicit base', () => {
    expect(resolveUrl({ relative: '/a/b/c', base: 'https://api.example.com/' })).toBe('https://api.example.com/a/b/c');
  });

  test('should resolve relative path against explicit base', () => {
    expect(resolveUrl({ relative: 'foo/bar', base: 'https://api.example.com/root/' })).toBe(
      'https://api.example.com/root/foo/bar'
    );
  });

  test('should fall back to window.location when base is empty string', () => {
    expect(resolveUrl({ relative: '/a/b', base: '' })).toBe('http://localhost/a/b');
  });

  test('should return base url when relative is empty string', () => {
    expect(resolveUrl({ relative: '', base: 'https://api.example.com/' })).toBe('https://api.example.com/');
  });
});

import resolveUrl from '.';

describe('resolve-url', () => {
  beforeEach(() => {
    global.jsdom.reconfigure({
      url: 'https://dev.local/other/',
    });
  });
  test('should resolve relative url', () => {
    const fullUrl = resolveUrl({ relative: '/a/b/c' });
    expect(fullUrl).toBe(`https://dev.local/a/b/c`);
  });

  test('should resolve absolute url', () => {
    const fullUrl = resolveUrl({ relative: 'https://dev.local/a/b/c' });
    expect(fullUrl).toBe('https://dev.local/a/b/c');
  });
  test('should join urls with missing slash', () => {
    // missing forward slash in relative url
    let fullUrl = resolveUrl({ relative: 'a/b/c' });
    expect(fullUrl).toBe('https://dev.local/a/b/c');

    global.jsdom.reconfigure({
      url: 'https://dev.local/other',
    });

    // missing forward slash in base url
    fullUrl = resolveUrl({ relative: '/a/b/c' });
    expect(fullUrl).toBe('https://dev.local/a/b/c');

    global.jsdom.reconfigure({
      url: 'https://dev.local/other',
    });

    // missing forward slash in relative and base url
    fullUrl = resolveUrl({ relative: 'a/b/c' });
    expect(fullUrl).toBe('https://dev.local/a/b/c');
  });
});

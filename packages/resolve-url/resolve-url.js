import isAbssoluteUrl from 'is-absolute-url';

const resolveUrl = url => {
  if (isAbssoluteUrl(url)) {
    return url;
  }
  const { href, pathname } = window.location;
  const index = href.indexOf(pathname);
  const base = href.substring(0, index);

  let seperator = '';
  if (!url.match(/^\//) && !base.match(/\/$/)) {
    seperator = '/';
  }

  const fullUrl = base.concat(seperator, url);
  return fullUrl;
};

export default resolveUrl;

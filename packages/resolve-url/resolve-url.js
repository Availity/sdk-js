import isAbsoluteUrl from 'is-absolute-url';
import { resolve } from 'relative-to-absolute-iri';

const resolveUrl = ({ relative = '', base }) => {
  if (isAbsoluteUrl(relative)) {
    return relative;
  }

  if (!base) {
    const { href, pathname } = window.location;
    const index = href.indexOf(pathname);
    base = `${href.substring(0, index)}/`;
  }

  return resolve(relative, base);
};

export default resolveUrl;

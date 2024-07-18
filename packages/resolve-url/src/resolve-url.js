import isAbsoluteUrl from './is-absolute-url';
import { resolve } from './relative-to-absolute';

const resolveUrl = ({ relative = '', base }) => {
  if (isAbsoluteUrl(relative)) {
    return relative;
  }

  if (!base) {
    const { origin } = window.location;
    base = `${origin}/`;
  }

  return resolve(relative, base);
};

// eslint-disable-next-line unicorn/prefer-export-from
export { isAbsoluteUrl };
export default resolveUrl;

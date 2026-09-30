import isAbsoluteUrl from './is-absolute-url';
import { resolve } from './relative-to-absolute';

/**
 * Resolves a relative URL to an absolute URL.
 *
 * If `relative` is already absolute, it is returned as-is.
 * If `base` is omitted or empty, `window.location.origin` is used as the base.
 *
 * @param options.relative The relative (or absolute) URL to resolve.
 * @param options.base Optional base URL to resolve against. Defaults to `window.location.origin`.
 * @returns The resolved absolute URL.
 *
 * @example
 * resolveUrl({ relative: '/api/v1/users' })
 * // → 'https://essentials.availity.com/api/v1/users' (in production)
 *
 * resolveUrl({ relative: '/api/v1/users', base: 'https://qa-essentials.availity.com' })
 * // → 'https://qa-essentials.availity.com/api/v1/users'
 */
const resolveUrl = ({ relative, base = '' }: { relative: string; base?: string }) => {
  if (isAbsoluteUrl(relative)) {
    return relative;
  }

  if (!base) {
    const { origin } = window.location;
    base = `${origin}/`;
  }

  return resolve(relative, base);
};

export default resolveUrl;

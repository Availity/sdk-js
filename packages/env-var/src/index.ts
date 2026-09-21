export type Environment = 'local' | 'test' | 'qa' | 'prod';

/** @deprecated Use `Environment` instead */
export type ENVIORNEMNT = Environment;

export type EnvTest = string | RegExp | ((options: { subdomain: string; pathname: string }) => boolean);

export interface EnvOpts<T> {
  local?: T;
  test?: T;
  qa?: T;
  prod?: T;
  [key: string]: T | undefined;
}

export interface SpecificEnvConfig {
  regex: RegExp;
  fn: (options: { match: RegExpMatchArray; subdomain: string; pathname: string }) => string | null;
}

export interface EnvironmentInfo {
  /** Broad environment category: `'local'`, `'test'`, `'qa'`, `'prod'`, or a custom key. */
  env: Environment | string;
  /** Specific environment slug, e.g. `'t01'`, `'qa'`, `'prod'`. Falls back to `'local'`. */
  specificEnv: string;
}

// ---------------------------------------------------------------------------
// Environment maps (module-level singletons)
// ---------------------------------------------------------------------------

const DEFAULT_ENVIRONMENTS: Record<string, EnvTest | EnvTest[]> = {
  local: ['127.0.0.1', 'localhost'],
  test: [/^t(?:(?:\d\d)|(?:est))-(apps|essentials)$/],
  qa: [/^q(?:(?:\d\d)|(?:ap?))-(apps|essentials)$/],
  prod: [/^(apps|essentials)$/],
};

const DEFAULT_SPECIFIC_ENVIRONMENTS: SpecificEnvConfig[] = [
  {
    regex: /^(?:(.*)-)?(apps|essentials)$/,
    fn: (options) => options.match[1] || 'prod',
  },
];

let environments: Record<string, EnvTest | EnvTest[]> = { ...DEFAULT_ENVIRONMENTS };
let specificEnvironments: SpecificEnvConfig[] = [...DEFAULT_SPECIFIC_ENVIRONMENTS];

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function setEnvironments(envs: Record<string, EnvTest | EnvTest[]>, override?: boolean): void {
  if (override) {
    environments = envs;
  } else {
    Object.assign(environments, envs);
  }
}

export function setSpecificEnvironments(envs: SpecificEnvConfig[], override?: boolean): void {
  if (override) {
    specificEnvironments = envs;
  } else {
    specificEnvironments = [...specificEnvironments, ...envs];
  }
}

/** Reset environments to the built-in defaults. Useful for test isolation. */
export function resetEnvironments(): void {
  environments = { ...DEFAULT_ENVIRONMENTS };
}

/** Reset specific environments to the built-in defaults. Useful for test isolation. */
export function resetSpecificEnvironments(): void {
  specificEnvironments = [...DEFAULT_SPECIFIC_ENVIRONMENTS];
}

export function getLocation(href: string): URL {
  return new URL(href);
}

function getLocationComponents(windowOverride: Window | string | null): {
  subdomain: string;
  pathname: string;
} {
  if (windowOverride === null) {
    return { subdomain: '', pathname: '/' };
  }
  const { hostname, pathname } =
    typeof windowOverride === 'string' ? getLocation(windowOverride) : windowOverride.location;

  // Strip everything from ".availity" onward — handles both .availity.com and
  // .availity.net (and any other .availity.* TLD we may add in the future).
  const subdomain = hostname.split('.availity', 1)[0];
  return { subdomain, pathname };
}

/**
 * Returns the broad environment category for the current (or overridden) window.
 * Returns `'local'`, `'test'`, `'qa'`, `'prod'`, a custom key, or `''` for
 * an unrecognised host (which `envVar` treats as a fallback to `local`).
 *
 * Safe to call in SSR / Node — defaults to `null` (local fallback) when
 * `window` is not available.
 */
export function getCurrentEnv(
  windowOverride: Window | typeof globalThis | string | null = typeof window !== 'undefined' ? window : null
): Environment | string {
  const { subdomain, pathname } = getLocationComponents(windowOverride as Window | string | null);

  return (
    Object.keys(environments).reduce<string>((prev, env) => {
      if (prev) return prev;
      let envTests = environments[env];
      if (!Array.isArray(envTests)) {
        envTests = [envTests];
      }

      return (envTests as EnvTest[]).some((testObj) => {
        switch (Object.prototype.toString.call(testObj)) {
          case '[object String]': {
            return (testObj as string) === subdomain;
          }
          case '[object RegExp]': {
            return (testObj as RegExp).test(subdomain);
          }
          case '[object Function]': {
            return (testObj as (opts: { subdomain: string; pathname: string }) => boolean)({
              subdomain,
              pathname,
            });
          }
          default: {
            return false;
          }
        }
      })
        ? env
        : '';
    }, '') || ''
  );
}

/** Returns the specific environment slug, e.g. `t01`, `qap`, `prod` — not the broad category. */
export function getSpecificEnv(
  windowOverride: Window | typeof globalThis | string | null = typeof window !== 'undefined' ? window : null
): string {
  const { subdomain, pathname } = getLocationComponents(windowOverride as Window | string | null);

  return (
    specificEnvironments.reduce<string | null>((prev, env) => {
      if (prev) return prev;
      const { regex, fn } = env;
      const match = subdomain.match(regex);
      return match ? fn({ match, subdomain, pathname }) : null;
    }, null) || 'local'
  );
}

/**
 * Returns both the broad environment category and the specific slug in a
 * single call — avoids parsing the location twice when you need both values.
 *
 * @example
 * const { env, specificEnv } = getEnvironmentInfo();
 * // => { env: 'test', specificEnv: 't01' }
 */
export function getEnvironmentInfo(
  windowOverride: Window | typeof globalThis | string | null = typeof window !== 'undefined' ? window : null
): EnvironmentInfo {
  return {
    env: getCurrentEnv(windowOverride as Window),
    specificEnv: getSpecificEnv(windowOverride as Window),
  };
}

/** Returns `true` when the current environment is `'prod'`. */
export const isProd = (
  windowOverride: Window | typeof globalThis | string | null = typeof window !== 'undefined' ? window : null
): boolean => getCurrentEnv(windowOverride as Window) === 'prod';

/** Returns `true` when the current environment is `'qa'`. */
export const isQa = (
  windowOverride: Window | typeof globalThis | string | null = typeof window !== 'undefined' ? window : null
): boolean => getCurrentEnv(windowOverride as Window) === 'qa';

/** Returns `true` when the current environment is `'test'`. */
export const isTest = (
  windowOverride: Window | typeof globalThis | string | null = typeof window !== 'undefined' ? window : null
): boolean => getCurrentEnv(windowOverride as Window) === 'test';

/** Returns `true` when the current environment is `'local'` (or unrecognised host). */
export const isLocal = (
  windowOverride: Window | typeof globalThis | string | null = typeof window !== 'undefined' ? window : null
): boolean => {
  const env = getCurrentEnv(windowOverride as Window);
  return env === 'local' || env === '';
};

// ---------------------------------------------------------------------------
// Default export — select a value from an env-keyed object
// ---------------------------------------------------------------------------

/**
 * Overload: when `local` is always provided in `varObj`, the return is never `undefined`.
 */
export default function envVar<T>(
  varObj: EnvOpts<T> & { local: T },
  windowOverride?: Window | typeof globalThis | string | null,
  defaultVar?: T
): T;
export default function envVar<T>(
  varObj: EnvOpts<T>,
  windowOverride?: Window | typeof globalThis | string | null,
  defaultVar?: T
): T | undefined;
export default function envVar<T>(
  varObj: EnvOpts<T>,
  windowOverride?: Window | typeof globalThis | string | null,
  defaultVar?: T
): T | undefined {
  const env = getCurrentEnv(windowOverride as Window);

  if (`${env}` in varObj) {
    return varObj[env];
  }

  return defaultVar ?? varObj.local;
}

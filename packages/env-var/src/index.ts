export type Environment = 'local' | 'test' | 'qa' | 'prod';

/** @deprecated Use `Environment` instead */
export type ENVIORNEMNT = Environment;

export type EnvTest = string | RegExp | ((options: { subdomain: string; pathname: string }) => boolean);

/**
 * Minimal window-like object required for environment detection.
 * Only `location.hostname` and `location.pathname` are read.
 * Accepts the real `window`, a jsdom window, or any plain object with a `location`.
 */
export interface WindowLike {
  location: {
    hostname: string;
    pathname: string;
  };
}

/**
 * Standard environment keys used by the Availity portal.
 * Any additional string keys are also accepted for custom environments.
 *
 * Each key may hold a different value type — e.g. `{ prod: 'https://...', local: null, test: {} }`.
 *
 * @example
 * const url = envVar({ prod: 'https://api.availity.com', qa: 'https://qa-api.availity.com', local: null });
 * // => string | null | undefined
 */
export interface EnvOpts {
  /** Value to use in production (`apps.availity.com`, `essentials.availity.com`). */
  prod?: unknown;
  /** Value to use in QA (`qa-apps`, `qap-apps`, `q01-apps`, etc.). */
  qa?: unknown;
  /** Value to use in test (`test-apps`, `t01-apps`, `t14-apps`, etc.). */
  test?: unknown;
  /** Value to use locally (`localhost`, `127.0.0.1`) or when the host is unrecognised. */
  local?: unknown;
  /** Any additional custom environment key. */
  [key: string]: unknown;
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
    // Explicit local hostnames
    regex: /^(localhost|127\.0\.0\.1)$/,
    fn: () => 'local',
  },
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

function getLocationComponents(windowOverride: WindowLike | string | null): {
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
  windowOverride: WindowLike | string | null = typeof window !== 'undefined' ? window : null
): Environment | string {
  const { subdomain, pathname } = getLocationComponents(windowOverride as WindowLike | string | null);

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
  windowOverride: WindowLike | string | null = typeof window !== 'undefined' ? window : null
): string {
  const { subdomain, pathname } = getLocationComponents(windowOverride as WindowLike | string | null);

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
  windowOverride: WindowLike | string | null = typeof window !== 'undefined' ? window : null
): EnvironmentInfo {
  return {
    env: getCurrentEnv(windowOverride as WindowLike),
    specificEnv: getSpecificEnv(windowOverride as WindowLike),
  };
}

/** Returns `true` when the current environment is `'prod'`. */
export const isProd = (
  windowOverride: WindowLike | string | null = typeof window !== 'undefined' ? window : null
): boolean => getCurrentEnv(windowOverride as WindowLike) === 'prod';

/** Returns `true` when the current environment is `'qa'`. */
export const isQa = (
  windowOverride: WindowLike | string | null = typeof window !== 'undefined' ? window : null
): boolean => getCurrentEnv(windowOverride as WindowLike) === 'qa';

/** Returns `true` when the current environment is `'test'`. */
export const isTest = (
  windowOverride: WindowLike | string | null = typeof window !== 'undefined' ? window : null
): boolean => getCurrentEnv(windowOverride as WindowLike) === 'test';

/** Returns `true` when the current environment is `'local'` (or unrecognised host). */
export const isLocal = (
  windowOverride: WindowLike | string | null = typeof window !== 'undefined' ? window : null
): boolean => {
  const env = getCurrentEnv(windowOverride as WindowLike);
  return env === 'local' || env === '';
};

// ---------------------------------------------------------------------------
// Default export — select a value from an env-keyed object
// ---------------------------------------------------------------------------

/**
 * Select a value from an environment-keyed object based on the current hostname.
 *
 * Each key may hold a **different type** — the return type is automatically
 * inferred as the union of all value types present in the object.
 *
 * Standard keys: `local`, `test`, `qa`, `prod`. Custom keys are also accepted.
 *
 * @example
 * // All same type
 * const url = envVar({ prod: 'https://api.availity.com', local: 'http://localhost:3000' });
 * // => string | undefined
 *
 * @example
 * // Mixed types — return is inferred as string | null | undefined
 * const url = envVar({ prod: 'https://api.availity.com', local: null });
 *
 * @example
 * // local always provided — return is never undefined
 * const url = envVar({ prod: 'https://api.availity.com', local: 'http://localhost:3000' });
 * // => string  (no undefined)
 *
 * @param varObj  Object mapping environment keys to their values. See {@link EnvOpts} for standard keys.
 * @param windowOverride  Optional window, URL string, or `null` (SSR-safe).
 * @param defaultVar  Fallback value if the current environment key is absent and no `local` is set.
 */
// Overload: when `local` is always provided, return is never `undefined`
export default function envVar<TObj extends EnvOpts & { local: NonNullable<unknown> }>(
  varObj: TObj,
  windowOverride?: WindowLike | string | null,
  defaultVar?: TObj[keyof TObj]
): Exclude<TObj[keyof TObj], undefined>;
// General overload
export default function envVar<TObj extends EnvOpts>(
  varObj: TObj,
  windowOverride?: WindowLike | string | null,
  defaultVar?: TObj[keyof TObj]
): TObj[keyof TObj] | undefined;
// Implementation
export default function envVar<TObj extends EnvOpts>(
  varObj: TObj,
  windowOverride?: WindowLike | string | null,
  defaultVar?: TObj[keyof TObj]
): TObj[keyof TObj] | undefined {
  const env = getCurrentEnv(windowOverride as WindowLike);

  if (`${env}` in varObj) {
    return varObj[env] as TObj[keyof TObj];
  }

  return (defaultVar ?? varObj.local) as TObj[keyof TObj] | undefined;
}

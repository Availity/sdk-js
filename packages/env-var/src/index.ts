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

// ---------------------------------------------------------------------------
// Cloud environment detection (.availity.com)
//
// Cloud domains: <team>.<provider><zone>.availity.com
//   provider: aw | az | gc
//   zone:     p (prod) | n (non-prod) | s (sandbox)
//
// Cloud URIs: /<namespace>/<environment>/...
//   namespace: 3-char abbreviation (cdn, api, …)
//   environment: 3-char abbreviation (prd, tst, stg, qua, qap, t01-t99, …)
// ---------------------------------------------------------------------------
const getCloudEnv = (options: { subdomain: string; pathname: string }): string | null => {
  const { subdomain, pathname } = options;
  if (!(subdomain && pathname)) return null;

  const subMatch = subdomain.match(/.*?\.(?:aw|az|gc)([nps])$/);
  if (!subMatch) return null;

  const pathMatch = pathname.match(/^\/[a-z]{3}\/([\da-z]{3})\/.*/);
  if (!pathMatch) return null;

  // ??p domains must be prod, ??n and ??s domains can't be prod
  const isProdPath = pathMatch[1] === 'prd';
  switch (subMatch[1]) {
    case 'p': {
      return isProdPath ? pathMatch[1] : null;
    }
    case 'n':
    case 's': {
      return isProdPath ? null : pathMatch[1];
    }
    default: {
      return null;
    }
  }
};

// ---------------------------------------------------------------------------
// Environment maps
// ---------------------------------------------------------------------------

let environments: Record<string, EnvTest | EnvTest[]> = {
  local: ['127.0.0.1', 'localhost'],
  test: [
    /^t(?:(?:\d\d)|(?:est))-(apps|essentials)$/,
    (options) => /^t(?:(?:\d\d)|(?:st))$/.test(getCloudEnv(options) ?? ''),
  ],
  qa: [
    /^q(?:(?:\d\d)|(?:ap?))-(apps|essentials)$/,
    (options) => /^(stg|q(?:(?:\d\d)|(?:ua)|(?:ap)))$/.test(getCloudEnv(options) ?? ''),
  ],
  prod: [/^(apps|essentials)$/, (options) => getCloudEnv(options) === 'prd'],
};

let specificEnvironments: SpecificEnvConfig[] = [
  {
    regex: /^(?:(.*)-)?(apps|essentials)$/,
    fn: (options) => options.match[1] || 'prod',
  },
  {
    // Cloud URLs: <team>.<provider><zone>.availity.com
    regex: /.*?\.(?:aw|az|gc)([nps])$/,
    fn: getCloudEnv,
  },
];

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

export function getCurrentEnv(windowOverride: Window | typeof globalThis = window): string {
  const { subdomain, pathname } = getLocationComponents(windowOverride as Window);

  return (
    Object.keys(environments).reduce<string>((prev, env) => {
      if (prev) return prev;
      let envTests = environments[env];
      if (!Array.isArray(envTests)) {
        envTests = [envTests];
      }

      return (
        (envTests as EnvTest[]).some((testObj) => {
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
        }) && env
      );
    }, '') || ''
  );
}

/** Returns the specific environment slug, e.g. `t01`, `stg`, `prd` — not the broad category. */
export function getSpecificEnv(windowOverride: Window | typeof globalThis = window): string {
  const { subdomain, pathname } = getLocationComponents(windowOverride as Window);

  return (
    specificEnvironments.reduce<string | null>((prev, env) => {
      if (prev) return prev;
      const { regex, fn } = env;
      const match = subdomain.match(regex);
      return match ? fn({ match, subdomain, pathname }) : null;
    }, null) || 'local'
  );
}

// ---------------------------------------------------------------------------
// Default export — select a value from an env-keyed object
// ---------------------------------------------------------------------------
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

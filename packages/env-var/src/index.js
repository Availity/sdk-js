// Cloud domains are in the format <team>.<cloud provider><zone>.availity.com
// where <cloud provider> is a two character abbreviation for the cloud provider
// and zone is a one character abbreviation for prod, non-prod,or sandbox.
// Cloud URIs are in the format /<namespace>/<environment>/...
// where <namespace> is a three character abbreviation, e.g., cdn or api
// and <environment> is a three character abbreviation, e.g., prd or t01
const getCloudEnv = options => {
  const { subdomain, pathname } = options;
  if (!(subdomain && pathname)) return null;

  const subMatch = subdomain.match(/.*?\.(?:aw|az|gc)([nps])$/);
  if (!subMatch) return null;

  const pathMatch = pathname.match(/^\/[a-z]{3}\/([\da-z]{3})\/.*/);
  if (!pathMatch) return null;

  // ??p domains must be prod, ??n and ??s domains can't be prod
  const isProdPath = pathMatch[1] === 'prd';
  switch (subMatch[1]) {
    case 'p':
      return isProdPath ? pathMatch[1] : null;
    case 'n':
    case 's':
      return isProdPath ? null : pathMatch[1];
    default:
      return null;
  }
};

let environments = {
  local: ['127.0.0.1', 'localhost'],
  test: [
    /^t(?:(?:\d\d)|(?:est))-apps$/,
    options => /^t(?:(?:\d\d)|(?:st))$/.test(getCloudEnv(options)),
  ],
  qa: [
    /^q(?:(?:\d\d)|(?:ap?))-apps$/,
    options => /^(stg|q(?:(?:\d\d)|(?:ua)|(?:ap)))$/.test(getCloudEnv(options)),
  ],
  prod: [/^apps$/, options => getCloudEnv(options) === 'prd'],
};

let specificEnvironments = [
  {
    regex: /^(?:(.*)-)?apps$/,
    fn: options => options.match[1] || 'prod',
  },
  {
    regex: /.*?\.(?:aw|az|gc)([nps])$/,
    fn: getCloudEnv,
  },
];

export function setEnvironments(envs, override) {
  if (override) {
    environments = envs;
  } else {
    Object.assign(environments, envs);
  }
}

export function setSpecificEnvironments(envs, override) {
  if (override) {
    specificEnvironments = envs;
  } else {
    Object.assign(specificEnvironments, envs);
  }
}

export function getLocation(href) {
  const anchor = document.createElement('a');
  anchor.href = href;
  return anchor;
}

function getLocationComponents(windowOverride) {
  const { hostname, pathname } =
    windowOverride === null || typeof windowOverride === 'string'
      ? getLocation(windowOverride)
      : windowOverride.location;
  const subdomain = hostname.split('.availity')[0];
  return {
    subdomain,
    pathname,
  };
}

export function getCurrentEnv(windowOverride = window) {
  const { subdomain, pathname } = getLocationComponents(windowOverride);

  return Object.keys(environments).reduce((prev, env) => {
    if (prev) return prev;
    let envTests = environments[env];
    if (!Array.isArray(envTests)) {
      envTests = [envTests];
    }

    return (
      envTests.some(test => {
        switch (Object.prototype.toString.call(test)) {
          case '[object String]':
            return test === subdomain;
          case '[object RegExp]':
            return test.test(subdomain);
          case '[object Function]':
            // eslint-disable-next-line jest/no-disabled-tests
            return test({ subdomain, pathname });
          default:
            return false;
        }
      }) && env
    );
  }, '');
}

// Returns the specific environment, e.g. t01, not test
export function getSpecificEnv(windowOverride = window) {
  const { subdomain, pathname } = getLocationComponents(windowOverride);

  return (
    specificEnvironments.reduce((prev, env) => {
      if (prev) return prev;
      const { regex, fn } = env;
      const match = subdomain.match(regex);
      return match ? fn({ match, subdomain, pathname }) : null;
    }, null) || 'local'
  );
}

export default function(varObj, windowOverride, defaultVar) {
  const env = getCurrentEnv(windowOverride);

  if (typeof varObj[env] !== 'undefined') {
    return varObj[env];
  }

  return defaultVar || varObj.local;
}

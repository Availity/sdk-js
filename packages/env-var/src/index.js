const cfEnv = (subdomain, pathname) => {
  if (pathname && /^.*?data$/.test(subdomain)) {
    const match = pathname.match(/^\/data\/([A-Za-z0-9]{3})\/.*/);
    return match ? match[1] : null;
  }
  return null;
};

let environments = {
  local: ['127.0.0.1', 'localhost'],
  test: [
    /^t(?:(?:\d\d)|(?:est))-apps$/,
    (s, p) => /^t(?:(?:\d\d)|(?:st))$/.test(cfEnv(s, p)),
  ],
  qa: [
    /^q(?:(?:\d\d)|(?:ap?))-apps$/,
    (s, p) => /^q(?:(?:\d\d)|(?:ua)|(?:ap))$/.test(cfEnv(s, p)),
  ],
  prod: [/^apps$/, (s, p) => cfEnv(s, p) === 'prd'],
};
export function setEnvironments(envs, override) {
  if (override) {
    environments = envs;
  } else {
    Object.assign(environments, envs);
  }
}
export function getLocation(href) {
  const anchor = document.createElement('a');
  anchor.href = href;
  return anchor;
}

export function getCurrentEnv(windowOverride = window) {
  const { hostname, pathname } =
    windowOverride === null || typeof windowOverride === 'string'
      ? getLocation(windowOverride)
      : windowOverride.location;
  const subdomain = hostname.split('.availity')[0];

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
            return test(subdomain, pathname);
          default:
            return false;
        }
      }) && env
    );
  }, '');
}

export default function(varObj, windowOverride, defaultVar) {
  const env = getCurrentEnv(windowOverride);

  if (typeof varObj[env] !== 'undefined') {
    return varObj[env];
  }

  return defaultVar || varObj.local;
}

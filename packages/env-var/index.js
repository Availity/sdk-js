let environments = {
  local: ['127.0.0.1', 'localhost'],
  test: [/^t(?:(?:\d\d)|(?:est))-apps$/],
  qa: [/^q(?:(?:\d\d)|(?:ap?))-apps$/],
  prod: [/^apps$/],
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
  const { hostname } =
    typeof windowOverride === 'string'
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
            return test();
          default:
            return false;
        }
      }) && env
    );
  }, '');
}

export default function(varObj, windowOverride) {
  const env = getCurrentEnv(windowOverride);
  return typeof varObj[env] === 'undefined' ? varObj.local : varObj[env];
}

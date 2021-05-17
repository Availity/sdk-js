import { getSpecificEnv } from '@availity/env-var';

const CLOUD_TO_APP_DOMAINS = {
  tst: 'test',
  stg: 'qa',
  qua: 'qa',
  prd: '',
};

export default function resolveHost(host, overrideWindow) {
  if (host) return host;

  if (
    /.*?\.(?:aw|az|gc)[nps|]\.availity\.com$/.test(
      overrideWindow.location.hostname
    )
  ) {
    const env = getSpecificEnv(overrideWindow);
    if (env === 'local') return '';

    const prefix =
      CLOUD_TO_APP_DOMAINS[env] === undefined ? env : CLOUD_TO_APP_DOMAINS[env];
    return `${prefix && `${prefix}-`}apps.availity.com`;
  }

  return '';
}

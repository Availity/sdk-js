import envVar, { setEnvironments, getSpecificEnv, isCloud } from '../src';

const setHostname = hostname => {
  // eslint-disable-next-line no-undef
  jsdom.reconfigure({
    url: `https://${hostname}/`,
  });
};

const getFakeWindowLocation = (hostname, pathname) => ({
  location: { hostname, pathname },
});

const generateTest = (hostname, env, overrideWindow) => {
  test(`should have ${hostname} be return the value for ${env}`, () => {
    setHostname(hostname);
    const envVars = { prod: false, local: false, qa: false, test: false };
    envVars[env] = true;
    expect(envVar(envVars, overrideWindow)).toBe(true);
  });
};

describe('Environment Variables', () => {
  test('should default to local when it cannot determine the environment', () => {
    expect(envVar({ prod: false, local: true, qa: false, test: false })).toBe(
      true
    );
  });
  describe('Default environments', () => {
    [
      ['fallback-apps.availity.com', 'local'],
      ['localhost', 'local'],
      ['127.0.0.1', 'local'],
      ['test-apps.availity.com', 'test'],
      ['t01-apps.availity.com', 'test'],
      ['t14-apps.availity.com', 'test'],
      ['qa-apps.availity.com', 'qa'],
      ['qap-apps.availity.com', 'qa'],
      ['q01-apps.availity.com', 'qa'],
      ['apps.availity.com', 'prod'],
      ['digital.awp.availity.com/cdn/prd/spaces/index.html', 'prod'],
      ['digital.azp.availity.com/cdn/prd/spaces/index.html', 'prod'],
      ['digital.gcp.availity.com/cdn/prd/spaces/index.html', 'prod'],
      ['digital.awn.availity.com/cdn/prd/spaces/index.html', 'local'], // Non-prod domain, prod URI
      ['digital.aws.availity.com/cdn/prd/spaces/index.html', 'local'], // Non-prod domain, prod URI
      ['digital.azn.availity.com/cdn/prd/spaces/index.html', 'local'], // Non-prod domain, prod URI
      ['digital.gcn.availity.com/cdn/prd/spaces/index.html', 'local'], // Non-prod domain, prod URI
      ['digital.awp.availity.com/cdn/tst/spaces/index.html', 'local'], // Prod domain, non-prod URI
      ['digital.azp.availity.com/cdn/tst/spaces/index.html', 'local'], // Prod domain, non-prod URI
      ['digital.gcp.availity.com/cdn/tst/spaces/index.html', 'local'], // Prod domain, non-prod URI
      ['digital.awp.availity.com/api/prd/spaces/index.html', 'prod'],
      ['digital.azp.availity.com/api/prd/spaces/index.html', 'prod'],
      ['digital.gcp.availity.com/api/prd/spaces/index.html', 'prod'],
      ['digital.awn.availity.com/api/prd/spaces/index.html', 'local'], // Non-prod domain, prod URI
      ['digital.aws.availity.com/api/prd/spaces/index.html', 'local'], // Non-prod domain, prod URI
      ['digital.azn.availity.com/api/prd/spaces/index.html', 'local'], // Non-prod domain, prod URI
      ['digital.gcn.availity.com/api/prd/spaces/index.html', 'local'], // Non-prod domain, prod URI
      ['digital.awp.availity.com/api/tst/spaces/index.html', 'local'], // Prod domain, non-prod URI
      ['digital.azp.availity.com/api/tst/spaces/index.html', 'local'], // Prod domain, non-prod URI
      ['digital.gcp.availity.com/api/tst/spaces/index.html', 'local'], // Prod domain, non-prod URI
      ['digital.gap.availity.com/api/prd/spaces/index.html', 'local'], // Unrecognized cloud
      ['digital.azp.availity.com/apic/prd/spaces/index.html', 'local'], // Unrecognized namespace
      ['digital.azp.availity.com/api/prod/spaces/index.html', 'local'], // Unrecognized environment
      ['digital.awn.availity.com/cdn/stg/spaces/index.html', 'qa'],
      ['digital.aws.availity.com/cdn/stg/spaces/index.html', 'qa'],
      ['digital.azn.availity.com/cdn/qua/spaces/index.html', 'qa'],
      ['digital.gcn.availity.com/cdn/qap/spaces/index.html', 'qa'],
      ['digital.awn.availity.com/cdn/tst/spaces/index.html', 'test'],
      ['digital.aws.availity.com/cdn/tst/spaces/index.html', 'test'],
      ['digital.azn.availity.com/cdn/t01/spaces/index.html', 'test'],
      ['digital.gcn.availity.com/cdn/t25/spaces/index.html', 'test'],
    ].forEach(args => {
      generateTest(...args);
    });

    describe('Override window', () => {
      [
        [
          'fallback-apps.availity.com',
          'prod',
          getFakeWindowLocation('apps.availity.com'),
        ],
        ['localhost', 'prod', getFakeWindowLocation('apps.availity.com')],
        ['127.0.0.1', 'prod', getFakeWindowLocation('apps.availity.com')],
        [
          'test-apps.availity.com',
          'prod',
          getFakeWindowLocation('apps.availity.com'),
        ],
        [
          't01-apps.availity.com',
          'prod',
          getFakeWindowLocation('apps.availity.com'),
        ],
        [
          't14-apps.availity.com',
          'prod',
          getFakeWindowLocation('apps.availity.com'),
        ],
        [
          'qa-apps.availity.com',
          'prod',
          getFakeWindowLocation('apps.availity.com'),
        ],
        [
          'qap-apps.availity.com',
          'prod',
          getFakeWindowLocation('apps.availity.com'),
        ],
        [
          'q01-apps.availity.com',
          'prod',
          getFakeWindowLocation('apps.availity.com'),
        ],
        [
          'apps.availity.com',
          'qa',
          getFakeWindowLocation('q01-apps.availity.com'),
        ],
        [
          'apps.availity.com',
          'prod',
          getFakeWindowLocation('bar.awp.availity.com', '/cdn/prd/index.html'),
        ],
        [
          'apps.availity.com',
          'qa',
          getFakeWindowLocation('bar.awn.availity.com', '/cdn/q01/index.html'),
        ],
        [
          'apps.availity.com',
          'test',
          getFakeWindowLocation('bar.awn.availity.com', '/cdn/tst/index.html'),
        ],
        [
          'apps.availity.com',
          'qa',
          getFakeWindowLocation('bar.aws.availity.com', '/cdn/q01/index.html'),
        ],
        [
          'apps.availity.com',
          'test',
          getFakeWindowLocation('bar.aws.availity.com', '/cdn/tst/index.html'),
        ],
      ].forEach(args => {
        generateTest(...args);
      });
    });

    describe('Provide URL', () => {
      [
        ['fallback-apps.availity.com', 'prod', 'https://apps.availity.com'],
        ['localhost', 'prod', 'https://apps.availity.com'],
        ['127.0.0.1', 'prod', 'https://apps.availity.com'],
        ['test-apps.availity.com', 'prod', 'https://apps.availity.com'],
        ['t01-apps.availity.com', 'prod', 'https://apps.availity.com'],
        ['t14-apps.availity.com', 'prod', 'https://apps.availity.com'],
        ['qa-apps.availity.com', 'prod', 'https://apps.availity.com'],
        ['qap-apps.availity.com', 'prod', 'https://apps.availity.com'],
        ['q01-apps.availity.com', 'prod', 'https://apps.availity.com'],
        ['apps.availity.com', 'qa', 'https://q01-apps.availity.com'],
        [
          'foo.awn.availity.com/cdn/tst/spaces/index.html',
          'prod',
          'https://foo.awp.availity.com/api/prd/spaces/index.html',
        ],
        [
          'foo.awn.availity.com/cdn/t01/spaces/index.html',
          'prod',
          'https://foo.awp.availity.com/api/prd/spaces/index.html',
        ],
        [
          'foo.awn.availity.com/cdn/t14/spaces/index.html',
          'prod',
          'https://foo.awp.availity.com/api/prd/spaces/index.html',
        ],
        [
          'foo.awn.availity.com/cdn/stg/spaces/index.html',
          'prod',
          'https://foo.awp.availity.com/api/prd/spaces/index.html',
        ],
        [
          'foo.awn.availity.com/cdn/qap/spaces/index.html',
          'prod',
          'https://foo.awp.availity.com/api/prd/spaces/index.html',
        ],
        [
          'foo.awn.availity.com/cdn/q01/spaces/index.html',
          'prod',
          'https://foo.awp.availity.com/api/prd/spaces/index.html',
        ],
        [
          'foo.awp.availity.com/cdn/prd/spaces/index.html',
          'qa',
          'https://foo.awn.availity.com/api/stg/spaces/index.html',
        ],
        [
          'foo.awp.availity.com/cdn/prd/spaces/index.html',
          'qa',
          'https://foo.aws.availity.com/api/stg/spaces/index.html',
        ],
      ].forEach(args => {
        generateTest(...args);
      });
    });
  });

  describe('Override Environments', () => {
    describe('by Merging', () => {
      beforeAll(() => {
        setEnvironments({ myEnv: 'myenv' });
      });
      test('should test for a custom environment', () => {
        setHostname('myenv.availity.com');
        expect(
          envVar({
            prod: false,
            myEnv: true,
            local: false,
            qa: false,
            test: false,
          })
        ).toBe(true);
      });
      test('should keep the existing environments', () => {
        setHostname('apps.availity.com');
        expect(
          envVar({
            prod: true,
            myEnv: false,
            local: false,
            qa: false,
            test: false,
          })
        ).toBe(true);
      });
    });

    describe('by Replacing', () => {
      beforeAll(() => {
        setEnvironments({ myEnv: 'myenv' }, true);
      });
      test('should test for a custom environment', () => {
        setHostname('myenv.availity.com');
        expect(
          envVar({
            prod: false,
            myEnv: true,
            local: false,
            qa: false,
            test: false,
          })
        ).toBe(true);
      });
      test('should not keep the existing environments', () => {
        setHostname('apps.availity.com');
        expect(
          envVar({
            prod: false,
            myEnv: false,
            local: true,
            qa: false,
            test: false,
          })
        ).toBe(true);
      });
    });

    describe('with custom domains', () => {
      beforeAll(() => {
        setEnvironments({ www: 'www.example.com', app: 'app.example.com' });
      });
      test('should test for a custom environment', () => {
        setHostname('www.example.com');
        expect(
          envVar({
            app: false,
            www: true,
            local: false,
            qa: false,
            test: false,
          })
        ).toBe(true);
        setHostname('app.example.com');
        expect(
          envVar({
            app: true,
            www: false,
            local: false,
            qa: false,
            test: false,
          })
        ).toBe(true);
      });
    });

    describe('with default env', () => {
      beforeAll(() => {
        setEnvironments({ app: 'app.example.com' });
      });

      test('should render default', () => {
        setHostname('app.example.com');

        expect(
          envVar(
            {
              www: false,
              local: false,
              qa: false,
              test: false,
            },
            null,
            'default'
          )
        ).toBe('default');

        expect(
          envVar(
            {
              app: true,
              www: false,
              local: false,
              qa: false,
              test: false,
            },
            null,
            'default'
          )
        ).toBe(true);
      });
    });
  });

  const generateSpecificTest = (url, env, overrideWindow) => {
    test(`should return specific environment ${env} for ${url}`, () => {
      setHostname(url);
      expect(getSpecificEnv(overrideWindow)).toBe(env);
    });
  };

  describe('Specific environments', () => {
    [
      ['fallback-apps.availity.com', 'fallback'],
      ['localhost', 'local'],
      ['127.0.0.1', 'local'],
      ['test-apps.availity.com', 'test'],
      ['t01-apps.availity.com', 't01'],
      ['t14-apps.availity.com', 't14'],
      ['qa-apps.availity.com', 'qa'],
      ['qap-apps.availity.com', 'qap'],
      ['q01-apps.availity.com', 'q01'],
      ['apps.availity.com', 'prod'],
      ['digital.awp.availity.com/cdn/prd/spaces/index.html', 'prd'],
      ['digital.azp.availity.com/cdn/prd/spaces/index.html', 'prd'],
      ['digital.gcp.availity.com/cdn/prd/spaces/index.html', 'prd'],
      ['digital.awn.availity.com/cdn/prd/spaces/index.html', 'local'], // Non-prod domain, prod URI
      ['digital.aws.availity.com/cdn/prd/spaces/index.html', 'local'], // Non-prod domain, prod URI
      ['digital.azn.availity.com/cdn/prd/spaces/index.html', 'local'], // Non-prod domain, prod URI
      ['digital.gcn.availity.com/cdn/prd/spaces/index.html', 'local'], // Non-prod domain, prod URI
      ['digital.awp.availity.com/cdn/tst/spaces/index.html', 'local'], // Prod domain, non-prod URI
      ['digital.azp.availity.com/cdn/tst/spaces/index.html', 'local'], // Prod domain, non-prod URI
      ['digital.gcp.availity.com/cdn/tst/spaces/index.html', 'local'], // Prod domain, non-prod URI
      ['digital.awp.availity.com/api/prd/spaces/index.html', 'prd'],
      ['digital.azp.availity.com/api/prd/spaces/index.html', 'prd'],
      ['digital.gcp.availity.com/api/prd/spaces/index.html', 'prd'],
      ['digital.awn.availity.com/api/prd/spaces/index.html', 'local'], // Non-prod domain, prod URI
      ['digital.aws.availity.com/api/prd/spaces/index.html', 'local'], // Non-prod domain, prod URI
      ['digital.azn.availity.com/api/prd/spaces/index.html', 'local'], // Non-prod domain, prod URI
      ['digital.gcn.availity.com/api/prd/spaces/index.html', 'local'], // Non-prod domain, prod URI
      ['digital.awp.availity.com/api/tst/spaces/index.html', 'local'], // Prod domain, non-prod URI
      ['digital.azp.availity.com/api/tst/spaces/index.html', 'local'], // Prod domain, non-prod URI
      ['digital.gcp.availity.com/api/tst/spaces/index.html', 'local'], // Prod domain, non-prod URI
      ['digital.gap.availity.com/api/prd/spaces/index.html', 'local'], // Unrecognized cloud
      ['digital.azp.availity.com/apic/prd/spaces/index.html', 'local'], // Unrecognized namespace
      ['digital.azp.availity.com/api/prod/spaces/index.html', 'local'], // Unrecognized environment
      ['digital.awn.availity.com/cdn/stg/spaces/index.html', 'stg'],
      ['digital.aws.availity.com/cdn/stg/spaces/index.html', 'stg'],
      ['digital.azn.availity.com/cdn/qua/spaces/index.html', 'qua'],
      ['digital.gcn.availity.com/cdn/qap/spaces/index.html', 'qap'],
      ['digital.awn.availity.com/cdn/tst/spaces/index.html', 'tst'],
      ['digital.aws.availity.com/cdn/tst/spaces/index.html', 'tst'],
      ['digital.azn.availity.com/cdn/t01/spaces/index.html', 't01'],
      ['digital.gcn.availity.com/cdn/t25/spaces/index.html', 't25'],
      ['digital.box.availity.com/cdn/t25/spaces/index.html', 'local'],
      ['digital.awn.availity.com/cdn/apple/spaces/index.html', 'local'],
      ['digital.aws.availity.com/cdn/apple/spaces/index.html', 'local'],
      ['digital.awn.availity.com/nahfam/stg/spaces/index.html', 'local'],
      ['digital.aws.availity.com/nahfam/stg/spaces/index.html', 'local'],
    ].forEach(args => {
      generateSpecificTest(...args);
    });
  });

  const isCloudTest = (url, flag, overrideWindow) => {
    test(`should return ${flag} for ${url}`, () => {
      setHostname(url);
      expect(isCloud(overrideWindow)).toBe(flag);
    });
  };

  describe('isCloud URLs', () => {
    [
      ['fallback-apps.availity.com', false],
      ['localhost', false],
      ['127.0.0.1', false],
      ['test-apps.availity.com', false],
      ['t01-apps.availity.com', false],
      ['t14-apps.availity.com', false],
      ['qa-apps.availity.com', false],
      ['qap-apps.availity.com', false],
      ['q01-apps.availity.com', false],
      ['apps.availity.com', false],
      ['digital.awp.availity.com/cdn/prd/spaces/index.html', true],
      ['digital.azp.availity.com/cdn/prd/spaces/index.html', true],
      ['digital.gcp.availity.com/cdn/prd/spaces/index.html', true],
      ['digital.awn.availity.com/cdn/prd/spaces/index.html', false], // Non-prod domain, prod URI
      ['digital.aws.availity.com/cdn/prd/spaces/index.html', false], // Non-prod domain, prod URI
      ['digital.azn.availity.com/cdn/prd/spaces/index.html', false], // Non-prod domain, prod URI
      ['digital.gcn.availity.com/cdn/prd/spaces/index.html', false], // Non-prod domain, prod URI
      ['digital.awp.availity.com/cdn/tst/spaces/index.html', false], // Prod domain, non-prod URI
      ['digital.azp.availity.com/cdn/tst/spaces/index.html', false], // Prod domain, non-prod URI
      ['digital.gcp.availity.com/cdn/tst/spaces/index.html', false], // Prod domain, non-prod URI
      ['digital.awp.availity.com/api/prd/spaces/index.html', true],
      ['digital.azp.availity.com/api/prd/spaces/index.html', true],
      ['digital.gcp.availity.com/api/prd/spaces/index.html', true],
      ['digital.awn.availity.com/api/prd/spaces/index.html', false], // Non-prod domain, prod URI
      ['digital.aws.availity.com/api/prd/spaces/index.html', false], // Non-prod domain, prod URI
      ['digital.azn.availity.com/api/prd/spaces/index.html', false], // Non-prod domain, prod URI
      ['digital.gcn.availity.com/api/prd/spaces/index.html', false], // Non-prod domain, prod URI
      ['digital.awp.availity.com/api/tst/spaces/index.html', false], // Prod domain, non-prod URI
      ['digital.azp.availity.com/api/tst/spaces/index.html', false], // Prod domain, non-prod URI
      ['digital.gcp.availity.com/api/tst/spaces/index.html', false], // Prod domain, non-prod URI
      ['digital.gap.availity.com/api/prd/spaces/index.html', false], // Unrecognized cloud
      ['digital.azp.availity.com/apic/prd/spaces/index.html', false], // Unrecognized namespace
      ['digital.azp.availity.com/api/prod/spaces/index.html', false], // Unrecognized environment
      ['digital.awn.availity.com/cdn/stg/spaces/index.html', true],
      ['digital.aws.availity.com/cdn/stg/spaces/index.html', true],
      ['digital.azn.availity.com/cdn/qua/spaces/index.html', true],
      ['digital.gcn.availity.com/cdn/qap/spaces/index.html', true],
      ['digital.awn.availity.com/cdn/tst/spaces/index.html', true],
      ['digital.aws.availity.com/cdn/tst/spaces/index.html', true],
      ['digital.azn.availity.com/cdn/t01/spaces/index.html', true],
      ['digital.gcn.availity.com/cdn/t25/spaces/index.html', true],
      ['digital.box.availity.com/cdn/t25/spaces/index.html', false],
      ['digital.awn.availity.com/cdn/apple/spaces/index.html', false],
      ['digital.aws.availity.com/cdn/apple/spaces/index.html', false],
      ['digital.awn.availity.com/nahfam/stg/spaces/index.html', false],
      ['digital.aws.availity.com/nahfam/stg/spaces/index.html', false],
    ].forEach(args => {
      isCloudTest(...args);
    });
  });
});

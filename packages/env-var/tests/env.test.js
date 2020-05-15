import envVar, { setEnvironments } from '../src';

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
      ['digital.data.availity.com/data/tst/spaces/index.html', 'test'],
      ['foo.data.availity.com/data/t01/spaces/index.html', 'test'],
      ['foo.data.availity.com/data/t14/spaces/index.html', 'test'],
      ['foo.data.availity.com/data/qua/spaces/index.html', 'qa'],
      ['foo.data.availity.com/data/qap/spaces/index.html', 'qa'],
      ['foo.data.availity.com/data/q01/spaces/index.html', 'qa'],
      ['bar.data.availity.com/data/prd/spaces/index.html', 'prod'],
      ['bar.data.availity.com/data/abc/spaces/index.html', 'local'],
      ['bar.data.availity.com/other/index.html', 'local'],
      ['bar.data.availity.com', 'local'],
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
          getFakeWindowLocation(
            'bar.data.availity.com',
            '/data/prd/spaces/index.html'
          ),
        ],
        [
          'apps.availity.com',
          'qa',
          getFakeWindowLocation(
            'bar.data.availity.com',
            '/data/q01/spaces/index.html'
          ),
        ],
        [
          'apps.availity.com',
          'test',
          getFakeWindowLocation(
            'bar.data.availity.com',
            '/data/tst/spaces/index.html'
          ),
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
          'digital.data.availity.com/data/tst/spaces/index.html',
          'prod',
          'https://bar.data.availity.com/data/prd/spaces/index.html',
        ],
        [
          'foo.data.availity.com/data/t01/spaces/index.html',
          'prod',
          'https://bar.data.availity.com/data/prd/spaces/index.html',
        ],
        [
          'foo.data.availity.com/data/t14/spaces/index.html',
          'prod',
          'https://bar.data.availity.com/data/prd/spaces/index.html',
        ],
        [
          'foo.data.availity.com/data/qua/spaces/index.html',
          'prod',
          'https://bar.data.availity.com/data/prd/spaces/index.html',
        ],
        [
          'foo.data.availity.com/data/qap/spaces/index.html',
          'prod',
          'https://bar.data.availity.com/data/prd/spaces/index.html',
        ],
        [
          'foo.data.availity.com/data/q01/spaces/index.html',
          'prod',
          'https://bar.data.availity.com/data/prd/spaces/index.html',
        ],
        [
          'bar.data.availity.com/data/prd/spaces/index.html',
          'qa',
          'https://bar.data.availity.com/data/q01/spaces/index.html',
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
});

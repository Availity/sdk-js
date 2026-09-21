import envVar, {
  getCurrentEnv,
  getEnvironmentInfo,
  getLocation,
  getSpecificEnv,
  isLocal,
  isProd,
  isQa,
  isTest,
  resetEnvironments,
  resetSpecificEnvironments,
  setEnvironments,
  setSpecificEnvironments,
} from '.';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const fakeWindow = (hostname: string, pathname = '/') => ({
  location: { hostname, pathname },
});

// ---------------------------------------------------------------------------
// getLocation
// ---------------------------------------------------------------------------

describe('getLocation', () => {
  test('parses hostname and pathname from a full URL', () => {
    const loc = getLocation('https://apps.availity.com/some/path');
    expect(loc.hostname).toBe('apps.availity.com');
    expect(loc.pathname).toBe('/some/path');
  });

  test('returns "/" pathname when URL has no path', () => {
    const loc = getLocation('https://apps.availity.com');
    expect(loc.hostname).toBe('apps.availity.com');
    expect(loc.pathname).toBe('/');
  });

  test('throws on invalid input', () => {
    expect(() => getLocation('not-a-url')).toThrow();
  });
});

// ---------------------------------------------------------------------------
// getCurrentEnv
// ---------------------------------------------------------------------------

describe('getCurrentEnv', () => {
  test('returns "prod" for apps.availity.com', () => {
    expect(getCurrentEnv(fakeWindow('apps.availity.com') as unknown as Window)).toBe('prod');
  });

  test('returns "local" for localhost', () => {
    expect(getCurrentEnv(fakeWindow('localhost') as unknown as Window)).toBe('local');
  });

  test('returns "test" for t01-apps.availity.com', () => {
    expect(getCurrentEnv(fakeWindow('t01-apps.availity.com') as unknown as Window)).toBe('test');
  });

  test('returns "qa" for qa-apps.availity.com', () => {
    expect(getCurrentEnv(fakeWindow('qa-apps.availity.com') as unknown as Window)).toBe('qa');
  });

  test('returns empty string for an unrecognised hostname', () => {
    expect(getCurrentEnv(fakeWindow('unknown.someother.com') as unknown as Window)).toBe('');
  });

  test('returns empty string when called with null (SSR/no-window)', () => {
    expect(getCurrentEnv(null)).toBe('');
  });

  test('accepts a URL string', () => {
    expect(getCurrentEnv('https://apps.availity.com')).toBe('prod');
  });
});

// ---------------------------------------------------------------------------
// envVar — default export
// ---------------------------------------------------------------------------

describe('envVar', () => {
  describe('basic selection', () => {
    test('returns the value matching the current env — prod', () => {
      expect(envVar({ prod: 'production', local: 'development' }, fakeWindow('apps.availity.com'))).toBe('production');
    });

    test('returns the value matching the current env — test', () => {
      expect(envVar({ test: 'testing', local: 'development' }, fakeWindow('t01-apps.availity.com'))).toBe('testing');
    });

    test('returns the value matching the current env — qa', () => {
      expect(envVar({ qa: 'quality', local: 'development' }, fakeWindow('qa-apps.availity.com'))).toBe('quality');
    });

    test('falls back to local when env is local', () => {
      expect(envVar({ prod: false, local: true, qa: false, test: false }, fakeWindow('localhost'))).toBe(true);
    });

    test('returns defaultVar when matched env key is not in varObj and no local key', () => {
      expect(envVar({ prod: 'p' }, fakeWindow('unknown.other.com'), 'fallback')).toBe('fallback');
    });

    test('returns defaultVar over varObj.local when env is not found', () => {
      expect(envVar({ local: 'local-val', prod: 'prod-val' }, fakeWindow('unknown.other.com'), 'default-val')).toBe(
        'default-val'
      );
    });

    test('returns varObj.local when env is not found and no defaultVar', () => {
      expect(envVar({ local: 'local-val', prod: 'prod-val' }, fakeWindow('unknown.other.com'))).toBe('local-val');
    });

    test('returns undefined when env is not found, no defaultVar, and no local key', () => {
      expect(envVar({ prod: 'prod-val' }, fakeWindow('unknown.other.com'))).toBeUndefined();
    });

    test('accepts a URL string as windowOverride', () => {
      expect(envVar({ prod: true, local: false }, 'https://apps.availity.com')).toBe(true);
    });

    test('accepts null as windowOverride and falls back to local', () => {
      expect(envVar({ prod: false, local: true }, null)).toBe(true);
    });

    test('does not coerce falsy values like 0 or false to local (uses ?? not ||)', () => {
      expect(envVar({ local: 99 }, fakeWindow('unknown.other.com'), 0)).toBe(0);
    });
  });

  describe('overload: local always provided → return is never undefined', () => {
    test('TypeScript infers T (not T | undefined) when local is in varObj', () => {
      const result = envVar({ local: 'fallback', prod: 'production' }, fakeWindow('apps.availity.com'));
      expect(result).toBe('production');
    });

    test('returns local when env is unrecognised and local is always provided', () => {
      const result = envVar({ local: 'fallback', prod: 'production' }, fakeWindow('unknown.other.com'));
      expect(result).toBe('fallback');
    });
  });

  // ---------------------------------------------------------------------------
  // Environment classification
  // ---------------------------------------------------------------------------

  describe('environment classification', () => {
    const assertEnv = (hostAndPath: string, expectedEnv: string) => {
      test(`${hostAndPath} → ${expectedEnv}`, () => {
        const w = fakeWindow(hostAndPath);
        const envVars = { prod: false, local: false, qa: false, test: false, [expectedEnv]: true };
        expect(envVar(envVars, w)).toBe(true);
      });
    };

    describe('local', () => {
      assertEnv('localhost', 'local');
      assertEnv('127.0.0.1', 'local');
      // Unknown host — falls through to local via varObj.local
      assertEnv('fallback-apps.availity.com', 'local');
    });

    describe('test — portal URLs', () => {
      assertEnv('test-apps.availity.com', 'test');
      assertEnv('test-essentials.availity.com', 'test');
      assertEnv('t01-apps.availity.com', 'test');
      assertEnv('t14-apps.availity.com', 'test');
    });

    describe('qa — portal URLs', () => {
      assertEnv('qa-apps.availity.com', 'qa');
      assertEnv('qa-essentials.availity.com', 'qa');
      assertEnv('qap-apps.availity.com', 'qa');
      assertEnv('q01-apps.availity.com', 'qa');
    });

    describe('prod — portal URLs', () => {
      assertEnv('apps.availity.com', 'prod');
      assertEnv('essentials.availity.com', 'prod');
    });

    describe('unknown hostnames fall through to local', () => {
      assertEnv('tykwhatever.example.com', 'local');
    });
  });

  describe('window override', () => {
    test('uses the override window, not the actual window', () => {
      expect(envVar({ prod: false, qa: true }, fakeWindow('qa-apps.availity.com'))).toBe(true);
    });
  });

  describe('URL string as windowOverride', () => {
    test('parses a prod portal URL', () => {
      expect(envVar({ prod: true, local: false }, 'https://apps.availity.com')).toBe(true);
    });
  });
});

// ---------------------------------------------------------------------------
// getSpecificEnv
// ---------------------------------------------------------------------------

describe('getSpecificEnv', () => {
  const assertSpecific = (hostname: string, expectedSlug: string) => {
    test(`${hostname} → "${expectedSlug}"`, () => {
      expect(getSpecificEnv(fakeWindow(hostname) as unknown as Window)).toBe(expectedSlug);
    });
  };

  describe('portal URLs', () => {
    assertSpecific('localhost', 'local');
    assertSpecific('127.0.0.1', 'local');
    assertSpecific('fallback-apps.availity.com', 'fallback');
    assertSpecific('test-apps.availity.com', 'test');
    assertSpecific('t01-apps.availity.com', 't01');
    assertSpecific('t14-apps.availity.com', 't14');
    assertSpecific('qa-apps.availity.com', 'qa');
    assertSpecific('qap-apps.availity.com', 'qap');
    assertSpecific('q01-apps.availity.com', 'q01');
    assertSpecific('apps.availity.com', 'prod');
    assertSpecific('essentials.availity.com', 'prod');
  });

  test('returns "local" when called with null (SSR/no-window)', () => {
    expect(getSpecificEnv(null)).toBe('local');
  });

  test('accepts a URL string and parses it correctly', () => {
    expect(getSpecificEnv('https://apps.availity.com' as unknown as Window)).toBe('prod');
  });
});

// ---------------------------------------------------------------------------
// getEnvironmentInfo
// ---------------------------------------------------------------------------

describe('getEnvironmentInfo', () => {
  test('returns both env and specificEnv for a prod portal URL', () => {
    expect(getEnvironmentInfo(fakeWindow('apps.availity.com') as unknown as Window)).toEqual({
      env: 'prod',
      specificEnv: 'prod',
    });
  });

  test('returns both env and specificEnv for a test portal URL', () => {
    expect(getEnvironmentInfo(fakeWindow('t01-apps.availity.com') as unknown as Window)).toEqual({
      env: 'test',
      specificEnv: 't01',
    });
  });

  test('returns both env and specificEnv for a qa portal URL', () => {
    expect(getEnvironmentInfo(fakeWindow('qa-apps.availity.com') as unknown as Window)).toEqual({
      env: 'qa',
      specificEnv: 'qa',
    });
  });

  test('returns local/local for localhost', () => {
    expect(getEnvironmentInfo(fakeWindow('localhost') as unknown as Window)).toEqual({
      env: 'local',
      specificEnv: 'local',
    });
  });

  test('returns empty env and "local" specificEnv for null (SSR/no-window)', () => {
    expect(getEnvironmentInfo(null)).toEqual({
      env: '',
      specificEnv: 'local',
    });
  });

  test('accepts a URL string', () => {
    expect(getEnvironmentInfo('https://qa-apps.availity.com')).toEqual({
      env: 'qa',
      specificEnv: 'qa',
    });
  });
});

// ---------------------------------------------------------------------------
// Boolean helpers: isProd, isQa, isTest, isLocal
// ---------------------------------------------------------------------------

describe('boolean helpers', () => {
  describe('isProd', () => {
    test('returns true for apps.availity.com', () => {
      expect(isProd(fakeWindow('apps.availity.com') as unknown as Window)).toBe(true);
    });

    test('returns false for qa-apps.availity.com', () => {
      expect(isProd(fakeWindow('qa-apps.availity.com') as unknown as Window)).toBe(false);
    });

    test('returns false for localhost', () => {
      expect(isProd(fakeWindow('localhost') as unknown as Window)).toBe(false);
    });

    test('returns false for null (SSR/no-window)', () => {
      expect(isProd(null)).toBe(false);
    });

    test('accepts a URL string', () => {
      expect(isProd('https://apps.availity.com')).toBe(true);
    });
  });

  describe('isQa', () => {
    test('returns true for qa-apps.availity.com', () => {
      expect(isQa(fakeWindow('qa-apps.availity.com') as unknown as Window)).toBe(true);
    });

    test('returns true for qap-apps.availity.com', () => {
      expect(isQa(fakeWindow('qap-apps.availity.com') as unknown as Window)).toBe(true);
    });

    test('returns false for apps.availity.com', () => {
      expect(isQa(fakeWindow('apps.availity.com') as unknown as Window)).toBe(false);
    });

    test('returns false for null (SSR/no-window)', () => {
      expect(isQa(null)).toBe(false);
    });
  });

  describe('isTest', () => {
    test('returns true for t01-apps.availity.com', () => {
      expect(isTest(fakeWindow('t01-apps.availity.com') as unknown as Window)).toBe(true);
    });

    test('returns true for test-apps.availity.com', () => {
      expect(isTest(fakeWindow('test-apps.availity.com') as unknown as Window)).toBe(true);
    });

    test('returns false for apps.availity.com', () => {
      expect(isTest(fakeWindow('apps.availity.com') as unknown as Window)).toBe(false);
    });

    test('returns false for null (SSR/no-window)', () => {
      expect(isTest(null)).toBe(false);
    });
  });

  describe('isLocal', () => {
    test('returns true for localhost', () => {
      expect(isLocal(fakeWindow('localhost') as unknown as Window)).toBe(true);
    });

    test('returns true for 127.0.0.1', () => {
      expect(isLocal(fakeWindow('127.0.0.1') as unknown as Window)).toBe(true);
    });

    test('returns true for an unrecognised host (falls through to empty string)', () => {
      expect(isLocal(fakeWindow('unknown.other.com') as unknown as Window)).toBe(true);
    });

    test('returns true for null (SSR/no-window)', () => {
      expect(isLocal(null)).toBe(true);
    });

    test('returns false for apps.availity.com', () => {
      expect(isLocal(fakeWindow('apps.availity.com') as unknown as Window)).toBe(false);
    });
  });
});

// ---------------------------------------------------------------------------
// setEnvironments — custom environment overrides
// ---------------------------------------------------------------------------

describe('setEnvironments', () => {
  afterEach(() => {
    resetEnvironments();
  });

  describe('merge (default)', () => {
    test('custom string matcher is recognised', () => {
      setEnvironments({ myEnv: 'myenv' });
      expect(
        envVar({ prod: false, myEnv: true, local: false, qa: false, test: false }, fakeWindow('myenv.availity.com'))
      ).toBe(true);
    });

    test('built-in environments still work after merge', () => {
      setEnvironments({ myEnv: 'myenv' });
      expect(
        envVar({ prod: true, myEnv: false, local: false, qa: false, test: false }, fakeWindow('apps.availity.com'))
      ).toBe(true);
    });
  });

  describe('with RegExp matcher', () => {
    test('RegExp matcher fires for a matching subdomain', () => {
      setEnvironments({ staging: /^stg-apps$/ });
      expect(envVar({ staging: true, local: false }, fakeWindow('stg-apps.availity.com'))).toBe(true);
    });

    test('RegExp matcher does not fire for a non-matching subdomain', () => {
      setEnvironments({ staging: /^stg-apps$/ });
      expect(envVar({ staging: true, local: false }, fakeWindow('prod-apps.availity.com'))).toBe(false);
    });
  });

  describe('with function matcher', () => {
    test('function matcher fires when condition is met', () => {
      setEnvironments({
        hotfix: (opts) => opts.subdomain === 'hotfix' && opts.pathname.startsWith('/release/'),
      });
      expect(envVar({ hotfix: true, local: false }, fakeWindow('hotfix.availity.com', '/release/v1'))).toBe(true);
    });

    test('function matcher does not fire when pathname condition is not met', () => {
      setEnvironments({
        hotfix: (opts) => opts.subdomain === 'hotfix' && opts.pathname.startsWith('/release/'),
      });
      expect(envVar({ hotfix: true, local: false }, fakeWindow('hotfix.availity.com', '/other/path'))).toBe(false);
    });

    test('function matcher does not fire when subdomain condition is not met', () => {
      setEnvironments({
        hotfix: (opts) => opts.subdomain === 'hotfix' && opts.pathname.startsWith('/release/'),
      });
      expect(envVar({ hotfix: true, local: false }, fakeWindow('other.availity.com', '/release/v1'))).toBe(false);
    });
  });

  describe('replace (override=true)', () => {
    test('custom environment is recognised', () => {
      setEnvironments({ myEnv: 'myenv' }, true);
      expect(envVar({ myEnv: true, local: false }, fakeWindow('myenv.availity.com'))).toBe(true);
    });

    test('built-in prod no longer matches after full replace', () => {
      setEnvironments({ myEnv: 'myenv' }, true);
      expect(
        envVar({ prod: 'should-not-match', myEnv: 'matched', local: 'fallback' }, fakeWindow('apps.availity.com'))
      ).toBe('fallback');
    });
  });

  describe('with custom non-availity domains', () => {
    test('matches www.example.com', () => {
      setEnvironments({ www: 'www.example.com', app: 'app.example.com' });
      expect(envVar({ www: true, app: false, local: false }, fakeWindow('www.example.com'))).toBe(true);
    });

    test('matches app.example.com', () => {
      setEnvironments({ www: 'www.example.com', app: 'app.example.com' });
      expect(envVar({ www: false, app: true, local: false }, fakeWindow('app.example.com'))).toBe(true);
    });
  });

  describe('null windowOverride with defaultVar', () => {
    test('returns defaultVar when window is null', () => {
      expect(envVar({ www: false, qa: false, test: false }, null, 'default')).toBe('default');
    });
  });
});

// ---------------------------------------------------------------------------
// resetEnvironments
// ---------------------------------------------------------------------------

describe('resetEnvironments', () => {
  test('restores built-in environments after a replace override', () => {
    setEnvironments({ custom: 'custom' }, true);
    expect(getCurrentEnv(fakeWindow('apps.availity.com') as unknown as Window)).toBe('');

    resetEnvironments();
    expect(getCurrentEnv(fakeWindow('apps.availity.com') as unknown as Window)).toBe('prod');
  });

  test('restores built-in environments after a merge', () => {
    setEnvironments({ custom: 'custom' });
    resetEnvironments();
    expect(getCurrentEnv(fakeWindow('custom.availity.com') as unknown as Window)).toBe('');
    expect(getCurrentEnv(fakeWindow('localhost') as unknown as Window)).toBe('local');
  });
});

// ---------------------------------------------------------------------------
// setSpecificEnvironments
// ---------------------------------------------------------------------------

describe('setSpecificEnvironments', () => {
  afterEach(() => {
    resetSpecificEnvironments();
  });

  describe('merge (default)', () => {
    test('custom specific environment is returned for matching hostname', () => {
      setSpecificEnvironments([{ regex: /^myservice$/, fn: () => 'custom-env' }]);
      expect(getSpecificEnv(fakeWindow('myservice.availity.com') as unknown as Window)).toBe('custom-env');
    });

    test('built-in specific environments still work after merge', () => {
      setSpecificEnvironments([{ regex: /^myservice$/, fn: () => 'custom-env' }]);
      expect(getSpecificEnv(fakeWindow('apps.availity.com') as unknown as Window)).toBe('prod');
    });
  });

  describe('replace (override=true)', () => {
    test('custom specific environment matches', () => {
      setSpecificEnvironments([{ regex: /^myservice$/, fn: () => 'custom-env' }], true);
      expect(getSpecificEnv(fakeWindow('myservice.availity.com') as unknown as Window)).toBe('custom-env');
    });

    test('built-in specific environments no longer match after full replace', () => {
      setSpecificEnvironments([{ regex: /^myservice$/, fn: () => 'custom-env' }], true);
      expect(getSpecificEnv(fakeWindow('apps.availity.com') as unknown as Window)).toBe('local');
    });
  });
});

// ---------------------------------------------------------------------------
// resetSpecificEnvironments
// ---------------------------------------------------------------------------

describe('resetSpecificEnvironments', () => {
  test('restores built-in specific environments after a replace override', () => {
    setSpecificEnvironments([{ regex: /^myservice$/, fn: () => 'custom-env' }], true);
    expect(getSpecificEnv(fakeWindow('apps.availity.com') as unknown as Window)).toBe('local');

    resetSpecificEnvironments();
    expect(getSpecificEnv(fakeWindow('apps.availity.com') as unknown as Window)).toBe('prod');
  });
});

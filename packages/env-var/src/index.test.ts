import envVar, { getCurrentEnv, getLocation, getSpecificEnv, setEnvironments, setSpecificEnvironments } from '.';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const fakeWindow = (hostname: string, pathname = '/') => ({
  location: { hostname, pathname },
});

/**
 * Build a fake window from a combined "hostname/path" string as used in the
 * test tables, e.g. "digital.awp.availity.com/cdn/prd/spaces/index.html".
 */
const windowFromUrl = (hostAndPath: string) => {
  const [host, ...pathParts] = hostAndPath.split('/');
  const pathname = pathParts.length > 0 ? `/${pathParts.join('/')}` : '/';
  return fakeWindow(host, pathname);
};

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

  test('returns empty string for an unrecognised hostname (not "local")', () => {
    // Unrecognised hosts don't match any env — returns '' and envVar falls back to local
    expect(getCurrentEnv(fakeWindow('unknown.someother.com') as unknown as Window)).toBe('');
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

    test('falls back to local when env is unrecognised', () => {
      expect(envVar({ prod: false, local: true, qa: false, test: false })).toBe(true);
    });

    test('returns defaultVar when matched env key is not in varObj and no local key', () => {
      // getCurrentEnv returns '' for an unknown host; '' is not in varObj, so falls to defaultVar
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
  });

  // ---------------------------------------------------------------------------
  // Environment classification — getCurrentEnv category
  // ---------------------------------------------------------------------------

  describe('environment classification', () => {
    const assertEnv = (hostAndPath: string, expectedEnv: string) => {
      test(`${hostAndPath} → ${expectedEnv}`, () => {
        const w = windowFromUrl(hostAndPath);
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

    describe('cloud .availity.com URLs', () => {
      // Prod zone + prod path → prod
      assertEnv('digital.awp.availity.com/cdn/prd/spaces/index.html', 'prod');
      assertEnv('digital.azp.availity.com/api/prd/spaces/index.html', 'prod');
      assertEnv('digital.gcp.availity.com/cdn/prd/spaces/index.html', 'prod');

      // Non-prod zone + test path → test
      assertEnv('digital.awn.availity.com/cdn/tst/spaces/index.html', 'test');
      assertEnv('digital.aws.availity.com/cdn/tst/spaces/index.html', 'test');
      assertEnv('digital.azn.availity.com/cdn/t01/spaces/index.html', 'test');
      assertEnv('digital.gcn.availity.com/cdn/t25/spaces/index.html', 'test');

      // Non-prod zone + qa path → qa
      assertEnv('digital.awn.availity.com/cdn/stg/spaces/index.html', 'qa');
      assertEnv('digital.azn.availity.com/cdn/qua/spaces/index.html', 'qa');
      assertEnv('digital.gcn.availity.com/cdn/qap/spaces/index.html', 'qa');

      // Sandbox zone (aws = aw + s) + non-prod path → test/qa (same as non-prod)
      assertEnv('digital.aws.availity.com/cdn/stg/spaces/index.html', 'qa'); // sandbox zone, qa path
      assertEnv('digital.azs.availity.com/cdn/t01/spaces/index.html', 'test'); // sandbox zone, test path

      // Sandbox zone + prod path → local (sandbox can't be prod)
      assertEnv('digital.aws.availity.com/cdn/prd/spaces/index.html', 'local');

      // Zone/path mismatch → local (not a valid combination)
      assertEnv('digital.awn.availity.com/cdn/prd/spaces/index.html', 'local'); // non-prod zone, prod path
      assertEnv('digital.awp.availity.com/cdn/tst/spaces/index.html', 'local'); // prod zone, non-prod path
      assertEnv('digital.gap.availity.com/api/prd/spaces/index.html', 'local'); // unrecognised cloud provider
      assertEnv('digital.azp.availity.com/apic/prd/spaces/index.html', 'local'); // unrecognised namespace
      assertEnv('digital.azp.availity.com/api/prod/spaces/index.html', 'local'); // 4-char env slug
    });

    describe('unknown hostnames fall through to local', () => {
      assertEnv('tykwhatever.example.com', 'local');
      assertEnv('tykint.noinfrastructure.awp.availity.net', 'local');
    });
  });

  // ---------------------------------------------------------------------------
  // Window override and URL string forms
  // ---------------------------------------------------------------------------

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
  const assertSpecific = (hostAndPath: string, expectedSlug: string) => {
    test(`${hostAndPath} → "${expectedSlug}"`, () => {
      expect(getSpecificEnv(windowFromUrl(hostAndPath) as unknown as Window)).toBe(expectedSlug);
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

  describe('cloud .availity.com URLs', () => {
    assertSpecific('digital.awp.availity.com/cdn/prd/spaces/index.html', 'prd');
    assertSpecific('digital.azp.availity.com/api/prd/spaces/index.html', 'prd');
    assertSpecific('digital.gcp.availity.com/cdn/prd/spaces/index.html', 'prd');

    assertSpecific('digital.awn.availity.com/cdn/tst/spaces/index.html', 'tst');
    assertSpecific('digital.aws.availity.com/cdn/tst/spaces/index.html', 'tst');
    assertSpecific('digital.azn.availity.com/cdn/t01/spaces/index.html', 't01');
    assertSpecific('digital.gcn.availity.com/cdn/t25/spaces/index.html', 't25');

    assertSpecific('digital.awn.availity.com/cdn/stg/spaces/index.html', 'stg');
    assertSpecific('digital.azn.availity.com/cdn/qua/spaces/index.html', 'qua');
    assertSpecific('digital.gcn.availity.com/cdn/qap/spaces/index.html', 'qap');

    // Sandbox zone (s) — same rules as non-prod: s+non-prod path is valid, s+prd path is not
    assertSpecific('digital.aws.availity.com/cdn/stg/spaces/index.html', 'stg'); // sandbox + qa slug
    assertSpecific('digital.azs.availity.com/cdn/t01/spaces/index.html', 't01'); // sandbox + test slug
    assertSpecific('digital.aws.availity.com/cdn/prd/spaces/index.html', 'local'); // sandbox + prod path → invalid

    // Zone/path mismatches → local
    assertSpecific('digital.awn.availity.com/cdn/prd/spaces/index.html', 'local');
    assertSpecific('digital.awp.availity.com/cdn/tst/spaces/index.html', 'local');
    assertSpecific('digital.gap.availity.com/api/prd/spaces/index.html', 'local');
    assertSpecific('digital.azp.availity.com/apic/prd/spaces/index.html', 'local');
    assertSpecific('digital.azp.availity.com/api/prod/spaces/index.html', 'local');
  });

  describe('URL string override', () => {
    test('accepts a URL string and parses it correctly', () => {
      expect(getSpecificEnv('https://apps.availity.com' as unknown as Window)).toBe('prod');
    });
  });
});

// ---------------------------------------------------------------------------
// setEnvironments — custom environment overrides
// ---------------------------------------------------------------------------

describe('setEnvironments', () => {
  // Save the original before any mutations in this block
  // Note: setEnvironments mutations are module-level — these tests run after
  // the main env classification tests to avoid polluting them.

  describe('merge (default)', () => {
    beforeAll(() => {
      setEnvironments({ myEnv: 'myenv' });
    });

    test('custom string matcher is recognised', () => {
      expect(
        envVar({ prod: false, myEnv: true, local: false, qa: false, test: false }, fakeWindow('myenv.availity.com'))
      ).toBe(true);
    });

    test('built-in environments still work after merge', () => {
      expect(
        envVar({ prod: true, myEnv: false, local: false, qa: false, test: false }, fakeWindow('apps.availity.com'))
      ).toBe(true);
    });
  });

  describe('with RegExp matcher', () => {
    beforeAll(() => {
      setEnvironments({ staging: /^stg-apps$/ });
    });

    test('RegExp matcher fires for a matching subdomain', () => {
      expect(envVar({ staging: true, local: false }, fakeWindow('stg-apps.availity.com'))).toBe(true);
    });

    test('RegExp matcher does not fire for a non-matching subdomain', () => {
      expect(envVar({ staging: true, local: false }, fakeWindow('prod-apps.availity.com'))).toBe(false);
    });
  });

  describe('with function matcher', () => {
    beforeAll(() => {
      // Custom env that matches on a specific path segment
      setEnvironments({
        hotfix: (opts) => opts.subdomain === 'hotfix' && opts.pathname.startsWith('/release/'),
      });
    });

    test('function matcher fires when condition is met', () => {
      expect(envVar({ hotfix: true, local: false }, fakeWindow('hotfix.availity.com', '/release/v1'))).toBe(true);
    });

    test('function matcher does not fire when pathname condition is not met', () => {
      expect(envVar({ hotfix: true, local: false }, fakeWindow('hotfix.availity.com', '/other/path'))).toBe(false);
    });

    test('function matcher does not fire when subdomain condition is not met', () => {
      expect(envVar({ hotfix: true, local: false }, fakeWindow('other.availity.com', '/release/v1'))).toBe(false);
    });
  });

  describe('replace (override=true)', () => {
    beforeAll(() => {
      setEnvironments({ myEnv: 'myenv' }, true);
    });

    test('custom environment is recognised', () => {
      expect(envVar({ myEnv: true, local: false }, fakeWindow('myenv.availity.com'))).toBe(true);
    });

    test('built-in prod no longer matches after full replace', () => {
      // After replace, only "myEnv" exists — prod won't match
      expect(
        envVar({ prod: 'should-not-match', myEnv: 'matched', local: 'fallback' }, fakeWindow('apps.availity.com'))
      ).toBe('fallback');
    });
  });

  describe('with custom non-availity domains', () => {
    beforeAll(() => {
      setEnvironments({ www: 'www.example.com', app: 'app.example.com' });
    });

    test('matches www.example.com', () => {
      expect(envVar({ www: true, app: false, local: false }, fakeWindow('www.example.com'))).toBe(true);
    });

    test('matches app.example.com', () => {
      expect(envVar({ www: false, app: true, local: false }, fakeWindow('app.example.com'))).toBe(true);
    });
  });

  describe('null windowOverride with defaultVar', () => {
    // Restore a sensible state before this test
    beforeAll(() => {
      setEnvironments({ app: 'app.example.com' });
    });

    test('returns defaultVar when window is null', () => {
      expect(envVar({ www: false, qa: false, test: false }, null, 'default')).toBe('default');
    });
  });
});

// ---------------------------------------------------------------------------
// setSpecificEnvironments
// ---------------------------------------------------------------------------

describe('setSpecificEnvironments', () => {
  describe('merge (default)', () => {
    beforeAll(() => {
      setSpecificEnvironments([
        {
          regex: /^myservice$/,
          fn: () => 'custom-env',
        },
      ]);
    });

    test('custom specific environment is returned for matching hostname', () => {
      // subdomain of "myservice.availity.com" is "myservice" — matches regex
      expect(getSpecificEnv(fakeWindow('myservice.availity.com') as unknown as Window)).toBe('custom-env');
    });

    test('built-in specific environments still work after merge', () => {
      expect(getSpecificEnv(fakeWindow('apps.availity.com') as unknown as Window)).toBe('prod');
    });
  });

  describe('replace (override=true)', () => {
    beforeAll(() => {
      setSpecificEnvironments(
        [
          {
            regex: /^myservice$/,
            fn: () => 'custom-env',
          },
        ],
        true
      );
    });

    test('custom specific environment matches', () => {
      expect(getSpecificEnv(fakeWindow('myservice.availity.com') as unknown as Window)).toBe('custom-env');
    });

    test('built-in specific environments no longer match after full replace', () => {
      // apps.availity.com subdomain is "apps" — no longer matched, falls back to "local"
      expect(getSpecificEnv(fakeWindow('apps.availity.com') as unknown as Window)).toBe('local');
    });
  });
});

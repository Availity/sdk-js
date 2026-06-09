import { getSpecificEnv } from '@availity/env-var';
import resolveHost from '../resolve-host';

vi.mock('@availity/env-var', () => ({
  getSpecificEnv: vi.fn(),
}));

function mockWindow(hostname) {
  return { location: { hostname } };
}

describe('resolveHost', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns host directly when provided', () => {
    expect(resolveHost('custom-host.com', mockWindow('team.awn.availity.com'))).toBe('custom-host.com');
  });

  it('returns empty string for non-cloud hostname', () => {
    expect(resolveHost(undefined, mockWindow('apps.availity.com'))).toBe('');
  });

  describe('cloud hostnames', () => {
    it('maps tst env to test-apps.availity.com', () => {
      getSpecificEnv.mockReturnValue('tst');
      expect(resolveHost(undefined, mockWindow('team.awn.availity.com'))).toBe('test-apps.availity.com');
    });

    it('maps stg env to qa-apps.availity.com', () => {
      getSpecificEnv.mockReturnValue('stg');
      expect(resolveHost(undefined, mockWindow('team.azn.availity.com'))).toBe('qa-apps.availity.com');
    });

    it('maps qua env to qa-apps.availity.com', () => {
      getSpecificEnv.mockReturnValue('qua');
      expect(resolveHost(undefined, mockWindow('team.gcn.availity.com'))).toBe('qa-apps.availity.com');
    });

    it('maps prd env to apps.availity.com (no prefix)', () => {
      getSpecificEnv.mockReturnValue('prd');
      expect(resolveHost(undefined, mockWindow('team.awp.availity.com'))).toBe('apps.availity.com');
    });

    it('returns empty string when env is local', () => {
      getSpecificEnv.mockReturnValue('local');
      expect(resolveHost(undefined, mockWindow('team.aws.availity.com'))).toBe('');
    });

    it('uses env directly as prefix when not in CLOUD_TO_APP_DOMAINS map', () => {
      getSpecificEnv.mockReturnValue('t01');
      expect(resolveHost(undefined, mockWindow('team.awn.availity.com'))).toBe('t01-apps.availity.com');
    });

    it('matches az and gc cloud providers', () => {
      getSpecificEnv.mockReturnValue('tst');
      expect(resolveHost(undefined, mockWindow('team.azp.availity.com'))).toBe('test-apps.availity.com');
      expect(resolveHost(undefined, mockWindow('team.gcs.availity.com'))).toBe('test-apps.availity.com');
    });
  });
});

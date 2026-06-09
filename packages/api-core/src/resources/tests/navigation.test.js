import AvNavigation from '../navigation';

const mockHttp = vi.fn(() => Promise.resolve({}));

describe('AvNavigation', () => {
  let api;

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should be defined', () => {
    api = new AvNavigation({ http: mockHttp });
    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvNavigation({
      http: mockHttp,
      promise: Promise,
    });
    expect(api).toBeDefined();
  });
});

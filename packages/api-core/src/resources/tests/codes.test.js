import AvCodes from '../codes';

const mockHttp = vi.fn(() => Promise.resolve({}));

describe('AvCodes', () => {
  let api;

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should be defined', () => {
    api = new AvCodes({ http: mockHttp });
    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvCodes({
      http: mockHttp,
      promise: Promise,
    });
    expect(api).toBeDefined();
  });
});

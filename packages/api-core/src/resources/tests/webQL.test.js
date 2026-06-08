import AvWebQL from '../webQL';

const mockHttp = jest.fn(() => Promise.resolve({}));

describe('AvWebQL', () => {
  let api;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    api = new AvWebQL({ http: mockHttp });
    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvWebQL({
      http: mockHttp,
      promise: Promise,
    });
    expect(api).toBeDefined();
  });
});

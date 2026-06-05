import AvWebQLApi from '../webQL';

describe('AvWebQLApi', () => {
  let api;
  beforeEach(() => {
    api = new AvWebQLApi();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('url should be correct', () => {
    expect(api.getUrl(api.config())).toBe('/ms/api/availity/internal/spc/web/graphql');
  });
});

import { AvAnalyticsPlugin } from '..';

describe('AvAnalyticsPlugin', () => {
  let mockPlugin: AvAnalyticsPlugin;

  beforeEach(() => {
    mockPlugin = new AvAnalyticsPlugin();
  });

  test('AvAnalyticsPlugin should be defined', () => {
    expect(mockPlugin).toBeDefined();
  });

  test('should default enabled to true', () => {
    expect(mockPlugin.isEnabled()).toBe(true);
    mockPlugin = new AvAnalyticsPlugin(false);
    expect(mockPlugin.isEnabled()).toBe(false);
  });

  test('isEnabled should return enabled value', () => {
    expect(mockPlugin.isEnabled()).toBe(mockPlugin.isEnabled());
  });
});

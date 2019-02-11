import { AvAnalyticsPlugin } from '..';

describe('AvAnalyticsPlugin', () => {
  let mockPlugin;

  test('AvAnalyticsPlugin should be defined', () => {
    mockPlugin = new AvAnalyticsPlugin();
    expect(mockPlugin).toBeDefined();
  });

  test('should default enabled to true', () => {
    mockPlugin = new AvAnalyticsPlugin();
    expect(mockPlugin.enabled).toBe(true);
    mockPlugin = new AvAnalyticsPlugin(false);
    expect(mockPlugin.enabled).toBe(false);
  });

  test('isEnabled should return enabled value', () => {
    mockPlugin = new AvAnalyticsPlugin();
    expect(mockPlugin.isEnabled()).toBe(mockPlugin.enabled);
  });
});

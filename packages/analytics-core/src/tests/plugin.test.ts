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

  test('isEnabled reflects the current value of the enabled field', () => {
    // Verify isEnabled() returns the live value, not a snapshot from construction
    expect(mockPlugin.isEnabled()).toBe(true);
    mockPlugin.enabled = false;
    expect(mockPlugin.isEnabled()).toBe(false);
    mockPlugin.enabled = true;
    expect(mockPlugin.isEnabled()).toBe(true);
  });
});

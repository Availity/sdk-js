
export class AvAnalyticsPlugin {
  constructor(enabled = true) {
    this.enabled = !!enabled;
  }

  trackEvent(){}

  trackPageView(){}

  isEnabled() {
    return this.enabled;
  }
}

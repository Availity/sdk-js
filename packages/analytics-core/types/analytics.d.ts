declare class AvAnalytics {
  constructor(
    plugins: any[],
    promise?: PromiseConstructor,
    pageTracking?: boolean,
    autoTrack?: boolean,
    options?: Record<string, any>
  );

  startAutoTrack(): void;

  stopAutoTrack(): void;

  handleEvent(event: any): void;

  invalidEvent(event: any): boolean;

  getAnalyticAttrs(elem: any): any;

  startPageTracking(): void;

  stopPageTracking(): void;

  init(): void;

  setPageTracking(value: any): void;

  trackEvent(properties: any): Promise<any[]>;

  trackPageView(url: string): Promise<any[]>;
}

export default AvAnalytics;

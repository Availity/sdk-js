import AvAnalyticsPlugin, { AnalyticsEventProperties } from './plugin';

export interface AvAnalyticsOptions {
  eventModifiers?: string | string[];
  recursive?: boolean;
  attributePrefix?: string;
}

declare class AvAnalytics {
  plugins: AvAnalyticsPlugin[];

  attributePrefix: string;

  recursive: boolean;

  pageTracking: boolean;

  isPageTracking: boolean;

  hasInit: boolean;

  eventModifiers: string[];

  constructor(
    plugins: AvAnalyticsPlugin | AvAnalyticsPlugin[],
    promise?: PromiseConstructor,
    pageTracking?: boolean,
    autoTrack?: boolean,
    options?: AvAnalyticsOptions
  );

  startAutoTrack(): void;

  stopAutoTrack(): void;

  handleEvent(event: Event): void;

  invalidEvent(event: Event): boolean;

  getAnalyticAttrs(elem: Element): AnalyticsEventProperties;

  startPageTracking(): void;

  stopPageTracking(): void;

  init(): void;

  setPageTracking(value?: boolean): void;

  trackEvent(properties: AnalyticsEventProperties): Promise<unknown[]>;

  trackPageView(url?: string | { newURL: string }): Promise<unknown[]>;
}

export default AvAnalytics;

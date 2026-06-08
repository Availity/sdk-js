---
title: Setting Up Analytics
---

# Setting Up Analytics & Telemetry

This recipe walks through setting up event tracking and page view logging for an Availity application, from basic setup to Insights-compatible logging.

## Quick Start

```js
import { AvAnalytics, AvSplunkAnalytics } from '@availity/analytics-core';
import { avLogMessagesApiV2 } from '@availity/api-axios';

// Create the plugin and analytics instance
const splunkPlugin = new AvSplunkAnalytics(avLogMessagesApiV2, true);
const analytics = new AvAnalytics([splunkPlugin], undefined, true, true, {
  recursive: true,
});

// Initialize and track the initial page load
analytics.init();
analytics.trackPageView();
```

This gives you:

- **Page tracking** — automatic logging on URL changes (3rd param = `true`)
- **Auto-tracking** — clicks on elements with `data-analytics-action` attributes (4th param = `true`)
- **Recursive attributes** — parent element attributes are included in events (`recursive: true`)

## Adding Auto-Tracking to HTML

Add `data-analytics-action` to any element you want tracked:

```html
<button data-analytics-action="click" data-analytics-label="submit-form">
  Submit
</button>

<a
  href="/results"
  data-analytics-action="click"
  data-analytics-label="view-results"
  data-analytics-category="navigation"
>
  View Results
</a>
```

For inputs, use `focus` or `blur`:

```html
<input
  type="text"
  data-analytics-action="focus"
  data-analytics-label="search-input"
/>
```

## Manual Event Tracking

For events that don't map to simple clicks:

```js
analytics.trackEvent({
  action: 'submit',
  label: 'eligibility-check',
  category: 'transactions',
  value: 'success',
});
```

## Making Events Appear in Insights

Insights requires a Payer Space ID. Add it to a parent element so it's included in all auto-tracked events:

```html
<div id="app" data-analytics-space-id="ABC123ABC123ABC123ABC123ABC123AB">
  <!-- All auto-tracked events inside here will include the spaceId -->
  <button data-analytics-action="click" data-analytics-label="my-button">
    Click me
  </button>
</div>
```

For manual tracking, include `spaceId` directly:

```js
analytics.trackEvent({
  spaceId: 'ABC123ABC123ABC123ABC123ABC123AB',
  action: 'submit',
  label: 'claim-submission',
});
```

### Getting the Space ID in a Payer Spaces App

```js
const params = new URLSearchParams(window.location.search);
const spaceId = params.get('spaceId');
```

## Adding Telemetry

For telemetry-specific logging (structured data sent to the telemetry API):

```js
import { AvAnalytics, AvTelemetryAnalytics } from '@availity/analytics-core';
import { avTelemetryApi } from '@availity/api-axios';

const telemetryPlugin = new AvTelemetryAnalytics(
  avTelemetryApi,
  true, // enabled
  'MyApp', // source_system (required)
  'team@availity.com', // contact (required)
  'my-team', // owner (required)
  undefined // sessionId (auto-generated if omitted)
);

const analytics = new AvAnalytics([telemetryPlugin]);
analytics.init();
```

## Using Multiple Plugins

You can log to both Splunk and Telemetry simultaneously:

```js
const splunkPlugin = new AvSplunkAnalytics(avLogMessagesApiV2, true);
const telemetryPlugin = new AvTelemetryAnalytics(
  avTelemetryApi,
  true,
  'MyApp',
  'team@availity.com',
  'my-team'
);

const analytics = new AvAnalytics([splunkPlugin, telemetryPlugin]);
analytics.init();
analytics.trackPageView();
```

## React Integration

For React apps, use `@availity/analytics` which wraps this setup in a context provider:

```jsx
import Analytics from '@availity/analytics';
import { AvSplunkAnalytics } from '@availity/analytics-core';
import { avLogMessagesApiV2 } from '@availity/api-axios';

const splunkPlugin = new AvSplunkAnalytics(avLogMessagesApiV2, true);

const App = () => (
  <Analytics plugins={[splunkPlugin]} pageTracking autoTrack recursive>
    <YourApp />
  </Analytics>
);
```

## Toggling Tracking

```js
// Stop/start auto-tracking dynamically
analytics.stopAutoTrack();
analytics.startAutoTrack();

// Stop/start page tracking
analytics.stopPageTracking();
analytics.startPageTracking();
```

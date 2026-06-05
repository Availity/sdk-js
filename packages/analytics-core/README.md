# @availity/analytics-core

> Analytics package for tracking user behavior on the DOM

[![Version](https://img.shields.io/npm/v/@availity/analytics-core.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/analytics-core)
[![NPM Downloads](https://img.shields.io/npm/dt/@availity/analytics-core.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/analytics-core)
[![Dependecy Status](https://img.shields.io/librariesio/release/npm/@availity/analytics-core?style=for-the-badge)](https://github.com/Availity/sdk-js/blob/master/packages/analytics-core/package.json)

## Install

### NPM

```bash
npm install @availity/analytics-core
```

### Yarn

```bash
yarn add @availity/analytics-core
```

## Usage

```js
import { AvAnalytics, AvSplunkAnalytics } from '@availity/analytics-core';

// Create a plugin instance
const splunkPlugin = new AvSplunkAnalytics(avLogMessagesApi);

// Initialize analytics with plugins
const analytics = new AvAnalytics(splunkPlugin);
```

### Auto-Tracking

By default, `AvAnalytics` automatically tracks click, focus, and blur events on elements with `data-analytics-*` attributes:

```html
<button data-analytics-action="click" data-analytics-label="Submit Form">
  Submit
</button>
```

### Manual Event Tracking

```js
analytics.trackEvent({ action: 'click', label: 'Custom Event' });
analytics.trackPageView('/my-page');
```

### Exports

- `AvAnalytics` — Main analytics class
- `AvAnalyticsPlugin` — Base plugin class for creating custom plugins
- `AvSplunkAnalytics` — Splunk logging plugin
- `AvTelemetryAnalytics` — Telemetry plugin
- `AvDmaAnalytics` — DMA analytics plugin

## Documentation

Check out more documentation at [availity.github.io](https://availity.github.io/sdk-js/resources/analytics)

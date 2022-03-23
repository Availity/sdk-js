---
title: Analytics
---

[![Version](https://img.shields.io/npm/v/@availity/analytics-core.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/analytics-core)

This package provides the base AvAnalytics class as a part of Availity's toolset for tracking user interactions and page load events in your application. It also provides the AvSplunkAnalytics plugin for logging to Splunk and Insights. For a helpful overview of how to setup these tools, read our [Setting Up Logging](https://availity.github.io/availity-workflow/recipes/logging/) guide.

For logging analytics in a React application, our [@availity/analytics](https://www.npmjs.com/package/@availity/analytics) package exports the `Analytics` context provider that implements an instance of this AvAnalytics class under the hood. It also exports the `useAnalytics` hook for accessing that instance. See the [Analytics component docs](https://availity.github.io/availity-react/components/analytics/analytics/) for details and example code for React apps.

## Install

```bash
npm install @availity/analytics-core
# or
yarn add @availity/analytics-core
```

## AvAnalytics() constructor syntax

```js
const analytics = new AvAnalytics(plugins);
// or
const analytics = new AvAnalytics(plugins, promise);
// or
const analytics = new AvAnalytics(plugins, promise, pageTracking);
// or
const analytics = new AvAnalytics(plugins, promise, pageTracking, autoTrack, options);
```

### `plugins`: AvAnalyticsPlugin | AvAnalyticsPlugin[]

A plugin or array of plugins used to log the events tracked by the AvAnalytics instance. See the [plugins section](#plugins) below.

### `promise`: PromiseConstructor

This now defaults to JavaScript's native [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) and is no longer required. It is maintained for backwards compatibility with browsers that do not support the native Promise object. Pass `undefined` here if necessary.

### `pageTracking`: boolean

If `true`, automatic page tracking will be enabled when your AvAnalytics instance is initialized. This means that any subsequent user action that changes the URL in the address bar will automatically call [`analytics.trackPageView()`](#trackpageviewarg-string---url-string-), which tracks a "page" event along with the new URL. This means you won't need to manually setup your own logic to call [`analytics.trackPageView()`](#trackpageviewarg-string---url-string-) each time the user navigates to a new page.

Note: You may still want to manually call `analytics.trackPageView()` one time after initialization. This is because the initial page load will occur before your AvAnalytics instance has been initialized.

### `autoTrack`: boolean

If `true`, automatic tracking of events on DOM elements that have special [data analytics attributes](#auto-tracking-with-data-analytics-attributes) will be enabled when your AvAnalytics instance is initialized. This means you won't need to setup your own event handlers for DOM element interactions and manually call [`analytics.trackEvent()`](#trackeventproperties-object) in those handlers. See the [auto tracking](#auto-tracking-with-data-analytics-attributes) section below for details on this technique and its requirements and limitations.

### `options`

#### `options.attributePrefix: string`

Overrides the default data attribute prefix for the special [data analytics attributes used for auto tracking](#auto-tracking-with-data-analytics-attributes).

Example of default `attributePrefix`:

<!-- prettier-ignore -->
```jsx
// in your JS file
const splunkPlugin = new AvSplunkAnalytics(avLogMessagesApiV2, true);
const analytics = new AvAnalytics([splunkPlugin]);
analytics.init();
analytics.trackPageView();

// in your HTML
<button 
  type="button" 
  data-analytics-my-special-value="abc123" 
  data-analytics-action="click"
>
  Button
</button>;
```

Example of a customized `attributePrefix`:

<!-- prettier-ignore -->
```jsx
// in your JS file
const splunkPlugin = new AvSplunkAnalytics(avLogMessagesApiV2, true)
const analytics = new AvAnalytics([splunkPlugin], undefined, undefined, undefined, {
  attributePrefix: 'data-foo-bar',
})
analytics.init()
analytics.trackPageView()

// in your HTML
<button 
  type="button" 
  data-foo-bar-my-special-value="abc123" 
  data-foo-bar-action="click"
>
  Button
</button>;
```

#### `options.recursive: boolean`

If `true`, and you are using [auto tracking](#auto-tracking-with-data-analytics-attributes), data analytics attributes from all parent elements will be added to the tracking event, starting from the element that was clicked and going all the way up to the document body.

For example, the code below will log all three attributes (`appName`, `action` and `eventName`) when the anchor tag is clicked. If the container is clicked nothing will happen.

<!-- prettier-ignore -->
```html
<div class="container" data-analytics-app-name="app">
  <a
    href="/somewhere-nice" 
    data-analytics-action="click" 
    data-analytics-event-name="linking"
  >
    Click me!
  </a>
</div>
```

The resulting log will include the following data. Notice that `entries.appName` is from a parent element, not the element that was clicked.

```
level: info
entries.appName: app
entries.eventName: linking
entries.action: click
entries.event: click
```

## Methods

### `init()`

Initialize plugins and other features based on arguments passed to the constructor.

### `setPageTracking(isPageTracking: boolean)`

Turn page tracking on or off.

### `trackEvent(properties: object)`

Manually track an event. Given an object of string keys with primitive values, all properties will be logged. In contrast to using [data attributes for auto tracking](#auto-tracking-with-data-analytics-attributes), manual tracking does not require an `action` property, and can be fired by any event listeners you choose to add to any element, not just 'click', 'focus' and 'blur' as is the case when using data attributes.

Example:

```js
import { avLogMessagesApiV2 } from '@availity/api-axios';
import { AvAnalytics, AvSplunkAnalytics } from '@availity/analytics-core';

const splunkPlugin = new AvSplunkAnalytics(avLogMessagesApiV2, true);
const analytics = new AvAnalytics([splunkPlugin]);
analytics.init();

const handleSubmit = () => {
  analytics.trackEvent({ foo: 'bar' });
};

// add to an event listener for a 'submit' event you want to track
```

### `trackPageView(arg?: string | { url?: string })`

Manually track a page view. Optionally pass the URL of the current page as a string or an object with a `url` property containing the URL of the current page.

Example:

```js
import { avLogMessagesApiV2 } from '@availity/api-axios';
import { AvAnalytics, AvSplunkAnalytics } from '@availity/analytics-core';

const splunkPlugin = new AvSplunkAnalytics(avLogMessagesApiV2, true);
const analytics = new AvAnalytics([splunkPlugin]);
analytics.init();

analytics.trackPageView(); // defaults to window.location.href
// or
analytics.trackPageView(window.location.href);
// or
analytics.trackPageView({ url: window.location.href });
```

## Plugins

Without plugins, the AvAnalytics class would not do anything useful. When AvAnalytics captures an event, it calls methods on each plugin, and it is the plugins that actually do the useful work of responding to those events. Any object with some or all of the following methods can be considered a plugin:

- `isEnabled` - Determines if this plugin is enabled. Disabled plugins will not respond to events. This can be a method that returns a boolean or it can be a static boolean property.
- `init` - If defined, will be called when `AvAnalytics` is initialized.
- `trackEvent` - If defined, this plugin method will be called every time [`analytics.trackEvent()`](#trackeventproperties-object) is called. It will be forwarded the same event data passed to that original call.
- `trackPageView` - If defined, this plugin method will be called every time `analytics.trackPageView()` is called. It will be forwarded the same new page URL passed to that original call.

A default class with functions defined and enabled logic is provided by `AvAnalyticsPlugin` from [@availity/analytics-core](https://www.npmjs.com/package/@availity/analytics-core). Extend this class to define your own custom plugins

### Official AvSplunkAnalytics Plugin

`AvSplunkAnalytics` is a plugin used for logging to Splunk and Insights. It requires an instance of `avLogMessagesApiV2` from [@availity/api-axios](https://www.npmjs.com/package/@availity/api-axios). **WARNING**: In almost all cases, the older `avLogMessagesApi` should not be used since it does not work with Insights.

```js
import { AvAnalytics, AvSplunkAnalytics } from '@availity/analytics-core';
import { avLogMessagesApiV2 } from '@availity/api-axios';

const splunkPlugin = new AvSplunkAnalytics(avLogMessagesApiV2, true);
const analytics = new AvAnalytics([splunkPlugin]);
analytics.init();
```

#### Note about Insights:

In order to use Insights reporting, each log must include the Payer Space ID. If you are using manual tracking with the `analytics.trackEvents()` method, be sure to include a `spaceId` property.

```js
analytics.trackEvents({
  spaceId: 'ABC123ABC123ABC123ABC123ABC123AB',
  myOtherCustomValue: 'abc123',
});
```

If are using [auto tracking with data analytics attributes](#auto-tracking-with-data-analytics-attributes), you can include the Payer Space ID to your logs by adding a `data-analytics-space-id` attribute with the ID of the Payer Space as it's value.

Plain HTML example:

<!-- prettier-ignore -->
```html
<button
  data-analytics-action="click" 
  data-analytics-space-id="ABC123ABC123ABC123ABC123ABC123AB"
>
  My Button
</button>
```

When using React, you can get the Payer Space ID from within a Payer Spaces app like this:

<!-- prettier-ignore -->
```jsx
import React, { useMemo } from 'react';
import Analytics from '@availity/analytics';
import { Button } from 'reactstrap';
import { avLogMessagesApiV2 } from '@availity/api-axios';
import { AvSplunkAnalytics } from '@availity/analytics-core';
import { useLocation } from 'react-router-dom';

const splunkPlugin = new AvSplunkAnalytics(avLogMessagesApiV2, true);

const App = () => {
  const { search } = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(search), [search]);
  const spaceId = queryParams.get('spaceId');

  return (
    <Analytics plugins={[splunkPlugin]}>
      <div data-analytics-space-id={spaceId}>
        <Button type="button" data-analytics-action="click">
          MyButton
        </Button>
      </div>
    </Analytics>
  );
};

export default App;
```

Putting the `spaceId` on an element near the root of your app means it will be included with all [auto-tracked](#auto-tracking-with-data-analytics-attributes) user events as long as `recursive` is not set to `false`. `recursive` is `true` by default.

## Auto Tracking with Data Analytics Attributes

AvAnalyics provides two ways to track user interactions. You can manually call `analytics.trackEvent()`, passing it the data you want included in your logging, or you can use auto tracking. Auto tracking is enabled by default when your instance of AvAnalytics is initialized. You can disable auto tracking, pass `false` as the fourth parameter to the AvAnalytics constructor.

When auto tracking is enabled, AvAnalytics will automatically track events based on the presence of special `data-analytics-...` attributes on DOM elements throughout your app. The prefix for these attributes can be customized using the [`options` parameter](#optionsattributeprefix-string) of the AvAnalytics constructor. Data from these attributes will be added to the auto tracked event. The keys for this data will be the camel cased names of the attributes after the prefix is removed.

For example, auto tracking for this element...

```html
<button data-analytics-action="click" data-analytics-my-special-value="123">Click me!</button>
```

...will will include this data:

```
level: info
entries.mySpecialValue: 123
entries.action: click
entries.event: click
```

### Limitations

The type of events that can be tracked using these attributes is limited as follows:

- `focus` and `blur` events can be tracked on `<select>`, `<textarea>` and `<input>` elements. You cannot track `click` events on these elements using auto tracking.
- All other element types can _only_ track `click` events using auto tracking.

If these limitations prevent you from logging the events you are interested in, you will need to use manual tracking by calling [`analytics.trackEvent()`](#trackeventproperties-object) directly. Be aware that calling `analytics.trackEvent()` from within an event handler attached to a DOM element will not add data from any data analytics attributes on that element.

### Custom Attributes

You can add as many custom attributes as you like:

```html
<button
  data-analytics-action="click"
  data-analytics-my-favorite-pizza-toppings="green olive and pineapple"
  data-analytics-space-id="ABC123ABC123ABC123ABC123ABC123AB"
  data-analytics-application-id="XYZ789"
>
  Click me!
</button>
```

Data from all of these attributes will be included in the auto tracked event as long as the required attribute below is also included on the same element.

### Required Attribute: `data-analytics-action`

The only required attribute is `data-analytics-action`. It defines the type of interaction that will trigger auto tracking and it's value can only be `click`, `focus` or `blur`. If this attribute is missing, no user interactions on that element will be auto tracked.

**IMPORTANT:** No `click` events can be auto tracked on `<select>`, `<textarea>` or `<input>` elements, and no `blur` or `focus` events can be auto tracked on elements other than `<select>`, `<textarea>` and `<input>`. See [limitations](#limitations) above.

### Logging for Splunk

All attributes, including any custom attributes you've created, will be logged in Splunk.

### Logging for Insights

Only the following attributes will be available in Insights.

- `data-analytics-space-id`: This is **required** for Payer Spaces to have their data appear in Insights. For Payer Spaces app, the Payer Space ID is available from `window.location`. See [this note about insights](#note-about-insights) for example code for retrieving and including your Payer Space ID.
- `data-analytics-application-id`: Application ID. Can be set at the root of your project.
- `data-analytics-action`: The action that triggered the log (example: "click")
- `data-analytics-label`: Identifies the element the user interacted with (example: "search")
- `data-analytics-category`: Category of the page (example: "spaces application").
- `data-analytics-value`: String value to be logged.

If manually tracking with `analytics.trackEvent()`, use the camelCased variation of these attributes as your object keys:

- `spaceId`
- `applicationId`
- `action`
- `label`
- `category`
- `value`

### Logging User Ids

User IDs are automatically added to logging, so they do not need to be explicitly added.

## Tutorial

See [Setting up logging](https://availity.github.io/availity-workflow/recipes/logging)

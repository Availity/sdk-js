# Analytics Core

A package providing a base Analytics class to track events and page views

## Install
`npm install @availity/analytics-core`

## Configuration

`AvAnalytics` requires Plugins and a Promise lib.

```javascript
  new AvAnalytics(plugins, promise);
```

`AvAnalytics` also has an optional 3rd parameter, a boolean to determine if pageTracking is enabled.
For page tracking to be used, `startPageTracking` and `stopPageTracking` functions must be defined to create listeners and call `trackPageView`.

```javascript
  new AvAnalytics(plugins, promise, pageTracking);
```

## Plugins

Plugins can be one or an array of objects/classes:

A default class with functions defined and enabled logic is provided `AvAnalyticsPlugin`.

```javascript
import {AvAnalyticsPlugin} from '@availity/analytics-core';
```

### Plugin Methods

the functions/properties used by `AvAnalytics` are:

#### isEnabled
Determines if this plugin will be called at various points.
If this is a function, the return value will be used. Otherwise will be checked as boolean.

#### init

if defined, will be called when `AvAnalytics` is initialized.

#### trackEvent

if defined, called when `AvAnalytics` receives a trackEvent call.

#### trackPageView

if defined, called when `AvAnalytics` receives a trackPageView call.

### Defined Plugins

#### AvSplunkAnalytics

`AvSplunkAnalytics` is a plugin to track events with the `AvLogMessages` api.
It defaults the url and level before sending.

```javascript
import {AvSplunkAnalytics} from '@availity/analytics-core';

const exmpleSplunkAnalytics = new AvSplunkAnalytics(AvLogMessages, isEnabled);
```


## Methods

### `init()`

Initialize analytics pageTracking and plugins

### `setPageTracking(value)`

use parameter to set turn page tracking on/off. Always checks that pageTracking has been set up or torn down as needed.

### `trackEvent(properties)`

Send properties to each plugins `trackEvent` function.

### `trackPageView(url)`

Send url or `location.href` to each plugins `trackEvent` function.


## Authors
**Kasey Powers**
* [kaseyepowers@gmail.com](kaseyepowers@gmail.com)

## License
[MIT](../../LICENSE)

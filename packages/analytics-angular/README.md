# Angular Analytics 

A package providing a base Analytics class to track events and page views

## Install
`npm install @availity/analytics-angular`

add module to your app.

```javascript
  import AvailityAnalytics from '@availity/analytics-angular';
  angular.module('app', [
    AvailityAnalytics
  ]);
```

To configure the default Options

```javascript
  config(AvAnalytics => {
    AvAnalytics.registerPlugins(['AvSplunkAnalytics']);
    AvAnalytics.setVirtualPageTracking(true);
  });
```

## Plugins

Plugins can be one or an array of objects/classes:

A default class with functions defined and enabled logic is provided `AvAnalyticsPlugin`.

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

### Creating Plugins

```javascript
  function AvExamplePluginFactory(AvAnalyticsPlugin) {
    class AvExamplePlugin extends AvAnalyticsPlugin {
      trackEvent(properties) {
        console.log(properties);
      }
      trackPageView(url) {
        console.log(url);
      }
    }
    return new AvExamplePlugin();
  }
  AvExamplePluginFactory.$inject = ['AvAnalyticsPlugin'];
```

## Methods

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

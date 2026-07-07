---
title: User Activity Broadcaster
---

Broadcast user activity events between Availity portal frames to keep sessions alive.

[![Version](https://img.shields.io/npm/v/@availity/user-activity-broadcaster.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/user-activity-broadcaster)

## When to Use This

Use this package in any Availity portal application that runs inside the portal's iframe. Without it, a user who is actively working in your app may be logged out because the navigation frame doesn't detect their activity.

You should import this package at the root of your application. It has side effects on import: importing it immediately registers activity listeners and starts broadcasting.

## Installation

### NPM

```bash
npm install @availity/user-activity-broadcaster
```

### Yarn

```bash
yarn add @availity/user-activity-broadcaster
```

## Usage

```js
// Import at your app's entry point (e.g., index.js or App.js)
import '@availity/user-activity-broadcaster';
```

## How It Works

1. Registers `mousedown` and `keydown` event listeners on `document`
2. Records the timestamp of the user's last interaction
3. Every 5 minutes, posts a `'user_activity'` message to `window.top` targeting the alternate portal origin (`apps` ↔ `essentials`)
4. The navigation frame receives this message and resets its session timeout

## Exports

If you need to customize behavior or access internals:

```js
import {
  eventName,
  lastActivity,
  getTargetOrigin,
  handleActivityUpdate,
  updateInterval,
  handleActivity,
  addEventListeners,
} from '@availity/user-activity-broadcaster';
```

### `eventName`

**Type:** `string`

The postMessage event name used for broadcasting. Value: `'user_activity'`

### `lastActivity`

**Type:** `{ time?: string }`

Object holding the timestamp (as a string from `Date.now()`) of the user's last detected activity.

```js
import { lastActivity } from '@availity/user-activity-broadcaster';

console.log(lastActivity.time); // e.g. "1717612056789"
```

### `getTargetOrigin(origin?)`

**Type:** `(origin?: string) => string | undefined`

Returns the alternate origin by swapping `"apps"` ↔ `"essentials"` in the given origin string. Returns `undefined` if the origin contains neither.

```js
import { getTargetOrigin } from '@availity/user-activity-broadcaster';

getTargetOrigin('https://apps.availity.com');
// => 'https://essentials.availity.com'

getTargetOrigin('https://essentials.availity.com');
// => 'https://apps.availity.com'

getTargetOrigin('https://other.example.com');
// => undefined
```

### `handleActivityUpdate()`

**Type:** `() => void`

Posts a message to `window.top` with the event name and last activity time. Only posts if a valid target origin was resolved.

### `updateInterval(newInterval)`

**Type:** `(newInterval: number) => void`

Changes the broadcast interval. Default is 5 minutes (300,000 ms).

```js
import { updateInterval } from '@availity/user-activity-broadcaster';

// Broadcast every 2 minutes instead of 5
updateInterval(2 * 60 * 1000);
```

### `handleActivity()`

**Type:** `() => void`

Updates `lastActivity.time` to the current timestamp. Called automatically by the registered event listeners.

### `addEventListeners()`

**Type:** `() => void`

Registers `mousedown` and `keydown` listeners on `document`. Called automatically on import, but can be called again if listeners need to be re-registered.

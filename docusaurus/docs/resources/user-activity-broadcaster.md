---
title: User Activity Broadcaster
---

Broadcast user activity events between Availity portal frames to keep sessions alive.

[![Version](https://img.shields.io/npm/v/@availity/user-activity-broadcaster.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/user-activity-broadcaster)

## Installation

### NPM

```bash
npm install @availity/user-activity-broadcaster
```

### Yarn

```bash
yarn add @availity/user-activity-broadcaster
```

## Overview

This package automatically detects user activity (mouse clicks and key presses) and broadcasts that activity to the alternate Availity portal frame (apps ↔ essentials) via `postMessage`. This keeps the user's session alive across frames when they are active in only one frame.

**Important:** This package has side effects on import. Importing it will immediately:

1. Register `mousedown` and `keydown` event listeners on `document`
2. Start a 5-minute interval that broadcasts the last activity timestamp to the alternate origin

## Usage

```js
// Simply importing the package activates it
import '@availity/user-activity-broadcaster';
```

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

## Exports

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

## How It Works

1. On import, event listeners detect `mousedown` and `keydown` events and record the timestamp
2. Every 5 minutes, the broadcaster posts a message to `window.top` with the alternate origin
3. The navigation frame on the receiving end uses this to know the user is still active and should not be logged out

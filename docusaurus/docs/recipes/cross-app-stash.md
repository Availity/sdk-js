---
title: Cross-App Data Passing
---

# Cross-App Data Passing with Stash

When navigating between Availity applications, you often need to pass data (patient context, selections, return URLs). The Stash API provides a server-side session that both apps can read from.

## How It Works

1. **Sender** creates a stash session with data, then opens the target app with a `sessionId` query param
2. **Receiver** reads `sessionId` from the URL and fetches the stashed data

## Sender: Launching Another App with Data

```js
import { avStashApi } from '@availity/api-axios';

const handoff = async () => {
  const sessionId = await avStashApi.launch(
    {
      patientId: '12345',
      memberId: 'M-9876',
      returnUrl: window.location.href,
    },
    'https://apps.availity.com/target-app'
  );
  // Browser navigates to: https://apps.availity.com/target-app?sessionId=<id>
};
```

`launch()` does three things:

1. POSTs the data to the stash endpoint
2. Gets back a `sessionId`
3. Opens the target URL with `?sessionId=<id>` appended (uses `window.open` with `_top`)

## Receiver: Reading Stashed Data

In the target application, read the session ID from the URL and fetch the data:

```js
import { avStashApi } from '@availity/api-axios';

const loadStashedData = async () => {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('sessionId');

  if (!sessionId) return null;

  const response = await avStashApi.get(sessionId);
  return response.data;
  // { patientId: '12345', memberId: 'M-9876', returnUrl: '...' }
};
```

## Manual Stash (Without Navigation)

If you need to create a stash session without immediately navigating, use `create` directly:

```js
import { avStashApi } from '@availity/api-axios';

// Create the session
const response = await avStashApi.create({
  selectedPayer: 'Aetna',
  transactionType: '270',
});

const sessionId = response.data.id;

// Build your own URL or pass sessionId however you need
const targetUrl = `https://apps.availity.com/other-app?sessionId=${sessionId}`;
```

## Returning to the Sender

A common pattern is including a `returnUrl` in the stash so the receiver can navigate back:

```js
// In the receiver app, after completing work:
const stash = await loadStashedData();

if (stash.returnUrl) {
  window.location.href = stash.returnUrl;
}
```

## Notes

- Stash sessions are temporary and server-side — they expire after the user's session ends
- The stash endpoint is at `/cloud/web/appl/stash/session/data`
- Data should be JSON-serializable plain objects
- Keep stashed data minimal — it's not meant for large payloads

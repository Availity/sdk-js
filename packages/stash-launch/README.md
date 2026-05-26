# @availity/stash-launch

> Stash context data and launch an application defined by an ECT configuration ID.

[![Version](https://img.shields.io/npm/v/@availity/stash-launch.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/stash-launch)

## Install

### NPM

```bash
npm install @availity/stash-launch
```

### Yarn

```bash
yarn add @availity/stash-launch
```

## Usage

```js
import stashLaunch from '@availity/stash-launch';

async function onClick() {
  await stashLaunch(
    { memberId: '123', payerId: 'ABC' },
    '/static/web/onb-ps/payer-spaces/availity-demo-stash-receiver/#/?spaceId=12345'
  );
}
// opens: /static/web/onb-ps/payer-spaces/availity-demo-stash-receiver/#/?spaceId=12345&sessionId=<id>
```

## API

### `stashLaunch(params, linkTo)`

Stashes the provided data via the Stash API and opens the target application in a new tab with the resulting `sessionId` as a query parameter.

#### Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `params` | `object` | Yes | Data to stash in the session. This will be available to the target application. |
| `linkTo` | `string` | Yes | The URL of the target application to launch. `sessionId` will be appended as a query parameter automatically. |

#### Returns

`Promise<string>` — The session ID returned by the Stash API.

## Documentation

Check out more documentation at [availity.github.io](https://availity.github.io/sdk-js/resources/stash-launch)

# Availity JavaScript SDK

> JavaScript SDK designed for the Availity Portal

[![Build](https://img.shields.io/github/actions/workflow/status/availity/sdk-js/deploy.yml?style=for-the-badge)](https://github.com/Availity/sdk-js/actions/workflows/deploy.yml)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&logo=MIT)](http://opensource.org/licenses/MIT)

## Quick Start

```bash
npm install @availity/api-axios axios
```

```js
import { avUserApi } from '@availity/api-axios';

const user = await avUserApi.me();
```

## Packages

### API

| Package | Description |
|---------|-------------|
| [@availity/api-axios](./packages/api-axios) | Axios-based HTTP client for Availity REST APIs |
| [@availity/api-core](./packages/api-core) | Base API class definitions (HTTP-client agnostic) |

### Authorization & Permissions

| Package | Description |
|---------|-------------|
| [@availity/authorizations-axios](./packages/authorizations-axios) | Check user permissions and authorizations |
| [@availity/authorizations-core](./packages/authorizations-core) | Base authorizations class |

### File Handling

| Package | Description |
|---------|-------------|
| [@availity/upload-core](./packages/upload-core) | Resumable file uploads via tus protocol |
| [@availity/dl-axios](./packages/dl-axios) | Download files from services |
| [@availity/dl-core](./packages/dl-core) | Base download class |
| [@availity/native-form](./packages/native-form) | Submit data via native HTML form (SSO navigation) |

### Analytics & Logging

| Package | Description |
|---------|-------------|
| [@availity/analytics-core](./packages/analytics-core) | DOM event tracking with pluggable analytics backends |
| [@availity/exceptions-axios](./packages/exceptions-axios) | Automatic error logging via axios |
| [@availity/exceptions-core](./packages/exceptions-core) | Base exception logging class |

### Utilities

| Package | Description |
|---------|-------------|
| [@availity/env-var](./packages/env-var) | Runtime environment detection for immutable builds |
| [@availity/message-core](./packages/message-core) | Secure cross-frame postMessage communication |
| [@availity/resolve-url](./packages/resolve-url) | Resolve relative URLs to absolute URIs |
| [@availity/relay-id](./packages/relay-id) | Encode/decode Relay global IDs |
| [@availity/user-activity-broadcaster](./packages/user-activity-broadcaster) | Broadcast user activity to navigation |

### Validation

| Package | Description |
|---------|-------------|
| [@availity/yup](./packages/yup) | Yup schema extensions (date, phone, NPI validation) |
| [@availity/dockyard](./packages/dockyard) | Convert yup schemas to documentation objects |

## Documentation

Full documentation is available at [availity.github.io/sdk-js](https://availity.github.io/sdk-js/)

## Supported Browsers

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

## Contributing

Check out our [contributing guide](.github/CONTRIBUTING.md) for more information.

## License

[MIT](./LICENSE)

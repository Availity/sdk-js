import { AvAuthorizations } from '@availity/authorizations-core';
import { AvPermissionsResource, AvRegionsResource } from '@availity/api-react';

export default class AvAuthorizationsReact extends AvAuthorizations {
  constructor(config) {
    super(
      new AvPermissionsResource(config),
      new AvRegionsResource(config),
      Promise
    );
  }
}

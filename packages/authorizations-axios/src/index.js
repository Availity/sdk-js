import AvAuthorizations from '@availity/authorizations-core';
import { avUserPermissionsApi, avRegionsApi } from '@availity/api-axios';

class AvAuthorizationsReact extends AvAuthorizations {
  constructor() {
    super(avUserPermissionsApi, avRegionsApi, Promise);
  }
}

export default new AvAuthorizationsReact();

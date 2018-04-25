import AvAuthorizations from '@availity/authorizations-core';
import { avPermissionsApi, avRegionsApi } from '@availity/api-axios';

class AvAuthorizationsReact extends AvAuthorizations {
  constructor() {
    super(avPermissionsApi, avRegionsApi, Promise);
  }
}

export default new AvAuthorizationsReact();

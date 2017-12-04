import AvAuthorizations from '@availity/authorizations-core';
import { permissionsApi, regionsApi } from '@availity/api-react';

class AvAuthorizationsReact extends AvAuthorizations {
  constructor() {
    super(permissionsApi, regionsApi, Promise);
  }
}

export default new AvAuthorizationsReact();

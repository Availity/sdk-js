import AvAuthorizations from '@availity/authorizations-core';
import { permissionsApi, regionsApi } from '@availity/api-axios';

class AvAuthorizationsReact extends AvAuthorizations {
  constructor() {
    super(permissionsApi, regionsApi, Promise);
  }
}

export default new AvAuthorizationsReact();

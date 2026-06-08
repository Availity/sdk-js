import AvAuthorizationsCore from '@availity/authorizations-core';

export type { Permission, Organization, Resource } from '@availity/authorizations-core';

declare const avAuthorizationsAxios: AvAuthorizationsCore;

export default avAuthorizationsAxios;

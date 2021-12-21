/* eslint-disable @typescript-eslint/no-explicit-any */

type SsoType = 'saml' | 'openid';

declare function nativeForm(
  spaceId: string,
  params?: Record<string, any>,
  formAttributes?: Record<string, any>,
  type?: SsoType,
  clientId?: string
): Promise<void>;

export default nativeForm;

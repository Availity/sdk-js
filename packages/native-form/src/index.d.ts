type SsoType = 'saml' | 'openid';

declare function nativeForm(
  spaceId: string,
  params?: Record<string, string | number | boolean | Record<string, unknown>>,
  formAttributes?: Record<string, string>,
  type?: SsoType | string,
  clientId?: string
): Promise<void>;

export default nativeForm;

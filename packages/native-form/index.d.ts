type SsoType = 'saml' | 'openid';

declare function nativeForm(
  spaceId: string,
  clientId: string,
  params?: { [key: string]: any },
  formAttributes?: { [key: string]: any },
  type?: SsoType
): void;

export default nativeForm;

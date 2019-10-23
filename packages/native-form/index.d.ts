declare function nativeForm(
  spaceId: string,
  params?: { [key: string]: any },
  formAttributes?: { [key: string]: any },
  type?: string | 'saml'
): void;

export default nativeForm;

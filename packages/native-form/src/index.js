import { avWebQLApi } from '@availity/api-axios';
import flattenObject from './flattenObject';

const required = (field) => {
  throw new Error(`${field} is required and was not provided`);
};

const ssoTypeQuery = `
query ssoTypeFindById($id: ID!){
  configurationFindOne(id: $id){
    ...on Saml{
      type
    }
    ...on OpenId{
      type
    }
  }
}
`;

const nativeForm = async (
  spaceId = required('spaceId'),
  params = {},
  formAttributes = {},
  type,
  clientId = 'clientId'
) => {
  let typeLower = type?.toLowerCase();
  if (typeLower !== 'saml' && typeLower !== 'openid') {
    try {
      const { data } = await avWebQLApi.create(
        {
          query: ssoTypeQuery,
          variables: { id: spaceId },
        },
        { headers: { 'X-Client-ID': clientId } }
      );
      typeLower = data?.data?.configurationFindOne?.type?.toLowerCase();
    } catch (error) {
      // https://github.com/axios/axios#handling-errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error('The server responded with an error');
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser
        throw new Error('No response received');
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error(
          'An error occurred while setting up request, check your configurations'
        );
      }
    }
  }

  const mergedOptions = {
    method: 'post',
    action: `/ms/api/availity/internal/spc/magneto/sso/v1/${typeLower}/${spaceId}`,
    target: '_blank',
    ...formAttributes,
  };
  const form = document.createElement('form');
  for (const key of Object.keys(mergedOptions)) {
    form.setAttribute(key, mergedOptions[key]);
  }
  const flat = flattenObject(params);
  const fields = Object.keys(flat)
    .map((key) => {
      const name = key.replace(/\[\d+]/g, '[]');
      const value = flat[key];
      return `<input type="hidden" name="${name}" value="${value}" />`;
    })
    .join('');

  form.insertAdjacentHTML('beforeend', fields);
  document.body.appendChild(form);
  form.submit();
};

export default nativeForm;

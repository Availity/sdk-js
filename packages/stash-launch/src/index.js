import AvApi from '@availity/api-axios';

export const STASH_API_URL = '/cloud/web/appl/stash/v1/session/data';

const stashLaunch = async (params = {}, linkTo, { stashUrl = STASH_API_URL } = {}) => {
  if (!linkTo) throw new Error('linkTo is required and was not provided');

  const stashApi = new AvApi({ url: stashUrl, api: false });

  let sessionId;
  try {
    const response = await stashApi.create(params);
    sessionId = response?.data?.id;
  } catch (error) {
    if (error.response) {
      throw new Error('The server responded with an error');
    } else if (error.request) {
      throw new Error('No response received');
    } else {
      throw new Error('An error occurred while setting up request, check your configurations');
    }
  }

  if (!sessionId) {
    throw new Error('Failed to retrieve session ID from Stash API');
  }

  const separator = linkTo.includes('?') ? '&' : '?';
  window.open(`${linkTo}${separator}sessionId=${sessionId}`, '_top');

  return sessionId;
};

export default stashLaunch;

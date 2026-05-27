import AvApi from '../api';

export default class AvStashApi extends AvApi {
  constructor(config) {
    super({
      url: '/cloud/web/appl/stash/v1/session/data',
      api: false,
      ...config,
    });
  }

  getUrl(config, id = '') {
    return id ? `${config.url}/${id}` : config.url;
  }

  async launch(params = {}, linkTo) {
    if (!linkTo) throw new Error('linkTo is required and was not provided');

    const response = await this.create(params);
    const sessionId = response?.data?.id;

    if (!sessionId) {
      throw new Error('Failed to retrieve session ID from Stash API');
    }

    const separator = linkTo.includes('?') ? '&' : '?';
    window.open(`${linkTo}${separator}sessionId=${sessionId}`, '_top');

    return sessionId;
  }
}

export const avStashApi = new AvStashApi();

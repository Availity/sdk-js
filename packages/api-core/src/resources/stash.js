import AvApi from '../api';

export default class AvStash extends AvApi {
  constructor(config) {
    super({
      path: 'cloud/web/appl/stash',
      name: 'session/data',
      ...config,
    });
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

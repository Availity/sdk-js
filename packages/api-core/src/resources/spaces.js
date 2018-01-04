import AvApi from '../api';

export default class AvSpaces extends AvApi {
  constructor(http, promise, merge, config = {}) {
    const options = Object.assign(
      {
        path: 'api/sdk/platform',
        name: 'spaces',
      },
      config
    );
    super(http, promise, merge, options);
  }

  parseSpaceId(query) {
    const pairs = query.substr(1).split('&');

    let spaceId = '';

    if (Array.isArray(pairs)) {
      pairs.forEach(item => {
        const pair = item.split('=');
        const key = pair[0];
        if (key === 'spaceId') {
          spaceId = pair[1] && decodeURIComponent(pair[1]);
        }
      });
    }
    return spaceId;
  }

  getSpaceName(spaceId) {
    return this.get(spaceId).then(response => response.data.name);
  }
}

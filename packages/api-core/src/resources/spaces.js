import AvApi from '../resource';

export default class AvSpaces extends AvApi {
  constructor(http, promise, config = {}) {
    const options = Object.assign(
      {
        path: 'api/sdk/platform',
        name: 'spaces',
      },
      config
    );
    super(http, promise, options);
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
    return this.query({
      params: {
        id: spaceId,
      },
    }).then(response => response.data.name);
  }
}

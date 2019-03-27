import { AvFavorites } from '..';
import { FAVORITES_UPDATE } from '../../Constants';

const avMessage = new AvFavorites();

describe('AvFavorites', () => {
  const URL = 'https://dev.local:9999';

  beforeEach(() => {
    global.jsdom.reconfigure({
      url: URL,
    });

    avMessage.unsubscribeAll();

    avMessage.isEnabled = true;
    avMessage.DEFAULT_EVENT = 'avMessage';
    avMessage.DOMAIN = /https?:\/\/([\w\d-]+\.)?availity\.(com|net)/;
  });

  const mockTarget = {
    postMessage: jest.fn(),
  };

  test('subscribes to favorites updates', () => {
    const mockFunc = jest.fn();

    avMessage.onFavoritesUpdate(mockFunc);

    avMessage.onMessage(FAVORITES_UPDATE, { favorites: ['1'] });

    expect(mockFunc).toHaveBeenCalledWith(expect.arrayContaining(['1']));
  });

  test('sends favorites update', () => {
    avMessage.sendFavoritesUpdate(['1', '2'], mockTarget);

    expect(mockTarget.postMessage).toHaveBeenCalledWith(
      JSON.stringify({
        message: ['1', '2'],
        event: FAVORITES_UPDATE,
      }),
      URL
    );
  });
});

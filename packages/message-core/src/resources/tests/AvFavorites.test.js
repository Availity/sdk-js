import AvFavorites from '../AvFavorites';
import { FAVORITES_UPDATE } from '../../Constants';

describe('AvFavorites', () => {
  const URL = 'https://dev.local:9999';

  beforeEach(() => {
    global.jsdom.reconfigure({
      url: URL,
    });

    AvFavorites.unsubscribeAll();

    AvFavorites.isEnabled = true;
    AvFavorites.DEFAULT_EVENT = 'avMessage';
    AvFavorites.DOMAIN = /https?:\/\/([\w\d-]+\.)?availity\.(com|net)/;
  });

  const mockTarget = {
    postMessage: jest.fn(),
  };

  test('subscribes to favorites updates', () => {
    const mockFunc = jest.fn();

    AvFavorites.onFavoritesUpdate(mockFunc);

    AvFavorites.onMessage(FAVORITES_UPDATE, { favorites: ['1'] });

    expect(mockFunc).toHaveBeenCalledWith(expect.arrayContaining(['1']));
  });

  test('sends favorites update', () => {
    AvFavorites.sendFavoritesUpdate(['1', '2'], mockTarget);

    expect(mockTarget.postMessage).toHaveBeenCalledWith(
      JSON.stringify({
        message: ['1', '2'],
        event: FAVORITES_UPDATE,
      }),
      URL
    );
  });
});

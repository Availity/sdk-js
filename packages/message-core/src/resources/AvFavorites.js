import AvMessage from '../AvMessage';
import { FAVORITES_UPDATE, MAX_FAVORITES } from '../Constants';

export default class AvFavorites extends AvMessage {
  // Subscriber
  onFavoritesUpdate = callback =>
    this.subscribe(FAVORITES_UPDATE, data =>
      callback(data && data.favorites ? data.favorites : [])
    );

  // Subscriber
  onMaxFavorites = callback => this.subscribe(MAX_FAVORITES, () => callback());

  // Action
  sendFavoritesUpdate = (favorites, target) => {
    if (!favorites) return;

    this.dispatch(FAVORITES_UPDATE, { message: favorites }, target);
  };

  // Action
  sendMaxFavorites = () => this.dispatch(MAX_FAVORITES);
}

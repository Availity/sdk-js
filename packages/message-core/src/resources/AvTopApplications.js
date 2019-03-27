import AvMessage from '../AvMessage';
import { TOP_APPS_UPDATE } from '../Constants';

export default class AvTopApplications extends AvMessage {
  onUpdate = callback => this.subscribe(TOP_APPS_UPDATE, callback);

  sendUpdate = target => this.dispatch(TOP_APPS_UPDATE, {}, target);
}

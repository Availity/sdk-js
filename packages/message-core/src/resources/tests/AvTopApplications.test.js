import AvTopApplications from '../AvTopApplications';
import { TOP_APPS_UPDATE } from '../../Constants';

describe('AvTopApplications', () => {
  const URL = 'https://dev.local:9999';

  beforeEach(() => {
    global.jsdom.reconfigure({
      url: URL,
    });

    AvTopApplications.unsubscribeAll();

    AvTopApplications.isEnabled = true;
    AvTopApplications.DEFAULT_EVENT = 'avMessage';
    AvTopApplications.DOMAIN = /https?:\/\/([\w\d-]+\.)?availity\.(com|net)/;
  });

  const mockTarget = {
    postMessage: jest.fn(),
  };

  test('subscribes to updates', () => {
    const mockFunc = jest.fn();

    AvTopApplications.onUpdate(mockFunc);

    AvTopApplications.onMessage(TOP_APPS_UPDATE, { favorites: ['1'] });

    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  test('sends update', () => {
    AvTopApplications.sendUpdate(mockTarget);

    expect(mockTarget.postMessage).toHaveBeenCalledTimes(1);
  });
});

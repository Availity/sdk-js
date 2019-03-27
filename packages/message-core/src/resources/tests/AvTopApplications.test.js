import { AvTopApplications } from '..';
import { TOP_APPS_UPDATE } from '../../Constants';

describe('AvTopApplications', () => {
  const URL = 'https://dev.local:9999';

  const avMessage = new AvTopApplications();

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

  test('subscribes to updates', () => {
    const mockFunc = jest.fn();

    avMessage.onUpdate(mockFunc);

    avMessage.onMessage(TOP_APPS_UPDATE, { favorites: ['1'] });

    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  test('sends update', () => {
    avMessage.sendUpdate(mockTarget);

    expect(mockTarget.postMessage).toHaveBeenCalledTimes(1);
  });
});

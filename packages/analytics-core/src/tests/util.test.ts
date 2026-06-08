import {
  camelCase,
  getComposedPath,
  isLeftClickEvent,
  isModifiedEvent,
  isPluginEnabled,
  isValidEventTypeOnTarget,
} from '../util';
import type AvAnalyticsPlugin from '../plugin';

describe('analytics-core utils', () => {
  test('isLeftClickEvent', () => {
    expect(isLeftClickEvent({ button: 0 } as unknown as MouseEvent)).toBeTruthy();
    expect(isLeftClickEvent({ button: 1 } as unknown as MouseEvent)).toBeFalsy();
  });

  test('isModifiedEvent', () => {
    expect(isModifiedEvent({ metaKey: 1 } as unknown as MouseEvent)).toBeTruthy();
    expect(isModifiedEvent({ altKey: 1 } as unknown as MouseEvent)).toBeTruthy();
    expect(isModifiedEvent({ ctrlKey: 1 } as unknown as MouseEvent)).toBeTruthy();
    expect(isModifiedEvent({ shiftKey: 1 } as unknown as MouseEvent)).toBeTruthy();
    expect(isModifiedEvent({ key: 1 } as unknown as MouseEvent)).toBeFalsy();
  });

  test('isValidEventTypeOnTarget', () => {
    expect(isValidEventTypeOnTarget({ target: { nodeName: 'click' }, type: 'click' } as unknown as Event)).toBeTruthy();
    expect(isValidEventTypeOnTarget({ target: { nodeName: 'select' }, type: 'click' } as unknown as Event)).toBeFalsy();
  });

  test('isPluginEnabled', () => {
    expect(isPluginEnabled({ isEnabled: () => true } as unknown as AvAnalyticsPlugin)).toBeTruthy();
    expect(isPluginEnabled({ isEnabled: () => false } as unknown as AvAnalyticsPlugin)).toBeFalsy();
    expect(isPluginEnabled({ isEnabled: true } as unknown as AvAnalyticsPlugin)).toBeTruthy();
    expect(isPluginEnabled({ isEnabled: false } as unknown as AvAnalyticsPlugin)).toBeFalsy();
  });

  test('camelCase', () => {
    expect(camelCase('foo')).toBe('foo');
    expect(camelCase('foo-bar')).toBe('fooBar');
    expect(camelCase('foo-bar-baz')).toBe('fooBarBaz');
  });

  test('getComposedPath', () => {
    expect(getComposedPath({} as unknown as EventTarget).length).toBe(1);
    expect(getComposedPath({ parentNode: {} } as unknown as EventTarget).length).toBe(2);
    expect(getComposedPath({ host: {} } as unknown as EventTarget).length).toBe(2);
    expect(getComposedPath({ defaultView: {} } as unknown as EventTarget).length).toBe(2);

    const result = '[{"parentNode":{"host":{"defaultView":{}}}},{"host":{"defaultView":{}}},{"defaultView":{}},{}]';
    const nested = getComposedPath({ parentNode: { host: { defaultView: {} } } } as unknown as EventTarget);
    expect(JSON.stringify(nested)).toEqual(result);
  });
});

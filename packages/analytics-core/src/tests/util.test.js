import {
  camelCase,
  getComposedPath,
  isLeftClickEvent,
  isModifiedEvent,
  isPluginEnabled,
  isValidEventTypeOnTarget,
} from '../util';

describe('analytics-core utils', () => {
  test('isLeftClickEvent', () => {
    expect(isLeftClickEvent({ button: 0 })).toBeTruthy();
    expect(isLeftClickEvent({ button: 1 })).toBeFalsy();
  });

  test('isModifiedEvent', () => {
    expect(isModifiedEvent({ metaKey: 1 })).toBeTruthy();
    expect(isModifiedEvent({ altKey: 1 })).toBeTruthy();
    expect(isModifiedEvent({ ctrlKey: 1 })).toBeTruthy();
    expect(isModifiedEvent({ shiftKey: 1 })).toBeTruthy();
    expect(isModifiedEvent({ key: 1 })).toBeFalsy();
  });

  test('isValidEventTypeOnTarget', () => {
    expect(isValidEventTypeOnTarget({ target: { nodeName: 'click' }, type: 'click' })).toBeTruthy();
    expect(isValidEventTypeOnTarget({ target: { nodeName: 'select' }, type: 'click' })).toBeFalsy();
  });

  test('isPluginEnabled', () => {
    expect(isPluginEnabled({ isEnabled: () => true })).toBeTruthy();
    expect(isPluginEnabled({ isEnabled: () => false })).toBeFalsy();
    expect(isPluginEnabled({ isEnabled: true })).toBeTruthy();
    expect(isPluginEnabled({ isEnabled: false })).toBeFalsy();
  });

  test('camelCase', () => {
    expect(camelCase('foo')).toBe('foo');
    expect(camelCase('foo-bar')).toBe('fooBar');
    expect(camelCase('foo-bar-baz')).toBe('fooBarBaz');
  });

  test('getComposedPath', () => {
    expect(getComposedPath({}).length).toBe(1);
    expect(getComposedPath({ parentNode: {} }).length).toBe(2);
    expect(getComposedPath({ host: {} }).length).toBe(2);
    expect(getComposedPath({ defaultView: {} }).length).toBe(2);

    const result =
      '[{"parentNode":{"host":{"defaultView":{}}}},[{"host":{"defaultView":{}}},[{"defaultView":{}},[{}]]]]';
    const nested = getComposedPath({ parentNode: { host: { defaultView: {} } } });
    expect(JSON.stringify(nested)).toEqual(result);
  });
});

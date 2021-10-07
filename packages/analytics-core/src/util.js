export const isLeftClickEvent = (event) => event.button === 0;

export const isModifiedEvent = (event) => !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

const trackMap = {
  select: ['focus', 'blur'],
  textarea: ['focus', 'blur'],
  input: ['focus', 'blur'],
  default: ['click'],
};

export const isValidEventTypeOnTarget = (event) =>
  (trackMap[event.target.nodeName.toLowerCase()] || trackMap.default).indexOf(event.type) > -1;

export const isPluginEnabled = (plugin) =>
  typeof plugin.isEnabled === 'function' ? plugin.isEnabled() : plugin.isEnabled;

export const camelCase = (str) => str.replace(/-([\da-z])/gi, (match, char) => char.toUpperCase());

/**
 * Polyfill for [`Event.composedPath()`][1].
 * https://gist.github.com/kleinfreund/e9787d73776c0e3750dcfcdc89f100ec
 */
export const getComposedPath = (node) => {
  let parent;
  if (node.parentNode) {
    parent = node.parentNode;
  } else if (node.host) {
    parent = node.host;
  } else if (node.defaultView) {
    parent = node.defaultView;
  }

  if (parent !== undefined) {
    return [node, getComposedPath(parent)];
  }

  return [node];
};

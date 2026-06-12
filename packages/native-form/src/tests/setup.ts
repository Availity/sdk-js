// Polyfill CSS.escape for jsdom (not implemented natively)
// https://drafts.csswg.org/cssom/#the-css.escape()-method
if (globalThis.CSS === undefined) {
  globalThis.CSS = {} as typeof CSS;
}
if (globalThis.CSS.escape === undefined) {
  globalThis.CSS.escape = (value: string) => value.replaceAll(/([^\w-])/g, String.raw`\$1`);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
declare const isLeftClickEvent: (event: any) => boolean;

declare const isModifiedEvent: (event: any) => boolean;

declare const isValidEventTypeOnTarget: (event: any) => boolean;

declare const isPluginEnabled: (plugin: any) => any;

declare const camelCase: (str: any) => any;

declare const getComposedPath: (node: any) => any;

export { isLeftClickEvent, isModifiedEvent, isValidEventTypeOnTarget, isPluginEnabled, camelCase, getComposedPath };

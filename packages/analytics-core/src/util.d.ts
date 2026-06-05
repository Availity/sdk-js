import AvAnalyticsPlugin from './plugin';

export declare function isLeftClickEvent(event: MouseEvent): boolean;

export declare function isModifiedEvent(event: MouseEvent | KeyboardEvent): boolean;

export declare function isValidEventTypeOnTarget(event: Event): boolean;

export declare function isPluginEnabled(plugin: AvAnalyticsPlugin): boolean;

export declare function camelCase(str: string): string;

export declare function getComposedPath(node: EventTarget): Element[];

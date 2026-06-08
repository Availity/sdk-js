export declare const eventName: string;

export declare const lastActivity: { time?: string };

export declare function getTargetOrigin(origin?: string): string | undefined;

export declare function handleActivityUpdate(): void;

export declare function updateInterval(newInterval: number): void;

export declare function handleActivity(): void;

export declare function addEventListeners(): void;

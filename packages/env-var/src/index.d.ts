/* eslint-disable @typescript-eslint/no-explicit-any */
export type ENVIORNEMNT = 'local' | 'test' | 'qa' | 'prod';

interface EnvOpts<T> {
  local?: T;
  test?: T;
  qa?: T;
  prod?: T;
}

declare function envVar<T>(envOpts: EnvOpts<T>, windowOverride?: Window, defaultVar?: T): T;
declare function getCurrentEnv(windowOverride?: Window & typeof globalThis): string;
declare function getLocation(href: string): HTMLAnchorElement;
declare function getSpecificEnv(windowOverride?: Window & typeof globalThis): any;
declare function setEnvironments(envs: EnvOpts<any>, override?: boolean): void;
declare function setSpecificEnvironments(envs: EnvOpts<any>, override?: boolean): void;

export { getCurrentEnv, getLocation, getSpecificEnv, setEnvironments, setSpecificEnvironments };

export default envVar;

export type Environment = 'local' | 'test' | 'qa' | 'prod';

/** @deprecated Use `Environment` instead */
export type ENVIORNEMNT = Environment;

export type EnvTest = string | RegExp | ((options: { subdomain: string; pathname: string }) => boolean);

export interface EnvOpts<T> {
  local?: T;
  test?: T;
  qa?: T;
  prod?: T;
  [key: string]: T | undefined;
}

export interface SpecificEnvConfig {
  regex: RegExp;
  fn: (options: { match: RegExpMatchArray; subdomain: string; pathname: string }) => string | null;
}

declare function envVar<T>(envOpts: EnvOpts<T>, windowOverride?: Window, defaultVar?: T): T;
declare function getCurrentEnv(windowOverride?: Window & typeof globalThis): string;
declare function getLocation(href: string): HTMLAnchorElement;
declare function getSpecificEnv(windowOverride?: Window & typeof globalThis): string;
declare function setEnvironments(envs: EnvOpts<EnvTest | EnvTest[]>, override?: boolean): void;
declare function setSpecificEnvironments(envs: SpecificEnvConfig[], override?: boolean): void;

export { getCurrentEnv, getLocation, getSpecificEnv, setEnvironments, setSpecificEnvironments };

export default envVar;

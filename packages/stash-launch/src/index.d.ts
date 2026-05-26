/* eslint-disable @typescript-eslint/no-explicit-any */

interface StashLaunchOptions {
  stashUrl?: string;
}

declare function stashLaunch(
  params?: Record<string, any>,
  linkTo?: string,
  options?: StashLaunchOptions
): Promise<string>;

export default stashLaunch;
export declare const STASH_API_URL: string;

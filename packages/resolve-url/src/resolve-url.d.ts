interface ResolveOptions {
  relative: string;
  base?: string;
}

declare function resolveUrl(opts: ResolveOptions): string;

export default resolveUrl;

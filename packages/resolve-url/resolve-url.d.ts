interface ResolveOptions {
  relative?: string;
  base?: string;
}

declare function resolveUrl(opts: ResolveOptions): void;

export default resolveUrl;

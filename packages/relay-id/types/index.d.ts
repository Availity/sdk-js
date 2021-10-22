export type ResolvedGlobalId = {
  type: string;
  id: string;
};

declare function base64(decodedString: string): string;
declare function unbase64(encodedString: string): string;
declare function toGlobalId(type: string, id: string): string;
declare function fromGlobalId(globalId: string): ResolvedGlobalId;

export { base64, unbase64, toGlobalId, fromGlobalId };

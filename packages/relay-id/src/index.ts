/**
 * Inspired By https://github.com/graphql-compose/graphql-compose-relay/blob/master/src/globalId.js
 */

/**
 * Encodes a string to base64.
 *
 * @param i - The string to encode
 * @returns The base64-encoded string
 */
export function base64(i: string): string {
  return btoa(i);
}

/**
 * Decodes a base64-encoded string.
 *
 * @param i - The base64 string to decode
 * @returns The decoded string
 */
export function unbase64(i: string): string {
  return atob(i);
}

/** The decoded parts of a Relay global ID. */
export interface GlobalId {
  /** The type name used when the global ID was created. */
  type: string;
  /** The original ID, always returned as a string regardless of how it was encoded. */
  id: string;
}

/**
 * Takes a type name and an ID specific to that type name, and returns a
 * "global ID" that is unique among all types.
 *
 * @param type - The type name (e.g. `"User"`, `"Article"`)
 * @param id - The type-specific ID — accepts both strings and numbers
 * @returns A base64-encoded global ID in the form `"type:id"`
 */
export function toGlobalId(type: string, id: string | number): string {
  return base64([type, id].join(':'));
}

/**
 * Takes the "global ID" created by {@link toGlobalId}, and returns the type
 * name and ID used to create it.
 *
 * The first colon in the decoded string is used as the delimiter, so IDs that
 * themselves contain colons are handled correctly.
 *
 * @param globalId - The base64-encoded global ID to decode
 * @returns An object with `type` and `id` string properties
 */
export function fromGlobalId(globalId: string): GlobalId {
  const unbasedGlobalId = unbase64(globalId);
  const delimiterPos = unbasedGlobalId.indexOf(':');
  return {
    type: unbasedGlobalId.substring(0, delimiterPos),
    id: unbasedGlobalId.substring(delimiterPos + 1),
  };
}

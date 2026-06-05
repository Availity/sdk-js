import type { Schema } from 'yup';

export interface GetRulesOptions {
  compileRequiredFields?: boolean;
  excludeOneOf?: boolean;
  excludeTypes?: boolean;
}

declare function getRules(
  validation: Schema,
  options?: GetRulesOptions
): Record<string, unknown>;

export default getRules;

declare const getRules: (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validation: any,
  {
    compileRequiredFields,
    excludeOneOf,
    excludeTypes,
  }?: {
    compileRequiredFields: boolean;
    excludeOneOf: boolean;
    excludeTypes: boolean;
  }
) => Record<string, unknown>;

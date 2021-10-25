const addDelimiter = (a, b) => (a ? `${a}.${b}` : b);

const transformRules = (schemaFieldDocs, options) => {
  const fieldDocs = [];
  if (schemaFieldDocs.notOneOf?.length > 0) {
    fieldDocs.push(`not one of: ${schemaFieldDocs.notOneOf.join(', ')}`);
  }
  if (options.includeOneOf && schemaFieldDocs.oneOf?.length > 0) {
    fieldDocs.push(`one of: [${schemaFieldDocs.oneOf.join(', ')}]`);
  }
  if (schemaFieldDocs.tests?.length > 0) {
    for (const test of schemaFieldDocs.tests) {
      if (test.params) {
        const params = [];
        for (const param in test.params) {
          if (Object.prototype.hasOwnProperty.call(test.params, param)) {
            params.push(`${param} ${test.params[param]}`);
          }
        }
        if (test.name === 'max' || test.name === 'min') {
          if (schemaFieldDocs.type !== 'array') {
            fieldDocs.push(`${params.join(', ')} chars`);
          }
        } else {
          fieldDocs.push(`${test.name} ${params.join(', ')}`);
        }
      } else {
        fieldDocs.push(test.name);
      }
    }
  }

  const friendlyFieldDocs = fieldDocs.length > 0 ? `Rules: ${fieldDocs.join(', ')}.` : '';
  return friendlyFieldDocs;
};

const buildRules = (fields, head = '', options) =>
  Object.entries(fields).reduce((obj, [key, value]) => {
    const path = addDelimiter(head, key);

    Object.assign(obj, { [path]: transformRules(value, options) });

    if (value?.fields) {
      Object.assign(obj, buildRules(value.fields, key, options));
    }

    if (value.innerType && value.innerType.fields) {
      Object.assign(obj, buildRules(value.innerType.fields, key, options));
    }

    return obj;
  }, {});

/**
 * @param {*} validation
 * @param {*} options
 * @param {*} options.compileRequiredFields
 * @param {*} options.includeOneOf
 * @returns
 */
const getRules = (validation, { compileRequiredFields = false, includeOneOf = false }) => {
  const { fields } = validation.describe();

  return buildRules(fields, '', { compileRequiredFields, includeOneOf });
};

module.exports = { getRules, buildRules };

const addDelimiter = (a, b) => (a ? `${a}.${b}` : b);

const transformRules = (schemaFieldDocs, options) => {
  const fieldDocs = [];
  let isRequired = false;
  if (schemaFieldDocs.notOneOf?.length > 0) {
    fieldDocs.push(`not one of: ${schemaFieldDocs.notOneOf.join(', ')}`);
  }
  if (options.includeOneOf && schemaFieldDocs.oneOf?.length > 0) {
    fieldDocs.push(`one of: [${schemaFieldDocs.oneOf.join(', ')}]`);
  }
  if (schemaFieldDocs.tests?.length > 0) {
    for (const test of schemaFieldDocs.tests) {
      if (options.compileRequiredFields && test.name === 'required') {
        isRequired = true;
      } else if (test.params) {
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
  return options.compileRequiredFields ? { fieldDocs: friendlyFieldDocs, isRequired } : friendlyFieldDocs;
};

const getRequiredFields = (rules) =>
  Object.entries(rules).reduce((obj, [key, value]) => {
    Object.assign(obj, { [key]: value.fieldDocs });
    if (value.isRequired) {
      (obj.requiredFields = obj.requiredFields || []).push(key);
    }

    return obj;
  }, {});

const buildRules = (fields, head = '', options) =>
  Object.entries(fields).reduce((obj, [key, value]) => {
    const path = addDelimiter(head, key);

    const rules = transformRules(value, options);

    Object.assign(obj, { [path]: rules });

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
const getRules = (validation, { compileRequiredFields = false, includeOneOf = false } = {}) => {
  const description = validation.describe();

  const rules = buildRules(description.fields, '', { compileRequiredFields, includeOneOf });

  if (compileRequiredFields) {
    return getRequiredFields(rules);
  }

  return rules;
};

module.exports = { getRules, buildRules };

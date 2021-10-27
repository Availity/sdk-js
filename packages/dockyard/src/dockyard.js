const get = require('lodash/get');
const set = require('lodash/set');

const addDelimiter = (a, b, { underscore = false } = {}) =>
  underscore ? (a ? `${a}.${b}._${b}` : `${b}._${b}`) : a ? `${a}.${b}` : `${b}`;

const transformRules = (schemaFieldDocs, options) => {
  const fieldDocs = [];
  let isRequired = false;
  if (options.includeTypes && schemaFieldDocs.type) {
    fieldDocs.push(schemaFieldDocs.type);
  }
  if (schemaFieldDocs.notOneOf?.length > 0) {
    fieldDocs.push(`not one of: ${schemaFieldDocs.notOneOf.join(', ')}`);
  }
  if (!options.excludeOneOf && schemaFieldDocs.oneOf?.length > 0) {
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
          fieldDocs.push(
            `${params.join(', ')}${
              schemaFieldDocs.type !== 'number' && schemaFieldDocs.type !== 'array' ? ' chars' : ''
            }`
          );
        } else {
          fieldDocs.push(`${test.name} ${params.join(', ')}`);
        }
      } else {
        fieldDocs.push(test.name);
      }
    }
  }

  const friendlyFieldDocs = fieldDocs.length > 0 ? `Rules: ${fieldDocs.join(', ')}.` : '';
  return options.compileRequiredFields ? { description: friendlyFieldDocs, isRequired } : friendlyFieldDocs;
};

const buildRules = (fields, head = '', options) =>
  Object.entries(fields).reduce((obj, [key, value]) => {
    const pathOptions = {};
    if (value.fields || (value.innerType && value.innerType.fields)) {
      pathOptions.underscore = true;
    }
    const path = addDelimiter(head, key, pathOptions);

    const rules = transformRules(value, options);

    if (options.compileRequiredFields) {
      set(obj, path, rules.description);
      if (rules.isRequired) {
        const requiredFieldName = head ? `${head}.${key}` : key;
        set(
          obj,
          'requiredFields',
          obj.requiredFields ? [...obj.requiredFields, requiredFieldName] : [requiredFieldName]
        );
      }
    } else {
      set(obj, path, rules);
    }

    if (value?.fields) {
      const subFieldHead = addDelimiter(head, key);
      const subRules = buildRules(value.fields, subFieldHead, options);
      set(obj, subFieldHead, { ...get(obj, subFieldHead), ...get(subRules, subFieldHead) });
      if (options.compileRequiredFields) {
        set(
          obj,
          'requiredFields',
          obj.requiredFields ? [...obj.requiredFields, ...subRules.requiredFields] : [...subRules.requiredFields]
        );
      }
    }

    if (value.innerType && value.innerType.fields) {
      const innerFieldHead = addDelimiter(head, key);
      const innerRules = buildRules(value.innerType.fields, innerFieldHead, options);
      set(obj, innerFieldHead, { ...get(obj, innerFieldHead), ...get(innerRules, innerFieldHead) });
      if (options.compileRequiredFields) {
        set(
          obj,
          'requiredFields',
          obj.requiredFields ? [...obj.requiredFields, ...innerRules.requiredFields] : [...innerRules.requiredFields]
        );
      }
    }

    return obj;
  }, {});

/**
 * @param {*} validation
 * @param {*} options
 * @param {*} options.compileRequiredFields
 * @param {*} options.excludeOneOf
 * @param {*} options.includeTypes
 * @returns
 */
const getRules = (validation, { compileRequiredFields = false, excludeOneOf = false, includeTypes = false } = {}) => {
  const description = validation.describe();

  return buildRules(description.fields, '', { compileRequiredFields, excludeOneOf, includeTypes });
};

module.exports = getRules;

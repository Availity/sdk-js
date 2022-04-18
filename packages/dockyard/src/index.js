import get from 'lodash/get';
import set from 'lodash/set';

/**
 * Builds the object path of the description
 * @param {string} a
 * @param {string} b
 * @param {Object} options
 * @param {boolean} [options.underscore = false] - Set object path for an object ex. object._object
 * @returns
 */
const addDelimiter = (a, b, { underscore = false } = {}) =>
  underscore ? (a ? `${a}.${b}._${b}` : `${b}._${b}`) : a ? `${a}.${b}` : `${b}`;

/**
 * Transforms a field's SchemaDescription object to friendly docs
 * @param {*} schemaFieldDocs yup schema field
 * @param {Object} options
 * @param {boolean} options.compileRequiredFields - removes the word 'required' from the description and adds an array of required fields to the object
 * @param {boolean} options.excludeOneOf - if oneOf is specified on an item, exclude it from the description
 * @param {boolean} options.excludeTypes - exclude types from the description
 * @returns
 */
const transformRules = (schemaFieldDocs, options) => {
  const fieldDocs = [];
  let isRequired = false;
  if (!options.excludeTypes && schemaFieldDocs.type) {
    fieldDocs.push(schemaFieldDocs.type);
  }
  if (schemaFieldDocs.notOneOf?.length > 0) {
    fieldDocs.push(`not one of: [${schemaFieldDocs.notOneOf.join(', ')}]`);
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

/**
 * Loops through the SchemaDescription and assigns descriptions
 * @param {*} fields - yup schema fields
 * @param {string} head - string
 * @param {Object} options
 * @param {boolean} options.compileRequiredFields - removes the word 'required' from the description and adds an array of required fields to the object
 * @param {boolean} options.excludeOneOf - if oneOf is specified on an item, exclude it from the description
 * @param {boolean} options.excludeTypes - exclude types from the description
 * @returns
 */
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
      if (options.compileRequiredFields && subRules.requiredFields) {
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
      if (options.compileRequiredFields && innerRules.requiredFields) {
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
 * Convert yup schema to a friendly docs object
 * @param {*} validation - yup validation schema
 * @param {Object} options
 * @param {boolean} options.compileRequiredFields - removes the word 'required' from the description and adds an array of required fields to the object
 * @param {boolean} options.excludeOneOf - if oneOf is specified on an item, exclude it from the description
 * @param {boolean} options.excludeTypes - exclude types from the description
 * @returns
 */
const getRules = (validation, { compileRequiredFields = false, excludeOneOf = false, excludeTypes = false } = {}) => {
  const description = validation.describe();

  return buildRules(description.fields, '', { compileRequiredFields, excludeOneOf, excludeTypes });
};

export default getRules;

import getByPath from './getByPath';
import setByPath from './setByPath';

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

  // In yup 1.x, use the optional flag as the source of truth for required status
  if (schemaFieldDocs.optional === false) {
    if (options.compileRequiredFields) {
      isRequired = true;
    }
  }

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
      if (test.name === 'required') {
        // Handled via optional flag above
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

  if (!options.compileRequiredFields && schemaFieldDocs.optional === false) {
    fieldDocs.push('required');
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
      setByPath(obj, path, rules.description);
      if (rules.isRequired) {
        const requiredFieldName = head ? `${head}.${key}` : key;
        setByPath(
          obj,
          'requiredFields',
          obj.requiredFields ? [...obj.requiredFields, requiredFieldName] : [requiredFieldName]
        );
      }
    } else {
      setByPath(obj, path, rules);
    }

    if (value?.fields) {
      const subFieldHead = addDelimiter(head, key);
      const subRules = buildRules(value.fields, subFieldHead, options);
      setByPath(obj, subFieldHead, { ...getByPath(obj, subFieldHead), ...getByPath(subRules, subFieldHead) });
      if (options.compileRequiredFields && subRules.requiredFields) {
        setByPath(
          obj,
          'requiredFields',
          obj.requiredFields ? [...obj.requiredFields, ...subRules.requiredFields] : [...subRules.requiredFields]
        );
      }
    }

    if (value.innerType && value.innerType.fields) {
      const innerFieldHead = addDelimiter(head, key);
      const innerRules = buildRules(value.innerType.fields, innerFieldHead, options);
      setByPath(obj, innerFieldHead, { ...getByPath(obj, innerFieldHead), ...getByPath(innerRules, innerFieldHead) });
      if (options.compileRequiredFields && innerRules.requiredFields) {
        setByPath(
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

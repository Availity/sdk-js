// Copied from https://github.com/Availity/sdk-js/blob/master/packages/native-form/flattenObject.js
export const parseValue = (value) => (value === undefined || value === null ? value : value.toString());

const flattenObject = (ob) =>
  Object.keys(ob).reduce((toReturn, k) => {
    if (Object.prototype.toString.call(ob[k]) === '[object Date]') {
      toReturn[k] = ob[k].toJSON();
    } else if (ob[k] && typeof ob[k] === 'object') {
      const flatObject = flattenObject(ob[k]);
      const isArray = Array.isArray(ob[k]);

      for (const k2 of Object.keys(flatObject)) {
        toReturn[`${k}${isArray ? k2.replace(/^(\d+)(\..*)?/, '[$1]$2') : `.${k2}`}`] = parseValue(flatObject[k2]);
      }
    } else {
      toReturn[k] = parseValue(ob[k]);
    }

    return toReturn;
  }, {});

export default flattenObject;

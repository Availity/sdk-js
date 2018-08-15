const flattenObject = ob =>
  Object.keys(ob).reduce((toReturn, k) => {
    if (Object.prototype.toString.call(ob[k]) === '[object Date]') {
      toReturn[k] = ob[k].toJSON();
    } else if (ob[k] && typeof ob[k] === 'object') {
      const flatObject = flattenObject(ob[k]);
      const isArray = Array.isArray(ob[k]);
      Object.keys(flatObject).forEach(k2 => {
        toReturn[
          `${k}${isArray ? k2.replace(/^(\d+)(\..*)?/, '[$1]$2') : `.${k2}`}`
        ] = flatObject[k2].toString();
      });
    } else {
      toReturn[k] = ob[k].toString();
    }

    return toReturn;
  }, {});

export default flattenObject;

const flattenObject = ob =>
  Object.keys(ob).reduce((toReturn, k) => {
    if (Object.prototype.toString.call(ob[k]) === '[object Date]') {
      toReturn[k] = ob[k].toJSON();
    } else if (ob[k] && typeof ob[k] === 'object') {
      const flatObject = flattenObject(ob[k]);
      const isArray = Array.isArray(ob[k]);
      Object.keys(flatObject).forEach(k2 => {
        toReturn[
          `${k}.${isArray ? k2.replace(/^(\d+)(\..*)?/, '[$1]$2') : k2}`
        ] =
          flatObject[k2];
      });
    } else {
      toReturn[k] = ob[k];
    }

    return toReturn;
  }, {});

export default (spaceId, params = {}, formAttributes = {}) => {
  const mergedOptions = Object.assign(
    {
      method: 'post',
      action: `/ms/api/availity/internal/spaces/magneto/sso/v1/saml/${spaceId}`,
      target: '_blank',
    },
    formAttributes
  );
  const form = document.createElement('form');
  Object.keys(mergedOptions).forEach(key => {
    form.setAttribute(key, mergedOptions[key]);
  });
  const flat = flattenObject(params);
  const fields = Object.keys(flat)
    .map(key => {
      const name = key.replace(/\.\[\d+\]/g, '[]');
      const value = flat[key];
      return `<input type="hidden" name="${name}" value="${value}" />`;
    })
    .join('');

  form.insertAdjacentHTML('beforeend', fields);
  document.body.appendChild(form);
  form.submit();
};

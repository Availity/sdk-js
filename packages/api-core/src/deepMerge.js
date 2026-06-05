const isPlainObject = (val) => val !== null && typeof val === 'object' && !Array.isArray(val);

export default function deepMerge(target, ...sources) {
  const result = { ...target };
  for (const source of sources) {
    if (!isPlainObject(source)) continue;
    for (const key of Object.keys(source)) {
      if (isPlainObject(source[key]) && isPlainObject(result[key])) {
        result[key] = deepMerge(result[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }
  return result;
}

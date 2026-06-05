const isPlainObject = (val) => val !== null && typeof val === 'object' && !Array.isArray(val);

export default function deepMerge(target, ...sources) {
  const result = { ...target };
  for (const source of sources) {
    if (isPlainObject(source)) {
      for (const key of Object.keys(source)) {
        result[key] =
          isPlainObject(source[key]) && isPlainObject(result[key]) ? deepMerge(result[key], source[key]) : source[key];
      }
    }
  }
  return result;
}

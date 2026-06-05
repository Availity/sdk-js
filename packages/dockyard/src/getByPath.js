export default function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

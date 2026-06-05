export default function getByPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce((acc: unknown, key) => (acc as Record<string, unknown>)?.[key], obj);
}

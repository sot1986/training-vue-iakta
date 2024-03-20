export function deepMerge(a: object, b: object): object {
  if (Array.isArray(a) && Array.isArray(b)) {
    console.log('Merging arrays')
    return [...a, ...b]
  }
  return { ...a, ...b }
}

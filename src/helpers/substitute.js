export const substitute = (input, options = {}) => {
  options = { ...DEFAULT_SUBSTITUTE_OPTIONS, ...options }

  const mappingEntries = Object.entries(options.mapping)

  return input.replace(/./g, x => {
    const transformedEntries = options.caseSensitive
      ? mappingEntries
      : mappingEntries.map(array => array.map(c => isLowerCase(x) ? c.toLowerCase() : c.toUpperCase()))

    const foundMapping = transformedEntries.find(kvArray => kvArray.includes(x))

    return !foundMapping ? x : foundMapping[0] === x ? foundMapping[1] : foundMapping[0]
  })
}

const isLowerCase = x => x.toLowerCase() === x

const DEFAULT_SUBSTITUTE_OPTIONS = {
  mapping: {},
  caseSensitive: true
}

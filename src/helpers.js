// min <= x < max
export const randomInRange = (min, max) => {
  if (min > max) {
    throw Error('Min cannot be larger than max')
  }
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

export const throwOrSilent = (options, errorMessage) => {
  if (options.failOnUnknownCharacter) {
    throw Error(errorMessage)
  }
  return ''
}

export const isBrowser = (() => typeof window === 'object')()

export const substitute = (input, options = {}) => {
  options = { ...DEFAULT_SUBSTITUTE_OPTIONS, ...options }

  const mappingEntries = Object.entries(options.mapping)

  return input.replace(/./g, x => {
    const transformedEntries = options.caseSensitive ? mappingEntries : mappingEntries.map(([k, v]) => isLowerCase(x) ? [k.toLowerCase(), v.toLowerCase()] : [k.toUpperCase(), v.toUpperCase()])
    const foundMapping = transformedEntries.find(([k, v]) => k === x || v === x)
    return !foundMapping ? x : foundMapping[0] === x ? foundMapping[1] : foundMapping[0]
  })
}

const isLowerCase = x => x.toLowerCase() === x

const DEFAULT_SUBSTITUTE_OPTIONS = {
  mapping: {},
  caseSensitive: true
}

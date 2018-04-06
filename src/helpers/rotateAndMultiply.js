import { modInverse, throwOrSilent } from './index'

export const rotateAndMultiply = (c, options) => {
  options = { ...DEFAULT_ROTATE_AND_MULTIPLY_OPTIONS, ...options }
  const type = getType(c)

  return type === ROTATE_AND_MULTIPLY_TYPES.OTHER || !isAllowed(type, options.types)
    ? (throwOrSilent(options, options.errorMessage) || options.omitUnknownCharacter ? '' : c)
    : modifyCharacter(c, { type, keys: options.keys, decode: options.decode })
}

const isAllowed = (characterType, allowedTypes) => {
  if (allowedTypes === true) {
    return true
  }
  const bitmask = allowedTypes.reduce((acc, type) => acc | type)
  return !!(bitmask & characterType)
}

const modifyCharacter = (c, options) => {
  const asciiOfset = ROTATE_AND_MULTIPLY_ASCII[options.type]
  const parsedCharacter = parseInt(c, 36) - (options.type === ROTATE_AND_MULTIPLY_TYPES.NUMBER ? 0 : 10)
  const mod = options.type === ROTATE_AND_MULTIPLY_TYPES.NUMBER ? 10 : 26
  const multiplicationKey = options.decode ? modInverse(options.keys[0], mod) : options.keys[0]
  const additionKey = options.keys[1]

  // Depending on en- or decoding, change transformation formula
  let transformedCode = options.decode ? (multiplicationKey * (parsedCharacter - additionKey)) : (parsedCharacter * multiplicationKey + additionKey)

  // Recreate "real modulo" by handling negative values
  while (transformedCode < 0) {
    transformedCode += mod
  }

  return String.fromCharCode(asciiOfset + (transformedCode % mod))
}

const DEFAULT_ROTATE_AND_MULTIPLY_OPTIONS = {
  keys: [3, 0],
  types: true,
  failOnUnknownCharacter: true,
  omitUnknownCharacter: false,
  decode: false
}

const getType = c => (c >= 'a' && c <= 'z') ? ROTATE_AND_MULTIPLY_TYPES.LOWERCASE : (c >= 'A' && c <= 'Z')
  ? ROTATE_AND_MULTIPLY_TYPES.UPPERCASE : (c >= '0' && c <= '9')
    ? ROTATE_AND_MULTIPLY_TYPES.NUMBER : ROTATE_AND_MULTIPLY_TYPES.OTHER

export const ROTATE_AND_MULTIPLY_TYPES = {
  UPPERCASE: 1,
  LOWERCASE: 2,
  NUMBER: 4,
  OTHER: 8
}

const ROTATE_AND_MULTIPLY_ASCII = {
  1: 65,
  2: 97,
  4: 48
}

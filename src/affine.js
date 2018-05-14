import { ROTATE_AND_MULTIPLY_TYPES, rotateAndMultiply } from './helpers/rotateAndMultiply'

const encode = (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }
  return transform(input, options)
}

const decode = (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }
  options.decode = true

  return transform(input, options)
}

const transform = (input, options) => {
  if (!LEGAL_MULT_KEYS.includes(options.keys[0])) {
    throw new Error('Illegal keys')
  }

  return [...input].map(c => rotateAndMultiply(c, getRotateAndMultiplyConfig(options))).join('')
}

const getRotateAndMultiplyConfig = options => ({
  types: [ROTATE_AND_MULTIPLY_TYPES.LOWERCASE, ROTATE_AND_MULTIPLY_TYPES.UPPERCASE],
  keys: options.keys,
  failOnUnknownCharacter: options.failOnUnknownCharacter,
  omitUnknownCharacter: options.omitUnknownCharacter,
  errorMessage: 'Could not transform character',
  decode: options.decode
})

const DEFAULT_OPTIONS = {
  keys: [3, 1],
  failOnUnknownCharacter: false,
  omitUnknownCharacter: false
}

// Keys that are co-prime to 26 (gcd(a, 26) = 1)
const LEGAL_MULT_KEYS = [3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25]

export default {
  encode,
  decode
}

import { ASCII, modInverse, throwOrSilent } from './helpers'

const encode = (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }
  return transform(input, options)
}

const decode = (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }
  options.key = modInverse(options.key, 26)

  return transform(input, options)
}

const transform = (input, options) => {
  if (!LEGAL_KEYS.includes(options.key)) {
    throw new Error('Illegal key')
  }
  return [...input].map(c => {
    const transformedCharacter = (c >= 'a' && c <= 'z') ? multiplyCharacter(c, ASCII.a, options.key) : (c >= 'A' && c <= 'Z')
      ? multiplyCharacter(c, ASCII.A, options.key) : false

    if (!transformedCharacter) {
      return throwOrSilent(options, 'Could not multiply character') || options.omitUnknownCharacter ? '' : c
    }

    return transformedCharacter
  }).join('')
}

const multiplyCharacter = (c, asciiCode, key) => String.fromCharCode(asciiCode + ((parseInt(c, 36) - 10) * key) % 26)

const DEFAULT_OPTIONS = {
  key: 3,
  failOnUnknownCharacter: false,
  omitUnknownCharacter: false
}

// Keys that are co-prime to 26 (gcd(a, 26) = 1)
const LEGAL_KEYS = [3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25]

export default {
  encode,
  decode
}

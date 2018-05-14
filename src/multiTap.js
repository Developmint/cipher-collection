import { mergeObjects, throwOrSilent } from './helpers'

export const encode = (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }
  return [...input.toUpperCase()]
    .map(c => {
      const decodedCharacter = Object.entries(alphabetWithSpaceKey(options.customMapping)).find(([, v]) => v.includes(c))
      if (decodedCharacter) {
        const amount = decodedCharacter[1].indexOf(c) + 1
        return options.exponentForm ? `${decodedCharacter[0]}^${amount}` : `${decodedCharacter[0]}`.repeat(amount)
      }
      return throwOrSilent(options, `Unencodable character ${c}`)
    })
    .filter(Boolean)
    .join(options.withSpacing ? ' ' : '')
}

export const decode = (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }

  const alphabet = alphabetWithSpaceKey(options.customMapping)
  const invalidInputRegex = /[^\d^*# ]/g
  const exponentFormRegex = /\d\^\d ?/g
  const normalFormRegex = /(([79])\2{0,4}|([234568])\3{0,2}|([01*#])\4{0,2}) ?/g

  // Validate input
  if (input.match(invalidInputRegex)) {
    if (options.failOnUnknownCharacter) {
      throw Error(`Undecodable characters`)
    }

    input.replace(invalidInputRegex)
  }

  if (!input.length) {
    return ''
  }

  const capturedInput = options.exponentForm ? input.match(exponentFormRegex) : input.match(normalFormRegex)

  return capturedInput.map(expr => {
    expr = expr.replace(/ /g, '')
    /*
     * Retrieve the letter from the lookup object.
     * In exponent form use the number as key and get the letter on the exponent index
     * In "normal form" use the number as key as well, but determine the latter based on the length of the expression
     * Subtract one because array indices start at 0
     */
    const cellIdentifier = (options.exponentForm ? expr[2] : expr.length) - 1
    return alphabet[expr[0]][cellIdentifier]
  }).join('')
}

const alphabetWithSpaceKey = customMapping =>
  customMapping && typeof customMapping === 'object'
    ? mergeObjects(ALPHABET, customMapping)
    : ALPHABET

const DEFAULT_OPTIONS = {
  customMapping: {
    0: ' '
  },
  exponentForm: false,
  withSpacing: true,
  failOnUnknownCharacter: true
}

const ALPHABET = {
  2: 'ABC',
  3: 'DEF',
  4: 'GHI',
  5: 'JKL',
  6: 'MNO',
  7: 'PQRS',
  8: 'TUV',
  9: 'WXYZ'
}
export default {
  decode,
  encode
}

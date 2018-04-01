import { throwOrSilent } from './helpers'

export const encode = (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }
  return [...input.toUpperCase()]
    .map(c => {
      const decodedCharacter = Object.entries(alphabetWithSpaceKey(options.customMapping)).find(([k, v]) => v.includes(c))
      if (decodedCharacter) {
        const amount = decodedCharacter[1].indexOf(c) + 1
        return (options.exponentForm ? `${decodedCharacter[0]}^${amount}` : `${decodedCharacter[0]}`.repeat(amount))
      }
      return throwOrSilent(options, `Unencodable character ${c}`)
    })
    .filter(c => c.length)
    .join(options.withSpacing ? ' ' : '')
}

export const decode = (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }
  const alphabet = alphabetWithSpaceKey(options.customMapping)

  const invalidInputRegex = /[^\d^*# ]/g

  // Validate input
  if (input.match(invalidInputRegex)) {
    if (options.failOnUnknownCharacter) {
      throw Error(`Undecodable characters`)
    } else {
      input.replace(invalidInputRegex)
    }
  }

  if (!input.length) {
    return ''
  }

  const capturedInput = options.exponentForm ? input.match(/\d\^\d ?/g) : input.match(/(([79])\2{0,4}|([234568])\3{0,2}|([01*#])\4{0,2}) ?/g)
  return capturedInput.map(expr => {
    expr = expr.replace(/ /g, '')
    return options.exponentForm ? alphabet[expr[0]][expr[2] - 1] : alphabet[expr[0]][expr.length - 1]
  }).join('')
}

const alphabetWithSpaceKey = customMapping => typeof customMapping === 'object' ? { ...ALPHABET, ...customMapping } : ALPHABET

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

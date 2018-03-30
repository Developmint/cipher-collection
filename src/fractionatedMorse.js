import morse from './morse'

export const decode = (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }
  const morseOptions = { ...DEFAULT_MORSE_OPTION, ...{ failOnUnknownCharacter: options.failOnUnknownCharacter } }

  let morseCode = [...input].map(c => {
    const decodedCharacterIndex = options.keyAlphabet.indexOf(c)
    if (decodedCharacterIndex !== -1) {
      return ENCODED_ALPHABET[decodedCharacterIndex]
    }
    if (options.failOnUnknownCharacter) {
      throw Error(`Undecodable character ${c}`)
    }
    return ''
  })
    .join('')

    // Remove padding if needed
    .replace(/x{1,2}$/, '')
    // Fix unwanted space encoding
    .replace(/xx/g, SPACE_STRING)

  return morse.decode(morseCode, morseOptions)
}

export const encode = (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }
  const morseOptions = { ...DEFAULT_MORSE_OPTION, ...{ failOnUnknownCharacter: options.failOnUnknownCharacter } }

  return morseCodeFromInput(input, morseOptions)
  // Split into arrays containing three-character strings
    .match(/.{3}/g)
    .map(c => {
      const encodedCharacterIndex = ENCODED_ALPHABET.indexOf(c)

      if (encodedCharacterIndex !== -1) {
        return options.keyAlphabet[encodedCharacterIndex]
      }

      if (options.failOnUnknownCharacter) {
        throw Error(`Unencodable character ${c}`)
      }

      return ''
    }).join('')
}

const morseCodeFromInput = (input, morseOptions) => {
  let morseCode = morse.encode(input.toUpperCase(), morseOptions)

  // Add padding if needed
  if (morseCode.length % 3) {
    morseCode += morseOptions.separator.repeat(3 - (morseCode.length % 3))
  }

  return morseCode
    .replace(new RegExp(`${morseOptions.separator}`, 'g'), 'x')
    // Fix unwanted space encoding
    .replace(new RegExp(`${SPACE_STRING}`, 'g'), 'xx')
}

const ENCODED_ALPHABET = [
  '...',
  '..-',
  '..x',
  '.-.',
  '.--',
  '.-x',
  '.x.',
  '.x-',
  '.xx',
  '-..',
  '-.-',
  '-.x',
  '--.',
  '---',
  '--x',
  '-x.',
  '-x-',
  '-xx',
  'x..',
  'x.-',
  'x.x',
  'x-.',
  'x--',
  'x-x',
  'xx.',
  'xx-'
]

const SPACE_STRING = 'x/x'

const DEFAULT_OPTIONS = {
  keyAlphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  failOnUnknownCharacter: true
}

const DEFAULT_MORSE_OPTION = {
  separator: 'x'
}

export default {
  decode,
  encode
}

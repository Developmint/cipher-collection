import { throwOrSilent } from './helpers'

export const decode = (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }

  return input.split(options.separator).map(character => {
    const decodedCharacter = Object.entries(ALPHABET).find(([, morse]) => morse === character)

    if (decodedCharacter) {
      return decodedCharacter[0]
    }

    return throwOrSilent(options, `Undecodable character ${character}`) || options.omitUnknownCharacter ? '' : character
  }).join('')
}

export const encode = (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }

  return [...input.toUpperCase()].map(character => {
    const encodedCharacter = Object.entries(ALPHABET).find(([clearCharacter]) => clearCharacter === character)

    if (encodedCharacter) {
      return encodedCharacter[1]
    }

    return throwOrSilent(options, `Unencodable character ${character}`) || options.omitUnknownCharacter ? '' : character
  }).join(options.separator)
}

const ALPHABET = {
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '-..',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..',
  1: '.----',
  2: '..---',
  3: '...--',
  4: '....-',
  5: '.....',
  6: '-....',
  7: '--...',
  8: '---..',
  9: '----.',
  0: '-----',
  ' ': '/',
  '.': '.-.-.-',
  ',': '--..--',
  ':': '---...',
  ';': '-.-.-.',
  '?': '..--..',
  '-': '-....-',
  _: '..--.-',
  '(': '-.--.',
  ')': '-.--.-',
  '\'': '.----.',
  '=': '-...-',
  '+': '.-.-.',
  '/': '-..-.',
  '@': '.--.-.'
}

const DEFAULT_OPTIONS = {
  separator: ' ',
  failOnUnknownCharacter: true,
  omitUnknownCharacter: false
}
export default {
  decode,
  encode
}

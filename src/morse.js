import { throwOrSilent } from './helpers'

export const decode = (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }
  return input.split(options.separator).map(c => {
    const decodedCharacter = Object.entries(ALPHABET).find(([k, v]) => v === c)

    if (decodedCharacter) {
      return decodedCharacter[0]
    }
    throwOrSilent(options, `Undecodable character ${c}`)

    return options.omitUnknownCharacter ? '' : c
  }).join('')
}

export const encode = (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }

  return [...input.toUpperCase()].map(c => {
    const encodedCharacter = Object.entries(ALPHABET).find(([k]) => k === c)

    if (encodedCharacter) {
      return encodedCharacter[1]
    }
    throwOrSilent(options, `Unencodable character ${c}`)

    return options.omitUnknownCharacter ? '' : c
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
  '_': '..--.-',
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

import { throwOrSilent } from './helpers'

const encode = (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }

  const grid = prepareGridString(options)
  let squareSize = 6

  if (!options.withNumbers) {
    const [substitute, toReplace] = [...options.equalLetters]
    input = input.replace(new RegExp(toReplace, 'gi'), substitute)

    squareSize = 5
  }
  return [...input.toUpperCase()].map(c => {
    /*
     * Think of a grid string as a real grid with 5^2 places:
     *
     * - 1 2 3 4 5
     * 1 A B C D E
     * 2 F G H I K
     * 3 L M N O P
     * 4 Q R S T U
     * 5 V W X Y Z
     *
     * Now map letters to the corresponding row and col
     */

    const characterIndex = grid.indexOf(c)
    const row = Math.ceil((characterIndex + 1) / squareSize)
    const col = (characterIndex % squareSize) + 1

    if ([row, col].includes(0)) {
      return errorExpression(c, options)
    }

    return `${row}${col}`
  }).filter(c => c.length).join(' ')
}

const decode = (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }

  const grid = prepareGridString(options)
  let squareSize = options.withNumbers ? 6 : 5

  return input.split(' ')
    .map(sequence => {
      if (!sequence.match(/\d{2}/)) {
        return errorExpression(sequence, options)
      }
      const [row, col] = sequence

      return grid.charAt(squareSize * (row - 1) + (col - 1)) || errorExpression(sequence, options)
    }).join('')
}

const errorExpression = (c, options) => throwOrSilent(options, `Unknown character ${c}`) || options.omitUnknownCharacter ? '' : c

const DEFAULT_OPTIONS = {
  key: '',
  equalLetters: 'IJ',
  withNumbers: false,
  failOnUnknownCharacter: true,
  omitUnknownCharacter: true
}

const prepareGridString = options =>
  [...options.key.toUpperCase(), ...getAlphabet(options)].reduce((acc, letter) => {
    return !acc.includes(letter) ? acc.concat(letter) : acc
  })

const getAlphabet = options => {
  const [substitute, toReplace] = [...options.equalLetters]
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  return options.withNumbers ? `${alphabet}0123456789` : alphabet.replace(toReplace, substitute)
}

export default {
  encode,
  decode
}

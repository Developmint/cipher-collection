import { substitute } from './helpers'

export default (input, options = {}) => substitute(input, retrieveOptions(options))

const retrieveOptions = options => ({
  mapping: MAPPING,
  caseSensitive: options.onlyUpperCase
})

const MAPPING = {
  'A': 'M',
  'E': 'K',
  'I': 'D',
  'O': 'T',
  'U': 'H'
}

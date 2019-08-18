import { substitute } from './helpers/substitute'

export default (input, options = {}) => substitute(input, retrieveOptions(options))

const retrieveOptions = options => ({
  mapping: DEFAULT_MAPPING,
  caseSensitive: options.onlyUpperCase
})

const DEFAULT_MAPPING = {
  A: 'M',
  E: 'K',
  I: 'D',
  O: 'T',
  U: 'H'
}

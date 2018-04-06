/**
 * The well-known Caesar or ROT (for rotations) cipher. It'll rotate letters (and optionally numbers) by 13 or a
 * custom number of rotations. Only numbers and ASCII letters will be transformed. other characters (including
 * special characters, umlauts like äüä or other variants) will stay the same. This function is case-sensitive.
 *
 * @since 0.0.1
 *
 * @param {string|function} input - The input that should be rotated
 * @param {object} options - Option object
 * @returns {string} rotated input
 * @example
 *
 * const input = 'ABC'
 * rot(input) // NOP
 */
import { ROTATE_AND_MULTIPLY_TYPES, rotateAndMultiply } from './helpers/rotateAndMultiply'

export default (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }
  return [...input].map(c => rotateAndMultiply(c, getConfig(options))).join('')
}

const getConfig = options => ({
  types: options.rotateNumbers ? true : [ROTATE_AND_MULTIPLY_TYPES.LOWERCASE, ROTATE_AND_MULTIPLY_TYPES.UPPERCASE, ROTATE_AND_MULTIPLY_TYPES.OTHER],
  keys: [1, options.rotations % 26],
  failOnUnknownCharacter: false
})

const DEFAULT_OPTIONS = {
  rotateNumbers: false,
  rotations: 13
}

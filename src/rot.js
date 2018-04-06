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
import { ASCII } from './helpers'

export default (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }
  options.rotations %= 26
  return [...input].map(c => {
    return (c >= 'a' && c <= 'z') ? rotatedCharacter(c, ASCII.a, options.rotations) : (c >= 'A' && c <= 'Z')
      ? rotatedCharacter(c, ASCII.A, options.rotations) : (options.rotateNumbers && c >= '0' && c <= '9')
        ? rotatedCharacter(c, ASCII[0], options.rotations, 10) : c
  }).join('')
}

const rotatedCharacter = (c, asciiCode, rotation, mod = 26) => String.fromCharCode(asciiCode + (c.charCodeAt(0) - asciiCode + rotation) % mod)

const DEFAULT_OPTIONS = {
  rotateNumbers: false,
  rotations: 13
}

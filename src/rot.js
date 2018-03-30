/**
 * The well-known Caesar or ROT (for rotation) cipher. It'll rotate letters (and optionally numbers) by 13 or a
 * custom number of rotations. Only numbers and ASCII letters will be transformed. other characters (including
 * special characters, umlauts like äüä or other variants) will stay the same. This function is case-sensitive.
 *
 * @since 0.0.1
 *
 * @param {string|function} input - The input that should be rotated
 * @param {boolean} rotateNumbers - Should numbers get rotated as well? (default: false)
 * @param {int} rotation - The number of rotations (default: 13)
 * @returns {string} rotated input
 * @example
 *
 * const input = 'ABC'
 * rot(input) // NOP
 */
export default (input, rotateNumbers = false, rotation = 13) => {
  rotation %= 26
  return [...input].map(c => {
    return (c >= 'a' && c <= 'z') ? rotatedCharacter(c, ASCII.a, rotation) : (c >= 'A' && c <= 'Z')
      ? rotatedCharacter(c, ASCII.A, rotation) : (rotateNumbers && c >= '0' && c <= '9')
        ? rotatedCharacter(c, ASCII[0], rotation, 10) : c
  }).join('')
}

const rotatedCharacter = (c, asciiCode, rotation, mod = 26) => String.fromCharCode(asciiCode + (c.charCodeAt(0) - asciiCode + rotation) % mod)

const ASCII = {
  A: 65,
  a: 97,
  0: 48
}

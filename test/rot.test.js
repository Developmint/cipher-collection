import each from 'jest-each'
import rot from 'rot'

const fullAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 .,:;?-_()\'=+/@'
const fullAlphabetRot13 = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm1234567890 .,:;?-_()\'=+/@'
const fullAlphabetRot13WithNumbers = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm4567890123 .,:;?-_()\'=+/@'

describe('rot', () => {
  test('rotate default alphabet', () => {
    expect(rot(fullAlphabet)).toBe(fullAlphabetRot13)
  })

  each([
    ['BCDEFGHIJKLMNOPQRSTUVWXYZAbcdefghijklmnopqrstuvwxyza1234567890 .,:;?-_()\'=+/@', 1, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 .,:;?-_()\'=+/@'],
    [fullAlphabetRot13, 13, fullAlphabet],
    [fullAlphabet, 26, fullAlphabet]
  ]).test('expecting %s when rotating %s correctly with custom rotations %s on default', (expected, rotations, str) => {
    expect(rot(str, { rotations })).toBe(expected)
  })

  test('rotate alphabet with numbers', () => {
    expect(rot(fullAlphabet, { rotateNumbers: true })).toBe(fullAlphabetRot13WithNumbers)
  })

  each([
    ['BCDEFGHIJKLMNOPQRSTUVWXYZAbcdefghijklmnopqrstuvwxyza2345678901 .,:;?-_()\'=+/@', 1, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 .,:;?-_()\'=+/@'],
    [fullAlphabetRot13WithNumbers, 13, fullAlphabet],
    [fullAlphabet, 26, fullAlphabet]
  ]).test('expecting %s when rotating (custom rotations %s, with numbers) %s', (expected, rotations, str) => {
    expect(rot(str, { rotateNumbers: true, rotations })).toBe(expected)
  })
})

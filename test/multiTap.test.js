import multiTap from 'multiTap'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ '
const encodedAlphabet = '2 22 222 3 33 333 4 44 444 5 55 555 6 66 666 7 77 777 7777 8 88 888 9 99 999 9999 0'
const encodedAlphabetAsExponents = '2^1 2^2 2^3 3^1 3^2 3^3 4^1 4^2 4^3 5^1 5^2 5^3 6^1 6^2 6^3 7^1 7^2 7^3 7^4 8^1 8^2 8^3 9^1 9^2 9^3 9^4 0^1'

const withoutSpacingOptions = { withSpacing: false }
const customMappingOptions = { customMapping: { 0: ' !$' } }
const exponentOptions = { exponentForm: true }
const exponentWithoutSpacingOptions = { exponentForm: true, withSpacing: false }
const silentFailOptions = { failOnUnknownCharacter: false }

describe('encoding', () => {
  test('default', () => {
    expect(multiTap.encode(alphabet)).toBe(encodedAlphabet)
    expect(multiTap.encode(alphabet.toLowerCase())).toBe(encodedAlphabet)
  })

  test('empty', () => {
    expect(multiTap.encode('')).toBe('')
  })

  test('without spacing', () => {
    expect(multiTap.encode(alphabet, withoutSpacingOptions)).toBe(encodedAlphabet.replace(/ /g, ''))
    expect(multiTap.encode(alphabet.toLowerCase(), withoutSpacingOptions)).toBe(encodedAlphabet.replace(/ /g, ''))
  })

  test('with custom mapping', () => {
    expect(multiTap.encode(alphabet, customMappingOptions)).toBe(encodedAlphabet)
    expect(multiTap.encode(alphabet.toLowerCase(), customMappingOptions)).toBe(encodedAlphabet)
    expect(multiTap.encode('Give $$$!', customMappingOptions)).toBe('4 444 888 33 0 000 000 000 00')
  })

  test('with empty custom mapping', () => {
    expect(multiTap.encode(alphabet.slice(0, -1), { customMapping: false })).toBe(encodedAlphabet.slice(0, -2))
  })

  test('in exponent form', () => {
    expect(multiTap.encode(alphabet, exponentOptions)).toBe(encodedAlphabetAsExponents)
    expect(multiTap.encode(alphabet.toLowerCase(), exponentOptions)).toBe(encodedAlphabetAsExponents)
  })

  test('in exponent form and without spacing', () => {
    expect(multiTap.encode(alphabet, exponentWithoutSpacingOptions)).toBe(encodedAlphabetAsExponents.replace(/ /g, ''))
    expect(multiTap.encode(alphabet.toLowerCase(), exponentWithoutSpacingOptions)).toBe(encodedAlphabetAsExponents.replace(/ /g, ''))
  })

  test('with invalid characters', () => {
    expect(() => { multiTap.encode('$') }).toThrowError('Unencodable character $')
  })

  test('with invalid characters and silent fail', () => {
    expect(multiTap.encode('$A', silentFailOptions)).toBe('2')
  })
})

describe('decoding', () => {
  test('default', () => {
    expect(multiTap.decode(encodedAlphabet)).toBe(alphabet)
  })

  test('empty', () => {
    expect(multiTap.decode('')).toBe('')
  })

  test('without spacing', () => {
    // No correct decoding without spacing or exponent form possible. :(
    expect(multiTap.decode(encodedAlphabet.replace(/ /g, ''), withoutSpacingOptions)).toBe('CCFFIILLOOVV ')
  })

  test('in exponent form', () => {
    expect(multiTap.decode(encodedAlphabetAsExponents, exponentOptions)).toBe(alphabet)
  })

  test('in exponent form without spacing', () => {
    expect(multiTap.decode(encodedAlphabetAsExponents.replace(/ /g, ''), exponentWithoutSpacingOptions)).toBe(alphabet)
  })

  test('with custom mapping', () => {
    expect(multiTap.decode('4 444 888 33 0 000 000 000 00', customMappingOptions)).toBe('GIVE $$$!')
  })

  test('with invalid characters', () => {
    expect(() => { multiTap.decode('$2') }).toThrowError('Undecodable character')
  })

  test('with invalid characters and silent fail', () => {
    expect(multiTap.decode('$€2%^&', silentFailOptions)).toBe('A')
  })
})

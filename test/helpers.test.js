import { randomInRange, substitute } from 'helpers'
import { modInverse } from '../src/helpers'

describe('randomInRange', () => {
  test('returns random number in range', () => {
    const rand = randomInRange(0, 5)
    expect(rand).toBeGreaterThanOrEqual(0)
    expect(rand).toBeLessThan(5)
  })
  test('returns min/max when min = max', () => {
    expect(randomInRange(0, 0)).toBe(0)
  })
  test('returns error when min > max', () => {
    expect(() => { randomInRange(1, 0) }).toThrowError('Min cannot be larger than max')
  })
})

describe('substitute', () => {
  const mappingOptions = { mapping: { 'A': 'M' } }
  const mappingAndCaseInsensitiveOptions = { mapping: { 'A': 'M' }, caseSensitive: false }
  test('default', () => {
    expect(substitute('A')).toBe('A')
  })

  test('with custom mapping', () => {
    expect(substitute('A', mappingOptions)).toBe('M')
    expect(substitute('AMAMA', mappingOptions)).toBe('MAMAM')

    expect(substitute('B', mappingOptions)).toBe('B')
  })

  test('case-insensitive', () => {
    expect(substitute('Aa', { caseSensitive: false })).toBe('Aa')
  })

  test('case-insensitive with custom mapping', () => {
    expect(substitute('Aa', mappingAndCaseInsensitiveOptions)).toBe('Mm')
    expect(substitute('AMamA', mappingAndCaseInsensitiveOptions)).toBe('MAmaM')

    expect(substitute('B', mappingAndCaseInsensitiveOptions)).toBe('B')
  })
})

describe('modInverse', () => {
  test('it returns correct inverse', () => {
    expect(modInverse(3, 26)).toBe(9)
    expect(modInverse(9, 26)).toBe(3)
    expect(modInverse(11, 26)).toBe(19)
    expect(modInverse(1, 2)).toBe(1)
  })
  test('it throws error on invalid input', () => {
    expect(() => { modInverse(-1, 26) }).toThrowError()
    expect(() => { modInverse(3, 1) }).toThrowError()
    expect(() => { modInverse(3, 0) }).toThrowError()
    expect(() => { modInverse('b', 'A') }).toThrowError()
  })
  test('it returns correct inverse for prime mods', () => {
    expect(modInverse(1, 7)).toBe(1)
    expect(modInverse(2, 7)).toBe(4)
    expect(modInverse(3, 7)).toBe(5)
    expect(modInverse(4, 7)).toBe(2)
    expect(modInverse(5, 7)).toBe(3)
    expect(modInverse(6, 7)).toBe(6)
    expect(modInverse(7, 7)).toBe(false)
  })
})

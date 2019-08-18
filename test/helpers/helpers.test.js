import { modInverse, randomInRange } from 'helpers'

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
    expect(() => { randomInRange(1, 0) }).toThrow('Min cannot be larger than max')
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
    expect(() => { modInverse(-1, 26) }).toThrow()
    expect(() => { modInverse(3, 1) }).toThrow()
    expect(() => { modInverse(3, 0) }).toThrow()
    expect(() => { modInverse('b', 'A') }).toThrow()
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

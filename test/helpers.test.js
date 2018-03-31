import { randomInRange } from 'helpers'

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

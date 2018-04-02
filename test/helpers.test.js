import { randomInRange, substitute } from 'helpers'

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

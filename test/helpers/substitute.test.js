import { substitute } from 'helpers/substitute'

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

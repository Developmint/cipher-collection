import polybius from 'polybius'

describe('encoding', () => {
  test('default', () => {
    expect(polybius.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toBe('11 12 13 14 15 21 22 23 24 24 25 31 32 33 34 35 41 42' +
      ' 43 44 45 51 52 53 54 55')
    expect(polybius.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase())).toBe('11 12 13 14 15 21 22 23 24 24 25 31 32 33 34 35' +
      ' 41 42' +
      ' 43 44 45 51 52 53 54 55')
  })
  test('default with illegal character', () => {
    expect(() => { polybius.encode('*') }).toThrowError('Unknown character *')
  })

  test('with custom key', () => {
    expect(polybius.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ', { key: 'OHA' }))
      .toBe('13 14 15 21 22 23 24 12 25 25 31 32 33 34 11 35 41 42 43 44 45 51 52 53 54 55')
    expect(polybius.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ', { key: 'oHa' }))
      .toBe('13 14 15 21 22 23 24 12 25 25 31 32 33 34 11 35 41 42 43 44 45 51 52 53 54 55')
  })

  test('with numbers', () => {
    expect(polybius.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', { withNumbers: true }))
      .toBe('11 12 13 14 15 16 21 22 23 24 25 26 31 32 33 34 35 36 41 42 43 44 45 46 51 52 53 54 55 56 61 62 63 64' +
        ' 65 66')
  })

  test('with numbers and custom key', () => {
    expect(polybius.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', { withNumbers: true, key: 'oHa' }))
      .toBe('13 14 15 16 21 22 23 12 24 25 26 31 32 33 11 34 35 36 41 42 43 44 45 46 51 52 53 54 55 56 61 62 63 64 65 66')
  })

  test('with custom substitution', () => {
    expect(polybius.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ', { equalLetters: 'UV' }))
      .toBe('11 12 13 14 15 21 22 23 24 25 31 32 33 34 35 41 42 43 44 45 51 51 52 53 54 55')
  })

  test('omit illegal character', () => {
    expect(polybius.encode('N*', { failOnUnknownCharacter: false })).toBe('33')
  })

  test('preserve illegal character', () => {
    expect(polybius.encode('N* ', { failOnUnknownCharacter: false, omitUnknownCharacter: false })).toBe('33 *  ')
  })
})

describe('decoding', () => {
  test('default', () => {
    expect(polybius.decode('11 12 13 14 15 21 22 23 24 24 25 31 32 33 34 35 41 42 43 44 45 51 52 53 54 55')).toBe('ABCDEFGHIIKLMNOPQRSTUVWXYZ')
  })
  test('default with illegal character', () => {
    expect(() => { polybius.decode('*') }).toThrowError('Unknown character *')
    expect(() => { polybius.decode('88') }).toThrowError('Unknown character 88')
  })

  test('with custom key', () => {
    expect(polybius.decode('13 14 15 21 22 23 24 12 25 25 31 32 33 34 11 35 41 42 43 44 45 51 52 53 54 55', { key: 'OHA' }))
      .toBe('ABCDEFGHIIKLMNOPQRSTUVWXYZ')
    expect(polybius.decode('13 14 15 21 22 23 24 12 25 25 31 32 33 34 11 35 41 42 43 44 45 51 52 53 54 55', { key: 'oHa' }))
      .toBe('ABCDEFGHIIKLMNOPQRSTUVWXYZ')
  })

  test('with numbers', () => {
    expect(polybius.decode('11 12 13 14 15 16 21 22 23 24 25 26 31 32 33 34 35 36 41 42 43 44 45 46 51 52 53 54 55 56 61 62 63 64 65 66', { withNumbers: true }))
      .toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
  })

  test('with numbers and custom key', () => {
    expect(polybius.decode('13 14 15 16 21 22 23 12 24 25 26 31 32 33 11 34 35 36 41 42 43 44 45 46 51 52 53 54 55' +
      ' 56 61 62 63 64 65 66', { withNumbers: true, key: 'oHa' }))
      .toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
  })

  test('with custom substitution', () => {
    expect(polybius.decode('11 12 13 14 15 21 22 23 24 25 31 32 33 34 35 41 42 43 44 45 51 51 52 53 54 55', { equalLetters: 'UV' }))
      .toBe('ABCDEFGHIJKLMNOPQRSTUUWXYZ')
    expect(polybius.decode('11 12 13 14 15 21 22 23 24 25 31 32 33 34 35 41 42 43 44 45 51 51 52 53 54 55', { equalLetters: 'VU' }))
      .toBe('ABCDEFGHIJKLMNOPQRSTVVWXYZ')
  })

  test('omit illegal character', () => {
    expect(polybius.decode('33 *', { failOnUnknownCharacter: false })).toBe('N')
  })

  test('preserve illegal character', () => {
    expect(polybius.decode('33 *', { failOnUnknownCharacter: false, omitUnknownCharacter: false })).toBe('N*')
  })
})

import bifid from 'bifid'

describe('encoding', () => {
  test('default', () => {
    expect(bifid.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toBe('AABGGHNNTTUZZBOVHTVHUBOVHU')
    expect(bifid.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase())).toBe('AABGGHNNTTUZZBOVHTVHUBOVHU')
  })
  test('default with illegal character', () => {
    expect(() => { bifid.encode('*') }).toThrowError('Unknown character *')
  })

  test('with custom key', () => {
    expect(bifid.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ', { key: 'OHA' }))
      .toBe('OHEDEMMATTUZZNVFRZHNCHNVFU')
    expect(bifid.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ', { key: 'oHa' }))
      .toBe('OHEDEMMATTUZZNVFRZHNCHNVFU')
  })

  test('with numbers', () => {
    expect(bifid.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', { withNumbers: true }))
      .toBe('AAAHHHOOOVVV222999BP3BP3BP3BP3BP3BP3')
  })

  test('with numbers and custom key', () => {
    expect(bifid.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', { withNumbers: true, key: 'oHa' }))
      .toBe('OOFEFGNANVVV222999P3HMW4GB3HP3HP3HP3')
  })

  test('with custom substitution', () => {
    expect(bifid.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ', { equalLetters: 'UV' }))
      .toBe('AABGGMMNSSZZZBNUHTBNUHTAHT')
  })
})

describe('decoding', () => {
  test('default', () => {
    expect(bifid.decode('AABGGHNNTTUZZBOVHTVHUBOVHU')).toBe('ABCDEFGHIIKLMNOPQRSTUVWXYZ')
  })
  test('default with illegal character', () => {
    expect(() => { bifid.decode('*') }).toThrowError('Unknown character *')
    expect(() => { bifid.decode('88') }).toThrowError('Unknown character 8')
  })

  test('with custom key', () => {
    expect(bifid.decode('OHEDEMMATTUZZNVFRZHNCHNVFU', { key: 'OHA' })).toBe('ABCDEFGHIIKLMNOPQRSTUVWXYZ')
    expect(bifid.decode('OHEDEMMATTUZZNVFRZHNCHNVFU', { key: 'oHa' })).toBe('ABCDEFGHIIKLMNOPQRSTUVWXYZ')
  })

  test('with numbers', () => {
    expect(bifid.decode('AAAHHHOOOVVV222999BP3BP3BP3BP3BP3BP3', { withNumbers: true }))
      .toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
  })

  test('with numbers and custom key', () => {
    expect(bifid.decode('OOFEFGNANVVV222999P3HMW4GB3HP3HP3HP3', { withNumbers: true, key: 'oHa' }))
      .toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
  })

  test('with custom substitution', () => {
    expect(bifid.decode('AABGGMMNSSZZZBNUHTBNUHTAHT', { equalLetters: 'UV' }))
      .toBe('ABCDEFGHIJKLMNOPQRSTUUWXYZ')
    expect(bifid.decode('AABGGMMNSSZZZBNUHTBNUHTAHT', { equalLetters: 'VU' }))
      .toBe('ABCDEFGHIJKLMNOPQRSTVVWXYZ')
  })
})

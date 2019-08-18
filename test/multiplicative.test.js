import multiplicative from 'multiplicative'

describe('encoding', () => {
  test('default', () => {
    expect(multiplicative.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toBe('ADGJMPSVYBEHKNQTWZCFILORUX')
    expect(multiplicative.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase())).toBe('ADGJMPSVYBEHKNQTWZCFILORUX'.toLowerCase())
  })
  test('with unknown character', () => {
    expect(multiplicative.encode('AB/')).toBe('AD/')
  })
  test('failing with unknown character', () => {
    expect(() => { multiplicative.encode('AB/', { failOnUnknownCharacter: true }) }).toThrow('Could not multiply character')
  })
  test('omitting unknown character', () => {
    expect(multiplicative.encode('AB/', { omitUnknownCharacter: true })).toBe('AD')
  })
  test('other key', () => {
    expect(multiplicative.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ', { key: 25 })).toBe('AZYXWVUTSRQPONMLKJIHGFEDCB')
    expect(multiplicative.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase(), { key: 25 })).toBe('AZYXWVUTSRQPONMLKJIHGFEDCB'.toLowerCase())
  })
  test('illegal key', () => {
    expect(() => { multiplicative.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ', { key: 1 }) }).toThrow('Illegal key')
  })
})

describe('decoding', () => {
  test('default', () => {
    expect(multiplicative.decode('ADGJMPSVYBEHKNQTWZCFILORUX')).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    expect(multiplicative.decode('ADGJMPSVYBEHKNQTWZCFILORUX'.toLowerCase())).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase())
  })
  test('with unknown character', () => {
    expect(multiplicative.decode('AD/')).toBe('AB/')
  })
  test('failing with unknown character', () => {
    expect(() => { multiplicative.decode('AD/', { failOnUnknownCharacter: true }) })
      .toThrow('Could not multiply character')
  })
  test('omitting unknown character', () => {
    expect(multiplicative.decode('AD/', { omitUnknownCharacter: true })).toBe('AB')
  })
  test('other key', () => {
    expect(multiplicative.decode('AZYXWVUTSRQPONMLKJIHGFEDCB', { key: 25 })).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    expect(multiplicative.decode('AZYXWVUTSRQPONMLKJIHGFEDCB'.toLowerCase(), { key: 25 })).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase())
  })
  test('illegal key', () => {
    expect(() => { multiplicative.decode('ADGJMPSVYBEHKNQTWZCFILORUX', { key: 1 }) }).toThrow('Illegal key')
  })
})

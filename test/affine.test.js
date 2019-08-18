import affine from 'affine'

describe('encoding', () => {
  test('default', () => {
    expect(affine.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toBe('BEHKNQTWZCFILORUXADGJMPSVY')
  })
  test('lowercase', () => {
    expect(affine.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase())).toBe('BEHKNQTWZCFILORUXADGJMPSVY'.toLowerCase())
  })
  test('with unknown character', () => {
    expect(affine.encode('AB/')).toBe('BE/')
  })
  test('failing with unknown character', () => {
    expect(() => { affine.encode('AB/', { failOnUnknownCharacter: true }) })
      .toThrow('Could not transform character')
  })
  test('omitting unknown character', () => {
    expect(affine.encode('AB/', { omitUnknownCharacter: true })).toBe('BE')
  })
  test('different keys', () => {
    expect(affine.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ', { keys: [25, 3] })).toBe('DCBAZYXWVUTSRQPONMLKJIHGFE')
  })
  test('different keys lowercase', () => {
    expect(affine.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase(), { keys: [25, 3] })).toBe('DCBAZYXWVUTSRQPONMLKJIHGFE'.toLowerCase())
  })
  test('illegal key', () => {
    expect(() => { affine.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ', { keys: [1, 1] }) }).toThrow('Illegal key')
  })
})

describe('decoding', () => {
  test('default without side effects', () => {
    expect(affine.decode('BEHKNQTWZCFILORUXADGJMPSVY')).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
  })
  test('lowercase', () => {
    expect(affine.decode('BEHKNQTWZCFILORUXADGJMPSVY'.toLowerCase())).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase())
  })
  test('with unknown character', () => {
    expect(affine.decode('BE/')).toBe('AB/')
  })
  test('failing with unknown character', () => {
    expect(() => { affine.decode('BE/', { failOnUnknownCharacter: true }) })
      .toThrow('Could not transform character')
  })
  test('omitting unknown character', () => {
    expect(affine.decode('BE/', { omitUnknownCharacter: true })).toBe('AB')
  })
  test('different keys', () => {
    expect(affine.decode('DCBAZYXWVUTSRQPONMLKJIHGFE', { keys: [25, 3] })).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
  })
  test('different keys lowercase', () => {
    expect(affine.decode('DCBAZYXWVUTSRQPONMLKJIHGFE'.toLowerCase(), { keys: [25, 3] })).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase())
  })
  test('illegal key', () => {
    expect(() => { affine.decode('DCBAZYXWVUTSRQPONMLKJIHGFE', { keys: [1, 1] }) }).toThrow('Illegal key')
  })
})

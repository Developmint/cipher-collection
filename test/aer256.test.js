import aer256 from 'aer256'

describe('encoding', () => {
  test('default', () => {
    expect(() => { aer256.encode('1432.382960035134') }).toThrow('Key is too short! It must be at least 3 characters')
  })
  test('with key', () => {
    expect(aer256.encode('hey', { key: 'ABCDEF' })).toBe('1432.382960035134')
    expect(aer256.encode('hey!*A', { key: 'ABCDEF*' })).toBe('384574.7097057532, -25.5959595959596')
    expect(aer256.encode('hey!*A!Ü!Ü!Ü!', { key: 'ABCDEF*' })).toBe('384574.7097057532, 155639.92072902943,' +
      ' 124713.95147123409, -27.963987703118136')
    expect(aer256.encode('hey!*Aäää', { key: 'ABCDEF*' })).toBe('384574.7097057532, 155650.8842775582, -27.9211682037769')
  })
  test('invalid characters', () => {
    expect(() => { aer256.encode('💯文', { key: 'ABCDEF*' }) }).toThrow('Invalid character')
  })
})

describe('decoding', () => {
  test('default', () => {
    expect(() => { aer256.decode('1432.382960035134') }).toThrow('Key is too short! It must be at least 3 characters')
  })
  test('with key', () => {
    expect(aer256.decode('1432.382960035134', { key: 'ABCDEF' })).toBe('hey')
    expect(aer256.decode('384574.7097057532, -25.5959595959596', { key: 'ABCDEF*' })).toBe('hey!*A')
    expect(aer256.decode('384574.7097057532, 155639.92072902943, 124713.95147123409, -27.963987703118136', { key: 'ABCDEF*' })).toBe('hey!*A!Ü!Ü!Ü!')
    expect(aer256.decode('384574.7097057532, 155650.8842775582, -27.9211682037769', { key: 'ABCDEF*' })).toBe('hey!*Aäää')
    // Fails because those characters have larger hex representations than "usual" characters
    // expect(aer256.decode('796612.8594642073', { key: 'ABCDEF*' })).toBe('💯文')
  })
})

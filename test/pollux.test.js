import pollux from 'pollux'
import morse from '../src/morse'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 .,:;?-_()\'=+/@'

const keys = {
  space: ' ',
  short: '.',
  long: '-',
  separator: '/'
}

const defineKeyError = 'Please define your keys: space, short, long, separator'

describe('decoding', () => {
  test('default', () => {
    expect(pollux.decode(morse.encode(alphabet), keys)).toBe(alphabet)
  })

  test('multiple key characters', () => {
    const keys = {
      space: 'AB', short: 'CD', long: 'EF', 'separator': 'GH'
    }
    expect(pollux.decode('CCCCADBCEDCBCFDDBEFE', keys)).toBe('HELLO')
    expect(pollux.decode(`${keys.short[0]}${keys.space[0]}${keys.long[1]}`, keys)).toBe('ET')
    expect(pollux.decode(`${keys.short[1]}${keys.space[0]}${keys.separator[0]}${keys.space[1]}${keys.long[1]}`, keys)).toBe('E T')
  })

  test('with custom MorseConfig', () => {
    const morseConfig = { failOnUnknownCharacter: false }
    expect(pollux.decode(morse.encode(alphabet, morseConfig), keys, morseConfig)).toBe(alphabet)
    expect(() => { pollux.decode('€€', keys, morseConfig) }).toThrowError('Unknown key €')
  })

  test('€', () => {
    const morseConfig = { failOnUnknownCharacter: false }
    expect(() => { pollux.decode('€€', keys, morseConfig) }).toThrowError('Unknown key €')
  })

  test('no keys', () => {
    expect(() => { pollux.decode('') }).toThrowError('You have no keys set')

    expect(() => { pollux.decode('', { space: ' ' }) }).toThrowError(defineKeyError)
    expect(() => { pollux.decode('', { space: ' ', short: '.' }) }).toThrowError(defineKeyError)
    expect(() => { pollux.decode('', { space: ' ', short: '.', long: '-' }) }).toThrowError(defineKeyError)
  })
})

describe('encoding', () => {
  test('default', () => {
    expect(pollux.encode(alphabet, keys)).toBe(morse.encode(alphabet))
  })

  test('multiple key characters', () => {
    const keys = {
      space: 'AB', short: 'CD', long: 'EF', separator: 'GH'
    }
    expect(pollux.encode('e', keys)).toMatch(new RegExp(`[${keys.short}]`))
    expect(pollux.encode('ET', keys)).toMatch(new RegExp(`[${keys.short}][${keys.space}][${keys.long}]`))
    expect(pollux.encode('E T', keys)).toMatch(new RegExp(`[${keys.short}][${keys.space}][${keys.separator}][${keys.space}][${keys.long}]`))
  })

  test('with custom MorseConfig', () => {
    const morseConfig = { failOnUnknownCharacter: false }
    expect(pollux.encode(alphabet, keys, morseConfig)).toBe(morse.encode(alphabet, morseConfig))
    expect(() => { pollux.encode('€€', keys, morseConfig) }).toThrowError('Unknown key €')
  })

  test('no keys', () => {
    expect(() => { pollux.encode('') }).toThrowError('You have no keys set')

    expect(() => { pollux.encode('', { space: ' ' }) }).toThrowError(defineKeyError)
    expect(() => { pollux.encode('', { space: ' ', short: '.', long: '-' }) }).toThrowError(defineKeyError)
  })
})

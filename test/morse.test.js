import morse from 'morse'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 .,:;?-_()\'=+/@'
const encodedAlphabet = '.- -... -.-. -.. . ..-. --. .... .. .--- -.- .-.. -- -. --- .--. --.- .-. ... - ..- ...- .--' +
  ' -..- -.-- --.. .---- ..--- ...-- ....- ..... -.... --... ---.. ----. ----- / .-.-.- --..-- ---... -.-.-.' +
  ' ..--.. -....- ..--.- -.--. -.--.- .----. -...- .-.-. -..-. .--.-.'
const invalidCharacter = {
  input: '€S',
  preserve: '€...',
  ommit: '...'
}
const invalidMorseCharacter = {
  input: '.-.-.-.-.-.- ...',
  preserve: '.-.-.-.-.-.-S',
  ommit: 'S'
}

describe('decoding', () => {
  test('decoding the alphabet', () => {
    expect(morse.decode(encodedAlphabet)).toBe(alphabet)
  })

  test('decoding with alternative delimiter', () => {
    expect(morse.decode('..._---_...', {
      separator: '_'
    })).toBe('SOS')
  })

  test('decoding invalid character', () => {
    expect(() => { morse.decode(invalidMorseCharacter.input) }).toThrowError('Undecodable character')
    expect(morse.decode(invalidMorseCharacter.input, {
      failOnUnknownCharacter: false
    })).toBe(invalidMorseCharacter.preserve)
    expect(morse.decode(invalidMorseCharacter.input, {
      failOnUnknownCharacter: false,
      ommitUnknownCharacter: true
    })).toBe(invalidMorseCharacter.ommit)
  })
})
describe('encoding', () => {
  test('encoding the alphabet', () => {
    expect(morse.encode(alphabet)).toBe(encodedAlphabet)
  })
  test('encoding invalid character', () => {
    expect(() => { morse.encode(invalidCharacter.input) }).toThrowError('Unencodable character')
    expect(morse.encode(invalidCharacter.input, {
      separator: '',
      failOnUnknownCharacter: false
    })).toBe(invalidCharacter.preserve)
    expect(morse.encode(invalidCharacter.input, {
      separator: '',
      failOnUnknownCharacter: false,
      ommitUnknownCharacter: true
    })).toBe(invalidCharacter.ommit)
  })
})

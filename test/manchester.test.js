import manchester from 'manchester'

const silentFailOptions = {
  failOnUnknownCharacter: false
}

const invertedOptions = {
  inverted: true
}

describe('encoding', () => {
  test('default', () => {
    expect(manchester.encode('0')).toBe('01')
    expect(manchester.encode('01')).toBe('0110')
    expect(manchester.encode('010')).toBe('011001')
    expect(manchester.encode('0010110101000101')).toBe('01011001101001100110010101100110')
  })

  test('inverted', () => {
    expect(manchester.encode('0', invertedOptions)).toBe('10')
    expect(manchester.encode('01', invertedOptions)).toBe('1001')
    expect(manchester.encode('010', invertedOptions)).toBe('100110')
    expect(manchester.encode('0010110101000101', invertedOptions)).toBe('10100110010110011001101010011001')
  })

  test('empty', () => {
    expect(manchester.encode('', silentFailOptions)).toBe('')
    expect(() => { manchester.encode('') }).toThrow('Invalid Input after splitting')
  })

  test('invalid', () => {
    expect(manchester.encode('A', silentFailOptions)).toBe('')
    expect(manchester.encode('€', silentFailOptions)).toBe('')
    expect(manchester.encode('€0', silentFailOptions)).toBe('01')

    expect(() => { manchester.encode('A') }).toThrow('Invalid Input')
    expect(() => { manchester.encode('€') }).toThrow('Invalid Input')
  })
})

describe('decoding', () => {
  test('default', () => {
    expect(manchester.decode('01')).toBe('0')
    expect(manchester.decode('0110')).toBe('01')
    expect(manchester.decode('011001')).toBe('010')
    expect(manchester.decode('01011001101001100110010101100110')).toBe('0010110101000101')
  })

  test('inverted', () => {
    expect(manchester.decode('10', invertedOptions)).toBe('0')
    expect(manchester.decode('1001', invertedOptions)).toBe('01')
    expect(manchester.decode('100110', invertedOptions)).toBe('010')
    expect(manchester.decode('10100110010110011001101010011001', invertedOptions)).toBe('0010110101000101')
  })

  test('empty', () => {
    expect(manchester.decode('', silentFailOptions)).toBe('')
    expect(() => { manchester.decode('') }).toThrow('Invalid Input after splitting')
  })

  test('invalid', () => {
    expect(manchester.decode('0', silentFailOptions)).toBe('')
    expect(manchester.decode('A', silentFailOptions)).toBe('')
    expect(manchester.decode('€', silentFailOptions)).toBe('')
    expect(manchester.decode('€01', silentFailOptions)).toBe('0')

    expect(() => { manchester.decode('0') }).toThrow('Invalid Input')
    expect(() => { manchester.decode('A') }).toThrow('Invalid Input')
    expect(() => { manchester.decode('€') }).toThrow('Invalid Input')
  })
})

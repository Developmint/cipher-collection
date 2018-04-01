import dtmf from 'dtmf'

const alphabet = '123A456B789D*0#D'
const encodedAlphabet = {
  include: '697+1209 697+1336 697+1477 697+1633 770+1209 770+1336 770+1477 770+1633 852+1209 852+1336 852+1477' +
  ' 941+1633 941+1209 941+1336 941+1477 941+1633',
  includeInverted: '1209+697 1336+697 1477+697 1633+697 1209+770 1336+770 1477+770 1633+770 1209+852 1336+852' +
  ' 1477+852 1633+941 1209+941 1336+941 1477+941 1633+941',
  sum: '1906 2033 2174 2330 1979 2106 2247 2403 2061 2188 2329 2574 2150 2277 2418 2574',
  diff: '512 639 780 936 439 566 707 863 357 484 625 692 268 395 536 692'
}

describe('encoding', () => {
  test('default', () => {
    expect(dtmf.encode(alphabet)).toBe(encodedAlphabet.include)
    expect(dtmf.encode(alphabet, { mode: 'sum' })).toBe(encodedAlphabet.sum)
    expect(dtmf.encode(alphabet, { mode: 'diff' })).toBe(encodedAlphabet.diff)
  })

  test('invertedOutput', () => {
    expect(dtmf.encode(alphabet, { invertedOutput: true })).toBe(encodedAlphabet.includeInverted)
    expect(dtmf.encode(alphabet, { mode: 'sum', invertedOutput: true })).toBe(encodedAlphabet.sum)
    expect(dtmf.encode(alphabet, { mode: 'diff', invertedOutput: true })).toBe(encodedAlphabet.diff)
  })

  test('custom connector', () => {
    expect(dtmf.encode(alphabet, { connector: '#' })).toBe(encodedAlphabet.include.replace(/\+/g, '#'))
    expect(dtmf.encode(alphabet, { mode: 'sum', connector: '#' })).toBe(encodedAlphabet.sum)
    expect(dtmf.encode(alphabet, { mode: 'diff', connector: '#' })).toBe(encodedAlphabet.diff)
  })

  test('custom separator', () => {
    expect(dtmf.encode(alphabet, { separator: '#' })).toBe(encodedAlphabet.include.replace(/ /g, '#'))
    expect(dtmf.encode(alphabet, { mode: 'sum', separator: '#' })).toBe(encodedAlphabet.sum.replace(/ /g, '#'))
    expect(dtmf.encode(alphabet, { mode: 'diff', separator: '#' })).toBe(encodedAlphabet.diff.replace(/ /g, '#'))
  })

  test('unknown mode', () => {
    expect(() => { dtmf.encode(alphabet, { mode: 'UH' }) }).toThrowError('Unknown mode')
  })

  test('invalid input', () => {
    expect(() => { dtmf.encode('Y') }).toThrowError('Invalid input')
  })

  test('invalid input with silentFail', () => {
    expect(dtmf.encode('Y', { failOnUnknownCharacter: false })).toBe('')
  })
})

describe('decoding', () => {
  test('default', () => {
    expect(dtmf.decode(encodedAlphabet.include)).toBe(alphabet)
    expect(dtmf.decode(encodedAlphabet.sum, { mode: 'sum' })).toBe(alphabet)
    expect(dtmf.decode(encodedAlphabet.diff, { mode: 'diff' })).toBe(alphabet)
  })

  test('invertedOutput', () => {
    expect(dtmf.decode(encodedAlphabet.includeInverted, { invertedOutput: true })).toBe(alphabet)
    expect(dtmf.decode(encodedAlphabet.sum, { mode: 'sum', invertedOutput: true })).toBe(alphabet)
    expect(dtmf.decode(encodedAlphabet.diff, { mode: 'diff', invertedOutput: true })).toBe(alphabet)
  })

  test('custom connector', () => {
    expect(dtmf.decode(encodedAlphabet.include.replace(/\+/g, '#'), { connector: '#' })).toBe(alphabet)
    expect(dtmf.decode(encodedAlphabet.sum, { mode: 'sum', connector: '#' })).toBe(alphabet)
    expect(dtmf.decode(encodedAlphabet.diff, { mode: 'diff', connector: '#' })).toBe(alphabet)
  })

  test('custom separator', () => {
    expect(dtmf.decode(encodedAlphabet.include.replace(/ /g, '#'), { separator: '#' })).toBe(alphabet)
    expect(dtmf.decode(encodedAlphabet.sum.replace(/ /g, '#'), { mode: 'sum', separator: '#' })).toBe(alphabet)
    expect(dtmf.decode(encodedAlphabet.diff.replace(/ /g, '#'), { mode: 'diff', separator: '#' })).toBe(alphabet)
  })

  test('unknown mode', () => {
    expect(() => { dtmf.decode(alphabet, { mode: 'UH' }) }).toThrowError('Unknown mode')
  })

  test('invalid input', () => {
    expect(() => { dtmf.decode('a') }).toThrowError('Could not decode a - No row found')
    expect(() => { dtmf.decode('697') }).toThrowError('Could not decode 697 - No cell found')
    expect(() => { dtmf.decode('a', { mode: 'sum' }) }).toThrowError('Could not decode a - No matching value')
  })

  test('invalid input with silent fail', () => {
    expect(dtmf.decode('a', { failOnUnknownCharacter: false })).toBe('')
    expect(dtmf.decode('697', { failOnUnknownCharacter: false })).toBe('')
    expect(dtmf.decode('a', { mode: 'sum', failOnUnknownCharacter: false })).toBe('')
  })
})

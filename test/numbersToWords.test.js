import { decode, encode } from 'numbersToWords'

const resultPairs = [
  [1.234562343, 'one point two three four five six two three four three'],
  [1, 'one']
]

describe('encoding', () => {
  test('default', () => {
    resultPairs.forEach(([input, output]) => {
      expect(encode(input)).toBe(output)
    })
  })
})

describe('decoding', () => {
  test('default', () => {
    resultPairs.forEach(([output, input]) => {
      expect(decode(input)).toBe(output)
    })
  })
})

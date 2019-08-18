import { decode, encode } from 'numbersToWords'

const resultPairs = [
  [1.2345678901, 'one point two three four five six seven eight nine zero one'],
  [1, 'one'],
  [3.012001, 'three point zero one two zero zero one'],
  [0, 'zero']
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

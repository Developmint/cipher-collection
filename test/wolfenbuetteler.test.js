import wolfenbuetteler from 'wolfenbuetteler'

const example = {
  cleartext: 'EXAMPLE✓',
  ciphertext: 'KXMAPLK✓'
}
const exampleMixed = {
  cleartext: 'ExamPLE✓',
  ciphertext: 'KxmaPLK✓'
}

const onlyUppercaseOutput = {
  cleartext: 'ExmaPLE✓',
  ciphertext: 'KxamPLK✓'
}

const onlyUppercase = { onlyUpperCase: true }

describe('encoding', () => {
  test('default', () => {
    expect(wolfenbuetteler(example.cleartext)).toBe(example.ciphertext)
    expect(wolfenbuetteler(exampleMixed.cleartext)).toBe(exampleMixed.ciphertext)
  })

  test('only uppercase', () => {
    expect(wolfenbuetteler(example.cleartext, onlyUppercase)).toBe(example.ciphertext)
    expect(wolfenbuetteler(exampleMixed.cleartext, onlyUppercase)).toBe(onlyUppercaseOutput.ciphertext)
  })
})

describe('decoding', () => {
  test('default', () => {
    expect(wolfenbuetteler(example.ciphertext)).toBe(example.cleartext)
    expect(wolfenbuetteler(exampleMixed.ciphertext)).toBe(exampleMixed.cleartext)
  })

  test('only uppercase', () => {
    expect(wolfenbuetteler(example.ciphertext, onlyUppercase)).toBe(example.cleartext)
    expect(wolfenbuetteler(exampleMixed.ciphertext, onlyUppercase)).toBe(onlyUppercaseOutput.cleartext)
  })
})

import code from 'code'

describe('encoding', () => {
  test('default', () => {
    expect(code.encode('')).toBe('')
  })
})

describe('decoding', () => {
  test('default', () => {
    expect(code.decode('')).toBe('')
  })
})

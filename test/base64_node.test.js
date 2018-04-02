/**
 * @jest-environment node
 */

import base64 from 'base64'

describe('encoding', () => {
  test('default', () => {
    expect(base64.encode('1')).toBe('MQ==')
    expect(base64.encode('✓')).toBe('4pyT')
  })
})

describe('decoding', () => {
  test('default', () => {
    expect(base64.decode('MQ==')).toBe('1')
    expect(base64.decode('4pyT')).toBe('✓')
  })
})

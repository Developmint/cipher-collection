import armon64 from 'armon64'

describe('encoding', () => {
  test('default', () => {
    expect(() => { armon64.encode('1007.3509783549783') }).toThrow('Key is too short! It must be at least 3 characters')
  })
  test('with key', () => {
    expect(armon64.encode('hey', { key: 'ABCDEF' })).toBe('1007.3509783549783')
    expect(armon64.encode('hey!*A', { key: 'ABCDEF*' })).toBe('257752.02713419913+-40.0634632034632')
    expect(armon64.encode('hey!*A!Ü!Ü!Ü!', { key: 'ABCDEF*' })).toBe('257752.02713419913+104300.3085800866+83571.0731861472+-41.65071861471861')
  })
})

describe('decoding', () => {
  test('default', () => {
    expect(() => { armon64.decode('1432.382960035134') }).toThrow('Key is too short! It must be at least 3 characters')
  })
  test('with key', () => {
    expect(armon64.decode('1007.3509783549783', { key: 'ABCDEF' })).toBe('hey')
    expect(armon64.decode('257752.02713419913+-40.0634632034632', { key: 'ABCDEF*' })).toBe('hey!*A')
    expect(armon64.decode('257752.02713419913+104300.3085800866+83571.0731861472+-41.65071861471861', { key: 'ABCDEF*' })).toBe('hey!*A!Ü!Ü!Ü!')
  })
})

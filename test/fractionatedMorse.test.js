import fractionatedMorse from 'fractionatedMorse'

const alphabetOptions = {
  keyAlphabet: 'BCADEFGHIJKLMNOPQRSTUVWXYZ'
}

const silentFailOptions = {
  failOnUnknownCharacter: false
}

describe('encoding', () => {
  test('default', () => {
    expect(fractionatedMorse.encode('ZZZZ')).toBe('MHJWCMI')
    expect(fractionatedMorse.encode('Hello World')).toBe('AGTCDHOTQODTCJ')
    expect(fractionatedMorse.encode('OKAY LETS TRY SOMETHING WEIRD')).toBe('NVPQEYJUPCXDVOSHOOHSCCLMYOGGLJ')
    expect(fractionatedMorse.encode('A')).toBe('F')
    expect(fractionatedMorse.encode('D')).toBe('J')
    expect(fractionatedMorse.encode('E')).toBe('I')
    expect(fractionatedMorse.encode('1234567890.,:;?-_()\'=+/@')).toBe('EOBOAOAFACJCMCNCNLNODKWBQMCKDSMHAFBKVMVMPNLJFDLJLED')
    expect(fractionatedMorse.encode('A D E F')).toBe('FVIIBI')

    expect(() => { fractionatedMorse.encode('€€€') }).toThrowError('Unencodable character')
    expect(() => { fractionatedMorse.encode('Ü') }).toThrowError('Unencodable character')
    expect(() => { fractionatedMorse.encode('A  A') }).toThrowError('Unencodable character')
  })

  test('with different keyAlphabet', () => {
    expect(fractionatedMorse.encode('AI', alphabetOptions)).toBe('FA')
    expect(fractionatedMorse.encode('HELLO WORLD', alphabetOptions)).toBe('BGTADHOTQODTAJ')
  })
  test('with silent fail', () => {
    expect(fractionatedMorse.encode('€€€A', silentFailOptions)).toBe('F')
    expect(fractionatedMorse.encode('€€€Hello World', silentFailOptions)).toBe('AGTCDHOTQODTCJ')
  })
})

describe('decoding', () => {
  test('default', () => {
    expect(fractionatedMorse.decode('F')).toBe('A')
    expect(fractionatedMorse.decode('J')).toBe('D')
    expect(fractionatedMorse.decode('I')).toBe('E')
    expect(fractionatedMorse.decode('AGTCDHOTQODTCJ')).toBe('HELLO WORLD')
    expect(fractionatedMorse.decode('EOBOAOAFACJCMCNCNLNODKWBQMCKDSMHAFBKVMVMPNLJFDLJLED')).toBe('1234567890.,:;?-_()\'=+/@')
    expect(fractionatedMorse.decode('FT')).toBe('A A')
    expect(fractionatedMorse.decode('FVIIBI')).toBe('A D E F')
    expect(() => { fractionatedMorse.decode('ÜÄÖ') }).toThrowError('Undecodable character')
  })

  test('with different keyAlphabet', () => {
    expect(fractionatedMorse.decode('FA', alphabetOptions)).toBe('AI')
    expect(fractionatedMorse.decode('BGTADHOTQODTAJ', alphabetOptions)).toBe('HELLO WORLD')
  })

  test('with silent fail', () => {
    expect(fractionatedMorse.decode('€€€F', silentFailOptions)).toBe('A')
  })
})

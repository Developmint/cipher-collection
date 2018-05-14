import polybius from './polybius'

const encode = (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }
  const polybiusNumbers = polybius.encode(input, options).replace(/ /g, '')

  const polybiusNumbersByEvenOdd = Object.values([...polybiusNumbers].reduce((evenOddObj, char, index) => {
    evenOddObj[isEvenOrOdd(index)] += char
    return evenOddObj
  }, { even: '', odd: '' })).join('')

  const separatedPolybiusNumber = polybiusNumbersByEvenOdd.match(/\d{2}/g).join(' ')

  return polybius.decode(separatedPolybiusNumber, options)
}

const decode = (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }
  const polybiusNumbers = polybius.encode(input, options).replace(/ /g, '')
  const numberMiddle = polybiusNumbers.length / 2
  const splitNumbers = [polybiusNumbers.substr(0, numberMiddle), polybiusNumbers.substr(numberMiddle)]

  const zippedString = Array.from(new Array(numberMiddle)).map((_, i) => splitNumbers[0][i] + splitNumbers[1][i]).join('')

  const separatedPolybiusNumber = zippedString.match(/\d{2}/g).join(' ')

  return polybius.decode(separatedPolybiusNumber, options)
}

const isEvenOrOdd = i => i % 2 === 0 ? 'even' : 'odd'

const DEFAULT_OPTIONS = {
  key: '',
  equalLetters: 'IJ',
  withNumbers: false
}

export default {
  encode,
  decode
}

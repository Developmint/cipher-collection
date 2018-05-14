const encode = (input, options) => {
  if (options.key.length < 3) {
    throw Error('Key is too short! It must be at least 3 characters')
  }

  const hexKey = [...options.key].map(toHexCharCodeConcatenationNumber)

  const chunkedString = input.match(new RegExp(`.{1,${Math.round(options.key.length / 2)}}`, 'g'))

  const keyLengthRange = Array.from(new Array(options.key.length), (v, i) => i)

  return chunkedString.map(s =>
    keyLengthRange.reduce((acc, i) => {
      const OPERATION_LOOKUP = [
        (v, k) => v + k,
        (v, k) => v / k,
        (v, k) => v - k,
        (v, k) => v * (0.01 * k)
      ]

      const modifier = i % (options.isAer256 ? 3 : 4)

      return OPERATION_LOOKUP[modifier](acc, hexKey[i])
    }, toHexCharCodeConcatenationNumber(s))
  ).join(options.isAer256 ? ', ' : '+')
}

const decode = (input, options) => {
  if (options.key.length < 3) {
    throw Error('Key is too short! It must be at least 3 characters')
  }

  const hexKey = [...options.key].map(toHexCharCodeConcatenationNumber)

  const keyLengthRangeReversed = Array.from(new Array(options.key.length), (v, i) => i).reverse()

  return input.split(options.isAer256 ? ', ' : '+').map(s => {
    // Reverse arithmetic from encoding based on parsed float from string
    const float = keyLengthRangeReversed.reduce((acc, i) => {
      const OPERATION_LOOKUP = [
        (v, k) => v - k,
        (v, k) => v * k,
        (v, k) => v + k,
        (v, k) => v / (0.01 * k)
      ]

      const modifier = i % (options.isAer256 ? 3 : 4)

      return OPERATION_LOOKUP[modifier](acc, hexKey[i])
    }, parseFloat(s))

    // Round output and convert it to hex
    return Math.round(float).toString(16)
  })
    .join('')
    // Split up in hex groups of two again and unescape
    .match(/.{1,2}/g).map(s => String.fromCharCode(parseInt(s, 16))).join('')
}

/**
 * Map each character to hex representation of it's char code, join them together and then retrieve a decimal number
 * out of the concatenated hex string.
 */
const toHexCharCodeConcatenationNumber = c => parseInt([...c].map(x => {
  const hexCharCode = x.charCodeAt(0).toString(16)
  if (hexCharCode.length > 2) {
    throw Error('Invalid character')
  }
  return hexCharCode
}).join(''), 16)

export default {
  encode,
  decode
}

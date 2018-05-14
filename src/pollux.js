/* eslint-disable no-unused-vars */
import morse from './morse'
import { randomInRange } from './helpers'

export const decode = (input, keys = {}, morseOptions = {}) => {
  sanitizeKeys(keys)

  input = [...input].map(c => {
    const decodedCharacter = Object.entries(keys).find(([, v]) => v.includes(c))
    const morseCode = decodedCharacter ? propToKey(decodedCharacter[0]) : false

    if (!morseCode) {
      throw Error(`Unknown key ${c}`)
    }

    return morseCode
  }).join('')

  return [...morse.decode(input, morseOptions)].join('')
}

export const encode = (input, keys = {}, morseOptions = {}) => {
  sanitizeKeys(keys)

  return [...morse.encode(input.toUpperCase(), morseOptions)]
    .map(c => {
      const key = keyToProp(c)
      if (!key) {
        throw Error(`Unknown key ${c}`)
      }

      return [...keys[key]][randomInRange(0, keys[key].length)]
    })
    .join('')
}

const keyToProp = c => c === ' ' ? 'space' : c === '.' ? 'short' : c === '-' ? 'long' : c === '/' ? 'separator' : false

const propToKey = c => c === 'space' ? ' ' : c === 'short' ? '.' : c === 'long' ? '-' : '/'

const sanitizeKeys = keys => {
  if (!Object.keys(keys).length) {
    throw Error('You have no keys set')
  }

  const requiredKeys = ['space', 'short', 'long', 'separator']
  const existingKeys = Object.keys(keys)

  if (existingKeys.length !== requiredKeys.length || existingKeys.filter(key => !requiredKeys.includes(key)).length) {
    throw Error(`Please define your keys: ${requiredKeys.join(', ')}`)
  }
}

export default {
  decode,
  encode
}

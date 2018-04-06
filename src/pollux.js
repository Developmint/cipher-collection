/* eslint-disable no-unused-vars */
import morse from './morse'
import { randomInRange } from './helpers/index'

export const decode = (input, keys = {}, morseOptions = {}) => {
  sanitizeKeys(keys)

  input = [...input].map(c => {
    const decodedCharacter = Object.entries(keys).find(([k, v]) => v.includes(c))
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

  const existingKeys = ['space', 'short', 'long', 'separator']

  if (Object.keys(keys).length !== existingKeys.length || Object.keys(keys).filter(key => !existingKeys.includes(key)).length) {
    throw Error(`Please define your keys: ${existingKeys.join(', ')}`)
  }
}

export default {
  decode,
  encode
}

import base from './helpers/aerArmonBase'

const encode = (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }
  return base.encode(input, options)
}

const decode = (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }
  return base.decode(input, options)
}

const DEFAULT_OPTIONS = {
  key: '',
  failOnUnknownCharacter: true
}

export default {
  encode,
  decode
}

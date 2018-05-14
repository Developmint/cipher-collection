import aer256ArmonBase from './helpers/aerArmonBase'

const encode = (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options, isAer256: true }
  return aer256ArmonBase.encode(input, options)
}

const decode = (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options, isAer256: true }
  return aer256ArmonBase.decode(input, options)
}

const DEFAULT_OPTIONS = {
  key: '',
  failOnUnknownCharacter: true
}

export default {
  encode,
  decode
}

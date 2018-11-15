import { throwOrSilent } from './helpers'

const decode = (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }

  if (input.match(/[^01]/g)) {
    throwOrSilent(options, 'Invalid Input')
    input = [...input].filter(c => /[01]/.test(c)).join('')
  }

  if (input.length % 2) {
    return throwOrSilent(options, 'Invalid Input')
  }
  const splitUp = splitInput(input)

  if (!splitUp || !splitUp.length) {
    return throwOrSilent(options, 'Invalid Input after splitting')
  }

  const result = splitUp.map(xorWithClock).join('').split('').filter((_, k) => k % 2 === 0).join('')

  return options.inverted ? invertResult(result) : result
}

const encode = (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }

  if (input.match(/[^01]/g)) {
    throwOrSilent(options, 'Invalid Input')

    input = [...input].filter(c => '01'.includes(c)).join('')
  }

  // Map input to clock
  const doubledInput = [...input].map(c => `${c}${c}`).join('')

  const splitUp = splitInput(doubledInput)

  if (!splitUp || !splitUp.length) {
    return throwOrSilent(options, 'Invalid Input after splitting')
  }

  const result = splitUp.map(xorWithClock).join('')

  return options.inverted ? invertResult(result) : result
}

const xorWithClock = i => (Number.parseInt(i, 2) ^ getClock(i.length)).toString(2).padStart(i.length, '0')

const getClock = len => {
  const clock = '01'.repeat(len / 2)

  return Number.parseInt(clock, 2)
}

const invertResult = r => r.replace(/[01]/g, n => 1 - n)

const splitInput = i => i.match(/[01]{1,6}/g)

const DEFAULT_OPTIONS = {
  inverted: false,
  failOnUnknownCharacter: true
}

export default {
  decode,
  encode
}

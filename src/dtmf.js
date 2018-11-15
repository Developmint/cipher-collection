import { mergeObjects, throwOrSilent, toNumber } from './helpers'

const decode = (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }
  return input.split(options.separator).map(i => {
    const lookup = getLookup(options.mode)

    checkMode(options)

    if (options.mode === 'include') {
      const foundRow = Object.entries(lookup).find(includesKey(i))

      if (!foundRow) {
        return throwOrSilent(options, `Could not decode ${i} - No row found`)
      }

      const foundCell = Object.entries(foundRow[1]).find(includesKey(i))

      if (!foundCell) {
        return throwOrSilent(options, `Could not decode ${i} - No cell found`)
      }

      return foundCell[1]
    }

    if (lookup.hasOwnProperty(i)) {
      return lookup[i]
    }

    return throwOrSilent(options, `Could not decode ${i} - No matching value`)
  }).join('')
}

const includesKey = i => ([key]) => i.includes(key)

const getLookup = mode => mode === 'include' ? LOOKUP : getSumOrDiffLookup(mode)

const getSumOrDiffLookup = mode => {
  const getLookupObjectForMode = getLookupObject(mode)
  return Object.entries(LOOKUP)
    .map(([colFrequency, rowObject]) => Object.entries(rowObject)
      .reduce((acc, cellObject) => mergeObjects(acc, getLookupObjectForMode(colFrequency, cellObject)), {}))
    .reduce(mergeObjects, {})
}

const getLookupObject = mode => (colFrequency, [rowFrequency, character]) => {
  [rowFrequency, colFrequency] = toNumber(rowFrequency, colFrequency)

  const lookupKey = mode === MODES.sum ? rowFrequency + colFrequency : rowFrequency - colFrequency
  return { [lookupKey]: character }
}

const encode = (input, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }

  checkMode(options)

  const encodeResultWithOptions = encodeResult(options)

  return [...input].map(i => {
    const result = Object.entries(LOOKUP).map(([key, freqOb]) => {
      const foundFreq = Object.entries(freqOb).find(([, v]) => v === i)

      return foundFreq ? encodeResultWithOptions([key, foundFreq[0]]) : false
    }).find(Boolean)

    return !result ? throwOrSilent(options, 'Invalid input') : result
  }).join(options.separator)
}

const encodeResult = ({ mode, invertedOutput, connector }) => frequencies => {
  // If output should be inverted, reverse array (mutates array)
  if (invertedOutput) {
    frequencies.reverse()
  }

  frequencies = toNumber(...frequencies)

  const resultObjects = {
    include: `${frequencies[0]}${connector}${frequencies[1]}`,
    sum: `${frequencies[0] + frequencies[1]}`,
    diff: `${frequencies[0] > frequencies[1] ? frequencies[0] - frequencies[1] : frequencies[1] - frequencies[0]}`
  }

  return resultObjects[mode]
}

const checkMode = ({ mode }) => {
  if (!Object.values(MODES).includes(mode)) {
    throw new Error('Unknown mode')
  }
}

const MODES = { include: 'include', sum: 'sum', diff: 'diff' }

const DEFAULT_OPTIONS = {
  mode: 'include',
  connector: '+',
  separator: ' ',
  invertedOutput: false,
  failOnUnknownCharacter: true
}

const LOOKUP = {
  697: { 1209: '1', 1336: '2', 1477: '3', 1633: 'A' },
  770: { 1209: '4', 1336: '5', 1477: '6', 1633: 'B' },
  852: { 1209: '7', 1336: '8', 1477: '9', 1633: 'C' },
  941: { 1209: '*', 1336: '0', 1477: '#', 1633: 'D' }
}

export default {
  decode,
  encode
}

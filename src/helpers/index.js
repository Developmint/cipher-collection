// min <= x < max
export const randomInRange = (min, max) => {
  if (min > max) {
    throw Error('Min cannot be larger than max')
  }
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

export const throwOrSilent = (options, errorMessage) => {
  if (options.failOnUnknownCharacter) {
    throw Error(errorMessage)
  }
  return ''
}

export const isBrowser = (() => typeof window === 'object')()

/**
 * Calculates the modular inverse of an arbitrary input number and modulo
 * @param number The number the inverse should be calculated for
 * @param mod the modulo parameter
 * @returns {number|boolean} Either the corresponding mod inverse number, or false if it does not exist
 */
export const modInverse = (number, mod) => {
  if (number < 0 || mod < 2) {
    throw Error('Invalid input')
  }
  // Ensure that the number is in scope
  number = number % mod

  // Create an array of possible solutions (1 < x < mod)
  const rangeArray = Array.from(new Array(mod - 1), (x, i) => i + 1)

  // Now find the mod inverse number or return false. Mod inverse: (i * number = 1) % mod
  return (rangeArray.find(i => i * number % mod === 1) % mod) || false
}

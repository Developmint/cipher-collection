// min <= x < max
export const randomInRange = (min, max) => {
  if (min > max) {
    throw Error('Min cannot be larger than max')
  }
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

export const throwOrSilent = ({ failOnUnknownCharacter }, errorMessage) => {
  if (failOnUnknownCharacter) {
    throw Error(errorMessage)
  }
  return ''
}

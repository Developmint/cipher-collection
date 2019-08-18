// https://stackoverflow.com/a/30524915/3975480

const arr = x => Array.from(x)
const num = x => Number(x) || 0
const isEmpty = xs => xs.length === 0
const take = n => xs => xs.slice(0, n)
const drop = n => xs => xs.slice(n)
const reverse = xs => xs.slice(0).reverse()
const pipe = f => g => x => g(f(x))
const not = x => !x
const chunk = n => xs => isEmpty(xs) ? [] : [take(n)(xs), ...chunk(n)(drop(n)(xs))]

const a = [
  '', 'one', 'two', 'three', 'four',
  'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
  'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
]

const onesWithZero = ['zero', ...a.slice(1)]

const b = [
  '', '', 'twenty', 'thirty', 'forty',
  'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
]
const g = [
  '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion',
  'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'
]

export const encode = n => numToWords(String(n)).trim()
export const decode = str => Number(str.split(' ').map(numberExpression => numberExpression === 'point' ? '.' : onesWithZero.findIndex(matched => matched === numberExpression.toLowerCase())).join(''))

// numToWords :: (Number a, String a) => a -> String
const numToWords = n => {
  if (n === '0') {
    return onesWithZero[0]
  }

  const isDecimal = n.match(/(.*)\.(.*)/)

  if (isDecimal) {
    const [, beforePoint, afterPoint] = isDecimal
    return numToWords(beforePoint) + 'point ' + afterPoint.split('').map(numToWords).join('')
  }

  // this part is really nasty still
  // it might edit this again later to show how Monoids could fix this up
  const makeGroup = ([ones, tens, huns]) => [
    num(huns) === 0 ? '' : a[huns] + ' hundred ',
    num(ones) === 0 ? b[tens] : (b[tens] && b[tens] + '-') || '',
    a[tens + ones] || a[ones]
  ].join('')

  // "thousands" constructor; no real good names for this, i guess
  const thousand = (group, i) => group === '' ? group : `${group} ${g[i]}`

  return pipe(reverse)(chunk(3))(arr(n))
    .map(makeGroup)
    .map(thousand)
    .filter(pipe(isEmpty)(not))
    .reverse()
    .join(' ')
}

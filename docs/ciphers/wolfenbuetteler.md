# Wolfenbuetteler code

> The Wolfenbuetteler code was invented in 1433. Thus, the cipher isn't overly complex.
  It is a simple substitution of vocals by the letters M, K, D, T and H.

## Cipher behavior information

* Case sensitive? ✓❌ (not by default, but only uppercase can be enabled)
* Deterministic? ✓
* Alphabet: **All characters, even unicode**
* Characters not in alphabet will be: N/A

## Default options object

```
const options = {
  onlyUppercase: false // Should the code transform only uppercase letters?
}
```

## Usage

### Encoding

#### Default

```
import { wolfenbuetteler } from 'cipher-collection'


console.log(wolfenbuetteler('EXAMPLE✓')) // KXMAPLK✓
console.log(wolfenbuetteler('EXamPLE✓')) // KXmaPLK✓
```

#### Only uppercase

```
import { wolfenbuetteler } from 'cipher-collection'

const onlyUpperCaseOptions = { onlyUpperCase: true }

console.log(wolfenbuetteler('EXAMPLE✓', onlyUpperCaseOptions)) // KXMAPLK✓
console.log(wolfenbuetteler('EXamPLE✓', onlyUpperCaseOptions)) // KXamPLK✓
```

### Decoding

#### Default

```
import { wolfenbuetteler } from 'cipher-collection'


console.log(wolfenbuetteler('KXMAPLK✓')) // EXAMPLE✓
console.log(wolfenbuetteler('KXmaPLK✓')) // EXamPLE✓
```

#### Only uppercase

```
import { wolfenbuetteler } from 'cipher-collection'

const onlyUpperCaseOptions = { onlyUpperCase: true }

console.log(wolfenbuetteler('KXMAPLK✓', onlyUpperCaseOptions)) // EXAMPLE✓
console.log(wolfenbuetteler('KXmaPLK✓', onlyUpperCaseOptions)) // EXmaPLE✓
```

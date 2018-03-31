# Multi-Tap

> This cipher is named by the *Multi-Tap* text entry system used in older mobile phone
  keypads. Characters will be converted to the string of keystrokes needed to write the
  particular character on such a phone.

## Cipher behavior information

* Case sensitive? ❌
* Deterministic? ✓❌ (Only in exponent form **or** with spacing)
* Alphabet: `ABCDEFGHIJKLMNOPQRSTUVWXYZ ` (can be extended with special chars if needed)
* Characters not in alphabet will be: **omitted** or **throwing an error (default)**

## Default options object

The options are the same for both methods, `encode` and `decode`

```
const options = {
  customMapping: { // Setup additional character mappings if needed (for example special chars)
    0: ' '         // The letter position dertermines the number of strokes needed.
  },               // {0: ' !$'} would lead to: Space = 0^1, exclamation mark = 0^2, dollar sign = 0^3
  exponentForm: false, // Output results in exponent form or decode exponent form input
  withSpacing: true, // Add spacing between each character number string. Also set to true if ciphertext has spaces between strings
  failOnUnknownCharacter: true, // Should an error be thrown when a character is not included in the alphabet
}
```


## Usage

### Encoding

#### Default

```
import { multiTap } from 'cipher-collection'


console.log(multiTap.encode('Hello World')) // 44 33 555 555 666 0 9 666 777 555 3
```

#### Without spacing

**ATTENTION:** Without spacing, the created ciphertext can only be decoded ambiguously.
We suggest to use either the exponent form or spacing.

```
import { multiTap } from 'cipher-collection'


console.log(multiTap.encode('Hello World', { withSpacing: false })) // 4433555555666096667775553
```


#### In exponent form

```
import { multiTap } from 'cipher-collection'


console.log(multiTap.encode('Hello World'), { exponentForm: true }) // 4^2 3^2 5^3 5^3 6^3 0^1 9^1 6^3 7^3 5^3 3^1

// Without spacing (can also be decoded without problems)
console.log(multiTap.encode('Hello World'), { exponentForm: true, withSpacing: false }) // 4^23^25^35^36^30^19^16^37^35^33^1
```


#### With custom mapping


**ATTENTION:** the mapping per character can only include a maximum
of 4 (normal mode with spacing) or 9 charaters. For example: `0: ' !$/'` or `0: ' !$/()=?_'`


```
import { multiTap } from 'cipher-collection'

const customMappingOptions = { customMapping: { 0: ' !$' } }

console.log(multiTap.encode('Give $$ to me!', customMappingOptions)) // 4 444 888 33 0 000 000 0 8 666 0 6 33 00
```

### Decoding

#### Default

```
import { multiTap } from 'cipher-collection'


console.log(multiTap.decode('44 33 555 555 666 0 9 666 777 555 3')) // HELLO WORLD
```

#### Without spacing

**ATTENTION:** Without spacing, the created ciphertext can only be decoded ambiguously.
We suggest to use either the exponent form or spacing.

```
import { multiTap } from 'cipher-collection'

const noSpacingOptions = { withSpacing: false }

console.log(multiTap.decode('68855584440827', noSpacingOptions)) //MULTI TAP (this works well)
console.log(multiTap.decode('44444', noSpacingOptions)) //IH (Wrong decoding, was "Hi" before)
```


#### In exponent form

```
import { multiTap } from 'cipher-collection'


console.log(multiTap.deocde('4^2 3^2 5^3 5^3 6^3 0^1 9^1 6^3 7^3 5^3 3^1'), { exponentForm: true }) // HELLO WORLD

// Without spacing
console.log(multiTap.deocde('4^23^25^35^36^30^19^16^37^35^33^1'), { exponentForm: true, withSpacing: false }) // HELLO WORLD
```


#### With custom mapping


**ATTENTION:** the mapping per character can only include a maximum
of 4 (normal mode with spacing) or 9 charaters. For example: `0: ' !$/'` or `0: ' !$/()=?_'`

```
import { multiTap } from 'cipher-collection'

const customMappingOptions = { customMapping: { 0: ' !$' } }

console.log(multiTap.deocde('4 444 888 33 0 000 000 0 8 666 0 6 33 00', customMappingOptions)) // Give $$ to me!
```

# Pollux

> A doubling substitution cipher based on the Morse alphabet. Morse symbols
  will be replaced by one of the provided characters. The output is non-deterministic
  and makes the cipher homophone, because different ciphertexts can lead to the same cleartext

## Cipher behavior information

* Case sensitive? ❌ (Keys are case sensitive though)
* Deterministic? ❌
* Alphabet: `ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 .,:;?-_()'=+/@`
* Characters not in Alphabet will be: **throwing an error (default)**

## Default options object

The default options object is **empty**! You need to define the **substitions yourself**.

The options are the same for both methods, `encode` and `decode`:

```
const keys = {
  space: '', // Characters the morse space can be substituted with
  short: '', // Characters the morse short symbol (.) can be substituted with
  long: '',  // Characters the morse long symbol (-) can be substituted with
  separator: '' // Characters the morse separator symbol (/) can be substituted with
}
```

Keys can be any character you like. Use a character multiple times to increase it probability (`space: 'AAAB`).
**Don't** use the same character for different keys ({`space: 'AB', short: 'BC'`}). Otherwise the ciphertext will be ambiguous.

## Usage

### Encoding

```
import { pollux } from 'cipher-collection'

const keys = { space: 'AB', short: 'CD', long: 'EF', separator: '-' }

console.log(pollux.encode('Hello')) // CCCCADBCEDCBCFDDBEFE (Possible output)
console.log(pollux.encode('Hello')) // CCDDACACECDBDFDCBFFF (Another possible output)
```


### Decoding

```
import { pollux } from 'cipher-collection'

const keys = { space: 'AB', short: 'CD', long: 'EF', separator: '-' }

console.log(pollux.decode('CCCCADBCEDCBCFDDBEFE')) // Hello
console.log(pollux.decode('CCDDACACECDBDFDCBFFF')) // Hello
```

# Fractionated Morse

> A doubling substitution cipher based on the Morse keyAlphabet.

## Cipher behavior information

* Case sensitive? ❌
* Deterministic? ✓
* Alphabet: `ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 .,:;?-_()'=+/@`
* Characters not in keyAlphabet will be: **omitted** or **throwing an error (default)**

## Default options object

The options are the same for both methods, `encode` and `decode`

```
const options = {
  keyAlphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', // Order of letters to encode/decode the input. Must contain 26 unique characters
  failOnUnknownCharacter: true, // Should an error be thrown when a character is not included in the alphabet
}
```

## Usage

### Encoding

#### Default

```
import { fractionatedMorse } from 'cipher-collection'


console.log(fractionatedMorse.encode('Hello World')) // AGTCDHOTQODTCJ
```

#### With custom alphabet

```
import { fractionatedMorse } from 'cipher-collection'

const options = { alphabet: 'BCADEFGHIJKLMNOPQRSTUVWXYZ' }

console.log(fractionatedMorse.encode('Hello World', options)) // BGTADHOTQODTAJ
```

#### Without error throwing


```
import { fractionatedMorse } from 'cipher-collection'

const silentFailOptions = {
  failOnUnknownCharacter: false,
}

// Characters will be omitted
console.log(fractionatedMorse.encode('€€€Hello World', silentFailOptions)) //AGTCDHOTQODTCJ

```


### Decoding

#### Default

```
import { fractionatedMorse } from 'cipher-collection'


console.log(fractionatedMorse.decode('AGTCDHOTQODTCJ')) // Hello World
```

#### With custom alphabet

```
import { fractionatedMorse } from 'cipher-collection'

const options = { alphabet: 'BCADEFGHIJKLMNOPQRSTUVWXYZ' }

console.log(fractionatedMorse.decode('BGTADHOTQODTAJ', options)) // Hello World
```

#### Without error throwing


```
import { fractionatedMorse } from 'cipher-collection'

const silentFailOptions = {
  failOnUnknownCharacter: false,
}

console.log(fractionatedMorse.decode('€€€AGTCDHOTQODTCJ', silentFailOptions)) //Hello World

```

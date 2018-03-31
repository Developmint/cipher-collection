# Manchester code

> Invented by G.E. Thomas in 1949, the Manchester code (also known as PE / Phase Encoding)
  is a binary line code mainly used in telecommunication and data storage. The
  ciphertext has twice the amount of characters after encoding.

## Cipher behavior information

* Case sensitive? ❌
* Deterministic? ✓
* Alphabet: `01`
* Characters not in alphabet will be: **omitted** or **throwing an error (default)**

## Default options object

The options are the same for both methods, `encode` and `decode`

```
const options = {
  inverted: false, // Invert the result / treat ciphertext as inverted.
  failOnUnknownCharacter: true, // Should an error be thrown when a character is not included in the alphabet
}
```

`inverted` can be used to switch between two implementations. G.E. Thomas' (false) and IEEE 802.3 (true)

## Usage

### Encoding

#### Default

```
import { manchester } from 'cipher-collection'


console.log(manchester.encode('01')) // 0110
```

#### Inverted


```
import { manchester } from 'cipher-collection'

const invertedOptions = { inverted: true }

console.log(manchester.encode('01'), invertedOptions) // 1001
```

#### Without error throwing


```
import { manchester } from 'cipher-collection'

const silentFailOptions = {
  failOnUnknownCharacter: false,
}

console.log(fractionatedMorse.encode('€€€01', silentFailOptions)) // 0110

```


### Decoding


#### Default

```
import { manchester } from 'cipher-collection'


console.log(manchester.decode('0110')) // 01
```

#### Inverted


```
import { manchester } from 'cipher-collection'

const invertedOptions = { inverted: true }

console.log(manchester.encode('1001'), invertedOptions) // 01
```

#### Without error throwing


```
import { manchester } from 'cipher-collection'

const silentFailOptions = {
  failOnUnknownCharacter: false,
}

console.log(fractionatedMorse.decode('0', silentFailOptions)) // (empty string)
console.log(fractionatedMorse.decode('€0110', silentFailOptions)) // 01

```

# Code code

> The Code code is a code

## Cipher behavior information

* Case sensitive? ✓❌
* Deterministic? ✓❌
* Alphabet: **Which alphabet does the cipher use**
* Characters not in alphabet will be: (**omitted**, **preserved**, **throw an error**, **N/A**)

## Default options object

```
const options = {
  optionHere: true // What does this option change
}
```

## Usage

### Encoding

#### Default

```
import { code } from 'cipher-collection'


console.log(code.encode('text')) // Result
```

#### Special case one

```
import { code } from 'cipher-collection'

const specialOptions = { special: true }

console.log(code.encode('text', specialOptions)) // Special result
```


### Decoding

#### Default

```
import { code } from 'cipher-collection'


console.log(code.decode('ciphertext')) // Cleartext
```

#### Special case one

```
import { code } from 'cipher-collection'

const specialOptions = { special: true }

console.log(code.encode('ciphertext', specialOptions)) // Cleartext
```


# Morse

> Morse code transforms a message using short and long impulses. It was
  one of the first telecommunication codes invented.

## Cipher behavior information

* Case sensitive? ❌
* Alphabet: `ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 .,:;?-_()'=+/@`
* Characters not in alphabet will be: **preserved**, **omitted** or **throwing an error (default)**

## Default options object

The options are the same for both methods, `encode` and `decode`

```
const options = {
  separator: ' ', // Custom delimiter or glue
  failOnUnknownCharacter: true, // Should an error be thrown when a character is not included in the alphabet
  ommitUnknownCharacter: false  // Should unknown character be ommitted or preserverd? (Only if failOnUnknownCharacter is false)
}
```

## Usage

### Encoding

#### Default

```
// Direct import if you need encode and decode
import { morse } from 'cipher-collection'

// morse.encode()/morse.decoode()

// Alternative
import { encode } from 'cipher-collection/morse'

console.log(encode('SOS')) // ... --- ...
```

#### With custom glue

```
import { encode } from 'cipher-collection/morse'

const options = { separator: '~' }

console.log(encode('SOS', options)) // ...~---~...
```

#### Without error throwing

There are **two options** when disabling errors:

```
import { encode } from 'cipher-collection/morse'

const preserveOptions = {
  separator: '',
  failOnUnknownCharacter: false,
  ommitUnknownCharacter: false
}

// Preserve chraracters that can't get encoded
console.log(encode('€€€', preserveOptions)) // €€€

const ommitOptions = {
  separator: '',
  failOnUnknownCharacter: false,
  ommitUnknownCharacter: true
}

// Ommit chraracters that can't get encoded
console.log(encode('€€€S', ommitOptions)) // ...
```


### Decoding

#### Default

```
import { decode } from 'cipher-collection/morse'

console.log(decode('... --- ...')) // SOS
```

#### With custom delimiter

```
import { decode } from 'cipher-collection/morse'

const options = { separator: '~' }

console.log(decode('...~---~...', options)) // SOS
```

#### Without error throwing

Similar to `encode`, there are **two options** when disabling errors:

```
import { decode } from 'cipher-collection/morse'

const preserveOptions = {
  failOnUnknownCharacter: false,
  ommitUnknownCharacter: false
}

// Preserve chraracters that can't get decoded
console.log(decode('.-.-.-.-.-', preserveOptions)) // .-.-.-.-.-

const ommitOptions = {
  failOnUnknownCharacter: false,
  ommitUnknownCharacter: true
}

// Ommit chraracters that can't get decoded
console.log(decode('.-.-.-.-.- ...', ommitOptions)) // S
```

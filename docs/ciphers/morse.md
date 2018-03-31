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
  omitUnknownCharacter: false  // Should unknown character be omitted or preserverd? (Only if failOnUnknownCharacter is false)
}
```

## Usage

### Encoding

#### Default

```
import { morse } from 'cipher-collection'


console.log(morse.encode('SOS')) // ... --- ...
```

#### With custom glue

```
import { morse } from 'cipher-collection'

const options = { separator: '~' }

console.log(morse.encode('SOS', options)) // ...~---~...
```

#### Without error throwing

There are **two options** when disabling errors:

```
import { morse } from 'cipher-collection'

const preserveOptions = {
  separator: '',
  failOnUnknownCharacter: false,
  omitUnknownCharacter: false
}

// Preserve chraracters that can't get encoded
console.log(morse.encode('€€€', preserveOptions)) // €€€

const omitOptions = {
  separator: '',
  failOnUnknownCharacter: false,
  omitUnknownCharacter: true
}

// omit chraracters that can't get encoded
console.log(morse.encode('€€€S', omitOptions)) // ...
```


### Decoding

#### Default

```
import { morse } from 'cipher-collection'

console.log(morse.decode('... --- ...')) // SOS
```

#### With custom delimiter

```
import { morse } from 'cipher-collection'

const options = { separator: '~' }

console.log(morse.decode('...~---~...', options)) // SOS
```

#### Without error throwing

Similar to `encode`, there are **two options** when disabling errors:

```
import { morse } from 'cipher-collection'

const preserveOptions = {
  failOnUnknownCharacter: false,
  omitUnknownCharacter: false
}

// Preserve chraracters that can't get decoded
console.log(morse.decode('.-.-.-.-.-', preserveOptions)) // .-.-.-.-.-

const omitOptions = {
  failOnUnknownCharacter: false,
  omitUnknownCharacter: true
}

// omit chraracters that can't get decoded
console.log(morse.decode('.-.-.-.-.- ...', omitOptions)) // S
```

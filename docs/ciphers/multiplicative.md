# Multiplicative cipher

> The multiplicative cipher is an easy substitution cipher. All letters will converted to
  number and then multiplied by the set key and converted back to letters.

## Cipher behavior information

* Case sensitive? ✓
* Deterministic? ✓
* Alphabet: **ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz**
* Characters not in alphabet will be: **omitted**, **preserved** (default), **throw an error**

## Default options object

```
const options = {
  key: 3, // The number the letters should be multiplied with
  failOnUnknownCharacter: false, // Should an error be thrown on unknown characters
  omitUnknownCharacter: false   // Should unknown characters be omitted
}
```

**ATTENTION:** Only the keys 3, 5, 7, 9, 11, 15, 17, 19, 21, 23 and 25 are legal, because they are *co-prime* to 26.

## Usage

### Encoding

#### Default

```
import { multiplicative } from 'cipher-collection'


console.log(multiplicative.encode('ABCD')) // ADGJ
console.log(multiplicative.encode('ABCD01/')) // ADGJ01/
```


#### Omit unknown character

```
import { multiplicative } from 'cipher-collection'


console.log(multiplicative.encode('ABCD01/'), { omitUnknownCharacter: true } ) // ADGJ
```

#### Fail on unknown character

```
import { multiplicative } from 'cipher-collection'


console.log(multiplicative.encode('ABCD01/'), { failOnUnknownCharacter: true } ) // Error will be thrown
```


#### With different key

```
import { multiplicative } from 'cipher-collection'


console.log(multiplicative.encode('ABCD', { key: 25 } )) // AZYX
```


### Decoding

#### Default

```
import { code } from 'cipher-collection'


console.log(code.decode('ciphertext')) // Cleartext
```



#### Omit unknown character

```
import { multiplicative } from 'cipher-collection'


console.log(multiplicative.encode('ADGJ01/'), { omitUnknownCharacter: true } ) // ABCD
```

#### Fail on unknown character

```
import { multiplicative } from 'cipher-collection'


console.log(multiplicative.encode('ADGJ01/'), { failOnUnknownCharacter: true } ) // Error will be thrown
```


#### With different key

```
import { multiplicative } from 'cipher-collection'


console.log(multiplicative.encode('AZYX', { key: 25 } )) // ABCD
```


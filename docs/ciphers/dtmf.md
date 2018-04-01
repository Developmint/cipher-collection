# DTMF

> DTMF, short for 'Dual Tone Multi Frequency' is a technique that was used in analog telefony
  to transmit information over telephone lines between telephone equipment and other
  communications devices and switching centers.

## Lookup table


|        | 1209 Hz | 1336 Hz | 1477 Hz | 1633 Hz |
|--------|:-------:|:-------:|:-------:|:-------:|
| 697 Hz |    1    |    2    |    3    |    A    |
| 770 Hz |    4    |    5    |    6    |    B    |
| 852 Hz |    7    |    8    |    9    |    C    |
| 942 Hz |    *    |    0    |    #    |    D    |

## Cipher behavior information

* Case sensitive? ❌
* Deterministic? ✓
* Alphabet: `01234567890*#ABCD`
* Characters not in alphabet will be: **omitted** or **throwing an error (default)**

## Default options object

The options are the same for both methods, `encode` and `decode`

```
const options = {
  mode: 'include', // Can be include, sum or diff
  connector: '+',  // The character between two frequencies (in include mode)
  separator: ' ',  // The character seperating encoded characters
  invertedOutput: false, // Should frequencies be inverted (in include mode)
  failOnUnknownCharacter: true // Should an error be thrown when a character can't get en-/decoded
}
```


## Usage

### Encoding

#### Default (include mode)

```
import { dmtf } from 'cipher-collection'


console.log(dmtf.encode('123')) // 697+1209 697+1336 697+1477
```

#### Inverted output

The `invertedOutput` option is only relevant when you are in the `include` mode (default).

```
import { dmtf } from 'cipher-collection'


console.log(dmtf.encode('123', { invertedOutput: true })) // 1209+697 1336+697 1477+697
```

#### Custom connector

The `connector` option is only relevant when you are in the `include` mode (default).


```
import { dmtf } from 'cipher-collection'


console.log(dmtf.encode('123', { connector: '#' })) // 697#1209 697#1336 697#1477
```

#### Sum mode

```
import { dmtf } from 'cipher-collection'


console.log(dmtf.encode('123', { mode: 'sum' })) // 1906 2033 2174
```

#### Diff mode

```
import { dmtf } from 'cipher-collection'


console.log(dmtf.encode('123', { mode: 'diff' })) // 512 639 780
```

#### Custom separator

```
import { dmtf } from 'cipher-collection'


console.log(dmtf.encode('123', { separator: '#' })) // 697+1209#697+1336#697+1477
```

### Decoding

#### Default (include mode)

```
import { dmtf } from 'cipher-collection'


console.log(dmtf.decode('697+1209 697+1336 697+1477')) // 123
```

#### Inverted output

The `invertedOutput` option is only relevant when you are in the `include` mode (default).

```
import { dmtf } from 'cipher-collection'


console.log(dmtf.decode('1209+697 1336+697 1477+697', { invertedOutput: true })) // 123
```

#### Custom connector

The `connector` option is only relevant when you are in the `include` mode (default).


```
import { dmtf } from 'cipher-collection'


console.log(dmtf.decode('697#1209 697#1336 697#1477', { connector: '#' })) // 123
```

#### Sum mode

```
import { dmtf } from 'cipher-collection'


console.log(dmtf.decode('1906 2033 2174', { mode: 'sum' })) // 123
```

#### Diff mode

```
import { dmtf } from 'cipher-collection'


console.log(dmtf.decode('512 639 780', { mode: 'diff' })) // 123
```

#### Custom separator

```
import { dmtf } from 'cipher-collection'


console.log(dmtf.decode('697+1209#697+1336#697+1477', { separator: '#' })) // 123
```

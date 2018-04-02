# Base64

> Base64 represents binary data as an ASCII string format by translating
  it into a radix-64 representation.

## Cipher behavior information

* Case sensitive? ✓
* Deterministic? ✓
* Alphabet: **All characters, even unicode**
* Characters not in alphabet will be: N/A

## Default options object

There are no options for this cipher.

## Usage

### Encoding

#### Default

```
import { base64 } from 'cipher-collection'


console.log(base64.encode('1')) // MQ==
console.log(base64.encode('✓')) // 4pyT
```

### Decoding

#### Default

```
import { base64 } from 'cipher-collection'


console.log(base64.decode('MQ==')) // 1
console.log(base64.decode('4pyT')) // ✓
```

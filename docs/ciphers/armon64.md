# ARMON-64

> A widely unknown cipher, mostly seen on "underground" sites and forums.
  Neither the origin nor the creator are known. It has large similarities
  to [AER-256](./aer256.md).

## Cipher behavior information

* Case sensitive? ✓
* Deterministic? ✓
* Alphabet: ```!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ``` (All Unicode Characters using only 2 bytes (U+0000 - U+00FF)
* Characters not in alphabet will: **throw an error**

## Default options object

```
const options = {
  key: '' // Must be at least 3 characters long!
}
```

## Usage

### Encoding

#### Default

```
import armon64 from 'cipher-collection'


console.log(armon64.encode('hey', { key: 'ABCDEF' })) // 1007.3509783549783
```

### Decoding

#### Default

```
import armon64 from 'cipher-collection'


console.log(armon64.decode('1007.3509783549783', { key: 'ABCDEF' })) // hey
```

# ROT-N

>The ROT-N cipher is a simple letter substitution cipher that replaces all letters (and optionally numbers) with
the n-th letter/number after it. It's most common variation is *ROT-13* or *Caesar cipher*.

## Cipher behavior information

* Case sensitive? ✓
* Alphabet: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890`
* Characters not in alphabet will be: **carried over**

## Default options object

```
const options = {
  rotateNumbers: false, // Should numbers get rotated as well?
  rotations: 13 // Number of rotations
}
```


## Usage

### Default

The default will rotate **only letters** by **13 places**.

```
import { rot } from 'cipher-collection'

console.log(rot('Hello world! I am the number 1')) //Uryyb jbeyq! V nz gur ahzore 1
```

### With numbers

The second function argument enables number rotations as well.

```
import { rot } from 'cipher-collection'

console.log(rot('Hello world!', { rotateNumbers: true })) //Uryyb jbeyq! V nz gur ahzore 4
```


### With custom rotation

The third argument takes a custom rotations interval.

```
import { rot } from 'cipher-collection'

console.log(rot('Hello world!', { rotations: 1 })) //Ifmmp xpsme! J bn uif ovncfs 1
console.log(rot('Hello world!', { rotateNumbers: true, rotations: 1 })) //Ifmmp xpsme! J bn uif ovncfs 2
```

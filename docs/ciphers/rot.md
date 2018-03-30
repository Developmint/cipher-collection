# ROT-N

>The ROT-N cipher is a simple letter substitution cipher that replaces all letters (and optionally numbers) with
the n-th letter/number after it. It's most common variation is *ROT-13* or *Caesar cipher*.

## Cipher behavior information

* Case sensitive? [x]
* Alphabet: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890`
* Characters not in alphabet will be: **carried over**

## Usage

### Default

The default will rotate **only letters** by **13 places**.

```
import { rot } from 'cipher-collection'

console.log(rot('Hello world! I am the number 1')) //Uryyb jbeyq! V nz gur ahzore 1
```

### With numbers

The second function argument enables number rotation as well.

```
import { rot } from 'cipher-collection'

console.log(rot('Hello world!', true)) //Uryyb jbeyq! V nz gur ahzore 4
```


### With custom rotation

The third argument takes a custom rotation interval.

```
import { rot } from 'cipher-collection'

console.log(rot('Hello world!', true, 1)) //Ifmmp xpsme! J bn uif ovncfs 2
console.log(rot('Hello world!', false, 1)) //Ifmmp xpsme! J bn uif ovncfs 1
```

# Cipher Collection - All crypto algorithms you need

<p align="center">
  <a href="https://travis-ci.org/Developmint/cipher-collection"><img src="https://img.shields.io/travis/Developmint/cipher-collection/master.svg" alt="Build Status"></a>
  <a href="https://codecov.io/gh/Developmint/cipher-collection"><img src="https://img.shields.io/codecov/c/github/Developmint/cipher-collection/master.svg" alt="Coverage Status"></a>
  <a href="https://www.npmjs.com/package/cipher-collection"><img src="https://img.shields.io/npm/dm/cipher-collection.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/cipher-collection"><img src="https://img.shields.io/npm/v/cipher-collection.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/cipher-collection"><img src="https://img.shields.io/npm/l/cipher-collection.svg" alt="License"></a>
  <a href="https://conventionalcommits.org"><img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg" alt="We use Conventional Commits"></a>
  <a href="https://thanks.lichter.io/"><img src="https://img.shields.io/badge/thanks-%E2%99%A5-ff69b4.svg" alt="Thanks badge"></a>
</p>

> Zero-dependency modular cipher collection including all well-known and often used ciphers.

## 🔥 Features

- Modules per cipher to reduce size
- Available as UMD, CJS and ES Module
- Well tested and [documented](./docs/index.md)
- Compatible with Node 8.0+
- Zero dependencies
- Customizable error handling

## 🔎 Getting started


### 📦️ Through NPM

```
$ npm install cipher-collection
```

ES6 import:

```
import { rot } from 'cipher-collection'

console.log(rot('Hello world!'))
```
ES5 import:

```
const rot = require('cipher-collection').rot

console.log(rot('Hello world!'))
```

### 🔗 Using a CDN

Using a CDN is a great way to play around with the package or reproducing issues (eg. with JSFiddle).
It is **not recommended** using the CDN build in production, because you won't have benefits of you bundlers optimizations
and you need to load the full build, no matter how many ciphers you actually use on your page.


```html
<html>
<body>
  <pre id="t"/>
</body>
</html>
<script src="https://unpkg.com/cipher-collection/dist/cipher-collection.umd.js"></script>
<script>
document.getElementById("t").innerHTML = this["cipher-collection"].wolfenbuetteler('ABC');
</script>
```


## 🔐 Currently available ciphers

- ROT-N (optionally with numbers)
- Morse
- Fractionated Morse
- Pollux
- Multi-Tap (optionally as exponent expression)
- Manchester code (both standards)
- DTMF
- Base64 (with unicode support!)
- Wolfenbuetteler code
- Multiplicative cipher
- Affine
- AER-256
- ARMON-64
- Polybius
- Bifid

## 📖 Documentation

The documentation can be found [here](./docs/index.md)

## 🛠️ Contributing

Please see our [CONTRIBUTING.md](./CONTRIBUTING.md)


## 📑 License

[MIT License](./LICENSE.md) - Copyright (c) Developmint - Alexander Lichter

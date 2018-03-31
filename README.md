# Cipher Collection - All crypto algorithms you need

<p align="center">
  <a href="https://travis-ci.org/Developmint/cipher-collection"><img src="https://img.shields.io/travis/Developmint/cipher-collection/master.svg" alt="Build Status"></a>
  <a href="https://codecov.io/gh/Developmint/cipher-collection"><img src="https://img.shields.io/codecov/c/github/Developmint/cipher-collection/master.svg" alt="Coverage Status"></a>
  <a href="https://www.npmjs.com/package/cipher-collection"><img src="https://img.shields.io/npm/dm/cipher-collection.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/cipher-collection"><img src="https://img.shields.io/npm/v/cipher-collection.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/cipher-collection"><img src="https://img.shields.io/npm/l/cipher-collection.svg" alt="License"></a>
  <a href="https://conventionalcommits.org"><img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg" alt="We use Conventional Commits"></a>
</p>

> Zero-dependency modular cipher collection including all well-known and often used ciphers.

## Features

- Modules per cipher to reduce size
- Available as UMD, CJS and ES Module
- Well tested and [documented](./docs/index.md)
- Zero dependencies
- Customizable error handling

## Getting started


### Through NPM
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


## Currently available ciphers

- ROT-N (custom number of rotations, optional number rotation)
- Morse (custom delimiter, custom handling of unknown characters)
- Fractionated Morse


## Contributing

Please see our [CONTRIBUTING.md](./CONTRIBUTING.md)


## 📑 License

[MIT License](./LICENSE.md) - Copyright (c) Developmint - Alexander Lichter

# Cipher Collection - All crypto algorithms you need

<p align="center">
  <a href="https://travis-ci.org/Developmint/cipher-collection"><img src="https://img.shields.io/travis/Developmint/cipher-collection/master.svg" alt="Build Status"></a>
  <a href="https://codecov.io/gh/Developmint/cipher-collection"><img src="https://img.shields.io/codecov/c/github/Developmint/cipher-collection/master.svg" alt="Coverage Status"></a>
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
const rot = require('cipher-collection/rot')

console.log(rot('Hello world!'))
```


## Currently available ciphers

- ROT-N (custom number of rotations, optional number rotation)


## Contributing

Please see our [CONTRIBUTING.md](./CONTRIBUTING.md)


## 📑 License

[MIT License](./LICENSE) - Copyright (c) Nuxt Community

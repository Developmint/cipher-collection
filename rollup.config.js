import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import pkg from './package.json'

const plugins = [
  babel({
    presets: [
      [
        'env',
        {
          modules: false
        }
      ]
    ],
    plugins: ['external-helpers', 'transform-object-rest-spread'],
    babelrc: false
  })
]

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.js',
    output: {
      name: 'cipher-collection',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [...plugins, uglify()]
  },
  {
    input: 'src/index.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins
  }
]

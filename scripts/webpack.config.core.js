import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import NodePolyfill from 'node-polyfill-webpack-plugin'


// TODO: use `import.meta.resolve()` once it is supported without any
// experimental flags
const require = createRequire(import.meta.url)
const webpack =  require('webpack')

const CORE_FILE = fileURLToPath(new URL('../src/core.js', import.meta.url))
const DIST_DIR = fileURLToPath(new URL('../dist/', import.meta.url))

const webpackConfig = {
  entry: CORE_FILE,
  devtool: 'source-map',
  output: {
    path: DIST_DIR,
    filename: 'index.cjs',
    library: 'frameworkInfo',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  resolve: {
    fallback: { 
      fs: require.resolve('fs-extra'),
      path: require.resolve('path-browserify'),
      process: require.resolve('process/browser'),
     },
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /^node:/,
      (resource) => {
        resource.request = resource.request.replace(/^node:/, '');
      },
    ),
    new NodePolyfill(),
  ]
}

export default webpackConfig

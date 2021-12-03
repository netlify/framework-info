import { createRequire } from 'module'
import { fileURLToPath } from 'url'

// TODO: use `import.meta.resolve()` once it is supported without any
// experimental flags
const require = createRequire(import.meta.url)
const PATH_BROWSERIFY_PATH = require.resolve('path-browserify')

const CORE_FILE = fileURLToPath(new URL('../src/core.js', import.meta.url))
const DIST_DIR = fileURLToPath(new URL('../dist/', import.meta.url))

const webpackConfig = {
  entry: CORE_FILE,
  devtool: 'source-map',
  output: {
    path: DIST_DIR,
    filename: 'index.js',
    library: {
      type: 'module',
    },
  },
  experiments: {
    outputModule: true,
  },
  resolve: {
    fallback: { path: PATH_BROWSERIFY_PATH },
  },
}

export default webpackConfig

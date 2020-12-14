const { cwd } = require('process')

const isPlainObj = require('is-plain-obj')
const locatePath = require('locate-path')
const readPkgUp = require('read-pkg-up')

const getContext = ({ projectDir = cwd() } = {}) => ({
  projectDir,
  locatePath: async (paths) => await locatePath(paths, { type: 'file', cwd: projectDir }),
  getPackageJson: async () => {
    try {
      const result = await readPkgUp({ cwd: projectDir, normalize: false })
      if (result === undefined) {
        return {}
      }

      const { packageJson, path: packageJsonPath } = result

      if (!isPlainObj(packageJson)) {
        return { packageJsonPath }
      }

      return { packageJson, packageJsonPath }
    } catch (error) {
      return {}
    }
  },
})

module.exports = { getContext }

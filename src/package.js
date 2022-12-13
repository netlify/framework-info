import filterObj from 'filter-obj'
import isPlainObj from 'is-plain-obj'

export const getPackageJsonContent = function ({ packageJson }) {
  if (packageJson === undefined) {
    return { npmDependencies: [], scripts: {} }
  }

  const npmDependencies = getNpmDependencies(packageJson)
  const npmDependenciesVersions = getNpmDependenciesVersions(packageJson)
  const scripts = getScripts(packageJson)
  return { npmDependencies, npmDependenciesVersions, scripts }
}

// Retrieve `package.json` `dependencies` and `devDependencies` names
const getNpmDependencies = function ({ dependencies, devDependencies }) {
  return [...getObjectKeys(dependencies), ...getObjectKeys(devDependencies)]
}

// Retrieve `package.json` `dependencies` and `devDependencies` versions
const getNpmDependenciesVersions = function ({ dependencies, devDependencies }) {
  return { ...devDependencies, ...dependencies }
}

const getObjectKeys = function (value) {
  if (!isPlainObj(value)) {
    return []
  }

  return Object.keys(value)
}

// Retrieve `package.json` `scripts`
const getScripts = function ({ scripts }) {
  if (!isPlainObj(scripts)) {
    return {}
  }

  const scriptsA = filterObj(scripts, isValidScript)
  return scriptsA
}

const isValidScript = function (key, value) {
  return typeof value === 'string'
}

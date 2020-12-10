// Checks if the project is using a specific framework:
//  - if `framework.npmDependencies` is set, one of them must be present in the
//    `package.json` `dependencies|devDependencies`
//  - if `framework.excludedNpmDependencies` is set, none of them must be
//    present in the `package.json` `dependencies|devDependencies`
//  - if `framework.configFiles` is set, one of the files must exist
const usesFramework = async function (
  {
    detect: {
      npmDependencies: frameworkNpmDependencies,
      excludedNpmDependencies: frameworkExcludedNpmDependencies,
      configFiles,
    },
  },
  { locatePath, npmDependencies },
) {
  return (
    usesNpmDependencies(frameworkNpmDependencies, npmDependencies) &&
    lacksExcludedNpmDependencies(frameworkExcludedNpmDependencies, npmDependencies) &&
    (await usesConfigFiles(configFiles, locatePath))
  )
}

const usesNpmDependencies = function (frameworkNpmDependencies, npmDependencies) {
  return (
    frameworkNpmDependencies.length === 0 ||
    frameworkNpmDependencies.some((frameworkNpmDependency) => npmDependencies.includes(frameworkNpmDependency))
  )
}

const lacksExcludedNpmDependencies = function (frameworkExcludedNpmDependencies, npmDependencies) {
  return (
    frameworkExcludedNpmDependencies.length === 0 ||
    frameworkExcludedNpmDependencies.every(
      (frameworkNpmDependency) => !npmDependencies.includes(frameworkNpmDependency),
    )
  )
}

const usesConfigFiles = async function (configFiles, locatePath) {
  return configFiles.length === 0 || (await locatePath(configFiles)) !== undefined
}

module.exports = { usesFramework }

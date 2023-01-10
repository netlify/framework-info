import pLocate from 'p-locate'
import semver from 'semver'

// Checks if the project is using a specific framework:
//  - if `framework.npmDependencies` is set, one of them must be present in the
//    `package.json` `dependencies|devDependencies`
//  - if `framework.excludedNpmDependencies` is set, none of them must be
//    present in the `package.json` `dependencies|devDependencies`
//  - if `framework.configFiles` is set, one of the files must exist
export const usesFramework = async function (
  {
    detect: {
      npmDependencies: frameworkNpmDependencies,
      excludedNpmDependencies: frameworkExcludedNpmDependencies,
      configFiles,
    },
  },
  { pathExists, npmDependencies, npmDependenciesVersions },
) {
  return (
    usesNpmDependencies(frameworkNpmDependencies, npmDependencies, npmDependenciesVersions) &&
    lacksExcludedNpmDependencies(frameworkExcludedNpmDependencies, npmDependencies) &&
    (await usesConfigFiles(configFiles, pathExists))
  )
}

const usesNpmDependencies = function (frameworkNpmDependencies, npmDependencies, npmDependenciesVersions) {
  if (frameworkNpmDependencies.length === 0) {
    return true
  }

  return frameworkNpmDependencies.some((frameworkNpmDependency) => {
    if (typeof frameworkNpmDependency === 'string') {
      return npmDependencies.includes(frameworkNpmDependency)
    }

    return (
      npmDependencies.includes(frameworkNpmDependency.name) &&
      (frameworkNpmDependency.version == null ||
        semver.satisfies(
          semver.minVersion(npmDependenciesVersions[frameworkNpmDependency.name]),
          frameworkNpmDependency.version,
        ))
    )
  })
}

const lacksExcludedNpmDependencies = function (frameworkExcludedNpmDependencies, npmDependencies) {
  return frameworkExcludedNpmDependencies.every(
    (frameworkNpmDependency) => !npmDependencies.includes(frameworkNpmDependency),
  )
}

const configExists = async (configFiles, pathExists) => {
  const exists = await pLocate(configFiles, (file) => pathExists(file))
  return exists
}

const usesConfigFiles = async function (configFiles, pathExists) {
  return configFiles.length === 0 || (await configExists(configFiles, pathExists))
}

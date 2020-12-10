const pFilter = require('p-filter')

const { usesFramework } = require('./detect.js')
const { FRAMEWORKS } = require('./frameworks/main.js')
const { getPackageJsonContent } = require('./package.js')
const { getRunScriptCommand } = require('./run_script.js')
const { getWatchCommands } = require('./watch.js')

/**
 * This callback is displayed as a global member.
 * @callback LocatePathCallback
 * @param {string[]} paths
 * @returns {Promise<string>}
 */

/**
 * This callback is displayed as a global member.
 * @callback GetPackageJsonCallback
 * @returns {Promise<string>}
 */

/**
 * @typedef {object} Context
 * @property {string} projectDir - Project's directory
 * @property {LocatePathCallback} locatePath - Get the first path that exists out of multiple paths
 * @property {GetPackageJsonCallback} getPackageJson - Get the content of package.json
 */

/**
 * @typedef {object} Watch
 * @property {string} commands - Build command, in watch mode. There might be several alternatives
 * @property {string} directory - Relative path to the directory where files are built, in watch mode
 * @property {number} port - Server port
 */

/**
 * @typedef {object} Framework
 * @property {string} name - Name such as `"gatsby"`
 * @property {string} category - Category among `"static_site_generator"`, `"frontend_framework"` and `"build_tool"`
 * @property {Watch} watch - Information about the build command, in watch mode.
 * @property {object} env - Environment variables that should be set when calling the watch command
 */

/**
 * Return all the frameworks used by a project.
 *
 * @param  {Context} context - Context
 *
 * @returns {Framework[]} frameworks - Frameworks used by a project
 */
const listFrameworks = async function (context) {
  const { projectDir, locatePath, getPackageJson } = context
  const { npmDependencies, scripts, runScriptCommand } = await getProjectInfo({
    projectDir,
    locatePath,
    getPackageJson,
  })
  const frameworks = await pFilter(FRAMEWORKS, (framework) => usesFramework(framework, { locatePath, npmDependencies }))
  const frameworkInfos = frameworks.map((framework) => getFrameworkInfo(framework, { scripts, runScriptCommand }))
  return frameworkInfos
}

/**
 * Return whether a project uses a specific framework
 *
 * @param {string} frameworkName - Name such as `"gatsby"`
 * @param  {Context} [context] - Context
 *
 * @returns {boolean} result - Whether the project uses this framework
 */
const hasFramework = async function (frameworkName, context) {
  const framework = getFrameworkByName(frameworkName)
  const { projectDir, locatePath, getPackageJson } = context
  const { npmDependencies } = await getProjectInfo({ projectDir, locatePath, getPackageJson })
  const result = await usesFramework(framework, { locatePath, npmDependencies })
  return result
}

/**
 * Return some information about a framework used by a project.
 *
 * @param {string} frameworkName - Name such as `"gatsby"`
 * @param  {Context} [context] - Context
 *
 * @returns {Framework} framework - Framework used by a project
 */
const getFramework = async function (frameworkName, context) {
  const framework = getFrameworkByName(frameworkName)
  const { projectDir, locatePath, getPackageJson } = context
  const { scripts, runScriptCommand } = await getProjectInfo({
    projectDir,
    locatePath,
    getPackageJson,
  })
  const frameworkInfo = getFrameworkInfo(framework, { scripts, runScriptCommand })
  return frameworkInfo
}

const getFrameworkByName = function (frameworkName) {
  const framework = FRAMEWORKS.find(({ name }) => name === frameworkName)
  if (framework === undefined) {
    const frameworkNames = FRAMEWORKS.map(getFrameworkName).join(', ')
    throw new Error(`Invalid framework "${frameworkName}". It should be one of: ${frameworkNames}`)
  }
  return framework
}

const getFrameworkName = function ({ name }) {
  return name
}

const getProjectInfo = async function ({ projectDir, locatePath, getPackageJson }) {
  const { packageJsonPath = projectDir, npmDependencies, scripts } = await getPackageJsonContent({
    getPackageJson,
  })
  const runScriptCommand = await getRunScriptCommand({ locatePath, packageJsonPath })
  return { npmDependencies, scripts, runScriptCommand }
}

const getFrameworkInfo = function (
  { name, category, watch: { command: frameworkWatchCommand, directory, port }, env },
  { scripts, runScriptCommand },
) {
  const watchCommands = getWatchCommands({ frameworkWatchCommand, scripts, runScriptCommand })
  return { name, category, watch: { commands: watchCommands, directory, port }, env }
}

module.exports = { listFrameworks, hasFramework, getFramework }

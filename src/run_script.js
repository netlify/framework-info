const { dirname } = require('path')

// Retrieve the command to run `package.json` `scripts` commands
const getRunScriptCommand = async function ({ locatePath, packageJsonPath }) {
  const exists = (await locatePath([`${dirname(packageJsonPath)}/yarn.lock`])) !== undefined
  if (exists) {
    return 'yarn'
  }

  return 'npm run'
}

module.exports = { getRunScriptCommand }

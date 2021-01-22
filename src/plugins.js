const Ajv = require('ajv').default
const semver = require('semver')

const MIN_NODE_VERSION_KEYWORD = {
  keyword: 'min_node_version',
  validate: (minNodeVersion, { nodeVersion }) =>
    semver.valid(minNodeVersion) && semver.valid(nodeVersion) && semver.gte(nodeVersion, minNodeVersion),
}

const getPlugins = function (plugins, { nodeVersion }) {
  const ajv = new Ajv({})
  ajv.addKeyword(MIN_NODE_VERSION_KEYWORD)

  return plugins.filter(({ schema }) => ajv.validate(schema, { nodeVersion })).map(({ packageName }) => packageName)
}

module.exports = { getPlugins }

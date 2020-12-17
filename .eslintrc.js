const { overrides } = require('@netlify/eslint-config-node')

module.exports = {
  extends: '@netlify/eslint-config-node',
  overrides: [
    ...overrides,
    {
      files: ['*.jsx'],
      extends: '@netlify/eslint-config-node/react_config',
      rules: {
        'unicorn/import-index': 0,
      },
    },
    {
      files: ['*.html'],
      extends: '@netlify/eslint-config-node/vanilla_js_config',
      overrides: [{ files: ['site/vanilla/index.html'], globals: { frameworkInfo: 'readonly' } }],
    },
  ],
}

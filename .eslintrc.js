const devMode = process.env.NODE_ENV === 'development'

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: ['@nuxtjs', 'plugin:prettier/recommended', 'plugin:nuxt/recommended'],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'no-console': !devMode ? 'warn' : 'off',
    'no-debugger': !devMode ? 'warn' : 'off',
    'object-shorthand': 'off',
    'nuxt/no-timing-in-fetch-data': 'off',
    'no-empty': 'off',
    'vue/no-v-html': 'off',
    'new-cap': 'off',
    'no-unmodified-loop-condition': 'off',
    'no-useless-catch': 'off',
    'no-useless-constructor': 'off',
    'prettier/prettier': 'off',
    'vue/no-mutating-props': 'off',
    'vue/no-v-for-template-key': 'off',
    'import/order': "off"
  }
}

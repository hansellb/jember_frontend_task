module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    "no-trailing-spaces": ["error", { "skipBlankLines": false, "ignoreComments": false }],
    "indent": "warn",
    "semi": "warn",
    "prefer-const": "warn"
  }
}

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
    "no-trailing-spaces": ["warn", { "skipBlankLines": false, "ignoreComments": false }],
    "key-spacing": "warn",
    "indent": "warn",
    "semi": "warn",
    "prefer-const": "warn",
    "comma-dangle": "warn",
    "eol-last": "warn",
    "space-before-function-paren": "warn",
    "vue/max-attributes-per-line": "warn",
    "vue/no-unused-components": "warn"
  }
}

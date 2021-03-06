module.exports = {
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:vue/recommended',
    'prettier',
    'prettier/standard',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-var': 1,
    'prefer-const': 1,
    'no-console': 1,
    'vue/max-attributes-per-line': [2, { singleline: 2 }],
  },
}

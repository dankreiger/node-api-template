module.exports = {
  parserOptions: {
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint', 'jest'],
  include: ['./src'],
};

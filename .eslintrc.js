module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'object-curly-newline': 0,
    'import/prefer-default-export': 0,
    'comma-dangle': 0,
    '@typescript-eslint/comma-dangle': 0,
    'arrow-parens': 0,
    'react/function-component-definition': 0,
    'react/destructuring-assignment': 0,
    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 0,
    'no-console': ['error', { allow: ['warn', 'error'] }]
  },
};

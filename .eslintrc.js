module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ['src/App.tsx', 'src/main.tsx', 'src/vite-env.d.ts', 'src/index.d.ts'],
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:react-hooks/recommended'
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
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'max-len': 0
  },
};

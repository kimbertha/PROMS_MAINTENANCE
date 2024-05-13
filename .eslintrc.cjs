module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "brace-style": "error",
    "camelcase": [
      "error",
      {
        "properties": "never"
      }
    ],
    "comma-dangle": [
      "error",
      "never"
    ],
    "func-call-spacing": [
      "error",
      "never"
    ],
    "keyword-spacing": [
      "error",
      {
        "before": true
      }
    ],
    "space-infix-ops": [
      "error",
      {
        "int32Hint": false
      }
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "eqeqeq": "warn",
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "key-spacing": [
      "error",
      {
        "beforeColon": false
      }
    ],
    "no-unused-vars":"off",
    "no-console": "off",
    "no-fallthrough": "warn",
    "prefer-const": "error",
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "react/prop-types": [
      0
    ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}

module.exports = {
  extends: [
    'airbnb',
    'plugin:lit/recommended',
  ],
  env: {
    browser: true,
    node: true,
  },
  plugins: [
    'import',
    'lit',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: false,
      modules: true,
    },
  },
  rules: {
    // Browser environment requires them.
    'import/extensions': ['error', 'ignorePackages'],
    // Allow warnings and errors; logs are debugging
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'import/no-extraneous-dependencies': ['warn', {
      devDependencies: ['build/*.mjs'],
    }],
  },
  settings: {
  },
};
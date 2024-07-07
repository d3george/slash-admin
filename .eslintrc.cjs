module.exports = {
  // Indicates that the current directory is the root directory, and the ESLint rule will be restricted to that directory
  root: true,
  env: { browser: true, es2020: true, node: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    extraFileExtensions: ['.json'],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['#', './types'],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },
  /* Used to inherit existing configuration rule sets */
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
    'plugin:prettier/recommended',
  ],
  /* Used to specify a set of ESLint plugins that can provide additional rules, parser options, or other ESLint features */
  plugins: [
    '@typescript-eslint',
    'prettier',
    'react',
    'react-hooks',
    'jsx-a11y',
    'import',
    'unused-imports',
  ],
  /**
   * Used to define or override specific rules and their severity levels
   * "off" or 0 - Close the rule without reporting any errors
   * "warn" or 1 - Enable rules (when triggered, the program will not exit)
   * "error" or 2 - Enable rules (when triggered, the program will exit)
   */
  rules: {
    semi: ['error', 'always'],
    'no-console': 'off',
    'no-unused-vars': 'off',
    'no-case-declarations': 'off',
    'no-use-before-define': 'off',
    'no-param-reassign': 'off',
    'space-before-function-paren': 'off',
    'class-methods-use-this': 'off',

    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',

    'react/react-in-jsx-scope': 'off',
    'react/button-has-type': 'off',
    'react/require-default-props': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-props-no-spreading': 'off',

    'import/first': 'warn',
    'import/newline-after-import': 'warn',
    'import/no-duplicates': 'warn',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'off',
    'import/order': [
      'warn',
      {
        groups: [
          'builtin', // Node.js内置模块
          'external', // 第三方模块
          'internal', // 应用程序内部的模块
          'parent', // 父级目录中导入的模块
          ['sibling', 'index'], // 具有相同或更高目录的兄弟模块
          'object',
          'type',
        ],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
          {
            pattern: '#/**',
            group: 'type',
          },
          {
            pattern: '*.{scss,css,less,styl,stylus}',
            group: 'parent',
          },
          {
            pattern: '*.{js,jsx,ts,tsx}',
            group: 'sibling',
          },
        ],
        'newlines-between': 'always', // 在组之间插入空行
        pathGroupsExcludedImportTypes: ['sibling', 'index'],
        warnOnUnassignedImports: true,
        alphabetize: { order: 'asc', caseInsensitive: true }, // 对于每个组，按字母表顺序排序。
      },
    ],

    'unused-imports/no-unused-imports-ts': 'warn',
    'unused-imports/no-unused-vars-ts': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],

    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};

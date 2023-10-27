module.exports = {
  root: true, // 表示当前目录即为根目录，ESLint 规则将被限制到该目录下
  env: { browser: true, es2020: true, node: true },
  /* 解析器 */
  parser: '@typescript-eslint/parser', // 指定ESLint解析器
  parserOptions: {
    project: './tsconfig.json', // tsconfig.json的路径
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // 启用JSX
    },
    extraFileExtensions: ['.json'],
  },
  settings: {
    // 识别 @ # alias
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
  /* ESLint 中基础配置需要继承的配置 */
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended', // 使用@typescript-eslint/eslint-plugin推荐的规则
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier', // 增加 prettier 相关的校验规则
    'plugin:prettier/recommended', // 开启 Prettier 插件推荐的规则
  ],
  /* ESLint文件所依赖的插件 */
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
   * 定义规则
   * "off" 或 0 - 关闭规则
   * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
   * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
  rules: {
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

    // 不用手动引入react
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

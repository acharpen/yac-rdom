module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint'
  ],
  ignorePatterns: ['dist/**', 'lib/**', 'node_modules/**', 'jest.*'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.eslint.json'],
    tsconfigRootDir: __dirname
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    camelcase: 'off',
    'accessor-pairs': ['error'],
    'array-callback-return': ['error'],
    'block-scoped-var': ['error'],
    'consistent-return': ['error'],
    'default-case-last': ['error'],
    'default-param-last': 'off',
    'dot-notation': 'off',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'grouped-accessor-pairs': ['error'],
    'guard-for-in': ['error'],
    'no-alert': ['error'],
    'no-await-in-loop': ['error'],
    'no-caller': ['error'],
    'no-confusing-arrow': ['error'],
    'no-console': ['error'],
    'no-constructor-return': ['error'],
    'no-div-regex': ['error'],
    'no-dupe-class-members': 'off',
    'no-duplicate-imports': 'off',
    'no-else-return': ['error'],
    'no-empty-function': ['error'],
    'no-eval': ['error'],
    'no-extend-native': ['error'],
    'no-extra-bind': ['error'],
    'no-extra-label': ['error'],
    'no-floating-decimal': ['error'],
    'no-implicit-coercion': ['error'],
    'no-implicit-globals': ['error'],
    'no-implied-eval': ['error'],
    'no-invalid-this': 'off',
    'no-iterator': ['error'],
    'no-labels': ['error'],
    'no-label-var': ['error'],
    'no-lone-blocks': ['error'],
    'no-loop-func': 'off',
    'no-loss-of-precision': 'off',
    'no-multi-str': ['error'],
    'no-new': ['error'],
    'no-new-func': ['error'],
    'no-new-wrappers': ['error'],
    'no-octal-escape': ['error'],
    'no-param-reassign': ['error'],
    'no-promise-executor-return': ['error'],
    'no-proto': ['error'],
    'no-redeclare': 'off',
    'no-restricted-exports': ['error'],
    'no-restricted-globals': ['error'],
    'no-restricted-imports': ['error'],
    'no-restricted-properties': ['error'],
    'no-return-assign': ['error'],
    'no-return-await': 'off',
    'no-script-url': ['error'],
    'no-self-compare': ['error'],
    'no-sequences': ['error'],
    'no-shadow': 'off',
    'no-template-curly-in-string': ['error'],
    'no-throw-literal': ['error'],
    'no-undefined': ['error'],
    'no-undef-init': ['error'],
    'no-unmodified-loop-condition': ['error'],
    'no-unreachable-loop': ['error'],
    'no-unused-expressions': 'off',
    'no-use-before-define': 'off',
    'no-useless-backreference': ['error'],
    'no-useless-call': ['error'],
    'no-useless-computed-key': ['error'],
    'no-useless-concat': ['error'],
    'no-useless-constructor': 'off',
    'no-useless-rename': ['error'],
    'no-useless-return': ['error'],
    'no-var': ['error'],
    'no-void': ['error'],
    'no-warning-comments': ['error'],
    'object-shorthand': ['error'],
    'prefer-arrow-callback': ['error'],
    'prefer-const': ['error'],
    'prefer-destructuring': ['error', { array: false }],
    'prefer-named-capture-group': ['error'],
    'prefer-numeric-literals': ['error'],
    'prefer-promise-reject-errors': ['error'],
    'prefer-regex-literals': ['error'],
    'prefer-rest-params': ['error'],
    'prefer-spread': ['error'],
    'prefer-template': ['error'],
    radix: ['error'],
    'require-atomic-updates': ['error'],
    'require-await': ['error'],
    'require-unicode-regexp': ['error'],
    'sort-imports': ['error'],
    'symbol-description': ['error'],
    'vars-on-top': ['error'],
    yoda: ['error'],
    '@typescript-eslint/array-type': ['error', { default: 'array' }],
    '@typescript-eslint/class-literal-property-style': ['error'],
    '@typescript-eslint/consistent-indexed-object-style': ['error'],
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      { assertionStyle: 'as', objectLiteralTypeAssertions: 'never' }
    ],
    '@typescript-eslint/default-param-last': ['error'],
    '@typescript-eslint/dot-notation': ['error'],
    '@typescript-eslint/explicit-function-return-type': ['error'],
    '@typescript-eslint/explicit-member-accessibility': ['error'],
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          // Fields
          'public-static-field',
          'protected-static-field',
          'private-static-field',
          'public-decorated-field',
          'protected-decorated-field',
          'private-decorated-field',
          'public-instance-field',
          'protected-instance-field',
          'private-instance-field',
          'public-abstract-field',
          'protected-abstract-field',
          'private-abstract-field',

          // Constructors
          'public-constructor',
          'protected-constructor',
          'private-constructor',

          // Methods
          'public-static-method',
          'protected-static-method',
          'private-static-method',
          'public-decorated-method',
          'protected-decorated-method',
          'private-decorated-method',
          'public-abstract-method',
          'public-instance-method',
          'protected-abstract-method',
          'protected-instance-method',
          'private-abstract-method',
          'private-instance-method'
        ]
      }
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        filter: {
          regex: '[A-Z]',
          match: false
        },
        format: ['camelCase'],
        trailingUnderscore: 'forbid'
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE']
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow'
      },
      {
        selector: 'property',
        modifiers: ['static'],
        format: ['UPPER_CASE']
      },
      {
        selector: 'typeLike',
        format: ['PascalCase']
      },
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'should', 'has', 'can', 'did', 'will']
      }
    ],
    '@typescript-eslint/no-base-to-string': ['error'],
    '@typescript-eslint/no-confusing-non-null-assertion': ['error'],
    '@typescript-eslint/no-dupe-class-members': ['error'],
    '@typescript-eslint/no-duplicate-imports': ['error'],
    '@typescript-eslint/no-dynamic-delete': ['error'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-extraneous-class': ['error', { allowStaticOnly: true }],
    '@typescript-eslint/no-implicit-any-catch': ['error'],
    '@typescript-eslint/no-invalid-this': ['error'],
    '@typescript-eslint/no-invalid-void-type': ['error'],
    '@typescript-eslint/no-loop-func': ['error'],
    '@typescript-eslint/no-loss-of-precision': ['error'],
    '@typescript-eslint/no-parameter-properties': ['error'],
    '@typescript-eslint/no-redeclare': ['error'],
    '@typescript-eslint/no-require-imports': ['error'],
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-throw-literal': ['error'],
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': ['error'],
    '@typescript-eslint/no-unnecessary-condition': ['error'],
    '@typescript-eslint/no-unnecessary-qualifier': ['error'],
    '@typescript-eslint/no-unnecessary-type-arguments': ['error'],
    '@typescript-eslint/no-unused-expressions': ['error'],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/no-useless-constructor': ['error'],
    '@typescript-eslint/prefer-function-type': ['error'],
    '@typescript-eslint/prefer-includes': ['error'],
    '@typescript-eslint/prefer-literal-enum-member': ['error'],
    '@typescript-eslint/prefer-nullish-coalescing': ['error'],
    '@typescript-eslint/prefer-optional-chain': ['error'],
    '@typescript-eslint/prefer-readonly': ['error'],
    '@typescript-eslint/prefer-reduce-type-parameter': ['error'],
    '@typescript-eslint/prefer-string-starts-ends-with': ['error'],
    '@typescript-eslint/prefer-ts-expect-error': ['error'],
    '@typescript-eslint/promise-function-async': ['error'],
    '@typescript-eslint/require-array-sort-compare': ['error'],
    '@typescript-eslint/return-await': 'error',
    '@typescript-eslint/strict-boolean-expressions': ['error'],
    '@typescript-eslint/switch-exhaustiveness-check': ['error'],
    '@typescript-eslint/typedef': ['error'],
    '@typescript-eslint/unified-signatures': ['error']
  }
};

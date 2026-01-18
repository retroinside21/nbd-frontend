module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    React: true,
    JSX: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  rules: {
    /** Применять согласованный стиль разрыва строки */
    'linebreak-style': 2,
    /** Запретить использование переменных до их определения  */
    'no-use-before-define': 'off',
    // запретить объявления переменных из затенения переменных, объявленных во внешней области
    'no-shadow': 'off',
    // Установить максимальную длину строки
    'max-len': [
      'error',
      120,
      2,
      {
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    /** последовательное использование обратных, двойных или одинарных кавычек */
    quotes: ['error', 'single'],
    /** Требовать или запрещать точку с запятой вместо ASI */
    semi: 'off',
    /** Требовать let или const вместо var */
    'no-var': 'error',
    /** Требовать, чтобы вызовы require() помещались в область модуля верхнего уровня */
    'global-require': 'error',
    /** Запретить использование необъявленных переменных,
     если они не указаны в /*global комментариях. */
    'no-undef': 'error',
    /** Обеспечьте постоянный интервал внутри фигурных скобок */
    'object-curly-spacing': ['error', 'always'],
    /** Обеспечьте постоянный интервал внутри квадратных скобок */
    'array-bracket-spacing': ['error', 'never'],
    /** Запретить неиспользуемые переменные */
    'no-unused-vars': [
      'error',
      {
        args: 'none',
      },
    ],
    /** Запретить вложенные тернарные выражения */
    'no-nested-ternary': 'off',
    /** Требовать фигурные скобки вокруг тел функций стрелок */
    'arrow-body-style': 'off',
    /** Запретить указанный синтаксис */
    'no-restricted-syntax': [
      'error',
      'WithStatement',
      'BinaryExpression[operator="in"]',
    ],
    /** нет последних запятых в объекте... */
    'no-comma-dangle': 0,
    /** постоянный интервал между ключами и значениями в свойствах литерала объекта */
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        mode: 'strict',
      },
    ],
    /** постоянный интервал внутри круглых скобок */
    'space-in-parens': ['error', 'never'],
    /** Требовать объявления const для переменных,
     * которые никогда не переназначаются после объявления */
    'prefer-const': ['error'],
    /** Требовать литералы шаблонов вместо конкатенации строк */
    'prefer-template': ['error'],
    /** Требовать использования стрелочных функций для обратных вызовов */
    'prefer-arrow-callback': ['error'],
    /** отключить  camelcase в именовании переменных */
    camelcase: 'off',
    /** постоянный интервал до и после запятых */
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    /** Запретить несколько пробелов */
    'no-multi-spaces': ['error'],
    /** Требовать новую строку после каждого вызова в цепочке методов */
    'newline-per-chained-call': [
      'error',
      {
        ignoreChainWithDepth: 2,
      },
    ],
    /** Обеспечить объявление переменных вместе или по отдельности в функциях */
    'one-var': ['error', 'never'],
    /** Требовать или запрещать новые строки вокруг объявлений переменных */
    'one-var-declaration-per-line': ['error', 'always'],
    /** Обеспечить согласованный стиль скобок для блоков */
    'brace-style': 'error',
    /** Обеспечить минимальную и максимальную длину идентификатора */
    'id-length': [
      'error',
      {
        exceptions: ['i'],
      },
    ],
    /** использование консоли */
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    /** Это правило предотвращает случайную вставку символов,
     которые вы, возможно, имели в виду как escape-символы JSX,
     в качестве текстового узла в операторах JSX. */

    /** Принудительное размещение свойств объекта на отдельных строках */
    'object-property-newline': [
      'error',
      {
        allowAllPropertiesOnSameLine: false,
      },
    ],
    /** Применять согласованные разрывы строк после открытия и перед закрытием фигурных скобок */
    'object-curly-newline': [
      'error',
      {
        minProperties: 1,
      },
    ],
    /** Запретить переназначение параметров функции */
    'no-param-reassign': 'off',

    // Ограничение расширения файлов, которые могут содержать JSX
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    // Проверяет правила хуков
    'react-hooks/rules-of-hooks': 'error',
    /** Проверяет зависимости эффектов, отключим,
     т.к бывает что нужна только одна зависимость, а eslint ругается */
    'react-hooks/exhaustive-deps': 0,
    /** Проверка типа во время выполнения для React props и подобных объектов */
    'react/prop-types': 'off',
    /** Этот параметр проверяет определенный стиль отступа для JSX. */
    'react/jsx-indent': ['error', 2],
    /** Этот параметр проверяет определенный стиль отступа для props. */
    'react/jsx-indent-props': ['error', 2],
    /** DisplayName позволяет вам назвать ваш компонент.
     Это имя используется React в отладочных сообщениях. */
    'react/display-name': 0,
    /** Сообщает, является ли экспорт модуля по умолчанию безымянным */
    'react/no-unescaped-entities': 'off',
    'react/destructuring-assignment': 'off',
    'react/function-component-definition': 'off',
    /** ключ key для циклов в react */
    'react/no-array-index-key': 'warn',
    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 'off',

    /** Это правило позволяет применять соглашения для
     любого идентификатора, используя детализированные
     селекторы для создания подробного руководства по стилю */
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'snake_case', 'PascalCase', 'UPPER_CASE'],
      },
    ],
    '@typescript-eslint/semi': [2, 'never'],
    '@typescript-eslint/no-shadow': ['error'],
    // Требуются явные возвращаемые типы для функций и методов класса.
    '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/explicit-function-return-type': [
    //   'error',
    //   {
    //     // true, будут проверены только функции, которые являются частью объявления
    //     allowExpressions: true,
    //   },
    // ],
    // Запрещает использование переменных до их определения.
    '@typescript-eslint/no-use-before-define': ['error'],
    /** Запрещает операторы require, за исключением операторов импорта. Выключен */
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',

    // Список расширений файлов, которые будут проанализированы
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
    /** Когда есть только один экспорт из модуля, предпочтительнее использовать
     экспорт по умолчанию, а не именованный экспорт. */
    'import/prefer-default-export': 'off',
    /** Сообщить об использовании экспортированного имени в качестве
     * идентификатора экспорта по умолчанию */
    'import/no-named-as-default': 'off',
    /** возможен такой вариант require(`../${name}`); */
    'import/no-dynamic-require': 'off',
    /** Сообщает об использовании экспортированного имени в качестве
     *  свойства при экспорте по умолчанию. */
    'import/no-named-as-default-member': 'off',
    /** Гарантирует, что импортированный модуль может бытm
     преобразован в модуль в локальной файловой системе,
     как определено стандартным поведением Node require.resolve */
    'import/no-unresolved': 'off',
    /** Запретите импорт внешних модулей, которые не объявлены
     в зависимостях package.json, devDependencies, */
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
    }],
    /** отключена ошибка onClick на li */
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/no-static-element-interactions': 'warn',
    'jsx-a11y/label-has-associated-control': 'warn',
    'jsx-a11y/control-has-associated-label': 'warn',
    'react/react-in-jsx-scope': 'off',
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ['*.ts', '*.tsx'],
      rules: {
        // '@typescript-eslint/explicit-module-boundary-types': 'off',
        // надо чтобы работали экспорты enum'ов
        // https://github.com/typescript-eslint/typescript-eslint/issues/2621
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
      },
    },
  ],
}

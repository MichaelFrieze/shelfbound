//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'
// import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  ...tanstackConfig,
  {
    ignores: [
      '.nitro/**',
      '.tanstack/**',
      '.output/**',
      'dist/**',
      'node_modules/**',
    ],
  },
  {
    // plugins: {
    //   'react-refresh': reactRefresh,
    // },
    rules: {
      // 'react-refresh/only-export-components': [
      //   'warn',
      //   { allowConstantExport: true },
      // ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js built-in modules
            'external', // npm packages
            'internal', // @/ alias imports
            'parent', // ../
            'sibling', // ./
            'index', // ./index
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
]

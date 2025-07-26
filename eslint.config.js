//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

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
    rules: {
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
  // Special rule for TanStack Router files
  // {
  //   files: ['src/routes/**/*.tsx', 'src/routes/**/*.ts'],
  //   rules: {
  //     'import/order': [
  //       'error',
  //       {
  //         groups: [
  //           'builtin',
  //           'external',
  //           'internal',
  //           'parent',
  //           'sibling',
  //           'index',
  //         ],
  //         pathGroups: [
  //           {
  //             pattern: '@tanstack/react-router',
  //             group: 'external',
  //             position: 'before',
  //           },
  //           {
  //             pattern: '@/**',
  //             group: 'internal',
  //             position: 'before',
  //           },
  //         ],
  //         pathGroupsExcludedImportTypes: ['builtin'],
  //         'newlines-between': 'always',
  //         alphabetize: {
  //           order: 'asc',
  //           caseInsensitive: true,
  //         },
  //       },
  //     ],
  //   },
  // },
]

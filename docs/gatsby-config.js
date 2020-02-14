const themeOptions = require('@availity/gatsby-theme-docs/theme-options');

module.exports = {
  pathPrefix: '/sdk-js',
  plugins: [
    {
      // For compling `availity-react` modules
      resolve: `gatsby-plugin-compile-es6-packages`,
      options: {
        modules: [
          '@availity/page-header',
          '@availity/feedback',
          '@availity/icon',
          '@availity/spaces',
          '@availity/app-icon',
          '@availity/form',
          '@availity/select',
          '@availity/breadcrumbs',
          '@availity/spaces',
          '@availity/typography',
        ],
      },
    },
  ],
  __experimentalThemes: [
    {
      resolve: '@availity/gatsby-theme-docs',
      options: {
        ...themeOptions,
        root: __dirname,
        subtitle: 'SDK Resources',
        description: 'Documentation for Resources',
        gitRepo: 'availity/sdk-js',
        contentDir: 'docs/source',
        sidebarCategories: {
          null: ['index', 'contributing'],
          API: [
            'api/getting-started',
            'api/axios-resources',
            {
              resolve: 'api/definitions/index',
              pages: [
                'api/definitions/codes',
                'api/definitions/csv',
                'api/definitions/files',
                'api/definitions/logs',
                'api/definitions/navigation',
                'api/definitions/notifications',
                'api/definitions/organizations',
                'api/definitions/pdfs',
                'api/definitions/permissions',
                'api/definitions/providers',
                'api/definitions/regions',
                'api/definitions/settings',
                'api/definitions/spaces',
                'api/definitions/user-permissions',
                'api/definitions/users',
              ],
            },
            'api/authorizations',
            'api/downloads',
            'api/uploads',
          ],
          Features: [
            'features/analytics',
            'features/env-var',
            'features/messaging',
            'features/native-form',
            'features/relay-id',
            'features/resolve-url',
            'features/yup',
            'features/exceptions',
          ],
          Recipes: ['recipes/proxy'],
        },
      },
    },
  ],
};

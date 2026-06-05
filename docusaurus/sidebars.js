module.exports = {
  someSidebar: {
    'SDK-JS Docs': [
      'intro',
      {
        type: 'category',
        label: 'API Client',
        items: [
          'api/getting-started',
          'api/axios-resources',
          'api/authorizations',
          {
            type: 'category',
            label: 'API Definitions',
            items: [
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
              'api/definitions/telemetry',
              'api/definitions/user-permissions',
              'api/definitions/users',
            ],
          },
        ],
      },
      {
        type: 'category',
        label: 'File Handling',
        items: ['api/uploads', 'api/downloads', 'resources/native-form'],
      },
      {
        type: 'category',
        label: 'Analytics & Logging',
        items: ['resources/analytics', 'resources/exceptions'],
      },
      {
        type: 'category',
        label: 'Validation',
        items: ['resources/yup', 'resources/dockyard'],
      },
      {
        type: 'category',
        label: 'Utilities',
        items: [
          'resources/env-var',
          'resources/messaging',
          'resources/resolve-url',
          'resources/relay-id',
          'resources/user-activity-broadcaster',
        ],
      },
      {
        type: 'category',
        label: 'Recipes',
        items: [
          'recipes/proxy',
          'recipes/http-request',
          'recipes/organization-filtering',
          'recipes/cross-app-stash',
          'recipes/analytics-setup',
          'recipes/pagination',
        ],
      },
      {
        type: 'link',
        label: 'Contributing',
        href: 'https://github.com/Availity/sdk-js/blob/master/.github/CONTRIBUTING.md#contributing',
      },
    ],
  },
};

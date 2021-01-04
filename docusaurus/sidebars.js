module.exports = {
  someSidebar: {
    'SDK-JS Docs': [
      'intro',
      'contributing',
      {
        type: 'category',
        label: 'SDK Resources',
        items: [
          'resources/analytics',
          'resources/env-var',
          'resources/messaging',
          'resources/native-form',
          'resources/relay-id',
          'resources/resolve-url',
          'resources/yup',
          'resources/exceptions',
        ],
      },
      {
        type: 'category',
        label: 'API',
        items: [
          'api/getting-started',
          'api/axios-resources',
          {
            type: 'category',
            label: 'Definitions',
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
              'api/definitions/user-permissions',
              'api/definitions/users',
            ],
          },
          'api/authorizations',
          'api/downloads',
          'api/uploads',
        ],
      },
      {
        type: 'category',
        label: 'Recipes',

        items: ['recipes/proxy', 'recipes/httpRequest'],
      },
    ],
  },
};

const themeOptions = require('@availity/gatsby-theme/theme-options');

module.exports = {
  pathPrefix: '/sdk-js',
  __experimentalThemes: [
    {
      resolve: '@availity/gatsby-theme',
      options: {
        ...themeOptions,
        root: __dirname,
        subtitle: 'SDK Resources',
        description: 'Documentation for Resources',
        githubRepo: 'availity/sdk-js',
        sidebarCategories: {
          null: ['index', 'test'],
          Analytics: ['packages/analytics'],
        },
      },
    },
  ],
};

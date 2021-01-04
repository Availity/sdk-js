module.exports = {
  plugins: [],
  themes: [['@docusaurus/theme-search-algolia', { id: '01' }]], // FIXME: duplicate search routes being created
  onBrokenLinks: 'log',
  title: 'Availity SDK-JS Docs',
  tagline: 'Javascript SDK for Availity',
  url: 'https://availity.github.io/sdk-js',
  baseUrl: '/sdk-js/',
  favicon: 'img/favicon.ico',
  organizationName: 'availity', // Usually your GitHub org/user name.
  projectName: 'sdk-js', // Usually your repo name.
  themeConfig: {
    algolia: {
      apiKey: 'eec0154a008662c32d440b7de7982cd2',
      indexName: 'availity',
    },
    // announcementBar: {
    //   id: 'supportus',
    //   backgroundColor: '#e29f0d',
    //   textColor: 'black',
    //   content:
    //     '⭐️ If you like SDK-JS, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/availity/sdk-js">GitHub</a>! ⭐️',
    // },
    colorMode: {
      defaultMode: 'dark',

      // Should we use the prefers-color-scheme media-query,
      // using user system preferences, instead of the hardcoded defaultMode
      respectPrefersColorScheme: true,
    },

    navbar: {
      title: 'Availity Docs',
      logo: {
        alt: 'Availity Docs Logo',
        src: 'img/icon.png',
        href: 'https://availity.github.io',
        target: '_self',
      },
      items: [
        {
          href: 'https://availity.github.io/availity-react',
          target: '_self',
          label: 'React',
          position: 'right',
        },
        {
          to: '/', // availity.github.io/sdk-js, this repo
          target: '_self',
          label: 'SDK-JS',
          position: 'right',
        },
        {
          href: 'https://availity.github.io/availity-workflow',
          target: '_self',
          label: 'Workflow',
          position: 'right',
        },
        {
          href: 'https://github.com/availity/sdk-js',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {},
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/availity/sdk-js/edit/master/docusaurus/',
        },

        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

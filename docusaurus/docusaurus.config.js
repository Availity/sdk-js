module.exports = {
  plugins: [],
  themes: [['@docusaurus/theme-search-algolia', { id: '01' }]],
  onBrokenLinks: 'log',
  title: 'Availity Docs',
  tagline: 'Javascript SDK for Availity',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'availity', // Usually your GitHub org/user name.
  projectName: 'availity-sdk', // Usually your repo name.
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
    //     '⭐️ If you like Availity-Workflow, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/availity/availity-workflow">GitHub</a>! ⭐️',
    // },
    colorMode: { defaultMode: 'dark' },

    navbar: {
      title: 'Availity Docs',
      hideOnScroll: true,
      logo: {
        alt: 'Availity Docs Logo',
        src: 'img/icon.png',
      },
      items: [
        {
          to: 'http://localhost:3000', // needs to be updated once docs are deployed
          label: 'CLI',
          position: 'right',
        },
        {
          to: 'http://localhost:3001', // needs to be updated once docs are deployed

          class: 'active',
          label: 'SDK',
          position: 'right',
        },
        {
          to:
            'https://deploy-preview-571--stupefied-hypatia-4db77c.netlify.app/',

          label: 'React',
          position: 'right',
        },

        {
          href: 'https://github.com/availity',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/availity/availity-react/edit/feat/docusaurus-docs/docusaurus/',
        },

        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

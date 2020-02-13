module.exports = api => {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/env',
        {
          targets: {
            browsers: 'Last 2 Chrome versions, Firefox ESR',
            node: 'current',
          },
        },
      ],
      [
        'babel-preset-react-app',
        {
          absoluteRuntime: false,
          useESModules: false,
        },
      ],
    ],
    ignore: ['node_modules', '**/lib/*.test.js'],
  };
};

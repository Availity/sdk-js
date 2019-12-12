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
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-transform-destructuring',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-object-assign',
      '@babel/plugin-transform-regenerator',
      '@babel/plugin-transform-runtime',
      '@babel/plugin-transform-shorthand-properties',
      '@babel/plugin-proposal-class-properties',
    ],
    ignore: ['node_modules'],
  };
};

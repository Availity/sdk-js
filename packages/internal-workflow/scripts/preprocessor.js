const babel = require('babel-core');

module.exports = {
  process(src, filename) {
    if (babel.util && !babel.util.canCompile(filename)) {
      return src;
    }
    return babel.transform(src, {
      presets: [
        require.resolve('babel-preset-env'),
        require.resolve('babel-preset-stage-0'),
      ],
      sourceMaps: 'both',
    }).code;
  },
};

const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const Logger = require('availity-workflow-logger');

function build() {
  return rollup
    .rollup({
      entry: 'src/index.js',
      onwarn(message) {
        if (/external dependency/.test(message)) return;
        Logger.warn(message);
      },
      plugins: [
        babel({
          exclude: 'node_modules/**',
          babelrc: false,
          presets: [
            [
              require.resolve('babel-preset-env'),
              {
                modules: false,
              },
            ],
            require.resolve('babel-preset-stage-0'),
          ],
          plugins: [require.resolve('babel-plugin-external-helpers')],
        }),
      ],
    })
    .then(bundle => {
      return bundle
        .write({
          format: 'es',
          dest: 'dist/index.mjs',
        })
        .then(() => {
          bundle.write({
            format: 'cjs',
            dest: 'dist/index.js',
          });
        });
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = build;

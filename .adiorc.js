module.exports = {
  packages: ['packages/*'],
  ignore: {
    src: ['form-data', 'nock', 'xhr-mock'],
    devDependencies: ['typescript', 'tsup', 'axios', '@types/tus-js-client'],
    peerDependencies: ['axios'],
  },
  parser: {
    plugins: [
      'typescript',
      'optionalChaining',
      'numericSeparator',
      'classProperties',
      'classPrivateProperties',
      'classPrivateMethods',
    ],
  },
};

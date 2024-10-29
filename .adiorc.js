module.exports = {
  packages: ['packages/*'],
  ignore: {
    src: ['form-data', 'nock', 'xhr-mock', 'ts-jest', 'http', 'https', 'url', 'stream'],
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

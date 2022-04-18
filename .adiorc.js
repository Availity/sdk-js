module.exports = {
  packages: ['packages/*'],
  ignore: {
    devDependencies: true,
    peerDependencies: true,
  },
  parser: {
    plugins: [
      'optionalChaining',
      'numericSeparator',
      'classProperties',
      'classPrivateProperties',
      'classPrivateMethods',
    ],
  },
};

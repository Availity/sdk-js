const jest = require('jest-cli');
const Promise = require('bluebird');
const path = require('path');

function test(argv) {
  const options = {
    config: {
      rootDir: process.cwd(),
      transform: {
        '^.+\\.jsx?$': path.join(__dirname, 'preprocessor.js'),
      },
    },
  };
  if (argv.coverage || argv.reporters) {
    options.config.collectCoverage = true;
    options.config.collectCoverageFrom = ['src/**/*.js'];
    // options.config.coverageThreshold = {
    //   global: {
    //     functions: 100,
    //     lines: 100,
    //     branches: 50,
    //     statements: 75
    //   }
    // };
    if (argv.reporters && argv.reporters.length > 0) {
      options.config.coverageReporters = argv.reporters;
    }
  }

  return new Promise((resolve, reject) => {
    jest.runCLI(options, [options.config.rootDir], result => {
      if (result.numFailedTests || result.numFailedTestSuites) {
        reject('Tests failed');
      } else {
        resolve();
      }
    });
  });
}

module.exports = test;

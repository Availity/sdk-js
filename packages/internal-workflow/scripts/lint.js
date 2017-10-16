const globby = require('globby');
const Promise = require('bluebird');
const eslint = require('eslint');
const ora = require('ora');
const chalk = require('chalk');
const Logger = require('availity-workflow-logger');
const _ = require('lodash');

function lint(argv) {
  let engine;
  try {
    engine = new eslint.CLIEngine({
      useEslintrc: true
    });
  } catch (e) {
    return Promise.reject('ESLint configuration error in @availity/workflow');
  }

  Logger.info('Started linting');
  const spinner = ora('running linter rules');
  spinner.color = 'yellow';
  spinner.start();

  const files = _.uniq(_.compact(_.castArray(argv.include || `${process.cwd()}/src/**/*.js`)));

  return globby(files)
  .then(paths => {
    const report = engine.executeOnFiles(paths);
    spinner.stop();
    if (report.errorCount || report.warningCount) {
      const formatter = engine.getFormatter();
      Logger.simple(`${formatter(report.results)}`);
      Logger.failed('Failed linting');
      return Promise.reject(report.results);
    }
    Logger.success(`Finished linting ${chalk.magenta(paths.length)} file(s)`);
    return Promise.resolve('Finished linting');
  });
}

module.exports = lint;

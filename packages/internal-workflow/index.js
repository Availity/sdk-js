#! /usr/bin/env node

const yargs = require('yargs');
const chalk = require('chalk');

const lint = require('./scripts/lint');
const build = require('./scripts/build');
const test = require('./scripts/test');

yargs
  .usage(`\nUsage: ${chalk.yellow('av')} ${chalk.green('<command>')} ${chalk.magenta('[options]')}`)

  .command(
    'lint',
    `${chalk.dim('Lint source files using ESLint')}`,
    (yyargs) => {
      return yyargs
      .option('include', {
        alias: 'i',
        describe: 'Glob patterns to INCLUDE for ESLint scanning',
        array: true
      });
    }, (argv) => { lint(argv).catch(() => { /* noop */})}
  )
  .command('build', `${chalk.dim('Build project')}`, () => { build().catch(() => { /* noop */ }) })
  .command('test', `${chalk.dim(test.description)}`, yyargs => {
    return yyargs
      .option('coverage', {
        alias: 'c',
        describe: 'turn on code coverage',
        boolean: true
      })
      .option('reporters', {
        alias: 'r',
        describe: 'provide code coverage reporters',
        array: true
      });
  }, (argv) => { test(argv).catch(() => { /* noop */}) })

  .demand(1, chalk.red('Must provide a valid cli command'))

  .help('help')
  .alias('h', 'help')
  .showHelpOnFail(false, 'Specify --help for available options')

  .example(chalk.yellow('av start'))
  .example(chalk.yellow('av lint'))

  .argv;

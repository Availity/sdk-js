const { execSync } = require('child_process');

module.exports = plop => {
  plop.setHelper('userFullName', () => {
    const name = execSync(
      'git config --global --includes user.name'
    ).toString();
    return name.replace(/\n$/, '').trim();
  });

  plop.setHelper('userEmail', () => {
    const email = execSync(
      'git config --global --includes user.email'
    ).toString();
    return email.replace(/\n$/, '').trim();
  });

  plop.setGenerator('package', {
    description: 'Create new package in monorepo',
    prompts: [
      {
        type: 'input',
        name: 'packageName',
        message: 'package name',
      },
      {
        type: 'input',
        name: 'packageDescription',
        message: 'package description',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/{{kebabCase packageName}}/{{kebabCase packageName}}.js',
        templateFile: 'plop-templates/library/main.js.hbs',
      },
      {
        type: 'add',
        path:
          'packages/{{kebabCase packageName}}/{{kebabCase packageName}}.test.js',
        templateFile: 'plop-templates/library/main.test.js.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{kebabCase packageName}}/package.json',
        templateFile: 'plop-templates/library/package.json.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{kebabCase packageName}}/README.md',
        templateFile: 'plop-templates/library/README.md.hbs',
      },
    ],
  });
};

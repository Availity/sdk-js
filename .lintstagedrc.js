module.exports = {
  '*.js|ts': ['yarn nx affected --target=lint --fix --files', 'prettier --write'],
  '*.json': ['prettier --write'],
};

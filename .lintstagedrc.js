export default {
  '*.{js,ts}': ['eslint --fix', 'prettier --write'],
  '*.json': ['prettier --write'],
  '*.md': ['prettier --write'],
};

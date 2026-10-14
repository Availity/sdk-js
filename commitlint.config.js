export default {
  extends: ['@commitlint/config-conventional', '@commitlint/config-nx-scopes'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*)(?:\((.*)\))?!?:\s(.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },
  rules: {
    'scope-empty': [0, 'never'],
  },
};

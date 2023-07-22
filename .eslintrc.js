module.exports = {
  extends: ['plugin:prettier/recommended'],
  rules: {
    'max-len': ['error', { code: 120, ignoreComments: true, ignoreStrings: true }],
  },
};

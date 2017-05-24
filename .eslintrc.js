module.exports = {
  extends: ['airbnb'],
  plugins: ['import', 'immutable'],
  env: {
    es6: true,
    node: true,
  },
  rules: {
    'new-cap': 0,
    'no-console': 0,
    'no-underscore-dangle': 0,
    'no-duplicate-imports': 0,
    'no-mixed-operators': [2, { allowSamePrecedence: true }],
    'arrow-parens': [2, 'as-needed'],
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'immutable/no-let': 2,
    'immutable/no-this': 2,
    'immutable/no-mutation': 2,
  },
};

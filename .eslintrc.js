module.exports = {
    'env': {
        'node': true,
        'commonjs': true,
        'es6': true,
    },
    parserOptions: {
        ecmaVersion: 8
    },
    'rules': {
        'no-unused-expressions': 0,
        'indent': ['error', 4],
        'semi': ['error', 'never'],
        'no-multiple-empty-lines': ['error', { 'max': 1} ]
    },
    'plugins': [
        'mocha'
    ],
    'extends': [
        'plugin:mocha/recommended'
    ]
}
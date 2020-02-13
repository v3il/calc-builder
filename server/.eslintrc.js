module.exports = {
    root: true,
    env: {
        node: true,
        jest: true,
    },
    extends: ['plugin:vue/essential', '@vue/prettier'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        indent: ['error', 4, { SwitchCase: 1 }],
        'comma-dangle': 'off',
        quotes: ['warn', 'single'],
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                semi: true,
                trailingComma: 'all',
            },
        ],
        'vue/valid-v-for': 'off',
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
};

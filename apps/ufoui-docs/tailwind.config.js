const { join } = require('path');

module.exports = {
    content: [
        join(__dirname, 'app/**/*.{ts,tsx,mdx}'),
        join(__dirname, 'components/**/*.{ts,tsx}'),
        join(__dirname, 'examples/**/*.{ts,tsx}'),
        join(__dirname, '../../packages/ufoui/src/**/*.{ts,tsx}'),
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};

const plugin = require('tailwindcss/plugin');

module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [
        require('tailwindcss-animate'),
    ],
};
/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/{pages,components}/**/*.tsx'],
  theme: {
    screens: {
      '2xs': '380px',
      'xs': '460px',
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
};

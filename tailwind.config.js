/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      transitionTimingFunction: {
        'smooth-in': 'cubic-bezier(0.6, 0.01, -0.05, 0.95)',
      },
      screens: {
        '2xl': '1650px',
        '3xl': '1800px',
        '4xl': '1900px',
        'asp-1.6': { raw: '(max-aspect-ratio: 1.6/1)' },
        'asp-16/9': { raw: '(min-aspect-ratio: 16/9)' },
      },
      backgroundImage: {
        'main-background': 'url(background.webp)',
        linear:
          'linear-gradient(to right, rgba(5, 27, 59, 1),rgba(5, 27, 59,0.99),rgba(5, 27, 59,0.8), rgba(5, 27, 59,0.4))',
      },
      colors: {
        bg: '#E5DFDF',
        primary: {
          main: '#000916',
          lightest: '#DDE6FF',
          light: '#8CB2FF',
          dark: '#3861B2',
          darkest: '#211E36',
          silver: '#A3A3A3',
          gold: '#E4A30B',
          bronze: '#A76B4D',
        },
        secondary: {
          main: '#FF1A6C',
          lightest: '#DDE6FF',
          light: '#8CB2FF',
          dark: '#E73387',
          darkest: '#C51366',
          50: '#C84687',
        },
        tertiary: {
          main: '#05F29B',
          lightest: '#ADFFE1',
          light: '#5DFFC4',
          dark: '#07D086',
          darkest: '#04AE70',
        },
        quaternary: {
          main: '#F2C230',
          lightest: '#FFE79E',
          light: '#FFD965',
          dark: '#DAA913',
          darkest: '#C0940E',
        },
        neutral: {
          main: '#5E5B64',
          light: '#E8E8E8',
          dark: '#17202C',
          warning: '#B74737',
        },
        'off-white': {
          main: '#FAF6E7',
          light: '#FFFDF8',
          dark: '#C6C1AE',
        },
        success: '#17D1C6',
        error: {
          main: '#FF7D6A',
          light: '#FFA89B',
          dark: '#B74737',
        },
      },
    },
  },
  plugins: [],
};

const colors = require('tailwindcss/colors');


module.exports = {
  content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
  theme: {
    colors: {
      primary: {
        50: '#FFEEEE',
        100: '#FACDCD',
        200: '#F29B9B',
        300: '#E66A6A',
        400: '#D64545',
        500: '#BA2525',
        600: '#A61B1B',
        700: '#911111',
        800: '#780A0A',
        900: '#610404'
      },
      secondary: {
        50: '#FFFBEA',
        100: '#FFF3C4',
        200: '#FCE588',
        300: '#FADB5F',
        400: '#F7C948',
        500: '#F0B429',
        600: '#DE911D',
        700: '#CB6E17',
        800: '#B44D12',
        900: '#8D2B0B'
      },
      neutral: colors.gray,
      black: colors.black,
      white: colors.white,
      transparent: 'transparent',
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      lime: colors.lime,
      green: colors.green,
      teal: colors.teal,
      sky: colors.sky,
      indigo: colors.indigo,
      violet: colors.violet,
      fuchsia: colors.fuchsia,
      rose: colors.rose,
      yellow: colors.yellow,
      blue: colors.blue,
      emerald: colors.emerald,
      cyan: colors.cyan,
      slate: colors.slate,
      zinc: colors.zinc
    },
    extend: {
      animation: {
        'spin-slow': 'spin 45s ease infinite',
        'pulse-slow': 'pulse 5s ease infinite',
        'tilt': 'tilt 5s linear infinite',
        'blob' : 'blob 10s linear infinite',
      },
      keyframes: 
      {
        tilt: {
          "0%, 50%, 100%": {
            transform: "rotate(0deg)"
          },
          "25%": {
            transform: "rotate(2deg)"
          },
          "75%": {
            transform: "rotate(-2deg)"
          }
        },
        blob: {
          "0%": {
            transform: "translate(0px,0px) scale(1)"
          },
          "33%": {
            transform: "translate(30px,-50px) scale(1.1)"
          },
          "66%": {
            transform: "translate(-20px,20px) scale(0.9)"
          },
          "100%": {
            transform: "translate(0px,0px) scale(1)"
          }
        }
      },
      fontFamily: {
        'sans' : ['Barlow', 'Helvetica', 'Arial', 'sans-serif'],
        'title' : ['Noto Sans', 'Helvetica', 'Arial', 'sans-serif']
        },
        width: {
          '112' : '28rem',
          '138' : '32rem',
          '164' : '36rem',
          '246' : '54rem'
        },
        maxWidth: {
          '246' : '54rem'
        },
        height: {
          '112' : '28rem',
          '138' : '32rem',
        },
        lineHeight: {
          '12' : '3rem'
        }
    },
  },
  plugins: [],
 };
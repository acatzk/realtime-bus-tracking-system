const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: '#1f1b58',
        secondary: '#3f3a83'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('tailwindcss-scrollbar'),
    require('@tailwindcss/forms'),
    require('tw-elements/dist/plugin')
  ]
}

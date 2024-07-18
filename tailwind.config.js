/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        'youtube': '#e62117',
      },
    },
    fontFamily: {
      'roboto': ['Roboto'],
      'logo': ['Oswald'],
    },
    fontSize: {
      'xs': '0.75rem',
      'sm': '0.85rem',
      'dsc': '0.9rem',
      'base': '1rem',
      'xl': '1.3rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '5rem',
    }
  },
  plugins: [require('@tailwindcss/line-clamp')],
}


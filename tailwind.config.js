module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  content: [],
  theme: {
    fontFamily: {
      sans: ['Source Sans Pro', 'Arial', 'sans-serif'],
    },
    extend: {
      gridTemplateRows: {
        layout: '100px 1fr',
      },
    },
  },
  plugins: [],
}

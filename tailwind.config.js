module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Source Sans Pro', 'Arial', 'sans-serif'],
    },
    extend: {
      gridTemplateRows: {
        layout: '100px 1fr 80px',
        layoutAlt: '1fr 80px',
      },
      animation: {
        tilt: 'tilt 5s infinite linear',
        zoom: 'zoom 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        float: 'float 8s ease infinite',
      },
      keyframes: {
        tilt: {
          '0%, 50%, 100%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(1deg)',
          },
          '75%': {
            transform: 'rotate(-1deg)',
          },
        },
        zoom: {
          '0%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.25)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
        float: {
          '0%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}

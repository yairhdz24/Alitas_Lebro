/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{html,js{',
    './components/**/*.{html,js}',
  ],
  theme: {

    extend:{
      fontFamily: {
        'Lilita_One': ['"Lilita One"', 'sans-serif']
      },
      colors: {
        alitas_beige: '#fefbe8',
        alitas_obs_beige: '#e8d2a0',
        alitas_red: '#ef1a1b',
        alitas_obs_red: '#b6453d',
        alitas_black_red: '#571f1b',
        alitas_black: '#000000',
      },
    },
  },
  plugins: [],
}


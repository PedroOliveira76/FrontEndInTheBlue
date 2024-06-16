/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height:{
        'teste':'1000px'
      },
      screens: {
        'max-lg': { 'max': '1024px' },
        'max-lg-2':{'max': '1028px'},
        'max-lg-1070': {'max':'1070px'},
        'max-md-2': {'max':'820px'},
        'max-md': { 'max': '768px' },
        'max-sm': { 'max': '640px' },
        'max-425': {'max':'425px'}
      },
    },
  },
  plugins: [],
}


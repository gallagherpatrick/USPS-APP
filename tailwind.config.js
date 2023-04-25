/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html, js}"],
  theme: {
    extend: {    
      fontFamily:{
      'rambla': ['rambla', 'sans-serif']
    }},

  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}


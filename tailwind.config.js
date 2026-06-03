/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        concrete: '#E1E1DE',
        carbon: '#0C0C0C',
      },
      fontFamily: {
        display: ['Helvetica Neue Extended', 'Helvetica Neue', 'Arial', 'sans-serif'],
        ui: ['Akzidenz-Grotesk', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

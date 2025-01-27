/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
   
    
  
  ],
  darkMode:'class',
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'), // Agar daisyUI ka use kar rahe hain
  ],
}

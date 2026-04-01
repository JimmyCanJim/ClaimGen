import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
    daisyui: {
    themes: [
      {
        claimgen: {
          "primary": "#5d4037",       
          "secondary": "#a89078",     
          "accent": "#b45309",        
          "neutral": "#2d2424",       
          "base-100": "#fdfaf6",      // This is the paper color
          "base-200": "#f5f0e1",      
          "base-300": "#e7dfcc",      
          "base-content": "#2d2424",  // 👈 This is your Ink color
          
          "info": "#60a5fa",
          "success": "#15803d",
          "warning": "#d97706",
          "error": "#b91c1c", // Professional, slightly sharp buttons
        },
      },
    ],
  },
}
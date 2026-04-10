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
          "primary": "#5d4037",       // Coffee Brown
          "secondary": "#a89078",     // Tan
          "neutral": "#2d2424",       // Ink Brown
          "base-100": "#fdfaf6",      // Paper Beige
          "base-200": "#f5f0e1",      // Card Beige
          "base-content": "#2d2424",  // Standard Ink
          "--rounded-box": "0.5rem",
          "--rounded-btn": "0.3rem",  // 👈 This is your Ink color
          
          "info": "#60a5fa",
          "success": "#15803d",
          "warning": "#d97706",
          "error": "#b91c1c", // Professional, slightly sharp buttons
        },
      },
    ],
  },
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
            DEFAULT: '#0ea5e9', // Sky 500
            dark: '#0284c7',    // Sky 600
        },
        german: {
            yellow: '#eab308', // Yellow 500
            black: '#0f172a',  // Slate 900
            red: '#ef4444',    // Red 500
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

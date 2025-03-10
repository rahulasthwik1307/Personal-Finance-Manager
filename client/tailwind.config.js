module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#111827',
          secondary: '#1f2937',
          text: '#f3f4f6',
        },
        light: {
          primary: '#ffffff',
          secondary: '#f9fafb',
          text: '#111827',
        }
      },
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
        'transform': 'transform'
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#173F35',
          dark: '#102D27',
          light: '#235A4D',
          hover: '#1B473C',
        },
        ivory: {
          DEFAULT: '#F8F5EF',
          card: '#FFFFFF',
          dark: '#EFECE4',
          subtle: '#FAF8F3',
        },
        gold: {
          DEFAULT: '#C5A66B',
          light: '#DEC48F',
          dark: '#A6874E',
          accent: '#B89758',
        },
        charcoal: {
          DEFAULT: '#252A28',
          light: '#3C4240',
          dark: '#191D1C',
        },
        neutral: {
          grey: '#777D79',
          border: '#E2DFD7',
          muted: '#8D9490',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(23, 63, 53, 0.08)',
        'elevated': '0 10px 30px -4px rgba(23, 63, 53, 0.12)',
        'gold-glow': '0 0 15px rgba(197, 166, 107, 0.25)',
      },
    },
  },
  plugins: [],
};

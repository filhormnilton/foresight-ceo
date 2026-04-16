/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#e6fff9',
          100: '#b3ffe9',
          200: '#66ffd4',
          300: '#00ffb3',
          400: '#00e69a',
          500: '#00cc88',
          600: '#00996a',
          700: '#00664a',
          800: '#00332a',
          900: '#001a15',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}

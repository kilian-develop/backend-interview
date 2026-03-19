/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'es-blue': '#5b9cf5',
        'es-green': '#6bc98f',
        'es-red': '#f07070',
        'es-purple': '#b48efa',
        'es-orange': '#f0944a',
        'es-cyan': '#5ccfe6',
        'accent': '#f0c040',
        'accent-glow': 'rgba(240, 192, 64, 0.15)',
        'surface': 'var(--es-surface)',
        'surface-2': 'var(--es-surface-2)',
        'lab-bg': 'var(--es-lab-bg)',
        'border': 'var(--es-border)',
        'text': {
          DEFAULT: 'var(--es-text)',
          'dim': 'var(--es-text-dim)',
        },
      },
      fontFamily: {
        sans: ['var(--sans)', 'sans-serif'],
        mono: ['var(--mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        darkroom: {
          bg: '#121214',
          surface: '#1a1a1d',
          surface2: '#222226',
          border: '#2e2e32',
          muted: '#8a8a8a',
          text: '#e6e2d8',
          accent: '#556b54',
          accentLight: '#6d8a6b',
          accentDim: '#3a4a39',
        },
      },
      fontFamily: {
        serif: ['"QingSong"', '"LXGW WenKai"', '"Noto Serif SC"', 'serif'],
        body: ['"LXGW WenKai"', '"Noto Serif SC"', 'serif'],
        mono: ['"JetBrains Mono"', '"Courier New"', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
    },
  },
  plugins: [],
};

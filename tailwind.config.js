/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink:  { DEFAULT: '#080807', 900: '#0C0C0B', 800: '#131311', 700: '#1C1C19' },
        bone: { DEFAULT: '#EFEBE4', dim: '#B6B0A6', mute: '#7C766C' },
        sand: '#C2AD8E',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { mega: '0.42em', wide2: '0.22em' },
      keyframes: {
        marquee:  { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        grain:    { '0%,100%': { transform: 'translate(0,0)' }, '25%': { transform: 'translate(-2%,1%)' }, '50%': { transform: 'translate(1%,-2%)' }, '75%': { transform: 'translate(2%,2%)' } },
        riseIn:   { '0%': { opacity: 0, transform: 'translateY(24px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
      },
      animation: {
        marquee: 'marquee 60s linear infinite',
        grain: 'grain 8s steps(6) infinite',
        riseIn: 'riseIn 1s cubic-bezier(.16,1,.3,1) both',
      },
    },
  },
  plugins: [],
}

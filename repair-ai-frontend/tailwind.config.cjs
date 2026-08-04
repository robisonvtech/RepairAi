module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        card: '#101010',
        border: '#242424',
        primary: '#FF0000',
        secondary: '#B5B5B5',
        online: '#22C55E'
      },
      borderRadius: {
        lgp: '24px'
      },
      boxShadow: {
        neon: '0 10px 30px rgba(255,0,0,0.15), 0 0 60px rgba(255,0,0,0.05)'
      }
    }
  },
  plugins: []
}

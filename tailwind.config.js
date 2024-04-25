module.exports = {
  content: [
    './node_modules/flowbite-react/lib/**/*.js',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.tsx',
    './lib/**/*.tsx',
    './public/**/*.html'
  ],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/line-clamp'), require('flowbite/plugin')]
};

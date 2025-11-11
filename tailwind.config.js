/** @type {import('tailwindcss').Config} */
module.exports = {
  // O "content" diz ao NativeWind onde procurar por classes
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        text: 'var(--color-text)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        'input-bg': 'var(--color-input-bg)',
      }
    },
  },
  plugins: [],
};
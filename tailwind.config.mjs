/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        neon: '#00ff41',
        'neon-dim': '#00ff4133',
        'neon-mid': '#00ff4188',
        danger: '#ff0040',
        cyan: '#00f0ff',
        purple: '#b400ff',
        warn: '#ffe600',
        orange: '#ff6b00',
        bg: '#020a02',
        'bg-card': '#0a140a',
        'bg-card-hover': '#0f1f0f',
        border: '#00ff4115',
        text: '#c0ffc0',
        'text-dim': '#4a7a4a',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        fira: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};

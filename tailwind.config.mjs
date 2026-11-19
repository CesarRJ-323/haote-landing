/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx,astro}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-canvas)',
        foreground: 'var(--text-main)',
        primary: {
          DEFAULT: 'var(--accent-coral-action)',
          foreground: '#FFFFFF',
        },
        'muted-foreground': 'var(--text-muted)',
        canvas: 'var(--bg-canvas)',
        surface: 'var(--bg-surface)',
        subtle: 'var(--bg-subtle)',
        ink: 'var(--bg-ink)',
        'text-main': 'var(--text-main)',
        'text-muted': 'var(--text-muted)',
        'border-line': 'var(--border-line)',
        coral: {
          brand: 'var(--accent-coral-brand)',
          action: 'var(--accent-coral-action)',
          hover: 'var(--accent-coral-hover)',
          text: 'var(--accent-coral-text)',
          dark: 'var(--accent-coral-on-dark)',
        },
        sun: 'var(--accent-sun)',
      },
      fontFamily: {
        heading: ['Fredoka', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

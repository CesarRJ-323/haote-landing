/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Paleta Pastel Moderna (Inspirada en Roma Store + Opción 2 del usuario)
        pastel: {
          turquesa: '#4DD0E1', // Turquesa fresco
          rosa: '#F48FB1',      // Rosa chicle suave
          amarillo: '#FFE082',  // Amarillo manteca
          violeta: '#B39DDB',   // Violeta claro / Lavanda
          bg: '#F8F9FA',        // Gris muy claro / blanco roto
          surface: '#FFFFFF',   // Blanco puro
          border: '#E2E8F0',    // Borde suave
        },
        brand: {
          dark: '#1E293B',       // Slate 800 (texto principal nítido, no tech-neon)
          primary: '#4DD0E1',    // Turquesa pastel
          secondary: '#F48FB1',  // Rosa chicle pastel
          accent: '#FFE082',     // Amarillo manteca pastel
          lavender: '#B39DDB',   // Violeta claro pastel
          cream: '#FFFFFF',      // Blanco puro de base e-commerce
          bg: '#F8F9FA',         // Gris muy claro de fondo
          text: '#1E293B',       // Slate 800 para texto principal
          muted: '#64748B',      // Slate 500 para textos secundarios
          border: '#E2E8F0',     // Borde limpio de tienda real
          card: '#FFFFFF',
        },
      },
      fontFamily: {
        heading: ['Fredoka', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px 0 rgba(0, 0, 0, 0.04)',
        'soft': '0 4px 16px -2px rgba(0, 0, 0, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'soft-md': '0 10px 25px -4px rgba(0, 0, 0, 0.07), 0 4px 10px -2px rgba(0, 0, 0, 0.03)',
        'soft-lg': '0 18px 36px -6px rgba(0, 0, 0, 0.08), 0 8px 16px -4px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};


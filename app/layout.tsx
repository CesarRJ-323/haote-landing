import '@fontsource/fredoka/500.css';
import '@fontsource/fredoka/600.css';
import '@fontsource/fredoka/700.css';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/700.css';
import './globals.css';
import './motion.css';
import './polish.css';
import { SiteHeader } from '../src/components/site-header';
import { SiteFooter } from '../src/components/site-footer';
import { ScrollReveal } from '../src/components/ScrollReveal';
import { WhatsAppFloat } from '../src/components/whatsapp-float';

export const metadata = {
  title: 'Importadora Haote — Juguetes de moda al por mayor en Once',
  description: 'Catálogo mayorista de juguetes virales, coleccionables y productos de temporada. Pasteur 367, Once, CABA.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-main)] antialiased overflow-x-clip">
        <ScrollReveal />
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <WhatsAppFloat />
      </body>
    </html>
  );
}

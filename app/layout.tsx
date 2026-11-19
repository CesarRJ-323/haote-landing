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

export const metadata = { title: 'Importadora Haote — Juguetes de moda al por mayor', description: 'Catálogo beta de Importadora Haote.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body><ScrollReveal /><SiteHeader />{children}<SiteFooter /></body></html>;
}

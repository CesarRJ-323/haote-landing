'use client';

import Link from 'next/link';
import { businessFacts } from '../data/business-facts';

export function SiteFooter() {
  return (
    <footer id="contacto" className="bg-[var(--bg-ink)] text-white pt-16 pb-8 border-t border-[var(--border-line)]/20">
      <div className="page-shell">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-full bg-[var(--accent-coral-action)] text-white font-heading font-bold flex items-center justify-center text-sm">H</span>
                <span className="font-heading font-bold text-lg tracking-wider text-white">HAOTE IMPORTADORA</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">{businessFacts.brandTagline.value}</h2>
              <p className="text-sm text-slate-300 max-w-[380px] leading-relaxed">{businessFacts.description.value}</p>
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Navegación</h3>
            <ul className="flex flex-col gap-2.5 text-sm font-semibold text-slate-200">
              <li><Link href="/" className="hover:text-[var(--accent-coral-on-dark)] transition-colors">Inicio</Link></li>
              <li><Link href="/catalogo" className="hover:text-[var(--accent-coral-on-dark)] transition-colors">Catálogo Mayorista</Link></li>
              <li><a href="#categorias" className="hover:text-[var(--accent-coral-on-dark)] transition-colors">Categorías Destacadas</a></li>
              <li><a href="#garantias" className="hover:text-[var(--accent-coral-on-dark)] transition-colors">Garantías de Compra</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Depósito y Showroom</h3>
              <p className="text-sm text-slate-200 font-bold mb-1">{businessFacts.address.value}</p>
              <p className="text-xs text-slate-400 mb-4">{businessFacts.schedule.weekdays} · {businessFacts.schedule.saturday}</p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={businessFacts.googleMapsUrl.value} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white border border-white/20 px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors"><span>Cómo llegar en Google Maps</span><span>↗</span></a>
                <a href={businessFacts.whatsappUrl.value} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"><span>Consultar WhatsApp</span><span>↗</span></a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <span>© 2026 Importadora Haote. Todos los derechos reservados.</span>
          <span>Pasteur 367, Once, CABA · Despachos a todo el país</span>
        </div>
      </div>
    </footer>
  );
}

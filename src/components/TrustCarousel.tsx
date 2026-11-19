'use client';

import { Building2, MessageCircle, Package, Truck } from 'lucide-react';

const benefits = [
  { title: 'Packs Cerrados', detail: 'Precios directos por bulto', icon: Package },
  { title: 'Local en Once', detail: 'Pasteur 367, CABA', icon: Building2 },
  { title: 'Envíos al País', detail: 'Despacho ágil a expresos', icon: Truck },
  { title: 'Stock por WhatsApp', detail: 'Atención directa y rápida', icon: MessageCircle },
];

export function TrustCarousel() {
  return (
    <section id="garantias" className="bg-[var(--bg-ink)] text-white py-8 border-y border-[var(--border-line)]/20" aria-label="Beneficios mayoristas">
      <div className="page-shell">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8 md:grid-cols-4">
          {benefits.map(({ title, detail, icon: Icon }) => (
            <div key={title} className="flex items-center gap-3 sm:items-start">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[var(--accent-sun)]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <strong className="block text-sm font-bold leading-tight text-white sm:text-base">{title}</strong>
                <span className="block text-sm font-medium leading-5 text-slate-300 sm:text-xs">{detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

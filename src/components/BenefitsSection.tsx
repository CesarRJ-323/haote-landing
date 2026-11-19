'use client';

import { useRef } from 'react';

const benefits = [
  ['01', 'Productos que rotan', 'Personajes, coleccionables y juguetes virales elegidos para dinamizar tu vidriera y asegurar venta rápida.'],
  ['02', 'Packs que cuidan tu margen', 'Formatos por pack cerrado para acceder a precios de escala sin compras mínimas desmedidas.'],
  ['03', 'Pedido ágil por WhatsApp', 'Atención directa desde el depósito en Once para confirmar stock al instante y coordinar el despacho.'],
];

export function BenefitsSection() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (spotlightRef.current) {
      spotlightRef.current.style.transform = `translate3d(${x - 180}px, ${y - 180}px, 0)`;
      spotlightRef.current.style.opacity = '1';
    }
  };

  const handlePointerLeave = () => {
    if (spotlightRef.current) spotlightRef.current.style.opacity = '0';
  };

  return (
    <section className="section relative overflow-hidden border-y border-[var(--border-line)] bg-[var(--bg-subtle)]" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      <div ref={spotlightRef} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-0 h-[360px] w-[360px] rounded-full bg-[var(--accent-coral-brand)]/10 opacity-0 blur-3xl transition-opacity duration-300" />
      <div className="page-shell relative z-10">
        <div className="mb-10 max-w-[720px]">
          <span className="eyebrow block mb-2">Ventajas Mayoristas</span>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[var(--text-main)] leading-tight mb-3">El stock correcto cambia el negocio.</h2>
          <p className="text-base text-[var(--text-muted)] leading-relaxed">Selección curada de juguetes que conectan con lo que la gente busca hoy. Formatos por pack cerrado para cuidar tu margen y simplificar tu reposición.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {benefits.map(([number, title, description]) => (
            <article key={number} className="group rounded-2xl border border-[var(--border-line)] bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <span className="font-heading mb-3 block text-3xl font-bold text-[var(--accent-coral-text)]">{number}</span>
              <h3 className="font-heading mb-2 text-lg font-bold text-[var(--text-main)]">{title}</h3>
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { products } from '../data/products';
import { businessFacts } from '../data/business-facts';

export function HeroSection() {
  // Productos reales para las tarjetas flotantes en desktop (Spiderman y Stitch)
  const productA = products[0]; // Spiderman
  const productB = products[1]; // Stitch

  return (
    <section className="relative overflow-hidden bg-[var(--bg-canvas)] pt-6 pb-12 md:py-16">
      <div className="page-shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Columna Izquierda: Copy & Acciones (Escritorio 7 cols ~ 58%) */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10">
            {/* Eyebrow verificado */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-coral-action)]" aria-hidden="true" />
              <span className="eyebrow">
                MAYORISTA DE JUGUETES · ONCE, CABA
              </span>
            </div>

            {/* Titular: Máx 3 líneas en móvil, 2-3 en escritorio (nunca 5) */}
            <h1 className="font-heading text-[clamp(2.2rem,8.5vw,4.4rem)] font-bold text-[var(--text-main)] leading-[0.98] tracking-tight mb-4 text-balance">
              Lo que todos quieren.<br className="hidden sm:inline" /> Listo para tu negocio.
            </h1>

            {/* Subtítulo */}
            <p className="text-base sm:text-lg text-[var(--text-muted)] font-medium leading-relaxed max-w-[560px] mb-6 sm:mb-8 text-pretty">
              {businessFacts.description.value}
            </p>

            {/* Botones de Acción (Full width en móvil, inline en escritorio) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8">
              <Link
                href="/catalogo"
                className="button button-primary h-[52px] text-base shadow-md w-full sm:w-auto"
              >
                Explorar catálogo
              </Link>
              <a
                href={businessFacts.whatsappUrl.value}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-secondary h-12 text-sm sm:text-base w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5 text-[#25D366] flex-shrink-0"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
                </svg>
                <span>Pedir por WhatsApp</span>
              </a>
            </div>

            {/* Trust Row Legible (Mínimo 14px, iconos 18px SVG) */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm font-bold text-[var(--text-muted)] pt-4 border-t border-[var(--border-line)]/60">
              <span className="inline-flex items-center gap-2">
                <svg className="w-[18px] h-[18px] text-[var(--accent-coral-text)] flex-shrink-0" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Pasteur 367, Once</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <svg className="w-[18px] h-[18px] text-[var(--accent-coral-text)] flex-shrink-0" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span>Despachos a todo el país</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <svg className="w-[18px] h-[18px] text-[var(--accent-coral-text)] flex-shrink-0" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Lun–Vie 9 a 18 · Sáb 9 a 14</span>
              </span>
            </div>
          </div>

          {/* Columna Derecha: Bloque Visual con Foto del Depósito (Escritorio 5 cols ~ 42%) */}
          <div className="lg:col-span-5 relative w-full h-[260px] sm:h-[340px] lg:h-[480px]">
            <div className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden cut-angle-hero border border-[var(--border-line)] shadow-xl bg-[var(--bg-subtle)]">
              <Image
                src="/images/brand/warehouse-hero.png"
                alt="Depósito mayorista de juguetes Importadora Haote en Once"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center filter saturate-[0.9] contrast-[0.98]"
              />

              {/* Chips Flotantes sobre la Imagen */}
              <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[var(--border-line)] shadow-sm text-xs font-bold text-[var(--text-main)] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Packs cerrados</span>
              </div>

              <div className="absolute bottom-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[var(--border-line)] shadow-sm text-xs font-bold text-[var(--text-main)]">
                Stock en Once
              </div>
            </div>

            {/* Tarjetas de Producto Flotantes en Escritorio (Productos Reales Spiderman y Stitch) */}
            {productA && (
              <div className="hidden xl:flex items-center gap-3 absolute -bottom-6 -left-8 z-20 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-[var(--border-line)] shadow-xl max-w-[240px]">
                <div className="relative w-12 h-12 flex-shrink-0 bg-white rounded-lg p-1 border border-[var(--border-line)]">
                  <Image src={productA.image} alt={productA.name} fill className="object-contain" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-bold text-[var(--accent-coral-text)] uppercase tracking-wider">
                    {productA.badge || 'Más vendido'}
                  </span>
                  <span className="text-xs font-bold text-[var(--text-main)] truncate">
                    {productA.cleanName}
                  </span>
                  <strong className="text-xs font-heading text-[var(--text-main)]">
                    {productA.formattedPrice}
                  </strong>
                </div>
              </div>
            )}

            {productB && (
              <div className="hidden xl:flex items-center gap-3 absolute top-6 -right-6 z-20 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-[var(--border-line)] shadow-xl max-w-[220px]">
                <div className="relative w-12 h-12 flex-shrink-0 bg-white rounded-lg p-1 border border-[var(--border-line)]">
                  <Image src={productB.image} alt={productB.name} fill className="object-contain" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-bold text-[var(--accent-sun)] uppercase tracking-wider">
                    {productB.badge || 'Viral TikTok'}
                  </span>
                  <span className="text-xs font-bold text-[var(--text-main)] truncate">
                    {productB.cleanName}
                  </span>
                  <strong className="text-xs font-heading text-[var(--text-main)]">
                    {productB.formattedPrice}
                  </strong>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

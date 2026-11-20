'use client';

import Link from 'next/link';
import Image from 'next/image';
import { catalogProducts } from '../data/catalog';
import { ProductCard } from './product-card';
import { HeroSection } from './hero-section';
import { businessFacts } from '../data/business-facts';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { TrustCarousel } from './TrustCarousel';
import { BenefitsSection } from './BenefitsSection';

export function HomePage() {
  const topProducts = catalogProducts.slice(0, 4);
  const newProducts = catalogProducts.slice(4, 8);

  // 5 categorías destacadas con producto representativo
  const categoryHighlights = [
    {
      name: 'Lego y Bloques',
      count: '350+ modelos',
      image: '/images/products/lego-spiderman-x8.svg',
      href: `/catalogo?categoria=${encodeURIComponent('Lego y Bloques')}`,
    },
    {
      name: 'Personajes y Pop',
      count: '180+ figuras',
      image: '/images/products/pop-stitch.svg',
      href: `/catalogo?categoria=${encodeURIComponent('Personajes y Pop')}`,
    },
    {
      name: 'Peluches',
      count: '220+ modelos',
      image: '/images/products/peluche-spiderman.svg',
      href: `/catalogo?categoria=${encodeURIComponent('Peluches')}`,
    },
    {
      name: 'Verano',
      count: 'Lanzamiento',
      image: '/images/products/mochila-agua-verano.svg',
      href: `/catalogo?categoria=${encodeURIComponent('Verano')}`,
    },
    {
      name: 'Temporada y Fiestas',
      count: 'Edición especial',
      image: '/images/products/calendario-adviento.svg',
      href: `/catalogo?categoria=${encodeURIComponent('Temporada / Fiestas')}`,
    },
  ];

  return (
    <main className="w-full overflow-hidden">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Barra de Garantías Mayoristas (4 Pilares Verificados - Reemplaza al Ticker) */}
      <TrustCarousel />
      {/* Beneficios mayoristas */}
      {false && <section id="garantias" className="bg-[var(--bg-ink)] text-white py-8 border-y border-[var(--border-line)]/20">
        <div className="page-shell">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex items-start gap-3">
              <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[var(--accent-sun)]">
                <svg className="w-5 h-5 flex-shrink-0" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </span>
              <div>
                <strong className="block text-sm sm:text-base font-bold text-white leading-tight">
                  Packs Cerrados
                </strong>
                <span className="text-xs text-slate-300 font-medium">
                  Precios directos por bulto
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[var(--accent-sun)]">
                <svg className="w-5 h-5 flex-shrink-0" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </span>
              <div>
                <strong className="block text-sm sm:text-base font-bold text-white leading-tight">
                  Local en Once
                </strong>
                <span className="text-xs text-slate-300 font-medium">
                  Pasteur 367, CABA
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[var(--accent-sun)]">
                <svg className="w-5 h-5 flex-shrink-0" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
              </span>
              <div>
                <strong className="block text-sm sm:text-base font-bold text-white leading-tight">
                  Envíos al País
                </strong>
                <span className="text-xs text-slate-300 font-medium">
                  Despacho ágil a expresos
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[var(--accent-sun)]">
                <svg className="w-5 h-5 flex-shrink-0" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </span>
              <div>
                <strong className="block text-sm sm:text-base font-bold text-white leading-tight">
                  Stock por WhatsApp
                </strong>
                <span className="text-xs text-slate-300 font-medium">
                  Atención directa y rápida
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>}

      {/* 3. Comprar por Categoría (Recupera la navegación por categorías con imágenes reales) */}
      <section id="categorias" className="section bg-[var(--bg-canvas)]">
        <div className="page-shell">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="eyebrow block mb-2">Comprar por rubro</span>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[var(--text-main)]">Categorías Destacadas</h2>
            </div>
            <Link
              href="/catalogo"
              className="text-sm font-bold text-[var(--accent-coral-action)] hover:text-[var(--accent-coral-hover)] flex items-center gap-1"
            >
              <span>Ver todas las categorías</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {categoryHighlights.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group flex flex-col p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-line)] hover:border-[var(--accent-coral-action)]/40 hover:shadow-md transition-all"
              >
                <div className="relative w-full aspect-square bg-[var(--bg-subtle)]/50 rounded-xl mb-3 flex items-center justify-center p-3">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <strong className="font-heading text-sm sm:text-base font-bold text-[var(--text-main)] group-hover:text-[var(--accent-coral-action)] transition-colors leading-tight">
                  {cat.name}
                </strong>
                <span className="text-xs text-[var(--text-muted)] font-medium mt-1">
                  {cat.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. "Para Vender Mejor" (01 / 02 / 03 - Título Visible P0-1 Arreglado) */}
      <BenefitsSection />
      {false && <section className="section bg-[var(--bg-subtle)] border-y border-[var(--border-line)]">
        <div className="page-shell">
          <div className="max-w-[720px] mb-10">
            <span className="eyebrow block mb-2">Ventajas Mayoristas</span>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[var(--text-main)] leading-tight mb-3">El stock correcto cambia el negocio.</h2>
            <p className="text-base text-[var(--text-muted)] leading-relaxed">Selección curada de juguetes que conectan con lo que la gente busca hoy. Formatos por pack cerrado para cuidar tu margen y simplificar tu reposición.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[var(--border-line)] shadow-sm">
              <span className="font-heading text-3xl font-bold text-[var(--accent-coral-text)] block mb-3">
                01
              </span>
              <h3 className="font-heading text-lg font-bold text-[var(--text-main)] mb-2">
                Productos que rotan
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Personajes, coleccionables y juguetes virales elegidos para dinamizar tu vidriera y asegurar venta rápida.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[var(--border-line)] shadow-sm">
              <span className="font-heading text-3xl font-bold text-[var(--accent-coral-text)] block mb-3">
                02
              </span>
              <h3 className="font-heading text-lg font-bold text-[var(--text-main)] mb-2">
                Packs que cuidan tu margen
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Formatos por pack cerrado para acceder a precios de escala sin compras mínimas desmedidas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[var(--border-line)] shadow-sm">
              <span className="font-heading text-3xl font-bold text-[var(--accent-coral-text)] block mb-3">
                03
              </span>
              <h3 className="font-heading text-lg font-bold text-[var(--text-main)] mb-2">
                Pedido ágil por WhatsApp
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Atención directa desde el depósito en Once para confirmar stock al instante y coordinar el despacho.
              </p>
            </div>
          </div>
        </div>
      </section>}

      {/* 5. Los que más salen (Productos Top - Nombres Visibles P0-2 Arreglado) */}
      <section className="section bg-[var(--bg-canvas)]">
        <div className="page-shell">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="eyebrow block mb-2">Los más pedidos</span>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[var(--text-main)]">Productos Top de Alta Rotación</h2>
            </div>
            <Link
              href="/catalogo"
              className="text-sm font-bold text-[var(--accent-coral-action)] hover:text-[var(--accent-coral-hover)] flex items-center gap-1"
            >
              <span>Ver catálogo completo</span>
              <span>→</span>
            </Link>
          </div>

          <div className="product-grid">
            {topProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Recién llegados */}
      <section className="section bg-[var(--bg-canvas)] pt-0">
        <div className="page-shell">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="eyebrow block mb-2">Novedades en Depósito</span>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[var(--text-main)]">Recién Llegados a Once</h2>
            </div>
            <p className="text-sm text-[var(--text-muted)] max-w-[340px]">
              Ingresos de esta semana listos para despacho inmediato a todo el país.
            </p>
          </div>

          <div className="product-grid">
            {newProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Banner Final de Conversión (Reemplaza la franja amarilla P0-3 por fondo Navy + Contraste AA) */}
      <section className="relative bg-[var(--bg-ink)] text-white py-16 cut-angle my-8">
        <div className="page-shell">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-[620px]">
              <span className="eyebrow-dark block mb-2">
                ¿Listo para reponer tu local?
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white leading-tight mb-3">
                Armá tu próximo pedido mayorista hoy.
              </h2>
              <p className="text-base text-slate-300 font-medium">
                Consultá disponibilidad de packs, personajes y envíos directamente por WhatsApp.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
              <InteractiveHoverButton
                text="Ver Catálogo Completo"
                href="/catalogo"
                className="h-14 px-8 text-base font-bold shadow-xl bg-white text-[var(--text-main)] w-full sm:w-auto"
              />
              <a
                href={businessFacts.whatsappUrl.value}
                target="_blank"
                rel="noopener noreferrer"
                className="button h-14 text-sm px-6 bg-white/10 hover:bg-[#25D366] text-white border border-white/20 hover:border-transparent text-center flex items-center justify-center gap-2 transition-all duration-300 rounded-full font-bold"
              >
                <span>Pedir por WhatsApp</span>
                <span className="text-base">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

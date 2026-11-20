'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { businessFacts } from '../data/business-facts';
import type { CatalogProduct } from '../data/catalog';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CatalogProduct[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(1, Math.max(0, scrollY / totalHeight)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleAdd = (event: Event) => {
      const product = (event as CustomEvent<CatalogProduct>).detail;
      if (product) setCartItems((items) => [...items, product]);
    };
    window.addEventListener('haote:add-to-cart', handleAdd);
    return () => window.removeEventListener('haote:add-to-cart', handleAdd);
  }, []);

  const quantity = cartItems.length;
  const cartMessage = cartItems.length
    ? `¡Hola! Quiero consultar disponibilidad de estos packs:\n${cartItems
        .map((item) => `- ${item.cleanName || item.name} (${item.pack})`)
        .join('\n')}`
    : '¡Hola! Quiero consultar la lista de precios mayoristas de Importadora Haote.';
  const cartWhatsAppUrl = `${businessFacts.whatsappUrl.value}?text=${encodeURIComponent(cartMessage)}`;

  // Cerrar menú con ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header
        className={`site-header sticky top-0 z-40 transition-all duration-200 ${
          isScrolled ? 'is-scrolled h-[58px]' : 'h-[72px]'
        }`}
      >
        <div className="page-shell h-full flex items-center justify-between gap-4">
          {/* Logotipo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-coral-action)] rounded-lg p-1"
            aria-label="Haote Importadora, inicio"
          >
            <span className="w-8 h-8 rounded-full bg-[var(--accent-coral-action)] text-white font-heading font-bold text-lg flex items-center justify-center shadow-sm">
              H
            </span>
            <span className="flex flex-col leading-none">
              <strong className="font-heading text-base font-bold text-[var(--text-main)] tracking-wide">
                HAOTE
              </strong>
              <small className="text-[9px] font-bold text-[var(--text-muted)] tracking-widest uppercase">
                IMPORTADORA
              </small>
            </span>
          </Link>

          {/* Navegación Escritorio */}
          <nav
            id="main-navigation"
            className="hidden md:flex items-center gap-8 text-[15px] font-bold text-[var(--text-muted)]"
            aria-label="Navegación principal"
          >
            <Link href="/" className="hover:text-[var(--text-main)] transition-colors">
              Inicio
            </Link>
            <Link href="/catalogo" className="hover:text-[var(--text-main)] transition-colors">
              Catálogo
            </Link>
            <a href="#contacto" className="hover:text-[var(--text-main)] transition-colors">
              Contacto
            </a>
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Botón Carrito Compacto */}
            <button
              type="button"
              className="relative w-11 h-11 flex items-center justify-center rounded-full border border-[var(--border-line)] bg-white text-[var(--text-main)] hover:bg-[var(--bg-subtle)] transition-colors active:scale-95 shadow-sm"
              aria-expanded={cartOpen}
              aria-controls="cart-panel"
              aria-label={`Ver carrito, ${quantity} productos`}
              onClick={() => setCartOpen(true)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {quantity > 0 && (
                <span className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-[var(--accent-coral-action)] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {quantity}
                </span>
              )}
            </button>

            {/* Hamburguesa Móvil Accesible (48x48px) */}
            <button
              type="button"
              className="md:hidden w-12 h-12 flex items-center justify-center rounded-lg text-[var(--text-main)] hover:bg-[var(--bg-subtle)] transition-colors"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            >
              {open ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Barra de Progreso de Scroll Fina (2px) */}
        <div
          className="scroll-progress-bar w-full"
          style={{ transform: `scaleX(${scrollProgress})` }}
          aria-hidden="true"
        />
      </header>

      {/* Menú Desplegable Móvil */}
      {open && (
        <div
          id="mobile-navigation"
          className={`md:hidden fixed inset-x-0 z-30 bg-white/95 backdrop-blur-md border-b border-[var(--border-line)] p-6 shadow-xl ${
            isScrolled ? 'top-[58px]' : 'top-[72px]'
          }`}
        >
          <nav className="flex flex-col gap-4 text-base font-bold text-[var(--text-main)]">
            <Link
              href="/catalogo"
              onClick={closeMenu}
              className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-subtle)] text-[var(--accent-coral-action)] font-heading text-lg"
            >
              <span>Ver Catálogo Completo</span>
              <span>→</span>
            </Link>
            <Link href="/" onClick={closeMenu} className="p-2 hover:text-[var(--accent-coral-action)]">
              Inicio
            </Link>
            <a href="#categorias" onClick={closeMenu} className="p-2 hover:text-[var(--accent-coral-action)]">
              Categorías
            </a>
            <a href="#contacto" onClick={closeMenu} className="p-2 hover:text-[var(--accent-coral-action)]">
              Ubicación y Contacto
            </a>
            <div className="pt-2 border-t border-[var(--border-line)]">
              <a
                href={businessFacts.whatsappUrl.value}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-whatsapp w-full h-12 flex items-center justify-center gap-2 rounded-full"
              >
                <span>Consultar por WhatsApp</span>
              </a>
            </div>
          </nav>
        </div>
      )}

      {/* Carrito Panel Lateral */}
      {cartOpen && (
        <>
          <div
            className="cart-backdrop"
            onClick={() => setCartOpen(false)}
            aria-hidden="true"
          />
          <aside
            id="cart-panel"
            className="cart-panel"
            aria-label="Panel de pedido mayorista"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-line)]">
              <span className="font-heading text-xl font-bold text-[var(--text-main)]">
                Tu Pedido Mayorista
              </span>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--bg-subtle)] text-[var(--text-main)]"
                aria-label="Cerrar panel"
              >
                ✕
              </button>
            </div>

            <div className="py-6 flex-1 overflow-y-auto">
              <div className="p-4 rounded-xl bg-[var(--bg-subtle)] mb-4">
                <span className="text-xs font-bold text-[var(--accent-coral-text)] uppercase tracking-wider block mb-1">
                  Packs seleccionados
                </span>
                {quantity > 0 ? (
                  <ul className="mt-2 space-y-2 text-sm text-[var(--text-main)]">
                    {cartItems.map((item, index) => (
                      <li key={`${item.id}-${index}`} className="flex items-start justify-between gap-3">
                        <span>{item.cleanName || item.name}<span className="block text-xs text-[var(--text-muted)]">{item.pack}</span></span>
                        <button type="button" className="text-xs font-bold text-[var(--accent-coral-text)]" onClick={() => setCartItems((items) => items.filter((_, i) => i !== index))} aria-label={`Quitar ${item.cleanName || item.name}`}>Quitar</button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-[var(--text-muted)]">Todavía no agregaste packs.</p>
                )}
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Armá tu lista de packs y consultá disponibilidad de stock en tiempo real directamente por WhatsApp.
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--border-line)] flex flex-col gap-3">
              <a
                href={cartWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-primary w-full h-12"
              >
                Confirmar pedido por WhatsApp →
              </a>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="button button-secondary w-full h-10 text-xs"
              >
                Seguir explorando catálogo
              </button>
            </div>
          </aside>
        </>
      )}
    </>
  );
}

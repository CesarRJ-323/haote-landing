'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { businessFacts } from '../data/business-facts';
import type { CatalogProduct } from '../data/catalog';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CatalogProduct[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cartClosing, setCartClosing] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const openCart = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setCartClosing(false);
    setCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    if (!cartOpen) return;
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setCartClosing(true);
    closeTimerRef.current = setTimeout(() => {
      setCartOpen(false);
      setCartClosing(false);
      closeTimerRef.current = null;
    }, 220);
  }, [cartOpen]);

  // Cerrar menú con ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeCart]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
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
              onClick={openCart}
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
            className={`cart-backdrop${cartClosing ? ' is-closing' : ''}`}
            onClick={closeCart}
            aria-hidden="true"
          />
          <aside
            id="cart-panel"
            className={`cart-panel${cartClosing ? ' is-closing' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label="Panel de pedido mayorista"
          >
            <div className="cart-panel-header">
              <div>
                <span className="cart-kicker">Pedido mayorista</span>
                <h2 className="font-heading text-2xl font-bold text-[var(--text-main)]">
                  Tu selección
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="cart-close-button"
                aria-label="Cerrar panel"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="cart-panel-body">
              <div className="cart-summary-card">
                <div className="flex items-center justify-between gap-4">
                  <span className="cart-summary-label">Packs seleccionados</span>
                  <span className="cart-summary-count">{quantity}</span>
                </div>
                {quantity > 0 ? (
                  <ul className="cart-items-list">
                    {cartItems.map((item, index) => (
                      <li key={`${item.id}-${index}`} className="cart-item">
                        <div className="cart-item-image">
                          <Image src={item.image} alt="" fill sizes="56px" className="object-contain p-1" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="cart-item-name">{item.cleanName || item.name}</span>
                          <span className="cart-item-pack">{item.pack}</span>
                        </div>
                        <button
                          type="button"
                          className="cart-remove-button"
                          onClick={() => setCartItems((items) => items.filter((_, i) => i !== index))}
                          aria-label={`Quitar ${item.cleanName || item.name}`}
                        >
                          Quitar
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="cart-empty-state">
                    <span className="cart-empty-icon" aria-hidden="true">＋</span>
                    <p>Todavía no agregaste packs.</p>
                    <span>Explorá el catálogo y sumá productos a tu consulta.</span>
                  </div>
                )}
              </div>
              <p className="cart-helper-text">
                Armá tu lista y consultá disponibilidad de stock directamente por WhatsApp.
              </p>
            </div>

            <div className="cart-panel-footer">
              <a
                href={cartWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-primary cart-confirm-button w-full h-12"
              >
                Confirmar pedido por WhatsApp →
              </a>
              <button
                type="button"
                onClick={closeCart}
                className="button button-secondary w-full h-10 text-xs cart-continue-button"
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

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { businessFacts } from '../data/business-facts';
import type { CatalogProduct } from '../data/catalog';

type CartLine = CatalogProduct & { quantity: number };

const MINIMUM_PACKS = 3;
const TRUST_POINTS = [
  { icon: '▣', text: 'Pedido mínimo: 3 packs' },
  { icon: '⌁', text: 'Envíos a todo el país' },
  { icon: '◷', text: 'Respuesta rápida' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartLine[]>([]);
  const [businessName, setBusinessName] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');
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
    try {
      const saved = window.localStorage.getItem('haote-cart');
      if (saved) setCartItems(JSON.parse(saved) as CartLine[]);
      setBusinessName(window.localStorage.getItem('haote-cart-business') || '');
      setCity(window.localStorage.getItem('haote-cart-city') || '');
      setNotes(window.localStorage.getItem('haote-cart-notes') || '');
    } catch {
      // El carrito sigue funcionando aunque el almacenamiento no esté disponible.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem('haote-cart', JSON.stringify(cartItems));
      window.localStorage.setItem('haote-cart-business', businessName);
      window.localStorage.setItem('haote-cart-city', city);
      window.localStorage.setItem('haote-cart-notes', notes);
    } catch {
      // El carrito sigue funcionando aunque el almacenamiento no esté disponible.
    }
  }, [businessName, cartItems, city, notes]);

  useEffect(() => {
    const handleAdd = (event: Event) => {
      const product = (event as CustomEvent<CatalogProduct>).detail;
      if (!product) return;
      setCartItems((items) => {
        const existing = items.find((item) => item.id === product.id);
        if (existing) {
          return items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
        }
        return [...items, { ...product, quantity: 1 }];
      });
    };
    window.addEventListener('haote:add-to-cart', handleAdd);
    return () => window.removeEventListener('haote:add-to-cart', handleAdd);
  }, []);

  const quantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartMessage = cartItems.length
    ? `¡Hola! Quiero consultar disponibilidad de estos packs:\n${cartItems
        .map((item) => `- ${item.cleanName || item.name} (${item.pack}) x${item.quantity}`)
        .join('\n')}${businessName || city || notes ? `\n\nDatos de contacto:\n${businessName ? `- Negocio: ${businessName}\n` : ''}${city ? `- Ciudad: ${city}\n` : ''}${notes ? `- Notas: ${notes}` : ''}` : ''}`
    : '¡Hola! Quiero consultar la lista de precios mayoristas de Importadora Haote.';
  const cartWhatsAppUrl = `${businessFacts.whatsappUrl.value}?text=${encodeURIComponent(cartMessage)}`;
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const missingPacks = Math.max(0, MINIMUM_PACKS - quantity);
  const updateQuantity = (index: number, delta: number) => {
    setCartItems((items) => items.flatMap((item, itemIndex) => {
      if (itemIndex !== index) return [item];
      const nextQuantity = item.quantity + delta;
      return nextQuantity > 0 ? [{ ...item, quantity: nextQuantity }] : [];
    }));
  };

  const handleCartConfirm = () => {
    if (!cartItems.length) return;
    window.open(cartWhatsAppUrl, '_blank', 'noopener,noreferrer');
  };

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
    if (!cartOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [cartOpen]);

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
                  Tu Pedido Mayorista{quantity > 0 ? ` (${quantity})` : ''}
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
                        <span className="cart-item-price">{item.formattedPrice}</span>
                        <div className="cart-quantity-control" aria-label={`Cantidad de ${item.cleanName || item.name}`}>
                          <button type="button" onClick={() => updateQuantity(index, -1)} aria-label={`Quitar una unidad de ${item.cleanName || item.name}`}>−</button>
                          <span>{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(index, 1)} aria-label={`Agregar una unidad de ${item.cleanName || item.name}`}>+</button>
                        </div>
                        <button
                          type="button"
                          className="cart-remove-button"
                          onClick={() => setCartItems((items) => items.filter((_, i) => i !== index))}
                          aria-label={`Quitar ${item.cleanName || item.name}`}
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6m4-6v6M9 7V4h6v3m-9 0 1 13h8l1-13" /></svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="cart-empty-state">
                    <p>No hay ningún producto</p>
                  </div>
                )}
              </div>
              {quantity > 0 && <p className="cart-helper-text">
                Armá tu lista y consultá disponibilidad de stock directamente por WhatsApp.
              </p>}
              {quantity > 0 && (
                <>
                  <div className="cart-order-summary">
                    <span>{quantity} {quantity === 1 ? 'pack' : 'packs'}</span>
                    <strong>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(subtotal)}</strong>
                  </div>
                  <div className="cart-minimum-progress" aria-live="polite">
                    <div><span>{missingPacks ? `Te faltan ${missingPacks} ${missingPacks === 1 ? 'pack' : 'packs'} para el pedido mínimo` : 'Pedido mínimo alcanzado'}</span><span>{Math.min(100, quantity / MINIMUM_PACKS * 100)}%</span></div>
                    <span className="cart-progress-track"><span style={{ width: `${Math.min(100, quantity / MINIMUM_PACKS * 100)}%` }} /></span>
                  </div>
                  <div className="cart-fields">
                    <label>Nombre del negocio<input value={businessName} onChange={(event) => setBusinessName(event.target.value)} placeholder="Ej. Kiosco Once" /></label>
                    <label>Ciudad<input value={city} onChange={(event) => setCity(event.target.value)} placeholder="Ej. Buenos Aires" /></label>
                    <label>Notas<textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Algo que debamos saber" rows={2} /></label>
                  </div>
                </>
              )}
              {quantity > 0 && <div className="cart-trust-row">{TRUST_POINTS.map((point) => <span key={point.text}><b aria-hidden="true">{point.icon}</b>{point.text}</span>)}</div>}
            </div>

            <div className="cart-panel-footer">
              <button
                type="button"
                disabled={!cartItems.length}
                onClick={handleCartConfirm}
                className="button button-primary cart-confirm-button w-full h-12"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" /><path d="M9 9.5c.4 1.2 1.3 2.2 2.5 2.8.5.2 1 .4 1.4-.1l.5-.7c.2-.3.5-.3.8-.1l1.5.7c.3.2.4.5.2.8-.4.8-1.2 1.1-2 1-2.4-.4-4.8-2.4-5.5-4.7-.2-.8.1-1.6.8-2 .2-.1.5 0 .6.2l.7 1.4c.1.3.1.5-.1.7l-.4.5Z" /></svg>
                Confirmar pedido por WhatsApp
              </button>
              <button
                type="button"
                onClick={closeCart}
                className="button button-secondary w-full h-12 cart-continue-button"
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

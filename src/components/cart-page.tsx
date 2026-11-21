'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { businessFacts } from '../data/business-facts';
import { catalogProducts, type CatalogProduct } from '../data/catalog';

type CartLine = CatalogProduct & { quantity: number };
const MINIMUM_PACKS = 3;

export function CartPage() {
  const [items, setItems] = useState<CartLine[]>([]);
  const [cartHydrated, setCartHydrated] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('haote-cart');
      if (saved) setItems(JSON.parse(saved) as CartLine[]);
      setBusinessName(window.localStorage.getItem('haote-cart-business') || '');
      setCity(window.localStorage.getItem('haote-cart-city') || '');
      setNotes(window.localStorage.getItem('haote-cart-notes') || '');
      setCartHydrated(true);
    } catch {
      setCartHydrated(true);
    }
  }, []);

  const syncCart = (nextItems: CartLine[]) => {
    setItems(nextItems);
    try {
      window.localStorage.setItem('haote-cart', JSON.stringify(nextItems));
      window.dispatchEvent(
        new StorageEvent('storage', { key: 'haote-cart', newValue: JSON.stringify(nextItems) })
      );
    } catch {
      // storage quota or disabled
    }
  };

  useEffect(() => {
    if (!cartHydrated) return;
    try {
      window.localStorage.setItem('haote-cart-business', businessName);
      window.localStorage.setItem('haote-cart-city', city);
      window.localStorage.setItem('haote-cart-notes', notes);
    } catch {
      // ignore
    }
  }, [businessName, cartHydrated, city, notes]);

  const quantity = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const missingPacks = Math.max(0, MINIMUM_PACKS - quantity);

  const message = items.length
    ? `¡Hola! Quisiera realizar el siguiente pedido mayorista en Haote:\n\n${items
        .map(
          (item) =>
            `• ${item.cleanName || item.name}\n  ${item.pack} · ${item.quantity} ${
              item.quantity === 1 ? 'pack' : 'packs'
            } · ${item.formattedPrice} c/u (Subtotal: ${new Intl.NumberFormat('es-AR', {
              style: 'currency',
              currency: 'ARS',
              maximumFractionDigits: 0,
            }).format(item.price * item.quantity)})`
        )
        .join('\n\n')}\n\nTotal estimado: ${new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0,
      }).format(subtotal)}${
        businessName || city || notes
          ? `\n\nMis datos:\n${businessName ? `• Negocio/Contacto: ${businessName}\n` : ''}${
              city ? `• Localidad/Destino: ${city}\n` : ''
            }${notes ? `• Notas: ${notes}` : ''}`
          : ''
      }\n\n¿Me confirman disponibilidad para coordinar retiro o envío? ¡Gracias!`
    : '¡Hola! Quiero consultar el catálogo y lista de precios mayoristas de Importadora Haote.';

  const whatsappUrl = `${businessFacts.whatsappUrl.value}?text=${encodeURIComponent(message)}`;

  const updateQuantity = (index: number, delta: number) => {
    const next = items.flatMap((item, itemIndex) => {
      if (itemIndex !== index) return [item];
      const nextQty = item.quantity + delta;
      return nextQty > 0 ? [{ ...item, quantity: nextQty }] : [];
    });
    syncCart(next);
  };

  const removeItem = (index: number) => {
    const next = items.filter((_, itemIndex) => itemIndex !== index);
    syncCart(next);
  };

  const clearCart = () => {
    if (window.confirm('¿Querés vaciar todos los packs del pedido?')) {
      syncCart([]);
    }
  };

  const addRecommended = (product: CatalogProduct) => {
    const existing = items.find((item) => item.id === product.id);
    const next = existing
      ? items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      : [...items, { ...product, quantity: 1 }];
    syncCart(next);
  };

  return (
    <main className="cart-page">
      <div className="page-shell">
        {/* Encabezado con navegación de contexto */}
        <div className="cart-page-heading">
          <div>
            <div className="cart-badge-kicker">
              <span>DEPOSITO ONCE · PASTEUR 367</span>
              <span className="cart-kicker-dot" />
              <span>VENTA POR BULTO</span>
            </div>
            <h1 className="font-heading">
              Tu Pedido Mayorista{quantity > 0 ? ` (${quantity} ${quantity === 1 ? 'pack' : 'packs'})` : ''}
            </h1>
            <p>Revisá tus packs, completá los datos de tu comercio y coordiná el retiro o despacho por WhatsApp.</p>
          </div>
          <div className="cart-heading-actions">
            <Link href="/catalogo" className="cart-nav-back">
              ← Ver catálogo completo
            </Link>
            <Link href="/beta" className="cart-nav-beta">
              Mercado Mayorista (/beta) →
            </Link>
          </div>
        </div>

        {items.length ? (
          <div className="cart-page-layout">
            {/* Columna Izquierda: Lista de Packs */}
            <section className="cart-page-card" aria-labelledby="cart-items-title">
              <div className="cart-card-header">
                <div>
                  <h2 id="cart-items-title">Packs en tu pedido</h2>
                  <span className="cart-count-badge">
                    {quantity} {quantity === 1 ? 'pack' : 'packs'}
                  </span>
                </div>
                <button type="button" className="cart-clear-link" onClick={clearCart}>
                  🗑 Vaciar carrito
                </button>
              </div>

              <ul className="cart-items-list">
                {items.map((item, index) => {
                  const lineTotal = item.price * item.quantity;
                  return (
                    <li key={item.id} className="cart-item-row">
                      <div className="cart-item-thumb">
                        <Image
                          src={item.image}
                          alt={item.cleanName || item.name}
                          fill
                          sizes="90px"
                          className="object-contain p-2"
                        />
                      </div>

                      <div className="cart-item-details">
                        <div className="cart-item-cat-row">
                          <span className="cart-item-cat">{item.category}</span>
                          {item.badge && <span className="cart-item-badge">{item.badge}</span>}
                        </div>
                        <strong className="cart-item-title">{item.cleanName || item.name}</strong>
                        <div className="cart-item-meta">
                          <span>Formato: <strong>{item.pack}</strong></span>
                          <span className="cart-item-sep">·</span>
                          <span>Unitario: <strong>{item.unitPrice}</strong></span>
                        </div>
                      </div>

                      <div className="cart-item-stepper-wrap">
                        <span className="cart-stepper-label">Packs</span>
                        <div className="cart-stepper">
                          <button
                            type="button"
                            onClick={() => updateQuantity(index, -1)}
                            aria-label="Disminuir cantidad"
                            className="cart-stepper-btn"
                          >
                            −
                          </button>
                          <span className="cart-stepper-val">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(index, 1)}
                            aria-label="Aumentar cantidad"
                            className="cart-stepper-btn"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="cart-item-subtotal-wrap">
                        <span className="cart-subtotal-label">Subtotal</span>
                        <strong className="cart-item-subtotal">
                          {new Intl.NumberFormat('es-AR', {
                            style: 'currency',
                            currency: 'ARS',
                            maximumFractionDigits: 0,
                          }).format(lineTotal)}
                        </strong>
                        <small className="cart-unit-calc">
                          {item.formattedPrice} {item.quantity > 1 ? `x ${item.quantity}` : ''}
                        </small>
                      </div>

                      <button
                        type="button"
                        className="cart-delete-btn"
                        onClick={() => removeItem(index)}
                        title="Quitar pack"
                        aria-label={`Quitar ${item.cleanName || item.name}`}
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M4 7h16M10 11v6m4-6v6M9 7V4h6v3m-9 0 1 13h8l1-13" />
                        </svg>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="cart-wholesale-note">
                <span className="cart-note-icon">📦</span>
                <p>
                  <strong>Embalaje mayorista original:</strong> Todos los productos se preparan en bultos cerrados de fábrica para proteger su valor comercial y facilitar la reventa en tu local.
                </p>
              </div>
            </section>

            {/* Columna Derecha: Resumen de Pedido y Confirmación */}
            <aside className="cart-page-summary">
              <div className="cart-summary-header">
                <h2>Resumen del pedido</h2>
                <span className="cart-summary-badge">Mayorista</span>
              </div>

              {/* Barra de progreso de pedido mínimo */}
              <div className="cart-progress-box">
                <div className="cart-progress-header">
                  {missingPacks > 0 ? (
                    <span className="cart-progress-alert">
                      ⚠️ Te faltan <strong>{missingPacks} {missingPacks === 1 ? 'pack' : 'packs'}</strong> para el mínimo (3 packs)
                    </span>
                  ) : (
                    <span className="cart-progress-success">
                      ✓ ¡Pedido mínimo alcanzado!
                    </span>
                  )}
                  <span className="cart-progress-pct">
                    {Math.min(100, Math.round((quantity / MINIMUM_PACKS) * 100))}%
                  </span>
                </div>
                <div className="cart-progress-track">
                  <div
                    className={`cart-progress-bar ${missingPacks === 0 ? 'is-complete' : ''}`}
                    style={{ width: `${Math.min(100, (quantity / MINIMUM_PACKS) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Totales */}
              <div className="cart-breakdown">
                <div className="cart-breakdown-row">
                  <span>Cantidad total</span>
                  <strong>{quantity} {quantity === 1 ? 'pack' : 'packs'}</strong>
                </div>
                <div className="cart-breakdown-row">
                  <span>Entrega</span>
                  <span className="cart-delivery-hint">Retiro Once / Expreso</span>
                </div>
                <div className="cart-breakdown-total">
                  <div>
                    <span>Total estimado</span>
                    <small>Precios en depósito Pasteur</small>
                  </div>
                  <strong>
                    {new Intl.NumberFormat('es-AR', {
                      style: 'currency',
                      currency: 'ARS',
                      maximumFractionDigits: 0,
                    }).format(subtotal)}
                  </strong>
                </div>
              </div>

              {/* Formulario de contacto para el pedido */}
              <div className="cart-form-section">
                <h3 className="cart-form-title">Datos de tu negocio</h3>
                <div className="cart-form-fields">
                  <div className="cart-field">
                    <label htmlFor="cart-biz">
                      <span>🏪 Nombre del negocio / Contacto</span>
                    </label>
                    <input
                      id="cart-biz"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Ej: Juguetería Sol / Kiosco Once"
                    />
                  </div>
                  <div className="cart-field">
                    <label htmlFor="cart-city">
                      <span>📍 Ciudad / Localidad de entrega</span>
                    </label>
                    <input
                      id="cart-city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ej: Once, CABA / Rosario, Santa Fe"
                    />
                  </div>
                  <div className="cart-field">
                    <label htmlFor="cart-notes">
                      <span>📝 Notas o transporte preferido (opcional)</span>
                    </label>
                    <textarea
                      id="cart-notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ej: Retiramos hoy por Pasteur / Enviar por Expreso..."
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* Botón WhatsApp */}
              <button
                type="button"
                disabled={!items.length}
                onClick={() => window.open(whatsappUrl, '_blank', 'noopener,noreferrer')}
                className="cart-whatsapp-cta"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="cart-wa-icon">
                  <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" />
                  <path d="M9 9.5c.4 1.2 1.3 2.2 2.5 2.8.5.2 1 .4 1.4-.1l.5-.7c.2-.3.5-.3.8-.1l1.5.7c.3.2.4.5.2.8-.4.8-1.2 1.1-2 1-2.4-.4-4.8-2.4-5.5-4.7-.2-.8.1-1.6.8-2 .2-.1.5 0 .6.2l.7 1.4c.1.3.1.5-.1.7l-.4.5Z" />
                </svg>
                <div>
                  <span className="cart-wa-text">Confirmar pedido por WhatsApp</span>
                  <small className="cart-wa-sub">Reserva y verificación inmediata de stock en Once</small>
                </div>
              </button>

              {/* Beneficios mayoristas */}
              <div className="cart-trust-badges">
                <div className="cart-trust-badge">
                  <span>🚚</span>
                  <div>
                    <strong>Envíos a todo el país</strong>
                    <small>Despacho en 24/48 hs por expreso o transporte</small>
                  </div>
                </div>
                <div className="cart-trust-badge">
                  <span>📍</span>
                  <div>
                    <strong>Retiro en depósito Once</strong>
                    <small>Pasteur 367, Once, CABA (Lun a Vie 9 a 18 hs)</small>
                  </div>
                </div>
                <div className="cart-trust-badge">
                  <span>🧾</span>
                  <div>
                    <strong>Facturación oficial</strong>
                    <small>Emitimos Factura A y B</small>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          /* Estado Vacío Renovado */
          <div className="cart-empty-box">
            <div className="cart-empty-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-12 h-12">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
            <h2>Tu carrito mayorista está vacío</h2>
            <p>
              Todavía no agregaste ningún pack a tu pedido. Descubrí nuestras novedades virales, juguetes coleccionables y ofertas para abastecer tu local o negocio.
            </p>
            <div className="cart-empty-actions">
              <Link href="/catalogo" className="cart-btn-primary">
                Explorar catálogo completo →
              </Link>
              <Link href="/beta" className="cart-btn-secondary">
                Ver Mercado Mayorista /beta →
              </Link>
            </div>

            {/* Packs recomendados para empezar */}
            <div className="cart-recommended-section">
              <div className="cart-recommended-heading">
                <span className="eyebrow">Packs más solicitados</span>
                <h3>🔥 Juguetes de alta rotación para comenzar tu pedido:</h3>
              </div>
              <div className="cart-recommended-grid">
                {catalogProducts.slice(0, 4).map((prod) => (
                  <div key={prod.id} className="cart-rec-card">
                    <div className="cart-rec-image">
                      <Image
                        src={prod.image}
                        alt={prod.cleanName || prod.name}
                        fill
                        sizes="160px"
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="cart-rec-info">
                      <span className="cart-rec-category">{prod.category}</span>
                      <strong className="cart-rec-name">{prod.cleanName || prod.name}</strong>
                      <span className="cart-rec-pack">{prod.pack}</span>
                      <div className="cart-rec-price-row">
                        <span className="cart-rec-price">{prod.formattedPrice}</span>
                        <button
                          type="button"
                          className="cart-rec-add-btn"
                          onClick={() => addRecommended(prod)}
                        >
                          + Agregar pack
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}


'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, type CSSProperties, type TouchEvent } from 'react';
import { catalogCategories, catalogProducts } from '../data/catalog';
import type { CatalogProduct } from '../data/catalog';
import { siteConfig } from '../data/site.config';
import { businessFacts } from '../data/business-facts';

function BetaProductCard({
  product,
  added,
  onAdd,
  onSelect,
}: {
  product: CatalogProduct;
  added: boolean;
  onAdd: () => void;
  onSelect: () => void;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  return (
    <article
      className="beta-product-card"
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect();
        }
      }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setTilt({
          x: ((event.clientY - rect.top) / rect.height - 0.5) * -4,
          y: ((event.clientX - rect.left) / rect.width - 0.5) * 5,
        });
      }}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        cursor: 'pointer',
      }}
    >
      <div className="beta-product-image">
        {product.badge && <span>{product.badge}</span>}
        <Image
          src={product.image}
          alt={product.cleanName}
          fill
          sizes="(max-width: 640px) 44vw, (max-width: 1024px) 28vw, 220px"
          className="object-contain p-2"
        />
      </div>
      <div className="beta-product-info">
        <small>{product.category}</small>
        <h3>{product.cleanName}</h3>
        <p>{product.pack}</p>
        <div className="beta-price-row">
          <div>
            <strong>{product.formattedPrice}</strong>
            <span>{product.unitPrice}</span>
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onAdd();
            }}
            className={added ? 'is-added' : ''}
          >
            {added ? 'Agregado' : 'Agregar'}
          </button>
        </div>
      </div>
    </article>
  );
}

export function BetaMarketplacePage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');
  const [added, setAdded] = useState<string | null>(null);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [promoSlide, setPromoSlide] = useState(0);
  const [promoChanging, setPromoChanging] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);
  const [modalQty, setModalQty] = useState(1);
  const [modalAdded, setModalAdded] = useState(false);
  const promoTouchStart = useRef<number | null>(null);
  const promoChangeTimer = useRef<number | null>(null);
  const promoSlides = [
    {
      eyebrow: 'PROMOCIÓN MAYORISTA',
      title: 'Hasta 25% OFF en packs seleccionados',
      detail: 'Ofertas especiales para reponer tu negocio',
      image: '/images/products/minecraft-construccion.jpeg',
      accent: '#F6C744',
      cta: 'Ver promociones',
    },
    {
      eyebrow: 'DESCUENTOS EN PERSONAJES',
      title: 'Precios especiales por volumen',
      detail: 'Promos en figuras y coleccionables',
      image: '/images/products/figuras-futbol-pop.jpeg',
      accent: '#FF7B60',
      cta: 'Ver descuentos',
    },
    {
      eyebrow: 'OFERTAS DE TEMPORADA',
      title: 'Promos desde $6.500',
      detail: 'Elegí novedades con precio mayorista',
      image: '/images/products/peluches-stitch.jpeg',
      accent: '#5AA9FF',
      cta: 'Ver ofertas',
    },
  ];

  const realPhotoProducts = catalogProducts.filter((product) => product.image.endsWith('.jpeg'));

  useEffect(() => {
    document.body.classList.add('beta-mode');
    return () => document.body.classList.remove('beta-mode');
  }, []);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('haote-cart');
      const items = saved ? JSON.parse(saved) as Array<{ quantity?: number }> : [];
      setCartQuantity(items.reduce((total, item) => total + (item.quantity || 0), 0));
    } catch {
      setCartQuantity(0);
    }
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => changePromo((promoSlide + 1) % promoSlides.length), 6500);
    return () => window.clearInterval(timer);
  }, [promoSlide, promoSlides.length]);

  const visibleProducts = useMemo(() => realPhotoProducts.filter((product) => {
    const text = `${product.name} ${product.cleanName} ${product.category} ${product.pack}`.toLowerCase();
    return (category === 'Todos' || product.category === category) && text.includes(query.trim().toLowerCase());
  }), [category, query]);

  useEffect(() => {
    if (!selectedProduct) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProduct(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedProduct]);

  const handleAdd = (product: (typeof catalogProducts)[number], count: number = 1) => {
    try {
      const saved = window.localStorage.getItem('haote-cart');
      const items = saved ? JSON.parse(saved) as Array<(typeof catalogProducts)[number] & { quantity: number }> : [];
      const existing = items.find((item) => item.id === product.id);
      const nextItems = existing
        ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + count } : item)
        : [...items, { ...product, quantity: count }];
      window.localStorage.setItem('haote-cart', JSON.stringify(nextItems));
      setCartQuantity(nextItems.reduce((total, item) => total + item.quantity, 0));
      window.dispatchEvent(new StorageEvent('storage', { key: 'haote-cart', newValue: JSON.stringify(nextItems) }));
    } catch {
      window.dispatchEvent(new CustomEvent('haote:add-to-cart', { detail: product }));
    }
    setAdded(product.id);
    window.setTimeout(() => setAdded(null), 1400);
  };

  const changePromo = (nextSlide: number) => {
    if (promoChanging || nextSlide === promoSlide) return;
    setPromoChanging(true);
    if (promoChangeTimer.current !== null) window.clearTimeout(promoChangeTimer.current);
    promoChangeTimer.current = window.setTimeout(() => {
      setPromoSlide(nextSlide);
      setPromoChanging(false);
    }, 190);
  };

  const handlePromoTouchStart = (event: TouchEvent<HTMLElement>) => {
    promoTouchStart.current = event.touches[0]?.clientX ?? null;
  };

  const handlePromoTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const start = promoTouchStart.current;
    const end = event.changedTouches[0]?.clientX;
    promoTouchStart.current = null;
    if (start === null || end === undefined) return;
    const distance = end - start;
    if (Math.abs(distance) < 44) return;
    changePromo(distance < 0 ? (promoSlide + 1) % promoSlides.length : (promoSlide - 1 + promoSlides.length) % promoSlides.length);
  };

  return (
    <main className="beta-marketplace">
      <div className="beta-marketplace-bar">
        <div className="page-shell beta-marketplace-topline">
          <span>Venta mayorista de juguetes · Once, CABA</span>
          <span>Envíos a todo el país · Atención por WhatsApp</span>
        </div>
      </div>

      <section className="beta-marketplace-nav">
        <div className="page-shell beta-marketplace-nav-inner">
          <Link href="/" className="beta-marketplace-brand"><span>H</span><strong>HAOTE</strong><small>IMPORTADORA</small></Link>
          <label className="beta-search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar juguetes, personajes o categorías" aria-label="Buscar productos" /></label>
          <div className="beta-nav-actions"><Link href="/login" aria-label="Ir a mi cuenta"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.8-3.2 3.1-5 7-5s6.2 1.8 7 5" /></svg><span>Mi cuenta</span></Link><Link href="/carrito" className="beta-cart-link" aria-label={`Ir al carrito${cartQuantity ? `, ${cartQuantity} productos` : ''}`}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h2l2 12h10l2-8H7M10 21h.01M18 21h.01" /></svg><span>Pedido</span>{cartQuantity > 0 && <b className="beta-cart-count">{cartQuantity}</b>}</Link></div>
        </div>
      </section>

      <nav className="beta-category-nav" aria-label="Categorías rápidas">
        <div className="page-shell beta-category-inner">
          {['Todos', ...catalogCategories.filter((item) => item !== 'Todos')].map((item) => <Link key={item} href={item === 'Todos' ? '/catalogo' : `/catalogo?categoria=${encodeURIComponent(item)}`} className={category === item ? 'is-active' : ''}>{item}</Link>)}
        </div>
      </nav>

      <section className={`beta-promo-wrap${promoChanging ? ' is-changing' : ''}`} onTouchStart={handlePromoTouchStart} onTouchEnd={handlePromoTouchEnd} style={{ '--promo-accent': promoSlides[promoSlide].accent } as CSSProperties}>
        <button type="button" className="beta-promo-arrow beta-promo-arrow-left" onClick={() => changePromo((promoSlide - 1 + promoSlides.length) % promoSlides.length)} aria-label="Descuento anterior"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg></button>
        <div key={`copy-${promoSlide}`} className="beta-promo-copy beta-promo-slide-in">
          <span className="beta-promo-badge">{promoSlides[promoSlide].eyebrow}</span>
          <h1 className="font-heading">{promoSlides[promoSlide].title}</h1>
          <p>{promoSlides[promoSlide].detail}</p>
          <div className="beta-promo-actions">
            <Link href="#productos" className="beta-btn-primary">
              {promoSlides[promoSlide].cta}
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`¡Hola! Quiero consultar stock de ${promoSlides[promoSlide].title} en Haote.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="beta-btn-secondary"
            >
              Consultar stock
            </a>
          </div>
        </div>
        <div key={`art-${promoSlide}`} className="beta-promo-art beta-promo-slide-in">
          <div className="beta-promo-visual-frame">
            <Image
              src={promoSlides[promoSlide].image}
              alt="Producto destacado Haote"
              fill
              sizes="(max-width: 760px) 70vw, 480px"
              className="object-cover beta-promo-product"
            />
          </div>
          <div className="beta-promo-dots">
            {promoSlides.map((slide, index) => (
              <button
                type="button"
                key={slide.title}
                className={index === promoSlide ? 'is-active' : ''}
                onClick={() => changePromo(index)}
                aria-label={`Ver descuento ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <button type="button" className="beta-promo-arrow beta-promo-arrow-right" onClick={() => changePromo((promoSlide + 1) % promoSlides.length)} aria-label="Siguiente descuento"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg></button>
      </section>

      <section className="page-shell beta-recommendations" aria-label="Productos destacados">
        {realPhotoProducts.slice(0, 6).map((product) => (
          <article
            className="beta-recommendation-card"
            key={product.id}
            onClick={() => {
              setSelectedProduct(product);
              setModalQty(1);
            }}
            role="button"
            tabIndex={0}
            style={{ cursor: 'pointer' }}
          >
            <div className="beta-recommendation-image">
              <Image src={product.image} alt={product.cleanName} fill sizes="(max-width: 700px) 154px, 220px" className="object-cover p-0" />
            </div>
            <small>{product.category}</small>
            <strong>{product.cleanName}</strong>
            <span>{product.formattedPrice}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleAdd(product);
              }}
            >
              {added === product.id ? 'Agregado' : 'Agregar'}
            </button>
          </article>
        ))}
      </section>

      <section className="page-shell beta-trust-strip"><div><strong>Compra por pack</strong><span>Precios para reventa</span></div><div><strong>Stock real</strong><span>Consultá disponibilidad</span></div><div><strong>Despachos rápidos</strong><span>A todo el país</span></div><div><strong>Atención directa</strong><span>Por WhatsApp</span></div></section>

      <section className="page-shell beta-deals"><div><span>PACKS PARA TU NEGOCIO</span><strong>Elegí surtido, reponé rápido.</strong><a href="#productos">Ver ofertas →</a></div><div><span>PRODUCTOS DE TEMPORADA</span><strong>Lo nuevo ya llegó a Once.</strong><a href="#productos">Explorar →</a></div></section>

      <section id="productos" className="page-shell beta-products-section">
        <div className="beta-section-heading"><div><span className="eyebrow">Elegidos para vender</span><h2 className="font-heading">Productos de alta rotación</h2></div><span className="beta-results">{visibleProducts.length} productos</span></div>
        {visibleProducts.length ? (
          <div className="beta-product-grid">
            {visibleProducts.map((product) => (
              <BetaProductCard
                key={product.id}
                product={product}
                added={added === product.id}
                onAdd={() => handleAdd(product)}
                onSelect={() => {
                  setSelectedProduct(product);
                  setModalQty(1);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="beta-empty">No encontramos productos con esa búsqueda.</div>
        )}
      </section>

      {/* MODAL DETALLE DE PRODUCTO — ESTILO HAOTE */}
      {selectedProduct && (
        <div
          className="pd-backdrop"
          onClick={() => setSelectedProduct(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="pd-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="pd-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Cerrar detalle"
            >
              ✕
            </button>

            <div className="pd-body">
              {/* Imagen */}
              <div className="pd-visual">
                <div className="pd-img-wrap">
                  {selectedProduct.badge && (
                    <span className="pd-badge">{selectedProduct.badge}</span>
                  )}
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.cleanName}
                    fill
                    sizes="(max-width: 768px) 80vw, 400px"
                    className="object-contain p-6"
                    priority
                  />
                </div>
                <p className="pd-img-caption">📸 Foto real del depósito · Once, CABA</p>
              </div>

              {/* Información central */}
              <div className="pd-info">
                <span className="pd-category-tag">{selectedProduct.category}</span>

                <h2 className="pd-title">{selectedProduct.name || selectedProduct.cleanName}</h2>

                <div className="pd-stars-row">
                  <span className="pd-stars">★★★★★</span>
                  <span className="pd-reviews">142 reseñas · +500 vendidos</span>
                </div>

                <div className="pd-price-block">
                  <span className="pd-price-old">
                    ${Math.round(selectedProduct.price * 1.3).toLocaleString('es-AR')}
                  </span>
                  <div className="pd-price-row">
                    <span className="pd-price">{selectedProduct.formattedPrice}</span>
                    <span className="pd-off-pill">25% OFF</span>
                  </div>
                  <p className="pd-price-note">
                    Precio unitario: <strong>{selectedProduct.unitPrice}</strong> · Pack cerrado: <strong>{selectedProduct.pack}</strong>
                  </p>
                </div>

                <ul className="pd-features">
                  <li><span className="pd-feat-dot" />Mayorista · alta rotación y gran margen de reventa</li>
                  <li><span className="pd-feat-dot" />Materiales de primera calidad, terminación cuidada</li>
                  <li><span className="pd-feat-dot" />Listo para góndola, mostrador o catálogo online</li>
                  <li><span className="pd-feat-dot" />Despacho inmediato · Pasteur 367, Once, CABA</li>
                </ul>
              </div>

              {/* Caja de acción */}
              <div className="pd-action-box">
                <div className="pd-info-rows">
                  <div className="pd-info-row">
                    <span>🚚</span>
                    <div>
                      <p className="pd-info-label">Envío a todo el país</p>
                      <p className="pd-info-sub">Despacho en 24/48 hs desde Once</p>
                    </div>
                  </div>
                  <div className="pd-info-row">
                    <span>📍</span>
                    <div>
                      <p className="pd-info-label">Retiro gratis hoy</p>
                      <p className="pd-info-sub">Pasteur 367, Once · Lun–Vie 9–18 hs</p>
                    </div>
                  </div>
                </div>

                <div className="pd-stock-row">
                  <span className="pd-stock-dot" />
                  <span>Stock disponible · {selectedProduct.pack}</span>
                </div>

                <div className="pd-qty-row">
                  <label className="pd-qty-label" htmlFor="pd-qty-sel">Cantidad</label>
                  <select
                    id="pd-qty-sel"
                    value={modalQty}
                    onChange={(e) => setModalQty(Number(e.target.value))}
                    className="pd-qty-select"
                  >
                    {[1, 2, 3, 4, 5, 10, 20].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'pack' : 'packs'}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  className="pd-btn-cart"
                  onClick={() => {
                    handleAdd(selectedProduct, modalQty);
                    setModalAdded(true);
                    window.setTimeout(() => setModalAdded(false), 2000);
                  }}
                >
                  {modalAdded ? '✓ ¡Agregado al carrito!' : '🛒 Agregar al carrito'}
                </button>

                <div className="pd-seller">
                  <span className="pd-seller-avatar">H</span>
                  <div>
                    <strong>Haote Importadora</strong>
                    <span>+10 mil ventas · Factura A y B</span>
                  </div>
                </div>

                <div className="pd-guarantees">
                  <div className="pd-guarantee">
                    <span>↩</span>
                    <span>Devolución por fallas de fábrica</span>
                  </div>
                  <div className="pd-guarantee">
                    <span>🛡</span>
                    <span>Stock verificado en depósito</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="beta-footer">
        <div className="beta-footer-features">
          <div className="page-shell beta-footer-features-inner">
            <div className="beta-footer-feature-item">
              <span className="feature-icon" aria-hidden="true">📦</span>
              <div>
                <strong>Venta Mayorista</strong>
                <span>Packs cerrados y precios para reventa</span>
              </div>
            </div>
            <div className="beta-footer-feature-item">
              <span className="feature-icon" aria-hidden="true">🚚</span>
              <div>
                <strong>Envíos a Todo el País</strong>
                <span>Despachos rápidos desde Once</span>
              </div>
            </div>
            <div className="beta-footer-feature-item">
              <span className="feature-icon" aria-hidden="true">💬</span>
              <div>
                <strong>Atención por WhatsApp</strong>
                <span>Confirmación de stock en el momento</span>
              </div>
            </div>
            <div className="beta-footer-feature-item">
              <span className="feature-icon" aria-hidden="true">📍</span>
              <div>
                <strong>Local en Once</strong>
                <span>Pasteur 367, CABA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="page-shell beta-footer-main">
          <div className="beta-footer-grid">
            <div className="beta-footer-col beta-footer-brand-col">
              <div className="beta-marketplace-brand">
                <span>H</span>
                <strong>HAOTE</strong>
                <small>IMPORTADORA</small>
              </div>
              <p className="beta-footer-desc">
                Distribuidor mayorista de juguetes de moda, figuras coleccionables y novedades de alta rotación para comercios y revendedores.
              </p>
              <div className="beta-footer-badges">
                <span>Depósito Once</span>
                <span>Stock Real</span>
              </div>
            </div>

            <div className="beta-footer-col">
              <h4>Navegación</h4>
              <ul>
                <li><Link href="/">Inicio principal</Link></li>
                <li><Link href="/catalogo">Catálogo mayorista</Link></li>
                <li><a href="#productos">Productos destacados</a></li>
                <li><Link href="/carrito">Mi Pedido</Link></li>
                <li><Link href="/login">Mi cuenta</Link></li>
              </ul>
            </div>

            <div className="beta-footer-col">
              <h4>Depósito y Showroom</h4>
              <p className="beta-footer-address">
                <strong>Pasteur 367</strong>, Once, CABA, Buenos Aires
              </p>
              <p className="beta-footer-schedule">
                {businessFacts.schedule.weekdays} · {businessFacts.schedule.saturday}
              </p>
              <a
                href={businessFacts.googleMapsUrl.value}
                target="_blank"
                rel="noopener noreferrer"
                className="beta-footer-link-pill"
              >
                <span>Ver en Google Maps</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="beta-footer-col">
              <h4>Atención Mayorista</h4>
              <p className="beta-footer-contact-text">
                Consultá disponibilidad, armá tu pedido y cerrá la compra directo con nuestros asesores comerciales.
              </p>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('¡Hola! Me contacto desde el catálogo mayorista de Haote.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="beta-footer-whatsapp-btn"
              >
                <span>Escribinos por WhatsApp</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="beta-footer-bottom">
            <span>© 2026 Importadora Haote. Todos los derechos reservados.</span>
            <span>Pasteur 367, Once, CABA · Venta por bulto y pack</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, type CSSProperties, type TouchEvent } from 'react';
import { catalogCategories, catalogProducts } from '../data/catalog';
import type { CatalogProduct } from '../data/catalog';

function BetaProductCard({ product, added, onAdd }: { product: CatalogProduct; added: boolean; onAdd: () => void }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  return <article className="beta-product-card" onPointerMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); setTilt({ x: ((event.clientY - rect.top) / rect.height - .5) * -4, y: ((event.clientX - rect.left) / rect.width - .5) * 5 }); }} onPointerLeave={() => setTilt({ x: 0, y: 0 })} style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}><div className="beta-product-image">{product.badge && <span>{product.badge}</span>}<Image src={product.image} alt={product.cleanName} fill sizes="(max-width: 640px) 44vw, (max-width: 1024px) 28vw, 220px" className="object-contain p-2" /></div><div className="beta-product-info"><small>{product.category}</small><h3>{product.cleanName}</h3><p>{product.pack}</p><div className="beta-price-row"><div><strong>{product.formattedPrice}</strong><span>{product.unitPrice}</span></div><button type="button" onClick={onAdd} className={added ? 'is-added' : ''}>{added ? 'Agregado' : 'Agregar'}</button></div></div></article>;
}

export function BetaMarketplacePage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');
  const [added, setAdded] = useState<string | null>(null);
  const [promoSlide, setPromoSlide] = useState(0);
  const [promoChanging, setPromoChanging] = useState(false);
  const promoTouchStart = useRef<number | null>(null);
  const promoChangeTimer = useRef<number | null>(null);
  const promoSlides = [
    { eyebrow: 'PACKS DE ALTA ROTACIÓN', title: 'Hasta 25% OFF', detail: 'en juguetes que todos quieren', image: '/images/products/lego-spiderman-x8.svg', accent: 'var(--accent-sun)', cta: 'Ver packs' },
    { eyebrow: 'PERSONAJES Y POP', title: 'Precios especiales', detail: 'para reponer tu negocio', image: '/images/products/pop-stitch.svg', accent: 'var(--accent-coral-brand)', cta: 'Comprar personajes' },
    { eyebrow: 'TEMPORADA ACTIVA', title: 'Novedades desde $6.500', detail: 'stock listo para vender', image: '/images/products/mochila-agua-verano.svg', accent: 'var(--accent-blue)', cta: 'Ver novedades' },
  ];

  useEffect(() => {
    document.body.classList.add('beta-mode');
    return () => document.body.classList.remove('beta-mode');
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => changePromo((promoSlide + 1) % promoSlides.length), 6500);
    return () => window.clearInterval(timer);
  }, [promoSlide, promoSlides.length]);

  const visibleProducts = useMemo(() => catalogProducts.filter((product) => {
    const text = `${product.name} ${product.cleanName} ${product.category} ${product.pack}`.toLowerCase();
    return (category === 'Todos' || product.category === category) && text.includes(query.trim().toLowerCase());
  }), [category, query]);

  const handleAdd = (product: (typeof catalogProducts)[number]) => {
    window.dispatchEvent(new CustomEvent('haote:add-to-cart', { detail: product }));
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
          <div className="beta-nav-actions"><Link href="/login" aria-label="Ir a mi cuenta"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.8-3.2 3.1-5 7-5s6.2 1.8 7 5" /></svg><span>Mi cuenta</span></Link><Link href="/carrito" aria-label="Ir al carrito"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h2l2 12h10l2-8H7M10 21h.01M18 21h.01" /></svg><span>Pedido</span></Link></div>
        </div>
      </section>

      <nav className="beta-category-nav" aria-label="Categorías rápidas">
        <div className="page-shell beta-category-inner">
          {['Todos', ...catalogCategories.filter((item) => item !== 'Todos')].map((item) => <Link key={item} href={item === 'Todos' ? '/catalogo' : `/catalogo?categoria=${encodeURIComponent(item)}`} className={category === item ? 'is-active' : ''}>{item}</Link>)}
        </div>
      </nav>

      <section className={`beta-promo-wrap${promoChanging ? ' is-changing' : ''}`} onTouchStart={handlePromoTouchStart} onTouchEnd={handlePromoTouchEnd} style={{ '--promo-accent': promoSlides[promoSlide].accent } as CSSProperties}>
        <button type="button" className="beta-promo-arrow beta-promo-arrow-left" onClick={() => changePromo((promoSlide - 1 + promoSlides.length) % promoSlides.length)} aria-label="Descuento anterior"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg></button>
        <div key={`copy-${promoSlide}`} className="beta-promo-copy beta-promo-slide-in"><span className="eyebrow-dark">{promoSlides[promoSlide].eyebrow}</span><h1 className="font-heading">{promoSlides[promoSlide].title}</h1><p>{promoSlides[promoSlide].detail}</p><div className="beta-discount-chips"><strong>Precio mayorista</strong><span>Consultar stock</span></div><div className="beta-promo-actions"><Link href="#productos" className="button button-primary h-12">{promoSlides[promoSlide].cta}</Link></div></div>
        <div key={`art-${promoSlide}`} className="beta-promo-art beta-promo-slide-in"><div className="beta-art-orbit beta-art-orbit-one" /><div className="beta-art-orbit beta-art-orbit-two" /><Image src={promoSlides[promoSlide].image} alt="Producto destacado Haote" fill sizes="(max-width: 760px) 70vw, 480px" className="object-contain p-10 beta-promo-product" /><div className="beta-promo-dots">{promoSlides.map((slide, index) => <button type="button" key={slide.title} className={index === promoSlide ? 'is-active' : ''} onClick={() => changePromo(index)} aria-label={`Ver descuento ${index + 1}`} />)}</div></div>
        <button type="button" className="beta-promo-arrow beta-promo-arrow-right" onClick={() => changePromo((promoSlide + 1) % promoSlides.length)} aria-label="Siguiente descuento"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg></button>
      </section>

      <section className="page-shell beta-recommendations" aria-label="Productos destacados">
        {catalogProducts.slice(0, 6).map((product) => <article className="beta-recommendation-card" key={product.id}><div className="beta-recommendation-image"><Image src={product.image} alt="" fill sizes="(max-width: 700px) 154px, 220px" className="object-cover p-0" /></div><small>{product.category}</small><strong>{product.cleanName}</strong><span>{product.formattedPrice}</span><button type="button" onClick={() => handleAdd(product)}>{added === product.id ? 'Agregado' : 'Agregar'}</button></article>)}
      </section>

      <section className="page-shell beta-trust-strip"><div><strong>Compra por pack</strong><span>Precios para reventa</span></div><div><strong>Stock real</strong><span>Consultá disponibilidad</span></div><div><strong>Despachos rápidos</strong><span>A todo el país</span></div><div><strong>Atención directa</strong><span>Por WhatsApp</span></div></section>

      <section className="page-shell beta-deals"><div><span>PACKS PARA TU NEGOCIO</span><strong>Elegí surtido, reponé rápido.</strong><a href="#productos">Ver ofertas →</a></div><div><span>PRODUCTOS DE TEMPORADA</span><strong>Lo nuevo ya llegó a Once.</strong><a href="#productos">Explorar →</a></div></section>

      <section id="productos" className="page-shell beta-products-section">
        <div className="beta-section-heading"><div><span className="eyebrow">Elegidos para vender</span><h2 className="font-heading">Productos de alta rotación</h2></div><span className="beta-results">{visibleProducts.length} productos</span></div>
        {visibleProducts.length ? <div className="beta-product-grid">{visibleProducts.map((product) => <BetaProductCard key={product.id} product={product} added={added === product.id} onAdd={() => handleAdd(product)} />)}</div> : <div className="beta-empty">No encontramos productos con esa búsqueda.</div>}
      </section>
    </main>
  );
}

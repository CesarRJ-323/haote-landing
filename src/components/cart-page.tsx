'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { businessFacts } from '../data/business-facts';
import type { CatalogProduct } from '../data/catalog';

type CartLine = CatalogProduct & { quantity: number };
const MINIMUM_PACKS = 3;

export function CartPage() {
  const [items, setItems] = useState<CartLine[]>([]);
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
    } catch { /* El estado inicial vacío sigue siendo válido. */ }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('haote-cart', JSON.stringify(items));
    window.localStorage.setItem('haote-cart-business', businessName);
    window.localStorage.setItem('haote-cart-city', city);
    window.localStorage.setItem('haote-cart-notes', notes);
  }, [businessName, city, items, notes]);

  const quantity = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const missingPacks = Math.max(0, MINIMUM_PACKS - quantity);
  const message = items.length
    ? `¡Hola! Quiero consultar disponibilidad de estos packs:\n${items.map((item) => `- ${item.cleanName || item.name} (${item.pack}) x${item.quantity}`).join('\n')}${businessName || city || notes ? `\n\nDatos de contacto:\n${businessName ? `- Negocio: ${businessName}\n` : ''}${city ? `- Ciudad: ${city}\n` : ''}${notes ? `- Notas: ${notes}` : ''}` : ''}`
    : '¡Hola! Quiero consultar la lista de precios mayoristas de Importadora Haote.';
  const whatsappUrl = `${businessFacts.whatsappUrl.value}?text=${encodeURIComponent(message)}`;

  const updateQuantity = (index: number, delta: number) => {
    setItems((current) => current.flatMap((item, itemIndex) => {
      if (itemIndex !== index) return [item];
      const next = item.quantity + delta;
      return next > 0 ? [{ ...item, quantity: next }] : [];
    }));
  };

  return (
    <main className="cart-page">
      <div className="page-shell">
        <div className="cart-page-heading">
          <div>
            <span className="eyebrow">Pedido mayorista</span>
            <h1 className="font-heading">Tu Pedido Mayorista{quantity > 0 ? ` (${quantity})` : ''}</h1>
            <p>Revisá tus packs y envianos la consulta directamente por WhatsApp.</p>
          </div>
          <Link href="/catalogo" className="button button-secondary cart-page-back">← Seguir explorando catálogo</Link>
        </div>

        <div className="cart-page-layout">
          <section className="cart-page-card" aria-labelledby="cart-items-title">
            <div className="cart-page-card-heading"><h2 id="cart-items-title">Packs seleccionados</h2><span>{quantity}</span></div>
            {items.length ? (
              <ul className="cart-page-items">
                {items.map((item, index) => (
                  <li key={item.id} className="cart-page-item">
                    <div className="cart-page-item-image"><Image src={item.image} alt="" fill sizes="72px" className="object-contain p-1" /></div>
                    <div className="cart-page-item-info"><strong>{item.cleanName || item.name}</strong><span>{item.pack}</span></div>
                    <strong className="cart-page-item-price">{item.formattedPrice}</strong>
                    <div className="cart-quantity-control"><button type="button" onClick={() => updateQuantity(index, -1)} aria-label="Reducir cantidad">−</button><span>{item.quantity}</span><button type="button" onClick={() => updateQuantity(index, 1)} aria-label="Aumentar cantidad">+</button></div>
                    <button type="button" className="cart-remove-button" onClick={() => setItems((current) => current.filter((_, itemIndex) => itemIndex !== index))} aria-label={`Quitar ${item.cleanName || item.name}`}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6m4-6v6M9 7V4h6v3m-9 0 1 13h8l1-13" /></svg></button>
                  </li>
                ))}
              </ul>
            ) : <div className="cart-page-empty"><p>No hay ningún producto</p></div>}
          </section>

          <aside className="cart-page-summary">
            <h2>Resumen del pedido</h2>
            <div className="cart-order-summary"><span>{quantity} {quantity === 1 ? 'pack' : 'packs'}</span><strong>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(subtotal)}</strong></div>
            <div className="cart-minimum-progress"><div><span>{missingPacks ? `Te faltan ${missingPacks} ${missingPacks === 1 ? 'pack' : 'packs'} para el pedido mínimo` : 'Pedido mínimo alcanzado'}</span><span>{Math.min(100, quantity / MINIMUM_PACKS * 100)}%</span></div><span className="cart-progress-track"><span style={{ width: `${Math.min(100, quantity / MINIMUM_PACKS * 100)}%` }} /></span></div>
            <div className="cart-fields">
              <label>Nombre del negocio<input value={businessName} onChange={(event) => setBusinessName(event.target.value)} placeholder="Ej. Kiosco Once" /></label>
              <label>Ciudad<input value={city} onChange={(event) => setCity(event.target.value)} placeholder="Ej. Buenos Aires" /></label>
              <label>Notas<textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Algo que debamos saber" rows={3} /></label>
            </div>
            <button type="button" disabled={!items.length} onClick={() => window.open(whatsappUrl, '_blank', 'noopener,noreferrer')} className="button button-primary cart-confirm-button w-full h-12"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" /><path d="M9 9.5c.4 1.2 1.3 2.2 2.5 2.8.5.2 1 .4 1.4-.1l.5-.7c.2-.3.5-.3.8-.1l1.5.7c.3.2.4.5.2.8-.4.8-1.2 1.1-2 1-2.4-.4-4.8-2.4-5.5-4.7-.2-.8.1-1.6.8-2 .2-.1.5 0 .6.2l.7 1.4c.1.3.1.5-.1.7l-.4.5Z" /></svg>Confirmar pedido por WhatsApp</button>
          </aside>
        </div>
      </div>
    </main>
  );
}

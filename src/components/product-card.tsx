'use client';
import type { CatalogProduct } from '../data/catalog';
import LetterWave from './LetterWave';

export function ProductCard({product}:{product:CatalogProduct}){
  const addToCart=()=>window.dispatchEvent(new CustomEvent('haote:add-to-cart'));
  return <article className="product-card"><div className="product-visual"><span className="product-mark">H</span></div><div className="product-copy"><div className="product-meta"><span>{product.category}</span>{product.badge&&<b>{product.badge}</b>}</div><LetterWave as="h3" text={product.cleanName} className="product-title" /><p>{product.pack}</p><strong>{product.formattedPrice}</strong><button className="product-add" onClick={addToCart}>Agregar al carrito</button></div></article>
}

'use client';
import Image from 'next/image';
import type { CatalogProduct } from '../data/catalog';

export function ProductCard({ product }: { product: CatalogProduct }) {
  const addToCart = () => {
    window.dispatchEvent(new CustomEvent('haote:add-to-cart', { detail: product }));
  };

  return (
    <article className="product-card flex flex-col h-full bg-[var(--bg-surface)] border border-[var(--border-line)] rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      {/* Contenedor Visual con Foto Real */}
      <div className="product-visual relative w-full aspect-square bg-white flex items-center justify-center p-4 border-b border-[var(--border-line)]">
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 px-2.5 py-1 text-xs font-bold rounded-full bg-[var(--accent-sun)] text-[var(--text-main)] shadow-sm">
            {product.badge}
          </span>
        )}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Cuerpo y Metadatos */}
      <div className="product-copy flex flex-col flex-1 p-4">
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
          {product.category}
        </span>
        
        {/* Nombre visible del producto (Resuelve P0-2) */}
        <h3 className="product-title font-heading text-base font-bold text-[var(--text-main)] line-clamp-2 min-h-[44px] mb-2 leading-tight">
          {product.cleanName || product.name}
        </h3>

        <p className="text-xs text-[var(--text-muted)] font-medium mb-3">
          {product.pack}
        </p>

        {/* Bloque de Precios y Botón anclados al fondo (Alineación perfecta) */}
        <div className="mt-auto pt-2 border-t border-[var(--border-line)]/50">
          <div className="flex items-baseline justify-between gap-2 mb-3">
            <strong className="font-heading text-xl font-bold text-[var(--text-main)]">
              {product.formattedPrice}
            </strong>
            {product.unitPrice && (
              <span className="text-xs text-[var(--text-muted)] font-medium">
                {product.unitPrice}
              </span>
            )}
          </div>

          <button
            type="button"
            className="button-add w-full h-11 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent-coral-action)] hover:bg-[var(--accent-coral-hover)] text-white text-sm font-bold tracking-wide transition-colors active:scale-95 shadow-sm"
            onClick={addToCart}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </article>
  );
}

'use client';

import { useEffect, useMemo, useState } from 'react';
import { catalogCategories, catalogProducts } from '../data/catalog';
import { ProductCard } from './product-card';

export function CatalogPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');
  const [sort, setSort] = useState('featured');

  useEffect(() => {
    const requestedCategory = new URLSearchParams(window.location.search).get('categoria');
    if (requestedCategory && catalogCategories.includes(requestedCategory)) {
      setCategory(requestedCategory);
    }
  }, []);

  const filtered = useMemo(
    () =>
      catalogProducts
        .filter(
          (p) => {
            const normalizedQuery = query.trim().toLowerCase();
            const searchableText = [p.name, p.cleanName, p.category, p.pack, p.badge]
              .filter(Boolean)
              .join(' ')
              .toLowerCase();

            return (
              (category === 'Todos' || p.category === category) &&
              searchableText.includes(normalizedQuery)
            );
          }
        )
        .sort((a, b) =>
          sort === 'price-low'
            ? a.price - b.price
            : sort === 'price-high'
            ? b.price - a.price
            : 0
        ),
    [query, category, sort]
  );

  return (
    <main className="py-8 sm:py-12 bg-[var(--bg-canvas)]">
      <div className="page-shell">
        {/* Cabecera del Catálogo */}
        <div className="pb-8 mb-8 border-b border-[var(--border-line)] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="eyebrow block mb-2">Catálogo Mayorista</span>
            <h1 className="font-heading text-3xl sm:text-5xl font-bold text-[var(--text-main)] leading-tight">
              Stock Mayorista en Once
            </h1>
          </div>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-[420px] leading-relaxed">
            Explorá nuestra selección por categoría, buscá por personaje o armá tu pedido directo por bulto cerrado.
          </p>
        </div>

        {/* Barra de Búsqueda y Orden */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="relative w-full sm:max-w-md">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-base">
              ⌕
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por personaje, juguete o categoría..."
              className="w-full h-11 pl-9 pr-4 rounded-xl border border-[var(--border-line)] bg-white text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-coral-action)]"
              aria-label="Buscar productos"
            />
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="sort-select" className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
              Ordenar por:
            </label>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-10 px-3 rounded-lg border border-[var(--border-line)] bg-white text-xs font-bold text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-coral-action)]"
            >
              <option value="featured">Destacados</option>
              <option value="price-low">Precio: menor a mayor</option>
              <option value="price-high">Precio: mayor a menor</option>
            </select>
          </div>
        </div>

        {/* Layout Catálogo: Sidebar de Categorías + Grilla */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Categorías (Pills en móvil, Sidebar en desktop) */}
          <aside className="lg:col-span-3">
            <div className="sticky top-20">
              <h2 className="hidden lg:block font-heading text-lg font-bold text-[var(--text-main)] mb-3 pb-2 border-b border-[var(--border-line)]">
                Categorías
              </h2>
              <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
                {catalogCategories.map((item) => {
                  const isActive = category === item;
                  const count =
                    item === 'Todos'
                      ? catalogProducts.length
                      : catalogProducts.filter((p) => p.category === item).length;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCategory(item)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap text-left ${
                        isActive
                          ? 'bg-[var(--accent-coral-action)] text-white shadow-sm'
                          : 'bg-white lg:bg-transparent border lg:border-0 border-[var(--border-line)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white'
                      }`}
                    >
                      <span>{item}</span>
                      <span
                        className={`ml-2 px-2 py-0.5 rounded-full text-[10px] ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-[var(--bg-subtle)] text-[var(--text-muted)]'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Grilla de Resultados */}
          <section className="lg:col-span-9">
            <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-muted)] mb-4">
              <span>{filtered.length} productos disponibles</span>
              <span>{category === 'Todos' ? 'Mostrando todo el catálogo' : category}</span>
            </div>

            {filtered.length > 0 ? (
              <div className="product-grid">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl bg-white border border-[var(--border-line)]">
                <span className="font-heading text-xl font-bold text-[var(--text-main)] block mb-2">
                  No se encontraron productos
                </span>
                <p className="text-xs text-[var(--text-muted)] mb-4">
                  Probá ajustando la búsqueda o seleccioná otra categoría.
                </p>
                <button
                  type="button"
                  className="button button-secondary text-xs h-9"
                  onClick={() => {
                    setQuery('');
                    setCategory('Todos');
                  }}
                >
                  Ver todo el catálogo
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

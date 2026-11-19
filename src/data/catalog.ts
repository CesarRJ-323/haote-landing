import { products as legacyProducts } from './products';
export type CatalogProduct = (typeof legacyProducts)[number] & { slug: string; isNew?: boolean };
export const catalogProducts: CatalogProduct[] = legacyProducts.map((product, index) => ({ ...product, slug: product.id, isNew: index > 3 }));
export const catalogCategories = ['Todos', ...Array.from(new Set(catalogProducts.map((product) => product.category)))];

# 🧸 Importadora Haote — Sitio mayorista en Next.js

Demo interactiva y ejecutable de venta para **IMPORTADORA HAOTE** ("Juguetes de moda al precio mayorista"), ubicada en **Pasteur 367, Once, CABA, Buenos Aires, Argentina**.

Esta landing page fue diseñada para transformar la experiencia de compra mayorista del cliente: reemplaza la grilla fría de WooCommerce por una experiencia moderna, fluida y con micro-interacciones de alto nivel que comunican de inmediato el valor de comprar por mayor.

---

## 🚀 1. Qué es este proyecto

- **Propósito:** Demostración comercial interactiva para presentarle al dueño de Importadora Haote y cerrar la renovación de su sitio web.
- **Enfoque comercial:** Orientado a comerciantes, kiosqueros, revendedores y jugueterías que compran por bulto/pack y cierran pedidos por WhatsApp.
- **Stack técnico:**
  - **Next.js 15** con App Router y React 19.
  - **Tailwind CSS** (sistema de diseño modular con paleta lúdica-profesional).
  - **GSAP + ScrollTrigger** (animaciones precisas a 60fps con soporte `prefers-reduced-motion`).
  - **Lenis** (scroll suave global sincronizado con ScrollTrigger).
  - **@fontsource** (`Fredoka` y `Nunito` autoalojadas, sin dependencias externas de Google Fonts ni CDNs).

---

## 🛠️ 2. Cómo instalarlo y ejecutarlo localmente

Requisitos: Node.js 18+ o superior (probado en Node v24).

```bash
# 1. Instalar dependencias exactas
npm install

# 2. Iniciar el servidor de desarrollo local
npm run dev

# 3. Compilar para producción (validación estricta de tipos y assets)
npm run build

# 4. Probar la versión de producción compilada
 npm start
```

El servidor local se abrirá en `http://localhost:3000`.

---

## ✏️ 3. Cómo editar contenidos, precios, WhatsApp y colores

Todo el contenido editable está **100% centralizado en la carpeta `src/data/`**, separado del código visual:

### A. Cambiar número de WhatsApp y datos de contacto
Abrí `src/data/site.config.ts`:
```typescript
// Reemplazá el placeholder con el número comercial de la tienda
export const siteConfig = {
  name: 'IMPORTADORA HAOTE',
  whatsappNumber: '5491100000000', // Formato: 54 + 9 + 11 + número
  location: {
    address: 'Pasteur 367',
    neighborhood: 'Once',
    // ...
  }
};
```
Todos los botones de la página generan automáticamente enlaces con formato `https://wa.me/NUMERO?text=...` con mensajes prellenados específicos según el producto o sección consultada.

### B. Cambiar productos y precios mayoristas
Abrí `src/data/products.ts`:
Cada producto tiene sus datos listos para editar:
```typescript
{
  id: 'lego-spiderman-x8',
  cleanName: 'LEGO Spiderman Surtido',
  pack: 'Pack x8 unidades',
  price: 21500,
  formattedPrice: '$21.500',
  unitPrice: '$2.687 / u.',
  category: 'Lego y Bloques',
  badge: 'Más Vendido',
  image: '/images/products/lego-spiderman-x8.svg', // o .webp
  whatsappMessage: '¡Hola! Quiero consultar stock de LEGO Spiderman Pack x8 ($21.500).',
}
```

### C. Cambiar la paleta de colores
Los colores están centralizados en `tailwind.config.mjs` y como variables CSS en `src/styles/global.css`:
- **`brand.dark`** (`#1B1464`): Índigo profundo de fondo en el Hero, Navbar y Footer.
- **`brand.primary`** (`#FFD23F`): Amarillo eléctrico para llamados a la acción principales.
- **`brand.secondary`** (`#FF4D8D`): Rosa fuerte para etiquetas y badges destacados.
- **`brand.cyan`** (`#2DD4FF`): Celeste neón para detalles tecnológicos y hovers.
- **`brand.mint`** (`#3DDC97`): Verde menta para estados "en stock" y confianza.
- **`brand.cream`** (`#FFF8EC`): Fondo cálido de secciones intermedias.

---

## 📸 4. Fotos de productos y advertencia de uso

> [!WARNING]
> **Aviso de Propiedad:** Las referencias de productos, nombres comerciales y precios pertenecen a **Importadora Haote**. Este proyecto fue desarrollado con fines estrictamente demostrativos para la presentación de una propuesta de diseño web. **No publicar ni comercializar de manera pública sin la autorización expresa del titular.**

### Cómo reemplazar las imágenes con fotos reales:
1. Las imágenes se ubican en `public/images/products/`.
2. Para sustituir una imagen por la foto de catálogo del cliente, simplemente guardala con el mismo nombre en formato `.webp` o `.png` (por ejemplo `lego-spiderman-x8.webp`).
3. En `src/data/products.ts`, actualizá la propiedad `image` con la nueva extensión.
4. Las tarjetas de producto cuentan con fondo blanco suave y contorno con `filter: drop-shadow`, integrando fotos de producto con fondo blanco de manera natural.

---

## 🌐 5. Cómo publicar gratis la demo en Vercel o Netlify

Para enviarle un enlace interactivo al cliente desde su celular:

### Opción A: Vercel (Recomendada)
1. Subí este repositorio a tu cuenta de **GitHub** o **GitLab**.
2. Entrá a [vercel.com](https://vercel.com/) e iniciá sesión con GitHub.
3. Hacé clic en **"Add New Project"** y seleccioná el repositorio `haote-landing`.
4. Vercel detectará automáticamente que es un proyecto **Next.js** y configurará:
   - Build Command: `npm run build`
   - Output Directory: dejar el valor predeterminado de Next.js
5. Hacé clic en **"Deploy"**. En 60 segundos tendrás una URL lista (ej. `haote-demo.vercel.app`) para mandarle por WhatsApp al dueño del negocio.

### Opción B: Netlify
1. Entrá a [netlify.com](https://www.netlify.com/).
2. Conectá el repositorio y configurá el build con `npm run build`, usando el adaptador/plugin oficial de Netlify para Next.js.

La aplicación activa está en `app/` y `src/components/*.tsx`. El proyecto fue limpiado para mantener únicamente la implementación Next.js activa.

---

## 🧩 6. Guía para convertir este diseño en un tema de WordPress

El cliente actualmente utiliza **WordPress + WooCommerce** en su hosting. Cuando apruebe la propuesta, podés trasladar este diseño a WordPress manteniendo su catálogo existente mediante dos caminos:

### Estrategia recomendada: Tema Híbrido o Bloques de Gutenberg
1. **Conservar la base:** Mantener WordPress y WooCommerce intactos para que el cliente siga gestionando inventario y precios en su panel habitual `/wp-admin/`.
2. **Convertir la portada en Plantilla de Portada (`front-page.php`):**
   - Extraé el HTML compilado de las secciones desde la aplicación Next.js.
   - Colocá los estilos de Tailwind compilados en el tema.
   - Enlazá los scripts de GSAP y Lenis en `functions.php` mediante `wp_enqueue_script()`.
3. **Dinámica con WooCommerce:**
   - En la sección **Productos Estrella**, reemplazá la iteración estática por un loop de WooCommerce:
     ```php
     $args = array(
       'post_type' => 'product',
       'posts_per_page' => 8,
       'meta_key' => 'total_sales',
       'orderby' => 'meta_value_num'
     );
     $loop = new WP_Query( $args );
     while ( $loop->have_posts() ) : $loop->the_post();
       global $product;
       // Renderizar tarjeta con get_permalink(), get_the_title(), $product->get_price_html()
     endwhile;
     wp_reset_query();
     ```
4. **Checkout vía WhatsApp:** Podés integrar el plugin gratuito *Order on WhatsApp for WooCommerce* o mantener el botón de chat directo configurado con el teléfono del local.

---

Desarrollado para presentación comercial de alta calidad. 🚀


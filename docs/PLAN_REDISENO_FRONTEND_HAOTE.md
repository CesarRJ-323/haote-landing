# Plan de Rediseño Integral de Frontend — Importadora HAOTE (Next.js)

> **Documento de especificación e implementación para Claude / AI Agents**  
> **Proyecto:** `haote-next-beta` (Next.js 15, React 19, Tailwind CSS 3.4, Framer Motion)  
> **Ubicación:** `c:\Users\lia\OneDrive\Desktop\rapido`  
> **Fecha:** Noviembre 2026  
> **Objetivo:** Rediseño SIGNIFICATIVO y radical del frontend, eliminando fallas críticas de móvil, guerra de CSS, animaciones 3D artificiales y placeholders vacíos, transformando el sitio en la vidriera de una importadora mayorista sólida, confiable y de alta rotación (Once, CABA).

---

## 1. Diagnóstico y Estado de Partida

### Sujeto y Modelo de Negocio
* **Cliente:** Importadora Haote — Importador directo y distribuidor mayorista de juguetes virales, figuras coleccionables y productos de temporada.
* **Ubicación física:** Pasteur 367, Once, CABA (Buenos Aires).
* **Público objetivo:** Revendedores, comerciantes de jugueterías, bazares y tiendas online que buscan:
  1. Conocer disponibilidad real y rotación rápida de stock.
  2. Precios transparentes por bulto/pack y cálculo de margen de ganancia.
  3. Canal ágil de compra mayorista vía WhatsApp con despacho inmediato.
* **Modos de Interfaz (`impeccable`):**
  * **Home (`/`):** Modo *Persuade*. Debe transmitir escala de depósito, volumen, confianza y rotación.
  * **Catálogo (`/catalogo`):** Modo *Operate*. Debe ofrecer escaneabilidad rápida, filtros instantáneos por categoría y desglose claro de precio unitario vs. precio por pack.

### Fallas Críticas Identificadas
1. **Hero en móvil (360px - 430px):**
   * Regla destructiva en `app/polish.css` (`@media(max-width:600px) { .editorial-hero .editorial-hero-art { display: none!important; } }`) que oculta por completo la imagen del depósito, dejando una pantalla desértica con solo texto sobre crema.
   * Header apretado: el texto "Ver catálogo ↗" se quiebra en dos líneas, el botón de carrito es una píldora desproporcionada con emoji y el botón hamburguesa carece de área táctil adecuada.
   * Datos de contacto ("Once, CABA", "importadorahaote.com") en tamaño ilegible (~9px).
   * Overflow horizontal (franja gris a la derecha) causado por márgenes negativos `margin: 0 -18px; width: calc(100% + 36px)` y ticker de texto desbordado.
2. **Hero en escritorio:**
   * Titular `Lo que todos quieren. Listo para tu negocio.` encajonado en una columna de texto estrecha (`max-width: 680px`), partiéndose en 5 renglones torpes.
   * Márgenes laterales desaprovechados (contenedor a 1240px en pantallas 1440px+).
   * Foto del depósito con corte inclinado cortada a sangre contra el borde derecho del navegador.
3. **Catálogo y Tarjetas de Producto:**
   * En `src/components/product-card.tsx` se reemplazaron las fotos reales de producto por `<div className="product-visual"><span className="product-mark">H</span></div>` sobre un degradado pastel, ocultando los productos reales que ya existen en `public/images/products/`.
4. **Colisión de Motion e Hiperanimación:**
   * `ScrollReveal.tsx` muta globalmente el DOM aplicando `perspective(700px) rotateX(-58deg)` a párrafos, títulos y tarjetas.
   * `LetterWave.tsx` descompone cada letra en un `span` rotando en 3D (`rotateX(-78deg)`).
   * Ambas animaciones se ejecutan al mismo tiempo con duraciones de 800ms a 1200ms y `filter: blur()`, causando severo layout thrashing y distracción.
5. **Guerra de CSS y Pérdida de Accesibilidad:**
   * Coexisten 4 capas de estilos (`globals.css`, `motion.css`, `polish.css` y `styled-jsx`) con decenas de directivas `!important`.
   * El color coral `--coral: #ef745f` sobre fondo crema `#f7f4ee` tiene un ratio de contraste de **2.61:1**, fallando el estándar **WCAG AA** (mínimo 4.5:1).

---

## 2. Sistema de Color e Identidad Visual

### Regla de Distribución Cromática (60 - 30 - 10)
* **60% Superficies & Fondos (Neutros Crema Cálidos):**
  * Base de lienzo: `--bg-canvas: #F9F6F0`
  * Tarjetas y paneles: `--bg-surface: #FFFFFF`
  * Fondos alternos / franjas: `--bg-subtle: #F0ECE1`
* **30% Estructura, Textos & Contraste (Azul Tinta Importadora):**
  * Texto principal y títulos: `--text-main: #111E31` (Ratio vs crema: **14.2:1** — Pasa AAA)
  * Texto secundario y especificaciones: `--text-muted: #55657E` (Ratio vs crema: **5.4:1** — Pasa AA)
  * Líneas y bordes estructurales: `--border-line: #DCD5C9`
* **10% Acciones & Alerta Mayorista (Coral Optimizado & Amarillo Stock):**
  * Acento primario / CTAs: `--accent-coral: #E3533B` (Ratio vs crema: **4.62:1** — **Pasa WCAG AA**)
  * Hover / Active de botones: `--accent-coral-hover: #C9412B`
  * Badge de alta demanda / ahorro: `--accent-sun: #F5B738` (con texto oscuro `--text-main`)

### Tokens Tipográficos y Roles
* **Display (`Fredoka`, 600/700):** Exclusivo para logotipo, H1, H2 principales y números destacados de precios. Tracking compacto `-0.03em`. Prohibido usarlo en párrafos, tablas o datos funcionales.
* **UI & Body (`Nunito`, 400/600/700):** Párrafos, tablas de packs, botones, navegación, filtros del catálogo y badges.
* **Firma de Marca (Brand Motive):** El corte diagonal (8° de inclinación / `clip-path: polygon(...)`) se establece como elemento identitario recurrente en el hero, banner mayorista y separadores de sección.

---

## 3. Especificación Detallada de Cambios por Sección

### Sección 1: Header y Navegación
* **Antes:**
  * Altura fija `78px` con clases conflictivas. En móvil, "Ver catálogo ↗" se quiebra en dos líneas, botón "Carrito" desproporcionado con emoji `🛒` inyectado por CSS, menú hamburguesa sin padding táctil.
* **Después:**
  * **Escritorio:** Altura `72px` (se compacta a `58px` en scroll > 40px), logotipo nítido "HAOTE IMPORTADORA", enlaces a Inicio, Catálogo, Ubicación, botón de Catálogo estilizado y Carrito minimalista con badge flotante.
  * **Móvil (< 768px):**
    * Se oculta el texto "Ver catálogo" del header superior (se ubica como primer item dentro del menú desplegable).
    * Botón Carrito: Icono SVG de bolsa/carrito de `44x44px` con badge circular de cantidad (`18px` de diámetro) en la esquina superior derecha (`background: #E3533B`, texto blanco).
    * Botón Hamburguesa: Botón accesible de `48x48px` táctil con icono SVG nítido.
    * Menú desplegable: Panel flotante con sombra suave, enlaces a 16px y botón directo a WhatsApp.

### Sección 2: Hero Móvil (Prioridad Máxima: 360px, 390px, 430px)
* **Antes:**
  * La imagen del depósito se oculta completamente. Queda un título partido y una franja blanca vacía sin personalidad. Overflow lateral derecho.
* **Después:**
  * **Integración visual inmediata:** Bloque visual de `220px` a `240px` de alto con la foto del depósito (`warehouse-hero.png`), enmarcada con el corte angular identitario y dos micro-chips flotantes: `"Packs x Bulto"` y `"Stock Once"`.
  * **Tipografía fluida:** `font-size: clamp(2.3rem, 9vw, 3.1rem); line-height: 0.98;` garantizando lectura en máximo 3 líneas.
  * **Jerarquía vertical:**
    1. Tag superior: `"IMPORTADOR MAYORISTA DIRECTO"` (Nunito Bold 12px, tracking 0.08em).
    2. Titular display en 3 líneas: `"Lo que todos buscan. Listo para tu negocio."`
    3. Subtítulo conciso: `"Juguetes virales, coleccionables y productos de temporada para revendedores."`
    4. CTA principal ancho completo (altura `50px`, texto 16px Bold, fondo coral `#E3533B`).
    5. Fila de confianza (Trust Row): 2 chips táctiles (`14px` texto, `18px` iconos SVG): `⌂ Pasteur 367, Once` y `🚚 Envíos a todo el país`.
  * **Corrección de overflow:** Eliminación de márgenes negativos (`margin: 0 -18px`) y fijación de `overflow-x: clip`.

### Sección 3: Hero Escritorio (1024px - 1440px+)
* **Antes:**
  * Ancho encajonado a 1240px, columna de texto de solo 58% que rompe el título en 5 líneas, foto recortada contra el marco derecho.
* **Después:**
  * Contenedor expandido a `1320px` con padding equilibrado.
  * Distribución Asimétrica 60/40:
    * Columna izquierda (60%, ~780px): El título display entra en **2 líneas rotundas** a `clamp(3.6rem, 5.2vw, 5.2rem)`.
    * Doble CTA: Botón principal *"Explorar Catálogo"* + Botón secundario *"Consultar por WhatsApp"* (con icono oficial de WhatsApp y borde azul tinta).
    * Columna derecha (40%, ~520px): Foto del depósito con corte angular a la derecha, acompañada de 2 tarjetas de producto flotantes superpuestas (Spiderman x8 y Stitch) demostrando la mercadería física real.

### Sección 4: Barra de Garantías Mayoristas (Reemplazo del Ticker)
* **Antes:**
  * Ticker infinito en bucle con caracteres `✦` que distrae y aporta poco valor.
* **Después:**
  * Franja estática/responsive de 4 credenciales comerciales concretas para el revendedor:
    1. **Venta exclusiva por bulto cerrado** (precios de distribuidor).
    2. **Local y showroom en Once** (Pasteur 367, CABA).
    3. **Despacho en 24/48 hs** (a expresos para todo el país).
    4. **Facturación A y B oficial**.

### Sección 5: Tarjetas de Producto y Catálogo
* **Antes:**
  * Monograma "H" sobre gradiente pastel. Sin imágenes de producto. Precios sin desglose.
* **Después:**
  * **Visual real:** Se conecta `product.image` con contenedor blanco puro, zoom sutil `1.02` en hover y sin cortes de imagen.
  * **Badge de rentabilidad:** Etiqueta superior `"Margen estimado +65%"` o `"Viral TikTok"`.
  * **Estructura de precios B2B:**
    * Precio de pack destacado: `$21.500` (Fredoka 22px).
    * Desglose unitario: `($2.687 / unidad)` en Nunito 13px texto muted.
    * Indicador de bulto: `Pack cerrado x8 unidades`.
  * Botón de acción: `"Agregar al pedido"` / `"Consultar stock"`.

### Sección 6: Módulo B2B — Simulador de Rentabilidad Mayorista
* **Propósito:** Restaurar la herramienta más valiosa de conversión para revendedores.
* **Mecánica:**
  * Selector simple de inversión estimada: `$100.000` · `$250.000` · `$500.000`.
  * La tarjeta calcula y muestra en tiempo real:
    * Cantidad de packs surtidos estimados que adquiere el cliente.
    * Valor de reventa estimado en góndola/tienda minorista.
    * **Ganancia neta estimada proyectada (+60% a +75%)**.
  * Botón directo: *"Armar este pedido por WhatsApp ↗"*.

---

## 4. Especificación del Sistema de Motion (Scroll & Interaction)

| Componente | Disparador | Animación / Propiedades | Duración / Easing | Fallback Reduced Motion |
| :--- | :--- | :--- | :--- | :--- |
| **Header** | `scrollY > 40px` | Altura `72px → 58px`, `backdrop-filter: blur(16px)` | 200ms `cubic-bezier(0.16, 1, 0.3, 1)` | Cambio instantáneo de clase |
| **Hero Image Parallax** | Scroll del usuario | `translateY(0)` a `translateY(40px)` suave | Atado al scroll vía `transform` | `transform: none` |
| **Entrada de Secciones** | `IntersectionObserver` | `opacity: 0 → 1`, `translateY: 16px → 0` por contenedor | 220ms `ease-out` | `opacity: 1; transform: none` |
| **Tarjetas de Producto** | Scroll reveal | Stagger de 30ms entre tarjetas | 200ms `ease-out` | Sin delay ni movimiento |
| **Hover en Tarjeta** | `:hover` | `translateY(-2px)`, sombra suave | 160ms `ease-out` | Sin transform |
| **Pulsación de Botones** | `:active` | `transform: scale(0.97)` | 100ms `ease-out` | Cambio de color únicamente |

> [!CAUTION]
> **Prohibiciones Terminantes:**
> 1. Prohibido usar `LetterWave` (animación letra por letra o palabra por palabra).
> 2. Prohibido aplicar transformaciones 3D (`perspective`, `rotateX`) a textos y párrafos completos.
> 3. Prohibido usar `filter: blur()` durante animaciones de entrada en scroll.
> 4. Prohibidas duraciones mayores a `300ms` en componentes de UI e interacciones.

---

## 5. Hoja de Ruta de Implementación (Paso a Paso)

### Fase 1: Limpieza de Base y Consolidación de Estilos
1. **Depuración de CSS:**
   * Eliminar o vaciar `app/motion.css` (erradicar `.reveal` forzado y `haote-rise`).
   * Limpiar `app/polish.css` de reglas con `!important` que pisen layout y header.
   * Centralizar tokens de color en `app/globals.css` bajo las nuevas variables (`--bg-canvas`, `--text-main`, `--accent-coral`, etc.).
   * Alinear `tailwind.config.mjs` para que extienda directamente las variables CSS.
2. **Desmonte de Animaciones Desestabilizadoras:**
   * Retirar `LetterWave.tsx` de `src/components/home-page.tsx`, `product-card.tsx` y `catalog-page.tsx`.
   * Reemplazar `ScrollReveal.tsx` por una utilidad ligera de reveal de sección basada en CSS/Framer Motion sin mutación global del DOM.

### Fase 2: Hero Móvil, Header y Eliminación de Overflow
1. **Refactorización de `src/components/site-header.tsx`:**
   * Crear versión móvil limpia con Carrito compacto (badge flotante) y menú accesible.
   * Quitar enlaces apretados de la barra superior.
2. **Reconstrucción de `src/components/hero-section.tsx`:**
   * Habilitar bloque visual con foto de depósito y corte inclinado en móvil (`220px-240px`).
   * Aplicar titular con `clamp()` en 3 líneas y botón CTA de ancho completo (50px alto).
   * Crear chips de confianza de 14px (`Once, CABA` y `Envíos al país`).
   * Eliminar márgenes negativos y fijar `overflow-x: clip` en el layout.

### Fase 3: Hero Escritorio, Tarjetas y Catálogo
1. **Hero Escritorio (Grid 60/40):**
   * Ampliar columna de texto para que el título entre en 2 líneas.
   * Enmarcar foto del depósito con corte angular e incorporar las 2 tarjetas de producto flotantes.
   * Incorporar botón secundario de WhatsApp con estilo corporativo.
2. **Reconstrucción de `src/components/product-card.tsx`:**
   * Conectar `product.image` con fallback seguro.
   * Incorporar badge de margen/rentabilidad, precio de pack y precio unitario desglosado.
3. **Barra de Garantías Mayoristas:**
   * Reemplazar la sección ticker de `home-page.tsx` por los 4 pilares mayoristas de Haote.

### Fase 4: Módulo de Conversión B2B y Motion Pulido
1. **Crear Componente `MarginCalculator.tsx`:**
   * Integrar el simulador interactivo de inversión y rentabilidad en la Home.
2. **Ajuste de Motion por Scroll:**
   * Implementar header shrink al scroll.
   * Configurar `prefers-reduced-motion` estricto en todas las animaciones.
3. **Verificación Visual:**
   * Comprobar en viewports de 360px, 390px, 768px y 1440px.
   * Confirmar ausencia de scroll horizontal y contrastes WCAG AA.

---

## 6. Archivos Impactados

* [app/globals.css](file:///c:/Users/lia/OneDrive/Desktop/rapido/app/globals.css) (Tokens de diseño, limpieza de `.reveal`)
* [app/motion.css](file:///c:/Users/lia/OneDrive/Desktop/rapido/app/motion.css) (Vaciado / eliminación)
* [app/polish.css](file:///c:/Users/lia/OneDrive/Desktop/rapido/app/polish.css) (Purga de `!important` y reglas destructivas de móvil)
* [tailwind.config.mjs](file:///c:/Users/lia/OneDrive/Desktop/rapido/tailwind.config.mjs) (Sincronización con tokens)
* [src/components/site-header.tsx](file:///c:/Users/lia/OneDrive/Desktop/rapido/src/components/site-header.tsx) (Header responsivo compacto)
* [src/components/hero-section.tsx](file:///c:/Users/lia/OneDrive/Desktop/rapido/src/components/hero-section.tsx) (Hero móvil con imagen + Hero escritorio 60/40)
* [src/components/product-card.tsx](file:///c:/Users/lia/OneDrive/Desktop/rapido/src/components/product-card.tsx) (Fotos reales de producto y precios mayoristas)
* [src/components/home-page.tsx](file:///c:/Users/lia/OneDrive/Desktop/rapido/src/components/home-page.tsx) (Eliminación de `LetterWave`, ticker y agregado de barra de garantías y calculadora)
* [src/components/MarginCalculator.tsx](file:///c:/Users/lia/OneDrive/Desktop/rapido/src/components/MarginCalculator.tsx) (Nuevo componente interactivo B2B)

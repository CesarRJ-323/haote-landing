# Plan de Rediseño Integral de Frontend — Importadora HAOTE (Next.js)

> Este documento ha sido estructurado para la ejecución autónoma y precisa de **Claude / Claude Code / AI Agents**.  
> El documento maestro completo con todas las especificaciones detalladas se encuentra en:  
> [docs/PLAN_REDISENO_FRONTEND_HAOTE.md](file:///c:/Users/lia/OneDrive/Desktop/rapido/docs/PLAN_REDISENO_FRONTEND_HAOTE.md)

---

## Resumen Ejecutivo del Plan

### 1. Sistema de Color e Identidad (60 - 30 - 10)
* **60% Superficies:** `--bg-canvas: #F9F6F0`, `--bg-surface: #FFFFFF`, `--bg-subtle: #F0ECE1`.
* **30% Estructura y Textos:** `--text-main: #111E31` (14.2:1 AAA), `--text-muted: #55657E` (5.4:1 AA), `--border-line: #DCD5C9`.
* **10% Acento Mayorista:** `--accent-coral: #E3533B` (4.62:1 WCAG AA sobre crema, superando el 2.61:1 del `#ef745f` anterior).
* **Tipografía:** Fredoka (Display exclusivo en H1/H2 y precios) y Nunito (Párrafos, tablas y UI).
* **Firma identitaria:** Corte angular de 8° como Brand Motive en Hero, banners y separadores.

### 2. Hero Móvil (360px - 430px) — Prioridad Máxima
* **Eliminar `display: none!important`** en `.editorial-hero-art` ([polish.css](file:///c:/Users/lia/OneDrive/Desktop/rapido/app/polish.css)).
* Bloque visual con foto del depósito (`warehouse-hero.png`) de 220–240px de alto con corte diagonal y micro-chips flotantes.
* Titular fluido con `clamp()` a máximo 3 líneas.
* CTA principal ancho completo de 50px de altura táctil.
* Fila de confianza con chips legibles de 14px e iconos de 18px (`Pasteur 367, Once` y `Envíos a todo el país`).
* Header limpio: botón Carrito compacto (icono + badge flotante mini) y hamburguesa táctil de 48px.
* Eliminación definitiva del overflow horizontal (franja gris).

### 3. Hero Escritorio (1440px+)
* Grid 60/40 asimétrico en contenedor expandido a 1320px.
* Titular display en 2 líneas rotundas sin quiebres incómodos.
* Foto del depósito enmarcada con corte angular y 2 tarjetas de producto flotantes superpuestas (Spiderman x8 y Stitch).
* Doble CTA: Primario coral a Catálogo + Secundario azul/verde oficial WhatsApp.

### 4. Tarjetas de Producto y Catálogo B2B
* Conexión obligatoria de `product.image` (eliminación del monograma "H" sobre gradiente pastel).
* Precios B2B: precio de pack grande (`$21.500`) + desglose unitario (`$2.687 / u.`) + pack cerrado (`Pack x8 un.`) + badge de margen estimado (`+65%`).

### 5. Motion por Scroll & Purga Técnica
* Purga de `LetterWave.tsx` y de la mutación 3D de `ScrollReveal.tsx`.
* Header shrink dinámico al scroll (`72px → 58px`).
* Reveals ligeros de sección (<220ms, transform/opacity) con estricto respeto a `prefers-reduced-motion`.
* Reincorporación del componente `MarginCalculator` (Simulador de inversión y rentabilidad para revendedores).

---

Para consultar la especificación técnica completa y la hoja de ruta paso a paso, lee el archivo:  
[docs/PLAN_REDISENO_FRONTEND_HAOTE.md](file:///c:/Users/lia/OneDrive/Desktop/rapido/docs/PLAN_REDISENO_FRONTEND_HAOTE.md)

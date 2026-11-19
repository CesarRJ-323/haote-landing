# Importadora Haote — Rediseño beta en Next.js + React

## Tipo de proyecto

Sitio de catálogo mayorista / presentación comercial para una importadora de juguetes y productos de moda.

## Intención

Crear una demo visual para presentar a los clientes de Importadora Haote antes de desarrollar la versión productiva. La demo debe comunicar variedad, confianza y facilidad de compra mayorista, con una experiencia mucho más editorial y memorable que la tienda actual.

## Objetivos

- Reemplazar la apariencia de tienda genérica por una identidad visual propia.
- Crear una home que explique rápidamente qué vende Haote y por qué conviene comprar por mayor.
- Crear una página de catálogo donde puedan entrar todos los productos, con búsqueda, categorías, orden y filtros visuales.
- Diseñar dos páginas principales: una home de presentación y un catálogo completo.
- Mantener la navegación centrada en Inicio, Catálogo, contacto y acceso directo a WhatsApp.
- Usar animaciones inspiradas en el lenguaje de Editex Studio: entradas escalonadas, ritmo de scroll, transiciones suaves y respuestas físicas en botones y tarjetas, sin copiar su branding ni sus composiciones.
- Mantener excelente comportamiento en móvil y respetar `prefers-reduced-motion`.

## No objetivos

- No conectar todavía pagos, inventario, checkout ni cuentas de usuario.
- No modificar ni inventar información comercial sensible.
- No convertir la demo en una tienda funcional antes de la aprobación del cliente.
- No añadir títulos, subtítulos, música, efectos visuales o contenido promocional que no sea necesario para la presentación.

## Anti-objetivos

- No usar estética pastel genérica, tarjetas repetitivas sin jerarquía ni gradientes decorativos sin función.
- No copiar la estética, textos o identidad de Editex Studio.
- No crear animaciones que dificulten la lectura, el catálogo o la navegación.
- No ocultar productos detrás de carruseles o tabs temporizados.

## Enfoque visual propuesto

Una identidad de “mayorista curado”: fondo cálido claro, azul tinta profundo como ancla, acentos coral, amarillo juguete y verde menta; tipografía display expresiva para titulares y sans neutral para lectura. La interfaz combinará grandes bloques editoriales con fotografías/visualizaciones de producto, superficies suaves y controles con estados claros.

La home tendrá una primera pantalla hero, una banda de confianza, categorías destacadas, productos seleccionados, una sección de compra mayorista, un bloque de temporada, ubicación y CTA final. Cada bloque tendrá un propósito y una entrada visual concreta.

## Páginas y rutas

- `/` — Home de presentación: hero, propuesta de valor, productos top, productos nuevos, información de marca, contacto y ubicación.
- `/catalogo` — Catálogo completo inspirado en la referencia adjunta: buscador superior, categorías y filtros en lateral, ordenamiento, grilla responsive y estados de resultados.

## Arquitectura técnica

- Next.js con App Router y TypeScript.
- React Server Components por defecto; Client Components solo para filtros, búsqueda, calculadora y navegación interactiva.
- Tailwind CSS para tokens y layout; CSS Modules o CSS global para motion específico.
- GSAP para secuencias de entrada, scroll reveals y transiciones coordinadas.
- Lenis o una capa equivalente solo si las pruebas confirman que mejora la sensación sin afectar accesibilidad o rendimiento.
- Datos de productos y categorías en módulos tipados para que el catálogo pueda reemplazarse luego por API/CMS.
- Componentes reutilizables: `Navbar`, `Hero`, `ProductCard`, `CategorySidebar`, `CatalogToolbar`, `Button`, `SectionIntro`, `Footer`, `WhatsAppButton`.

## Sistema de motion

- Entrada de página: hero y navegación con `opacity`, `translateY` y stagger corto.
- Secciones: reveal al entrar en viewport con `IntersectionObserver` o GSAP ScrollTrigger solo donde aporte comprensión.
- Tarjetas: elevación de 2–4 px, zoom de imagen 1.02–1.03 y borde/sombra con transición corta.
- Botones: cambio de fondo/contraste, desplazamiento de 1–2 px y feedback de presión.
- Navegación: menú móvil con transición de clip/opacity, sin rebotes innecesarios.
- Catálogo: filtros y resultados con transición de opacidad/altura sin bloquear el uso.
- Respeto estricto de `prefers-reduced-motion`.

## Criterios de calidad

- Diseño responsive en 1440, 1024, 768 y 390 px.
- Igualdad de márgenes y bordes de contenido.
- Foco de teclado visible y controles con nombre accesible.
- Contraste suficiente y estados hover/focus/active coherentes.
- Ninguna sección importante debe quedar visualmente vacía si faltan imágenes reales: se usarán los assets existentes como base.
- La demo debe poder presentarse directamente en navegador y dejar claro que es una propuesta beta.

## Alternativas consideradas

### Astro + GSAP + Lenis

Más liviano y cercano al proyecto actual, pero menos conveniente si la demo evoluciona a filtros, carrito y estado interactivo complejo.

### Astro + React parcial

Buen equilibrio, pero deja dos modelos mentales distintos para el equipo y agrega complejidad de integración.

### Next.js + React — elegido

La opción más adecuada para una demo con varias rutas, componentes interactivos y futura evolución a tienda completa. Tiene un costo inicial mayor, pero reduce migraciones posteriores y facilita escalar el catálogo.

## Decisiones del builder

- Se preservarán los productos y assets locales existentes, reorganizándolos en una experiencia nueva.
- Se mantendrá el contenido comercial verificable y se marcará cualquier copy de demo como propuesta.
- Se usará una paleta nueva derivada de la marca y del universo juguetero, no de Editex.
- La primera implementación será una demo visual funcional, no una integración de ecommerce.

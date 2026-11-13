# Copy deck: Supermercado Los Álamos

> **Fuente de verdad:** `briefs/supermercado-los-alamos.md` (`L<n>` = línea del brief). Requisitos: `docs/requirements.md` (REQ-001 a REQ-018, A-01 a A-11, B-01 a B-08). Inventario: `docs/content-inventory.md`.
> **Tono:** español rioplatense con voseo (A-07). Frases cortas, legibles en 360px. Titulares de 60 caracteres o menos (entre paréntesis, conteo aproximado).
> **Estados:** `VERIFIED` = dato o idea del brief (puede estar reformulado) · `BRIEF-VALIDAR` = está en el brief, pero hay que validarlo antes de producción · `ASSUMPTION` = redacción o decisión reversible · `PLACEHOLDER` = pendiente, no se muestra · `BLOCKED` = sin contenido hasta que el comercio lo confirme.
> **Uso:** cada texto tiene un ID estable. El frontend lo copia tal cual en el módulo de contenido (`src/content/*.ts`, REQ-015). Las notas que dicen "solo documentación" **no** se muestran en la interfaz.

---

## 0. Reglas de redacción aplicadas

- Beneficios limitados a variedad, frescura, atención cercana y comodidad de comprar en un comercio local (A-10, L12-14).
- Sin precios, porcentajes, marcas, productos específicos, historia, años, testimonios, delivery, envíos, compra online, WhatsApp, medios de pago ni estacionamiento (REQ-013, REQ-014, L164-169).
- Sin superlativos comparativos ("el mejor", "los más frescos", "los precios más bajos").
- Pueblo Vecino y las localidades cercanas aparecen solo como **público** (L29-30), nunca como zona de envío ni como ubicación del local.
- Teléfono y horarios se muestran en la interfaz sin avisos visibles. Su validación pendiente (B-03) consta solo en esta documentación y en el checklist de pre-producción.
- Datos centralizados: `{DIRECCION_CORTA}` = "Calle Ejemplo 123, Villa Ejemplo" · `{DIRECCION_COMPLETA}` = "Calle Ejemplo 123, B0000 Villa Ejemplo, Provincia de Buenos Aires, Argentina" · `{TEL_VISIBLE}` = "0000 00-0000" · `{TEL_HREF}` = `tel:+540000000000` · `{MAPS_URL}` = URL de búsqueda de Google Maps del inventario (sección 2).

---

## 1. Elementos globales

### 1.1 Skip link (REQ-010)

| ID | Elemento | Texto | Estado |
|---|---|---|---|
| GLB-SKIP | Enlace "saltar" (destino `#contenido`) | Saltar al contenido | ASSUMPTION |

### 1.2 Header y navegación (REQ-017, REQ-001, REQ-010, A-03)

| ID | Elemento | Texto | Estado |
|---|---|---|---|
| GLB-HDR-LOGO | Logotipo textual (enlace a `/`) | Supermercado Los Álamos | VERIFIED (L5) / PLACEHOLDER de logo (A-03) |
| GLB-HDR-LOGO-ARIA | `aria-label` del logotipo | Supermercado Los Álamos, ir al inicio | ASSUMPTION |
| GLB-NAV-ARIA | `aria-label` del `<nav>` | Navegación principal | ASSUMPTION |
| GLB-NAV-1 | Ítem de navegación (`/`) | Inicio | VERIFIED (L65) |
| GLB-NAV-2 | Ítem de navegación (`/productos`) | Productos | VERIFIED (L66) |
| GLB-NAV-3 | Ítem de navegación (`/nosotros`) | Nosotros | VERIFIED (L67) |
| GLB-NAV-4 | Ítem de navegación (`/contacto`) | Contacto | VERIFIED (L68). "Contacto" en forma corta para que entre en 360px; el H1 de la página dice "Contacto y ubicación". |
| GLB-NAV-MENU | Botón del menú móvil (texto visible) | Menú | ASSUMPTION |
| GLB-NAV-MENU-ARIA-OPEN | `aria-label` con el menú cerrado | Abrir menú | ASSUMPTION |
| GLB-NAV-MENU-ARIA-CLOSE | `aria-label` con el menú abierto | Cerrar menú | ASSUMPTION |
| GLB-HDR-CTA | Botón del header → `{MAPS_URL}` | Cómo llegar | VERIFIED (L56) |
| GLB-HDR-CTA-ARIA | `aria-label` | Cómo llegar a Supermercado Los Álamos en Google Maps (abre en una pestaña nueva) | ASSUMPTION |

### 1.3 Etiquetas accesibles de CTA reutilizables (REQ-001, REQ-002, REQ-010)

Cada `aria-label` empieza con el texto visible (WCAG 2.5.3, *label in name*).

| ID | Texto visible | `aria-label` | Destino | Estado |
|---|---|---|---|---|
| CTA-MAPS | Cómo llegar | Cómo llegar a Supermercado Los Álamos en Google Maps (abre en una pestaña nueva) | `{MAPS_URL}`, `target="_blank"`, `rel="noopener noreferrer"` | VERIFIED (L56, L127) |
| CTA-MAPS-ALT | Abrir en Google Maps | Abrir la ubicación de Supermercado Los Álamos en Google Maps (abre en una pestaña nueva) | `{MAPS_URL}` (enlace alternativo bajo el mapa, A-06) | ASSUMPTION |
| CTA-CALL | Llamar al supermercado | Llamar al supermercado al 0000 00-0000 | `{TEL_HREF}` | BRIEF-VALIDAR (L148) |
| CTA-CALL-SHORT | Llamar | Llamar al supermercado al 0000 00-0000 | `{TEL_HREF}` (cuando falta espacio) | BRIEF-VALIDAR |
| CTA-HOURS | Consultar horarios | (no hace falta; enlace interno) | `/#horarios` en Inicio y `/contacto#horarios` en el resto | VERIFIED (L60) |
| CTA-PRODUCTS | Ver productos | (no hace falta) | `/productos` | VERIFIED (L59) |

Texto oculto alternativo (`sr-only`) si el componente no usa `aria-label`: `(abre en una pestaña nueva)`. **ASSUMPTION**

### 1.4 Footer (REQ-002, REQ-003, REQ-004, REQ-017, A-11)

| ID | Elemento | Texto | Estado |
|---|---|---|---|
| GLB-FTR-BRAND | Nombre | Supermercado Los Álamos | VERIFIED (L5) |
| GLB-FTR-TAGLINE | Bajada | Tu supermercado de cercanía en Villa Ejemplo. | VERIFIED (L9-10, reformulado) |
| GLB-FTR-H-ADDR | Título de columna | Dirección | ASSUMPTION |
| GLB-FTR-ADDR | Dirección (en `<address>`) | Calle Ejemplo 123, B0000 Villa Ejemplo, Provincia de Buenos Aires, Argentina | VERIFIED (L143-145) |
| GLB-FTR-H-PHONE | Título de columna | Teléfono | ASSUMPTION |
| GLB-FTR-PHONE | Enlace `{TEL_HREF}` | 0000 00-0000 | BRIEF-VALIDAR (L148) |
| GLB-FTR-H-HOURS | Título de columna | Horarios | ASSUMPTION |
| GLB-FTR-HOURS-1 | Fila | Lunes a sábado: 07:30 a 21:00 | BRIEF-VALIDAR (L151) |
| GLB-FTR-HOURS-2 | Fila | Domingo: cerrado | BRIEF-VALIDAR (L152) |
| GLB-FTR-H-NAV | Título de columna | Secciones | ASSUMPTION |
| GLB-FTR-NAV | Enlaces | Inicio · Productos · Nosotros · Contacto y ubicación | VERIFIED |
| GLB-FTR-NAV-ARIA | `aria-label` del `<nav>` del footer | Navegación del pie de página | ASSUMPTION |
| GLB-FTR-IMG-NOTE | Nota | Las fotografías del sitio son imágenes ilustrativas. | ASSUMPTION (A-02, B-02). Se retira cuando haya fotos reales del local. |
| GLB-FTR-COPY | Línea legal | © {AÑO} Supermercado Los Álamos | ASSUMPTION ({AÑO} se calcula en el build). Sin razón social ni CUIT (PENDIENTE). |
| — | Redes, email, WhatsApp | **No se renderizan** | PLACEHOLDER (L154-157, A-11) |

---

## 2. Inicio (`/`)

### S1. Hero (REQ-001, REQ-002, REQ-003, REQ-012)

| ID | Elemento | Texto | Estado |
|---|---|---|---|
| HOME-S1-EYEBROW | Antetítulo | Supermercado Los Álamos | VERIFIED (L5) |
| HOME-S1-H1 | H1 (42) | Tu supermercado de cercanía en Villa Ejemplo | VERIFIED (L9-10) |
| HOME-S1-SUB | Bajada | Alimentos, frescos, almacén y limpieza para tus compras de todos los días, en Calle Ejemplo 123. | VERIFIED (L17-21, L143) |
| HOME-S1-CTA1 | Botón primario | Cómo llegar → CTA-MAPS | VERIFIED (L56) |
| HOME-S1-CTA2 | Botón secundario | Llamar al supermercado → CTA-CALL | BRIEF-VALIDAR |
| HOME-S1-LINK | Enlace de texto | Consultar horarios → `#horarios` | VERIFIED (L60). Cumple SC-001: horarios a una acción desde la primera pantalla. |
| HOME-S1-IMG-ALT | `alt` de la imagen stock | Ver sección 6 (IMG-HERO) | ASSUMPTION (A-02) |

### S2. Mensaje de cercanía (REQ-007, REQ-009)

| ID | Elemento | Texto | Estado |
|---|---|---|---|
| HOME-S2-H2 | H2 (33) | Las compras de todos los días, cerca | VERIFIED (L9-10, L35) |
| HOME-S2-P1 | Párrafo | Somos un supermercado de cercanía pensado para las familias y los vecinos de Villa Ejemplo, Pueblo Vecino y alrededores. | VERIFIED (L9-10, L29-30) |
| HOME-S2-P2 | Párrafo | Te esperamos con variedad de productos, frescura y una atención cercana. | VERIFIED (L12-14) |

### S3. Categorías principales (REQ-005)

| ID | Elemento | Texto | Estado |
|---|---|---|---|
| HOME-S3-H2 | H2 (30) | Nuestras categorías principales | VERIFIED (L47, L73) |
| HOME-S3-INTRO | Bajada | Lo que necesitás para la compra diaria, en un solo lugar. | ASSUMPTION (redacción; L17-21) |
| HOME-S3-CARDS | Tarjetas | Las 6 categorías de la sección 3.2: título + descripción corta (`*-SHORT`) + insignia "A confirmar" donde corresponda | VERIFIED / ASSUMPTION (A-04) |
| HOME-S3-CTA | Botón | Ver productos → CTA-PRODUCTS | VERIFIED (L59) |

### S4. Beneficios de comprar en Los Álamos (REQ-007, A-10)

| ID | Elemento | Texto | Estado |
|---|---|---|---|
| HOME-S4-H2 | H2 (27) | ¿Por qué comprar en Los Álamos? | VERIFIED (L74) |
| HOME-S4-B1-T | Beneficio 1, título (H3) | Variedad | VERIFIED (L12) |
| HOME-S4-B1-D | Beneficio 1, texto | Alimentos, bebidas, almacén, limpieza y artículos para el hogar en un mismo lugar. | VERIFIED (L12, L17-21) |
| HOME-S4-B2-T | Beneficio 2, título (H3) | Frescura | VERIFIED (L13) |
| HOME-S4-B2-D | Beneficio 2, texto | Productos frescos para la mesa de todos los días. | VERIFIED (L13, L19) |
| HOME-S4-B3-T | Beneficio 3, título (H3) | Atención cercana | VERIFIED (L13) |
| HOME-S4-B3-D | Beneficio 3, texto | Te atendemos con el trato de un comercio de barrio. | ASSUMPTION (redacción; L13) |
| HOME-S4-B4-T | Beneficio 4, título (H3) | Comodidad | VERIFIED (L14) |
| HOME-S4-B4-D | Beneficio 4, texto | Comprá cerca de casa, en un comercio local de Villa Ejemplo. | VERIFIED (L14) |

Los íconos de beneficios son decorativos: `alt=""` o `aria-hidden="true"`.

### S5. Ofertas destacadas: estado vacío honesto (REQ-006, A-05, B-01)

| ID | Elemento | Texto | Estado |
|---|---|---|---|
| HOME-S5-H2 | H2 (18) | Ofertas destacadas | VERIFIED (espacio pedido en L75, L124) |
| HOME-S5-EMPTY-T | Título del estado vacío (H3) | Todavía no hay ofertas publicadas | ASSUMPTION (texto) / BLOCKED (contenido) |
| HOME-S5-EMPTY-P | Texto | Vamos a publicar acá las ofertas cuando estén confirmadas. Para consultar promociones, acercate al local o llamanos al 0000 00-0000. | ASSUMPTION / BRIEF-VALIDAR (tel.) |
| HOME-S5-CTA1 | Botón | Llamar al supermercado → CTA-CALL | BRIEF-VALIDAR |
| HOME-S5-CTA2 | Enlace | Consultar horarios → `#horarios` | VERIFIED |

Prohibido en esta sección: precios, "%", "2x1", fechas de vigencia, nombres de productos o imágenes de ofertas (REQ-006). Si se carga una oferta confirmada, el estado vacío se reemplaza por las tarjetas del módulo `offers`, sin cambiar componentes.

### S6. Ubicación y horarios (`id="horarios"`) (REQ-001, REQ-003, REQ-008)

| ID | Elemento | Texto | Estado |
|---|---|---|---|
| HOME-S6-H2 | H2 (21) | Ubicación y horarios | VERIFIED (L76) |
| HOME-S6-H3-ADDR | H3 | Dónde estamos | ASSUMPTION |
| HOME-S6-ADDR | Dirección (`<address>`) | Calle Ejemplo 123, B0000 Villa Ejemplo, Provincia de Buenos Aires | VERIFIED (L143-145) |
| HOME-S6-H3-HOURS | H3 | Horarios de atención | VERIFIED (L46) |
| HOME-S6-HOURS-1 | Fila | Lunes a sábado: 07:30 a 21:00 | BRIEF-VALIDAR |
| HOME-S6-HOURS-2 | Fila | Domingo: cerrado | BRIEF-VALIDAR |
| HOME-S6-CTA1 | Botón | Cómo llegar → CTA-MAPS | VERIFIED |
| HOME-S6-CTA2 | Botón secundario | Llamar al supermercado → CTA-CALL | BRIEF-VALIDAR |
| HOME-S6-MAP | Mapa (opcional en Inicio) | Si se incluye, mismos textos que CONT-S2 (título del iframe + enlace alternativo) | ASSUMPTION (A-06) |

Sin textos sobre feriados ni "abierto ahora" (REQ-003, B-08).

### S7. CTA final (REQ-001, REQ-002)

| ID | Elemento | Texto | Estado |
|---|---|---|---|
| HOME-S7-H2 | H2 (14) | Te esperamos | ASSUMPTION (redacción; L77) |
| HOME-S7-P | Texto | Vení a hacer tus compras a Calle Ejemplo 123, Villa Ejemplo. De lunes a sábado, de 07:30 a 21:00. | VERIFIED (L143) / BRIEF-VALIDAR (horario) |
| HOME-S7-CTA1 | Botón primario | Cómo llegar → CTA-MAPS | VERIFIED |
| HOME-S7-CTA2 | Botón secundario | Llamar al supermercado → CTA-CALL | BRIEF-VALIDAR |

---

## 3. Productos (`/productos`)

### 3.1 Intro (REQ-005, REQ-013)

| ID | Elemento | Texto | Estado |
|---|---|---|---|
| PROD-S1-H1 | H1 (44) | Productos para tus compras de todos los días | VERIFIED (L17-21, L33). ASSUMPTION: refina el H1 "Productos" del inventario para que no sea genérico. Reversible. |
| PROD-S1-SUB | Bajada | Alimentos, bebidas, almacén, productos frescos, limpieza y artículos para el hogar, en un supermercado de cercanía en Villa Ejemplo. | VERIFIED (L9-10, L17-21) |
| PROD-S1-NOTE | Nota informativa | Este sitio es informativo: no se hacen compras online. Para consultar disponibilidad, acercate al local o llamanos. | ASSUMPTION (texto; L52, L174) |
| PROD-S1-NOTE-CTA | Enlace | Llamar al supermercado → CTA-CALL | BRIEF-VALIDAR |

### 3.2 Categorías (REQ-005, A-04)

H2 de la sección: **PROD-S2-H2** "Nuestras categorías" (19). VERIFIED.

Cada tarjeta lleva un título (H3), una descripción larga (`-DESC`, para Productos) y una corta (`-SHORT`, para Inicio). No incluye marcas, productos específicos, precios ni stock.

| ID base | Título (H3) | Descripción larga (`-DESC`) | Descripción corta (`-SHORT`) | Insignia | Estado |
|---|---|---|---|---|---|
| CAT-ALIM | Alimentos y bebidas | Alimentos y bebidas para el día a día de tu familia. | Para el día a día de tu familia. | — | VERIFIED (L17) |
| CAT-ALMA | Almacén y consumo cotidiano | Productos de almacén y de consumo cotidiano para completar la compra. | Lo básico para completar la compra. | — | VERIFIED (L18) |
| CAT-FRES | Productos frescos | Productos frescos para la mesa de todos los días. | Para la mesa de todos los días. | — | VERIFIED (L19) |
| CAT-CARN | Carnicería | Carnes para tus comidas de todos los días. | Para tus comidas de todos los días. | A confirmar | ASSUMPTION (L20: categoría a validar) |
| CAT-VERD | Verdulería | Frutas y verduras para tu compra diaria. | Frutas y verduras para tu compra. | A confirmar | ASSUMPTION (L20: categoría a validar) |
| CAT-LIMP | Limpieza y artículos para el hogar | Productos de limpieza y artículos para mantener tu casa en orden. | Para mantener tu casa en orden. | — | VERIFIED (L21) |

| ID | Elemento | Texto | Estado |
|---|---|---|---|
| CAT-BADGE | Texto visible de la insignia | A confirmar | ASSUMPTION (A-04) |
| CAT-BADGE-SR | Texto `sr-only` junto a la insignia | (categoría pendiente de confirmación) | ASSUMPTION |

Solo documentación: la insignia "A confirmar" existe solo en la vista previa. Antes de producción, Carnicería y Verdulería se confirman (se quita la insignia) o se retiran mediante el flag del módulo de contenido.

### 3.3 Ofertas: estado vacío (REQ-006)

| ID | Elemento | Texto | Estado |
|---|---|---|---|
| PROD-S3-H2 | H2 | Ofertas destacadas | VERIFIED |
| PROD-S3-EMPTY-T | H3 | Todavía no hay ofertas publicadas | ASSUMPTION / BLOCKED |
| PROD-S3-EMPTY-P | Texto | Vamos a publicar acá las ofertas cuando estén confirmadas. Para consultar promociones, acercate al local o llamanos al 0000 00-0000. | ASSUMPTION / BRIEF-VALIDAR |
| PROD-S3-CTA | Botón | Llamar al supermercado → CTA-CALL | BRIEF-VALIDAR |

### 3.4 Cierre (REQ-001)

| ID | Elemento | Texto | Estado |
|---|---|---|---|
| PROD-S4-H2 | H2 (31) | Vení a recorrer nuestras góndolas | ASSUMPTION (redacción) |
| PROD-S4-P | Texto | Te esperamos en Calle Ejemplo 123, Villa Ejemplo. | VERIFIED (L143) |
| PROD-S4-CTA1 | Botón | Cómo llegar → CTA-MAPS | VERIFIED |
| PROD-S4-CTA2 | Enlace | Consultar horarios → `/contacto#horarios` | VERIFIED |

---

## 4. Nosotros (`/nosotros`) (REQ-007)

Solo afirmaciones del brief (L5, L9-14, L29-30, L143, L151-152). Excluido: año de fundación, historia, trayectoria, nombres de dueños o personal, cifras, premios, certificaciones, testimonios y fotos del equipo (L164-165).

| ID | Elemento | Texto | Estado |
|---|---|---|---|
| ABOUT-S1-H1 | H1 (25) | Somos Supermercado Los Álamos | VERIFIED (L5). ASSUMPTION: refina el H1 "Nosotros" del inventario. Reversible. |
| ABOUT-S1-P1 | Párrafo | Somos un supermercado de cercanía en Villa Ejemplo, pensado para las compras cotidianas de familias y vecinos. | VERIFIED (L9-10) |
| ABOUT-S1-P2-ALT | Párrafo | Te esperamos si vivís en Villa Ejemplo, Pueblo Vecino o en las localidades cercanas. | VERIFIED (L29-30, como público) |
| ABOUT-S2-H2 | H2 (23) | Lo que vas a encontrar | ASSUMPTION |
| ABOUT-S2-I1 | Ítem (H3 + texto) | **Variedad.** Productos para resolver la compra de todos los días. | VERIFIED (L12) |
| ABOUT-S2-I2 | Ítem | **Frescura.** Productos frescos para tu mesa. | VERIFIED (L13) |
| ABOUT-S2-I3 | Ítem | **Atención cercana.** El trato de un comercio de barrio. | VERIFIED (L13) |
| ABOUT-S2-I4 | Ítem | **Comodidad.** Un comercio local, cerca de casa. | VERIFIED (L14) |
| ABOUT-S3-H2 | H2 (25) | Visitanos en Villa Ejemplo | VERIFIED (L7) |
| ABOUT-S3-P | Texto | Estamos en Calle Ejemplo 123. Abrimos de lunes a sábado, de 07:30 a 21:00. | VERIFIED (L143) / BRIEF-VALIDAR (horario) |
| ABOUT-S3-CTA1 | Botón | Cómo llegar → CTA-MAPS | VERIFIED |
| ABOUT-S3-CTA2 | Enlace | Ver productos → CTA-PRODUCTS | VERIFIED |

---

## 5. Contacto y ubicación (`/contacto`) (REQ-004, REQ-001, REQ-002, REQ-003, REQ-008)

| ID | Elemento | Texto | Estado |
|---|---|---|---|
| CONT-S1-H1 | H1 (20) | Contacto y ubicación | VERIFIED (L68) |
| CONT-S1-SUB | Bajada | Encontrá nuestra dirección, horarios y teléfono. Te esperamos en el local. | ASSUMPTION (redacción) |

### S1. Datos de contacto

| ID | Elemento | Texto | Estado |
|---|---|---|---|
| CONT-S1-H2-ADDR | H2 | Dirección | ASSUMPTION |
| CONT-S1-ADDR | `<address>` | Calle Ejemplo 123, B0000 Villa Ejemplo, Provincia de Buenos Aires, Argentina | VERIFIED (L143-145) |
| CONT-S1-ADDR-CTA | Botón primario | Cómo llegar → CTA-MAPS | VERIFIED |
| CONT-S1-H2-PHONE | H2 | Teléfono | ASSUMPTION |
| CONT-S1-PHONE | Enlace `{TEL_HREF}` | 0000 00-0000 | BRIEF-VALIDAR (L148) |
| CONT-S1-PHONE-CTA | Botón | Llamar al supermercado → CTA-CALL | BRIEF-VALIDAR |
| CONT-S1-H2-HOURS | H2 (`id="horarios"`) | Horarios de atención | VERIFIED |
| CONT-S1-HOURS-1 | Fila | Lunes a sábado: 07:30 a 21:00 | BRIEF-VALIDAR (L151) |
| CONT-S1-HOURS-2 | Fila | Domingo: cerrado | BRIEF-VALIDAR (L152) |

### S2. Mapa (REQ-008, A-06)

| ID | Elemento | Texto | Estado |
|---|---|---|---|
| CONT-S2-H2 | H2 (14) | Cómo llegar | VERIFIED (L56) |
| CONT-S2-MAP-TITLE | `title` del iframe | Mapa de ubicación de Supermercado Los Álamos, Calle Ejemplo 123, Villa Ejemplo | ASSUMPTION |
| CONT-S2-MAP-FALLBACK | Texto bajo el mapa | ¿No ves el mapa? Abrí la ubicación directamente en Google Maps. | ASSUMPTION |
| CONT-S2-MAP-LINK | Enlace alternativo | Abrir en Google Maps → CTA-MAPS-ALT | ASSUMPTION |

### Notas de la página (solo documentación, no se muestran en la UI)

- **Validar antes de producción:** teléfono 0000 00-0000 y horarios (L159-160, B-03).
- Email, WhatsApp, Instagram y Facebook: PENDIENTE (L154-157). No se renderizan ni enlazan, ni se muestran como "próximamente" (A-11).
- Sin formulario de contacto (REQ-004, REQ-013).
- Sin información de feriados (B-08).

---

## 6. Textos alternativos sugeridos para imágenes stock (REQ-010, REQ-012, A-02)

Regla: describir lo que **muestra** la imagen. Nunca "nuestro local", "interior de Supermercado Los Álamos" ni "nuestro equipo" mientras no haya fotos reales. El texto final se ajusta a la imagen que se elija; si la imagen no coincide con la descripción, se reescribe el alt.

| ID | Uso | `alt` sugerido | Estado |
|---|---|---|---|
| IMG-HERO | Hero de Inicio | Frutas y verduras frescas exhibidas en cajones de un supermercado | ASSUMPTION |
| IMG-HERO-ALT2 | Alternativa si la foto es un pasillo | Pasillo de supermercado con góndolas llenas de productos | ASSUMPTION |
| IMG-CAT-ALIM | Alimentos y bebidas | Estante con bebidas y alimentos envasados | ASSUMPTION |
| IMG-CAT-ALMA | Almacén | Góndola con productos de almacén | ASSUMPTION |
| IMG-CAT-FRES | Productos frescos | Productos frescos en una exhibidora refrigerada | ASSUMPTION |
| IMG-CAT-CARN | Carnicería | Mostrador de carnicería con cortes de carne | ASSUMPTION |
| IMG-CAT-VERD | Verdulería | Cajones con frutas y verduras de estación | ASSUMPTION |
| IMG-CAT-LIMP | Limpieza y hogar | Estante con productos de limpieza para el hogar | ASSUMPTION |
| IMG-ABOUT | Nosotros (opcional) | Canasto de compras con alimentos frescos | ASSUMPTION |
| IMG-DECOR | Íconos e ilustraciones decorativas | `alt=""` (o `aria-hidden="true"` en SVG) | ASSUMPTION |

Si las tarjetas de categoría usan una imagen y un título visible con la misma información, la imagen puede ser decorativa (`alt=""`) para no duplicar la lectura. Lo decide `ux-ui-designer` o `frontend-engineer`.

---

## 7. Microcopy de sistema

| ID | Uso | Texto | Estado |
|---|---|---|---|
| SYS-NEWTAB-SR | Sufijo `sr-only` en enlaces externos | (abre en una pestaña nueva) | ASSUMPTION |
| SYS-CURRENT | `aria-current="page"` | (atributo, sin texto) | REQ-017 |
| SYS-404-H1 | Página 404 (si se genera) | No encontramos esta página | ASSUMPTION (opcional) |
| SYS-404-P | Texto 404 | Volvé al inicio o consultá cómo llegar al supermercado. | ASSUMPTION (opcional) |
| SYS-404-CTA | Botón 404 | Ir al inicio | ASSUMPTION (opcional) |

---

## 8. Contenido provisorio y CTA a vigilar

| Elemento | Situación | Acción antes de producción |
|---|---|---|
| CTA-CALL / teléfono en todas las páginas | El destino `tel:+540000000000` deriva del número publicado (A-09), sin validar (B-03) | Confirmar el número con el comercio |
| Horarios (HOME-S6, HOME-S7, ABOUT-S3, CONT-S1, footer) | BRIEF-VALIDAR | Confirmar; si cambian, se editan en un solo módulo |
| CTA-MAPS | URL de búsqueda derivada de la dirección (ASSUMPTION) | Verificar que el pin coincida con el local; si existe ficha de Google Business Profile, considerar enlazarla |
| CAT-CARN, CAT-VERD | A confirmar (A-04) | Confirmar o retirar; quitar insignia |
| Ofertas (HOME-S5, PROD-S3) | BLOCKED | Cargar ofertas confirmadas o mantener el estado vacío |
| GLB-FTR-IMG-NOTE | Imágenes de stock | Retirar la nota al reemplazar por fotos reales |
| GLB-HDR-LOGO | Logo textual (A-03) | Reemplazar si se entrega el logo oficial |

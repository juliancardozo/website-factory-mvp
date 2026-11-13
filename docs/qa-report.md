# Informe QA: Supermercado Los Álamos

- **Fecha:** 2026-11-12
- **Auditor:** qa-reviewer (revisión independiente, estática y por línea de comandos)
- **Brief (fuente de verdad):** `briefs/supermercado-los-alamos.md`
- **Especificación:** `specs/001-sitio-supermercado-los-alamos/spec.md` (FR-001..FR-019, SC-001..SC-007), `plan.md`, `tasks.md`, `contracts/*.md`
- **Código auditado:** `src/**`, `public/**`, `scripts/validate_content.py`, HTML generado en `dist/` (reconstruido durante esta auditoría con `npm run build`)
- **Veredicto:** **APROBADO PARA PREVIEW LOCAL CON OBSERVACIONES.** No hay defectos BLOCKER ni MAJOR. Hay 8 defectos MINOR. **No apto para producción** hasta cerrar los pendientes de la sección 9 (teléfono y horarios sin validar, categorías a confirmar, fotos, fuentes, dominio).
- **Pruebas de navegador:** NO EJECUTADAS por qa-reviewer (ver sección 8).

---

## 1. Comandos ejecutados (resultados literales)

### 1.1 `npm run check`
```
21:53:32 [check] Getting diagnostics for Astro files in <proyecto>...
Result (46 files): 
- 0 errors
- 0 warnings
- 0 hints
```
Código de salida: 0.

### 1.2 `npm run build`
```
21:53:38 [build] output: "static"
 generating static routes 
21:53:38 ▶ src/pages/404.astro
21:53:38   └─ /404.html (+4ms) 
21:53:38 ▶ src/pages/contacto.astro
21:53:38   └─ /contacto/index.html (+2ms) 
21:53:38 ▶ src/pages/index.astro
21:53:38   └─ /index.html (+2ms) 
21:53:38 ▶ src/pages/nosotros.astro
21:53:38   └─ /nosotros/index.html (+1ms) 
21:53:38 ▶ src/pages/productos.astro
21:53:38   └─ /productos/index.html (+1ms) 
21:53:38 [build] 5 page(s) built in 447ms
21:53:38 [build] Complete!
```
Código de salida: 0 (con `set -o pipefail`).

### 1.3 `python3 scripts/validate_content.py`
```
PASS: 45 archivos de src/ y 5 páginas de dist/ analizados (C-01, C-02, C-03). Revisión editorial y visual sigue siendo necesaria.
```
Código de salida: 0.

### 1.4 Greps propios sobre `dist/**/*.html` (insensible a mayúsculas)

Comando base: `grep -rEoi --include='*.html' "<patrón>" dist | wc -l`

| Patrón | Coincidencias | Interpretación |
|---|---|---|
| `\$\s?[0-9]` (precios) | 0 | OK |
| `[0-9]+\s?%` | 42 | **Falsos positivos**: 38 son codificación URL de la dirección (`%20123%`, `0000%`) en enlaces de Maps; 4 son el gradiente CSS del hero `bg-[radial-gradient(60%_50%_at_85%_10%,...)]`. Tras quitar URLs quedan 4, todas del gradiente. 0 porcentajes visibles. |
| `2x1` / `3x2` | 0 / 0 | OK |
| `delivery` | 0 | OK |
| `env[ií]o` | 0 | OK |
| `whatsapp` / `wa\.me` | 0 / 0 | OK |
| `mailto` | 0 | OK |
| `instagram` / `facebook` | 0 / 0 | OK |
| `<form` | 0 | OK |
| `carrito` / `checkout` | 0 / 0 | OK |
| `canonical` | 0 | OK |
| `og:url` / `og:image` | 0 / 0 | OK |
| `aggregateRating` / `"review"` | 0 / 0 | OK |
| `desde (19\|20)[0-9]{2}` | 0 | OK |
| `años de` | 0 | OK |
| `example\.com` | 0 | OK |
| `online` | 1 | `productos/index.html`: "Este sitio es informativo: **no se hacen compras online**." Es una negación aclaratoria trazable a copy-deck. OK. |
| `feriado` / `abierto ahora` | 0 / 0 | OK (edge case de la spec) |
| `mejor`, `líder`, `garant`, `precios bajos`, `marca`, `años`, `testimonio`, `reseña`, `cliente`, `tarjeta`, `efectivo` | 0 en todos | OK |
| `calidad` | 1 | Falso positivo: subcadena de "lo**calidad**es". |
| `tel:` | 13 | Todos `href="tel:+540000000000"` (index 5, contacto 3, productos 3, nosotros 1, 404 1). |
| `google\.com/maps` | 19 | Todas las páginas. |
| `lang="es-AR"` | 5 | Las 5 páginas. |

URLs absolutas presentes en `dist/` (`grep -rEoi 'https?://[^" ]+'`): solo `http://www.w3.org/2000/svg` (namespace SVG), `https://schema.org` (JSON-LD), `https://www.google.com/maps/search/?api=1&query=Calle%20Ejemplo%20123%2C%20B0000%20Villa%20Ejemplo%2C%20Provincia%20de%20Buenos%20Aires%2C%20Argentina` y el embed `https://www.google.com/maps?q=…&output=embed`. No hay URL propia ni ficticia.

### 1.5 Otros chequeos ejecutados
- IDs duplicados por página: 0 en las 5 páginas. Todos los `aria-labelledby` apuntan a IDs existentes.
- `<svg>` totales vs `<svg aria-hidden="true">`: index 38/38, productos 31/31, nosotros 17/17, contacto 18/18, 404 12/12. `<img>`: 0 en todas.
- Enlaces `target="_blank"`: 18 en total. Todos con `rel="noopener noreferrer"` y aviso "(abre en una pestaña nueva)" en `aria-label`.
- CSS compilado (`dist/_astro/contacto.d6O9Eqvw.css`, 27 455 bytes): `focus-visible` 4, `prefers-reduced-motion` 3, `.min-h-11` 1, `.min-h-12` 1, `.sr-only` 1, `@font-face` **0**, regla `[hidden]:where(:not([hidden=until-found])){display:none!important}` presente.
- Escaneo de secretos (`api_key|secret|token|password|AIza…|sk-…|PRIVATE KEY`) en src, public, scripts, dist, package.json: sin coincidencias relevantes (solo comentarios del validador y la palabra "Tokens" en un comentario CSS). No hay archivos `.env*`.

---

## 2. Quality gates (QG-01..QG-08)

| ID | Gate | Estado | Evidencia |
|---|---|---|---|
| QG-01 | `npm run check` OK | **PASS** | §1.1: 0 errors, 0 warnings, 0 hints (46 archivos) |
| QG-02 | `npm run build` OK | **PASS** | §1.2: 5 páginas, "Complete!", salida 0 |
| QG-03 | Sin contradicciones con el brief ni claims fabricados | **PASS con observaciones** | §1.4 greps en 0; revisión editorial (§5): todo el texto visible es trazable a copy-deck, seo-plan o brief. Brechas documentadas: hero sin fotografía (QA-002) y tipografías no cargadas (QA-001), ambas declaradas en B-02 y R-02 |
| QG-04 | Título, description, lang | **PASS** | 5 `<title>` y 5 `meta description` únicos (§4.2); `lang="es-AR"` ×5; sin canonical, og:url ni og:image |
| QG-05 | CTA sin datos ficticios | **PASS** | `tel:+540000000000` = 0000 00-0000 del brief (BRIEF-VALIDAR); Maps con la dirección exacta del brief; 0 mailto, WhatsApp ni redes; `validate_content.py` PASS |
| QG-06 | Legible en 360/768/1440 | **NO EJECUTADO** | Sin navegador. Solo evidencia estática: clases mobile-first, `w-full sm:w-auto`, `min-h-11/12`. Ver §8 |
| QG-07 | Teclado, foco, alt, headings | **PASS (estático)**; prueba real de teclado NO EJECUTADA | §6: 1 H1 por página, sin saltos, skip link, `:focus-visible` global, `aria-expanded`, SVG `aria-hidden`, `prefers-reduced-motion` |
| QG-08 | Sin claves ni datos sensibles | **PASS** | §1.5: escaneo sin hallazgos; sin `.env*` |

---

## 3. Trazabilidad FR-001..FR-019

| FR | Estado | Evidencia |
|---|---|---|
| FR-001 Cómo llegar (hero, ubicación, CTA final, contacto; pestaña nueva con aviso) | **PASS** | `src/pages/index.astro:31` (HomeHero → `HomeHero.astro:24`), `index.astro:80` (ubicación), `index.astro:87` (CtaBand → `CtaBand.astro:29`), `contacto.astro:31` (`showDirections`) + `MapEmbed.astro:34`. Header en todas las páginas (`SiteHeader.astro:27-28`). URL: `site.ts:107`. `aria-label` "Cómo llegar a Supermercado Los Álamos en Google Maps (abre en una pestaña nueva)", `target="_blank" rel="noopener noreferrer"` (`CtaLink.astro:50`). index.html tiene 5 enlaces a Maps (≥3 requeridos) |
| FR-002 Llamar + número legible | **PASS** | `site.ts:28-33` (`display: '0000 00-0000'`, `e164: '+540000000000'`); `CallButton.astro:17-27`; número visible en `PhoneBlock.astro:30` (footer y contacto) y en el estado vacío de ofertas. E.164 = ASSUMPTION A-09 (correcta: se quita el 0 de larga distancia) |
| FR-003 Horarios como texto en Inicio, Contacto y footer; única fuente; "Consultar horarios" → bloque | **PASS** | `site.ts:36-39`; `index.astro:70` (`id="horarios"`), `contacto.astro:34` (`headingId="horarios"`), `SiteFooter.astro:30`. Enlaces `#horarios` (Inicio) y `/contacto#horarios` (Productos, `productos.astro:42`); destinos verificados en dist |
| FR-004 Contacto reúne dirección, teléfono, horarios, Cómo llegar y mapa, sin formulario | **PASS** | `contacto.astro:29-45`; `<form` = 0 |
| FR-005 Categorías como tarjetas sin marcas ni precios; Carnicería/Verdulería con "A confirmar" | **PASS** | `site.ts:51-82`; `CategoryCard.astro:23,51` + `StatusBadge.astro`; dist muestra "A confirmar (categoría pendiente de confirmación)" en Inicio y Productos |
| FR-006 Ofertas: estado vacío honesto; extensible sin rediseño | **PASS** | `site.ts:88` (`offers = []`); `OffersSection.astro:23-29` (rama `OfferCard`); texto "Todavía no hay ofertas publicadas…" |
| FR-007 Nosotros solo con afirmaciones del brief | **PASS** | `copy.ts:95-108`; texto de dist revisado en §5 |
| FR-008 Mapa diferido con título y alternativa | **PASS** | `MapEmbed.astro:22-28` (`loading="lazy"`, `title`), fallback textual y enlace `MapEmbed.astro:17-20,31-35`. Ver QA-003 y QA-004 |
| FR-009 Título/description únicos, es-AR, OG básico, sin canonical ni URL absolutas | **PASS** | `seo.ts:14-51`, `BaseLayout.astro:28-40`; §1.4 canonical/og:url/og:image = 0 |
| FR-010 JSON-LD solo nombre + dirección | **PASS** | `seo.ts:54-68`; dist index y contacto: `GroceryStore` con `name` y `address` solamente; sin rating, priceRange, geo ni sameAs |
| FR-011 WCAG 2.1 AA (contraste, teclado, foco, headings, landmarks, alt, movimiento) | **PASS (estático)** / prueba asistida NO EJECUTADA | §6 y §7 |
| FR-012 360/768/1440 sin scroll horizontal; CTA ≥44×44 | **PARCIAL**: táctil PASS (estático), visual NO EJECUTADO | `CtaLink.astro:40-46` (`min-h-11` = 44px / `min-h-12` = 48px), menú `min-h-11 min-w-11` (`SiteHeader.astro:38`), nav `min-h-11/12` |
| FR-013 Imágenes optimizadas, con licencia, no presentadas como del local | **PASS** (sin imágenes raster) | `site.ts:53-85` (`image: null`), `<img>` = 0; ilustraciones SVG propias (`Illustration.astro:2-3`). Nota de imágenes oculta mientras no haya fotos (`SiteFooter.astro:15,41`) |
| FR-014 Sin carrito, compra, precios, checkout, login, formularios ni popups | **PASS** | §1.4; sin `<dialog>` ni modales; el único JS es el menú (`SiteHeader.astro:56-78`) |
| FR-015 Sin delivery, envíos, compra online, WhatsApp, medios de pago | **PASS** | §1.4 (`online` solo en negación) |
| FR-016 Único origen de contenido separado de presentación | **PASS** | `site.ts` (datos), `copy.ts` y `seo.ts` interpolan; `grep 07:30\|21:00\|00-0000\|000000\|Ejemplo\|B0000\|Carnicer\|Verduler` fuera de `site.ts` = 0 resultados |
| FR-017 Identidad: paleta y tipografías del brief, tarjetas redondeadas, íconos simples, animaciones sutiles | **PARCIAL** | Paleta exacta: `global.css:9-14`. Tipografías declaradas pero **no cargadas** (`global.css:19-21`, 0 `@font-face`): ver QA-001. Hero sin fotografía: QA-002 |
| FR-018 Acceso a las 4 páginas en 1 clic + página actual | **PASS** | `site.ts:99-104`, `NavLinks.astro:37-40` (`aria-current="page"`, 2 por página: nav escritorio + móvil; solo uno visible por breakpoint); footer con las 4 |
| FR-019 Check, build y validación verdes; preview local | **PASS** | §1.1-1.3; preview: `npm run dev -- --host 127.0.0.1` → http://localhost:4321 (quickstart.md:8) |

## 4. Criterios de éxito SC-001..SC-007

| SC | Estado | Evidencia |
|---|---|---|
| SC-001 Cómo llegar sin scroll a 360px; horarios en 1 acción | **PASS (estático)** / visual NO EJECUTADO | Botón compacto "Cómo llegar" en el header sticky móvil (`SiteHeader.astro:18,27`) más el botón del hero; "Consultar horarios" en el hero (`HomeHero.astro:28`) → `#horarios` |
| SC-002 100% de Cómo llegar a la misma dirección; 100% de Llamar al mismo número | **PASS** | Un único `MAPS_URL` en las 5 páginas (sin variantes en el grep); 13/13 `tel:+540000000000` |
| SC-003 0 precios, %, marcas, testimonios, trayectoria, delivery, WhatsApp, carritos, formularios | **PASS** | §1.4 |
| SC-004 4 páginas con título y description únicos con "Supermercado Los Álamos"; 0 URL canónicas o absolutas ficticias | **PASS** | §4.2 |
| SC-005 0 combinaciones bajo AA; 100% interactivos alcanzables con foco visible | **PASS (estático)** / teclado real NO EJECUTADO | §7 |
| SC-006 Check, build y validación sin errores | **PASS** | §1.1-1.3 |
| SC-007 Confirmar teléfono, horarios o categoría = 1 solo cambio | **PASS** | Todo en `src/content/site.ts` (L28-39, L68-76); copy y SEO interpolan (`copy.ts:3`, `seo.ts:3`) |

### 4.2 Metadatos por página (literal de dist)

| Página | `<title>` | `meta description` |
|---|---|---|
| `/` | Supermercado Los Álamos \| Tu súper de cercanía en Villa Ejemplo | Supermercado Los Álamos: tu supermercado de cercanía en Calle Ejemplo 123, Villa Ejemplo. Alimentos, bebidas, almacén, frescos y limpieza. Horarios y cómo llegar. |
| `/productos` | Productos y categorías \| Supermercado Los Álamos, Villa Ejemplo | Categorías de Supermercado Los Álamos en Villa Ejemplo: alimentos y bebidas, almacén, productos frescos, limpieza y artículos para el hogar. Visitanos en el local. |
| `/nosotros` | Nosotros \| Supermercado Los Álamos, Villa Ejemplo | Supermercado Los Álamos es un supermercado de cercanía en Villa Ejemplo, pensado para las compras cotidianas de familias y vecinos, con variedad y atención cercana. |
| `/contacto` | Contacto y ubicación \| Supermercado Los Álamos, Villa Ejemplo | Supermercado Los Álamos: Calle Ejemplo 123, Villa Ejemplo. Teléfono 0000 00-0000. Lunes a sábado de 07:30 a 21:00; domingo cerrado. Mapa y cómo llegar. |
| `/404` | Página no encontrada \| Supermercado Los Álamos | Volvé al inicio o consultá cómo llegar al supermercado. |

Coinciden con `docs/seo-plan.md` (L36-77). OG: `og:type=website`, `og:locale=es_AR`, `og:site_name`, `og:title`, `og:description`.

---

## 5. Revisión editorial manual

Método: extracción del texto visible de las 5 páginas de `dist/` (parser HTML que excluye script, style y svg) y búsqueda de cada línea en `docs/copy-deck.md`. Las líneas no encontradas literalmente son composiciones o metadatos: títulos (en seo-plan.md), dirección y horario interpolados desde `site.ts` (brief L143-152), "A confirmar (categoría pendiente de confirmación)" (insignia + sr-only, copy-deck CAT) y "© 2026 Supermercado Los Álamos". **Ningún texto visible queda sin trazar.**

Claims revisados:

| Texto en dist | Fuente | Estado |
|---|---|---|
| "Tu supermercado de cercanía en Villa Ejemplo" | Brief L9-10 | VERIFIED |
| "…familias y los vecinos de Villa Ejemplo, Pueblo Vecino y alrededores" | Brief L36-37 (público objetivo) | VERIFIED |
| "variedad de productos, frescura y una atención cercana" | Brief L12-14 (propuesta digital a destacar) | VERIFIED como posicionamiento pedido |
| "Te atendemos con el trato de un comercio de barrio" / "Vení a recorrer nuestras góndolas" | copy-deck; brief L14-15 ("atención cercana", "comercio local") | ASSUMPTION de redacción, sin dato fáctico nuevo |
| Categorías: Alimentos y bebidas, Almacén…, Productos frescos, Limpieza… | Brief L17-21 | VERIFIED |
| Carnicería y Verdulería con "A confirmar" | Brief L20 "(categorías a validar)" | ASSUMPTION A-04, señalizada |
| "Carnes para tus comidas…", "Frutas y verduras…" | Descripción genérica de la categoría | Sin marcas ni productos específicos |
| Estado vacío de ofertas | Brief L22 "sujetas a confirmación" | Honesto |
| "Este sitio es informativo: no se hacen compras online" | Brief L24-25, L52 | Coherente |
| Dirección, teléfono, horarios | Brief L143-152 | Dirección VERIFIED; teléfono y horario BRIEF-VALIDAR |

No se encontraron: marcas, superlativos ("el mejor", "líder"), trayectoria, años, premios, certificaciones, testimonios, medios de pago, servicios no listados ni menciones a feriados. Nosotros no contiene nombres de personas ni fecha de fundación.

---

## 6. Accesibilidad estática

| Ítem | Resultado | Evidencia |
|---|---|---|
| Un H1 por página | PASS | `grep -c '<h1'` = 1 en las 5 páginas |
| Jerarquía sin saltos | PASS | index: h1 h2 h2 h3×6 h2 h3×4 h2 h3 h2 h3 h3 h2 h2×4; productos: h1 h2 h3×6 h2 h3 h2 h2×4; nosotros: h1 h2 h3×4 h2 h2×4; contacto: h1 h2×8; 404: h1 h2×4. Ningún h1→h3 ni h2→h4 |
| Landmarks | PASS | `header`, `nav[aria-label]` ("Navegación principal"; footer "Navegación del pie de página"), `main#contenido`, `footer`; `section[aria-labelledby]` |
| SVG decorativos | PASS | 100% `aria-hidden="true" focusable="false"` (`Icon.astro:12-14`, `Illustration.astro:112-115`); 0 `<img>` |
| Enlaces externos | PASS | 18/18 con aviso de pestaña nueva en `aria-label`; el nombre accesible empieza con el texto visible (cumple 2.5.3 Label in Name) |
| Menú móvil | PASS | `aria-expanded`, `aria-controls="menu-principal"`, etiqueta Abrir/Cerrar, Escape devuelve el foco (`SiteHeader.astro:29-43,62-74`); mejora progresiva: sin JS el menú queda visible y el botón oculto |
| Skip link | PASS | Primer elemento enfocable del body (`BaseLayout.astro:44`, `SkipLink.astro:8-11`) → `#contenido` con `tabindex="-1"` |
| Foco visible | PASS (estático) | `global.css:86-92`: outline 3px verde-oscuro; amarillo en `[data-surface="dark"]` (footer y bandas CTA) |
| Movimiento reducido | PASS | `global.css:98-108`; animaciones solo con `motion-safe:` (`HomeHero.astro:19,31`, `SiteHeader.astro:47`) |
| Tamaño táctil de CTA | PASS (estático) | `min-h-11` (44px) o `min-h-12` (48px) en CtaLink, menú, nav, teléfono (`PhoneBlock.astro:27`); horizontal `min-w-11` en el botón de menú |
| Insignia de estado sin depender del color | PASS | Texto "A confirmar" + sr-only (`StatusBadge.astro`) |
| Página actual | PASS | `aria-current="page"` + barra (`NavLinks.astro:21,26,40`) |
| Mapa | PASS | `title` descriptivo, fallback textual y enlace siempre visibles |

## 7. Contraste: uso de clases frente a design-system §3

Búsqueda en `src/`:
- `text-amarillo`: 1 uso, `SectionHeader.astro:18`, solo cuando `surface === 'dark'` (fondo verde-oscuro = permitido 5.04). Ningún `text-amarillo` sobre fondos claros. Además, ninguna página pasa `eyebrow` en superficie oscura, así que hoy no se renderiza.
- `bg-verde` (sin -oscuro): 1 uso, `CtaLink.astro:29`, con `text-blanco` (4.74, permitido solo para la etiqueta del botón primario de 16px semibold, que es el caso). **0 `text-tinta` sobre `bg-verde`.**
- `bg-amarillo`: con `text-tinta` (`StatusBadge.astro:10`, `CtaLink.astro:34`: 8.29, permitido); el resto son decorativos sin texto (`CategoryCard.astro:40-41`, `Wordmark.astro:29`). **0 `text-blanco`/`text-crema` sobre `bg-amarillo`.**
- `text-crema`/`text-blanco`: solo en superficies `bg-tinta` (footer) o `bg-verde-oscuro` (Section tone y CtaBand): permitidos.
- Opacidad en colores de texto (`text-*/NN`): 0 usos.
- `text-verde` (sin -oscuro): solo en SVG decorativos `aria-hidden`.
- Verificación adicional propia: la ilustración de fondo "hojas" (verde al 30% sobre verde-oscuro, `CtaBand.astro:22`) da un color mezclado de aproximadamente #1C683E. Ratios calculados con la fórmula WCAG: blanco 6.78, crema 6.46: siguen ≥4.5. Amarillo 4.28 solo afectaría a texto amarillo pequeño, que no existe en CtaBand.

Resultado: **0 combinaciones prohibidas detectadas.**

---

## 8. Pruebas de navegador

**NO EJECUTADAS por qa-reviewer**: no hay navegador disponible en este entorno. No se afirman resultados visuales, de teclado real, de lector de pantalla, Lighthouse ni axe. El orquestador agregará resultados aquí si los obtiene.

Pendiente de verificación visual o manual:
- 360px: que el header (wordmark + "Cómo llegar" compacto + botón de menú) no desborde; que no haya scroll horizontal; que "Cómo llegar" se vea en la primera pantalla.
- 768px y 1440px: grillas de categorías y beneficios, banda CTA, mapa sticky en contacto.
- Recorrido completo con Tab: orden lógico, foco visible sobre fondos claros y oscuros, menú móvil con Escape.
- Carga real del iframe de Google Maps y comportamiento con bloqueadores.
- Render de tipografías (hoy son fuentes del sistema, ver QA-001).

---

## 9. Defectos

| ID | Severidad | Descripción | Evidencia | Propuesta de corrección |
|---|---|---|---|---|
| QA-001 | MINOR | Las tipografías del brief (Plus Jakarta Sans, Inter) están declaradas pero no se cargan: se ven fuentes del sistema salvo que el usuario las tenga instaladas. FR-017 cumplido solo parcialmente | `global.css:19-21`; CSS compilado sin `@font-face`; `node_modules/@fontsource` inexistente; tasks T040 bloqueada; research R-02 | Con aprobación del usuario: `npm i @fontsource/plus-jakarta-sans @fontsource/inter` e importar los pesos `latin-600/700` y `latin-400/600` en `BaseLayout.astro` (DS §4.1) |
| QA-002 | MINOR | El brief pide "Hero con fotografía de supermercado" (L71) y "Fotografías grandes de productos frescos" (L107). El hero y las tarjetas usan ilustración SVG. La decisión está documentada (B-02, UX-05, R-03), pero es una brecha visible frente al brief | `site.ts:53-85` (`image: null`), `HeroVisual.astro:26` | Antes de producción: incorporar fotos de stock con licencia documentada (origen y licencia en `site.ts`) o fotos reales del local; activar la nota "imágenes ilustrativas" (automática en `SiteFooter.astro:15`) |
| QA-003 | MINOR | El embed usa el endpoint no documentado `google.com/maps?q=…&output=embed`, sin garantía de estabilidad | `site.ts:109`, `MapEmbed.astro:22-28` | Aceptable en preview porque el fallback textual y el enlace existen. Para producción: evaluar Maps Embed API (requiere clave, por lo tanto aprobación) u OpenStreetMap; mantener el fallback |
| QA-004 | MINOR | El iframe de Google Maps se carga automáticamente (lazy) en /contacto: es una petición a un tercero con posibles cookies, sin aviso | `MapEmbed.astro:21-29` (`enabled = true` por defecto) | Opcional: cargar el mapa al hacer clic ("Mostrar mapa"), o documentar la decisión en la política de privacidad cuando exista |
| QA-005 | MINOR | "Cómo llegar" abre una búsqueda (`/maps/search/?api=1&query=`) y no una ruta. Cumple FR-001, pero no inicia indicaciones | `site.ts:107` | Opcional: `https://www.google.com/maps/dir/?api=1&destination=<dirección>` para "Cómo llegar"; conservar la búsqueda para "Abrir en Google Maps" |
| QA-006 | MINOR | Sin JavaScript, el menú móvil queda desplegado dentro del header `sticky`: ocupa alto fijo permanente en pantallas chicas | `SiteHeader.astro:18,47` (`sticky` + menú visible por defecto) | Sin JS, que el header no sea sticky (por ejemplo, `data-menu="static"` → `position: static`) o mostrar la lista de navegación fuera del área sticky |
| QA-007 | MINOR | El README describe un sitio ficticio "Taller Aurora" y dice "No hay llamadas reales a un negocio". El sitio actual tiene un `tel:` real del brief. Es documentación inconsistente | `README.md:19` | Actualizar el README (fuera del alcance de qa-reviewer) para describir Supermercado Los Álamos y su estado de preview |
| QA-008 | MINOR | La cobertura de `validate_content.py` es más estrecha que la invariante C-01 y C-03: C-01 solo busca `Ejemplo\|00-0000\|07:30` (no `21:00`, `B0000`, `000000`, `Carnicería`, `Verdulería`); `compr[aá] online` no detecta "compras online". El grep manual de esta auditoría confirmó que hoy no hay fugas | `scripts/validate_content.py:38`, `:48` | Ampliar los patrones: `Ejemplo\|B0000\|00-0000\|000000\|07:30\|21:00` y `compr(a\|as\|á) online` con lista blanca para la negación del copy PROD-S1-NOTE |

**Conteo:** BLOCKER 0, MAJOR 0, MINOR 8.

Observaciones (no son defectos):
- Hay dos `<nav aria-label="Navegación principal">` en el DOM (escritorio y móvil), pero cada uno se oculta con `display:none` en el breakpoint opuesto, así que el árbol de accesibilidad expone uno solo.
- El `aria-label` de "Llamar al supermercado" agrega el número; el texto visible está incluido al inicio (cumple Label in Name).
- La meta description y el `og:description` de /contacto incluyen teléfono y horario BRIEF-VALIDAR: revisarlos junto con B-03.

---

## 10. Pendientes previos a producción

1. **Teléfono 0000 00-0000 y horario (L-S 07:30 a 21:00, domingo cerrado):** validar con el comercio (B-03). Están en `site.ts:28-39` (1 cambio). Al validarlos, sumar `telephone` y `openingHours` al JSON-LD (A-08).
2. **Carnicería y Verdulería:** confirmar o retirar (B-04). Se cambia `status`/`visible` en `site.ts:68-76`.
3. **Ofertas:** hoy hay un estado vacío. Cargar promociones solo cuando estén confirmadas (B-01, `site.ts:88`).
4. **Logo oficial:** hoy hay un wordmark tipográfico provisorio (B-07, A-03).
5. **Dominio público:** no hay; por eso faltan canonical, og:url, og:image, sitemap y robots con URL absoluta (B-05).
6. **Fuentes `@fontsource`:** instalación pendiente de aprobación del usuario (QA-001, T040).
7. **Fotos:** reales del local o stock con licencia documentada, nunca presentadas como del local (QA-002, B-02).
8. **Canales PENDIENTE** (email, WhatsApp, Instagram, Facebook): siguen sin mostrarse; agregarlos solo con datos verificados (B-06).
9. **Feriados:** sin información; el sitio no menciona nada (B-08).
10. **Pruebas de navegador** 360/768/1440, teclado, lector de pantalla y Lighthouse/axe: pendientes (§8, T041).
11. **Decisión sobre el mapa embebido** (QA-003/QA-004) y actualización del README (QA-007).

## 11. Supuestos de esta auditoría
- `dist/` se reconstruyó durante la auditoría; los resultados corresponden a ese build.
- Los ratios de contraste de design-system §3 se tomaron como medidos por el orquestador. Solo se recalculó la mezcla "hojas" sobre verde-oscuro (§7).
- La revisión es estática: build OK no demuestra compatibilidad visual, accesibilidad completa ni performance.

---

## Anexo del orquestador — pruebas de navegador y corrección (iteración 1 de 2)

**Ejecutado por:** orquestador, 2026-11-12, Chrome (Claude in Chrome) contra `npm run dev` en `http://127.0.0.1:4321`.

**Método:** la ventana no admitió redimensionamiento (viewport fijo 1512px), por lo que 360/768/1440 se midieron cargando cada página en iframes del mismo origen con ancho exacto. Capturas visuales: escritorio (1512px) de Inicio completo y Contacto; móvil (iframe 360px) del hero de Inicio.

| Prueba | Resultado |
|---|---|
| Scroll horizontal en 5 páginas × 360/768/1440 (15 casos) | **PASS** — `scrollWidth` = ancho en los 15 casos; 0 elementos desbordados (excluye SVG decorativos recortados) |
| Objetivos táctiles < 44px (a/button fuera de párrafos y footer) | **PASS** — único caso "Consultar horarios" ≈ 43.9px por redondeo fraccional; tiene `min-h-11` (44px) |
| SC-001 en 360px | **PASS** — "Cómo llegar" y "Llamar al supermercado" visibles sin scroll en la primera pantalla |
| Menú móvil (360px) | **PASS** — `aria-expanded` false→true, `aria-label` Abrir/Cerrar menú, panel `hidden` alterna, Escape cierra y devuelve el foco al botón |
| Orden de foco inicial | **PASS** — Saltar al contenido → logotipo → Cómo llegar → Menú |
| Regla `:focus-visible` presente | **PASS** |
| Mapa embebido en /contacto | **PASS** — geolocaliza "Calle Ejemplo 123, B0000 Villa Ejemplo"; enlace alternativo visible |
| Errores de consola en /contacto | **PASS** — 0 errores |
| Revisión visual escritorio | **PASS** — jerarquía clara, insignias "A confirmar" visibles, estado vacío de ofertas honesto, CtaBand y footer legibles |

**No ejecutado:** Lighthouse, lector de pantalla real, dispositivos físicos, capturas visuales a 768px (solo medición), navegación por teclado completa con Tab real (se verificó el orden por DOM y el menú por eventos).

**QG-06 → PASS (medición + capturas parciales).**

### Correcciones aplicadas (iteración 1)
| Defecto | Acción | Estado |
|---|---|---|
| QA-007 README describe "Taller Aurora" | README actualizado con el estado del MVP Los Álamos | CERRADO |
| QA-008 cobertura del validador | C-01 amplía a `B0000|000000|21:00`; `compr(a|as|á) online` con única negación permitida (PROD-S1-NOTE); prueba positiva/negativa OK | CERRADO |
| QA-001 fuentes | Requiere aprobación del usuario para `npm i @fontsource/*` (T040) | PENDIENTE USUARIO |
| QA-002 hero sin fotografía | Decisión documentada (B-02, A-02): sin fotos reales ni licencias; reversible vía `image` en `site.ts` | ACEPTADO (pendiente de fotos) |
| QA-003/004 iframe de Google Maps | Decisión A-06 justificada en plan (Complexity Tracking); reversible con `enabled=false` | ACEPTADO |
| QA-005 "Cómo llegar" abre búsqueda, no ruta | El brief pide "Botón para abrir Google Maps"; la búsqueda permite elegir "Cómo llegar" desde la ubicación del usuario sin pedir datos | ACEPTADO |
| QA-006 menú sin JS dentro del header fijo | Mejora progresiva funcional (enlaces accesibles); impacto menor | ACEPTADO (mejora futura) |

**Estado final:** 0 BLOCKER, 0 MAJOR; 2 MINOR cerrados, 5 aceptados con justificación, 1 pendiente de aprobación del usuario.

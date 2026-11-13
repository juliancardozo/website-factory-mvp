# Requisitos — Supermercado Los Álamos

> Fuente primaria: `briefs/supermercado-los-alamos.md` (referencias como `brief L<n>` = número de línea).
> Marco: `.specify/memory/constitution.md` v1.0.0, `CLAUDE.md`, `docs/quality-gates.md`.
> Estados: `VERIFIED` = declarado en el brief · `BRIEF-VALIDAR` = declarado en el brief pero el brief exige validarlo antes de producción · `ASSUMPTION` = default reversible elegido en modo autónomo · `PLACEHOLDER` = dato pendiente, se muestra/gestiona como tal · `BLOCKED` = no publicable hasta confirmación.
> Inventario de datos detallado: `docs/content-inventory.md`.

---

## 1. Resumen de negocio

| Campo | Contenido | Estado | Fuente |
|---|---|---|---|
| Empresa | Supermercado Los Álamos | VERIFIED | brief L5 |
| Rubro | Supermercado minorista y alimentos | VERIFIED | brief L6 |
| Ubicación | Calle Ejemplo 123, B0000 Villa Ejemplo, Provincia de Buenos Aires, Argentina | VERIFIED | brief L7, L143-145 |
| Posicionamiento | Supermercado de cercanía orientado a las compras cotidianas de familias y vecinos de Villa Ejemplo | VERIFIED | brief L9-10 |
| Objetivo principal | Incrementar las visitas al supermercado y mejorar su presencia digital en Villa Ejemplo | VERIFIED | brief L41-42 |
| Objetivos secundarios | Facilitar la ubicación; comunicar horarios; mostrar categorías; generar consultas telefónicas; publicar promociones cuando estén confirmadas | VERIFIED | brief L44-49 |
| Público | Familias, vecinos y consumidores de Villa Ejemplo, Pueblo Vecino y localidades cercanas que buscan compras cotidianas, frescos y variedad, cercanía, horarios/ubicación y promociones | VERIFIED | brief L29-37 |
| Diferencial declarado | Variedad de productos, frescura, atención cercana y comodidad de comprar en un comercio local | VERIFIED (como mensaje a destacar; no son métricas) | brief L12-14 |
| CTA principal | **Cómo llegar** al supermercado (abre Google Maps con la dirección) | VERIFIED | brief L54-56, L127 |
| CTA secundarios | Ver productos · Consultar horarios · Llamar al supermercado | VERIFIED | brief L58-61, L128 |
| Naturaleza del sitio | Informativo y comercial, sin ecommerce | VERIFIED | brief L51-52, L174 |
| Tono visual | Moderno, cálido, comercial y familiar; "supermercado local moderno, no plataforma tecnológica" | VERIFIED (propuesta) | brief L81, L114-115 |

## 2. Mapa del sitio

Máximo 4 páginas (dentro del límite MVP de 5). Rutas propuestas = `ASSUMPTION` (reversible).

| Página | Ruta | Propósito | Fuente |
|---|---|---|---|
| Inicio | `/` | Captar visita al local; CTA Cómo llegar | brief L65, L70-77 |
| Productos | `/productos` | Categorías principales y espacio de ofertas | brief L66, L17-22 |
| Nosotros | `/nosotros` | Comercio de cercanía en Villa Ejemplo, atención cercana | brief L67, L9-14 |
| Contacto y ubicación | `/contacto` | Dirección, mapa, teléfono, horarios | brief L68, L141-160 |

### 2.1 Secciones de Inicio (orden del brief, L70-77)

| # | Sección | Contenido mínimo | CTA |
|---|---|---|---|
| S1 | Hero con fotografía de supermercado | Nombre, mensaje de cercanía en Villa Ejemplo, imagen stock con licencia o ilustración (no presentada como el local real) | Cómo llegar (primario), Llamar (secundario) |
| S2 | Mensaje comercial de cercanía | Texto breve basado en brief L9-14 | — |
| S3 | Categorías principales | Tarjetas de categorías (ver REQ-005) | Ver productos |
| S4 | Beneficios de comprar en Los Álamos | Variedad, frescura, atención cercana, comodidad de comercio local (brief L12-14) | — |
| S5 | Espacio para ofertas destacadas | Estado vacío honesto (ver REQ-006) | Consultar horarios / Llamar |
| S6 | Ubicación y horarios | Dirección, horarios, enlace/mapa | Cómo llegar, Consultar horarios |
| S7 | CTA final para visitar el comercio | Invitación a visitar el local | Cómo llegar, Llamar |

### 2.2 Elementos globales
- Header con logotipo textual "Supermercado Los Álamos" (logo oficial no provisto → `PLACEHOLDER` tipográfico), navegación a las 4 páginas y acceso visible a "Cómo llegar".
- Footer con dirección, teléfono, horarios y navegación. Sin redes sociales hasta que existan (`PLACEHOLDER`).

---

## 3. Requisitos funcionales y de contenido

Prioridades: **P1** imprescindible para el MVP · **P2** importante · **P3** deseable.

### REQ-001 — CTA principal "Cómo llegar" (P1)
Fuente: brief L54-56, L127, L44-45.
- **Given** un visitante en cualquier página, **When** busca cómo llegar, **Then** encuentra un botón/enlace "Cómo llegar" visible en el hero de Inicio, en la sección Ubicación y horarios, en el CTA final y en la página Contacto y ubicación.
- **Given** el visitante activa "Cómo llegar", **When** se abre el enlace, **Then** dirige a Google Maps con la consulta de la dirección exacta `Calle Ejemplo 123, B0000 Villa Ejemplo, Provincia de Buenos Aires, Argentina` (URL de búsqueda pública de Google Maps, sin API key) y se abre en pestaña nueva con `rel="noopener noreferrer"` e indicación accesible de que abre en otra pestaña.
- **Given** la dirección cambia en el módulo de contenido, **When** se reconstruye el sitio, **Then** todos los enlaces "Cómo llegar" se actualizan desde un único origen.

### REQ-002 — Llamar al supermercado (P1)
Fuente: brief L61, L128, L48, L147-148, L159-160.
- **Given** un visitante en móvil, **When** activa "Llamar al supermercado", **Then** se dispara un enlace `tel:+540000000000` correspondiente al número publicado `0000 00-0000`.
- **Given** el número se muestra en pantalla, **When** se lee, **Then** aparece en formato local legible `0000 00-0000`.
- **Given** el teléfono está marcado `BRIEF-VALIDAR`, **When** se prepara producción, **Then** el checklist de publicación exige confirmarlo; el número vive en un único módulo de contenido.

### REQ-003 — Horarios visibles (P1)
Fuente: brief L36, L46, L60, L125, L150-152, L159-160.
- **Given** un visitante en Inicio, **When** llega a la sección Ubicación y horarios, **Then** lee "Lunes a sábado: 07:30 a 21:00" y "Domingo: cerrado" en texto (no imagen).
- **Given** el visitante usa el CTA "Consultar horarios", **When** lo activa, **Then** navega al bloque de horarios (ancla en Inicio o en Contacto) con foco/scroll correcto.
- **Given** la página Contacto y ubicación y el footer, **When** se renderizan, **Then** muestran los mismos horarios desde el mismo origen de datos.
- **Given** no hay información de feriados, **When** se renderizan horarios, **Then** no se agrega ningún texto sobre feriados ni indicadores "abierto ahora".

### REQ-004 — Página Contacto y ubicación (P1)
Fuente: brief L68, L126-128, L141-158.
- **Given** un visitante en `/contacto`, **When** carga la página, **Then** ve dirección completa, teléfono con enlace `tel:`, horarios, botón "Cómo llegar" y mapa de ubicación (REQ-008).
- **Given** email, WhatsApp, Instagram y Facebook están `PENDIENTE`, **When** se renderiza la página, **Then** no aparece ningún enlace, ícono ni dato ficticio de esos canales.
- **Given** el MVP no tiene backend, **When** se renderiza la página, **Then** no existe ningún formulario de contacto.

### REQ-005 — Categorías de productos (P1)
Fuente: brief L17-21, L47, L73, L123, L167.
- **Given** un visitante en Inicio (S3) o en `/productos`, **When** ve las categorías, **Then** se muestran tarjetas para: Alimentos y bebidas; Almacén y consumo cotidiano; Productos frescos; Limpieza y artículos para el hogar (VERIFIED) y Carnicería; Verdulería (ASSUMPTION, "categorías a validar").
- **Given** Carnicería y Verdulería están marcadas a validar, **When** se renderizan, **Then** su estado se gestiona desde el módulo de contenido con un flag de validación; en la vista previa local se muestran con indicación discreta "A confirmar" y el checklist de producción exige confirmarlas o retirarlas (ver A-04).
- **Given** cualquier tarjeta de categoría, **When** se lee, **Then** no menciona marcas, productos específicos, precios ni stock.
- **Given** la tarjeta en Inicio, **When** se activa "Ver productos", **Then** navega a `/productos`.

### REQ-006 — Espacio de ofertas sin promociones inventadas (P1)
Fuente: brief L22, L37, L49, L75, L124, L166.
- **Given** no hay promociones confirmadas (estado `BLOCKED`), **When** se renderiza la sección de ofertas en Inicio y/o Productos, **Then** se muestra un estado vacío honesto, p. ej. "Próximamente publicaremos aquí nuestras ofertas. Consultá las promociones vigentes en el local o llamando al 0000 00-0000", sin precios, porcentajes, productos, fechas ni imágenes de ofertas.
- **Given** el módulo de contenido de ofertas está vacío, **When** se agrega una oferta confirmada, **Then** la sección la renderiza sin cambiar componentes (estructura tipada lista para datos reales).
- **Given** QA revisa el HTML generado, **When** busca precios o "%" o "2x1", **Then** no encuentra ninguno.

### REQ-007 — Página Nosotros sin trayectoria inventada (P2)
Fuente: brief L67, L9-14, L164-165.
- **Given** un visitante en `/nosotros`, **When** lee la página, **Then** encuentra solo: comercio de cercanía en Villa Ejemplo, compras cotidianas de familias y vecinos, atención cercana, variedad, frescura y comodidad de comprar en un comercio local.
- **Given** no hay datos de historia, **When** se renderiza, **Then** no aparecen año de fundación, años de trayectoria, nombres de dueños/personal, cifras, premios, certificaciones ni testimonios.

### REQ-008 — Mapa de ubicación (P1)
Fuente: brief L126, L76.
- **Given** un visitante en `/contacto` (y opcionalmente S6 de Inicio), **When** llega a la sección de ubicación, **Then** ve un mapa de la dirección del brief.
- **Given** el mapa es un embed de terceros, **When** se carga, **Then** usa `loading="lazy"`, tiene `title` descriptivo, no requiere API key ni JS propio, y debajo hay un enlace textual "Cómo llegar" como alternativa accesible (ASSUMPTION A-06).
- **Given** el embed falla o el usuario navega con teclado, **When** no puede usar el mapa, **Then** la dirección en texto y el enlace a Google Maps siguen disponibles.

### REQ-009 — SEO local (P1)
Fuente: brief L130, L181, L7, L29-30; constitución V.
- **Given** cada página, **When** se genera el HTML, **Then** tiene `<html lang="es-AR">` (ASSUMPTION A-07), `<title>` único que incluye "Supermercado Los Álamos" y "Villa Ejemplo" donde aplique, y meta description única.
- **Given** no hay URL pública confirmada, **When** se genera el HTML, **Then** no existen `canonical`, `og:url`, `sitemap` con dominio ni URLs absolutas ficticias.
- **Given** Open Graph básico, **When** se inspecciona, **Then** incluye `og:title`, `og:description`, `og:type`, `og:locale` sin `og:url`; `og:image` solo con ruta relativa a imagen con licencia (o se omite).
- **Given** datos estructurados, **When** se incluye JSON-LD `GroceryStore`, **Then** contiene solo name y address (PostalAddress con B0000, Villa Ejemplo, Buenos Aires, AR); telephone y openingHours se agregan solo tras validación (decisión del orquestador, constitución V); sin `url`, `geo` inventada, `priceRange`, `aggregateRating`, `review` ni `sameAs` (ASSUMPTION A-08).
- **Given** los textos, **When** mencionan localidades, **Then** pueden nombrar Villa Ejemplo y cercanía a Pueblo Vecino y localidades cercanas como público, sin afirmar zonas de envío.

### REQ-010 — Accesibilidad (P1)
Fuente: brief L109, L129; constitución IV; QG-07.
- **Given** cualquier página, **When** se navega solo con teclado, **Then** todos los enlaces/botones son alcanzables en orden lógico con foco visible y existe enlace "Saltar al contenido".
- **Given** la estructura, **When** se inspecciona, **Then** hay un único `<h1>` por página, jerarquía de headings sin saltos, landmarks `header`, `nav`, `main`, `footer`.
- **Given** texto y botones sobre la paleta propuesta, **When** se evalúa contraste, **Then** cumple WCAG 2.1 AA (4.5:1 texto normal, 3:1 texto grande/UI); combinaciones que no cumplan (p. ej. texto blanco sobre amarillo #F5C84C) no se usan para texto.
- **Given** imágenes, **When** son informativas, **Then** tienen `alt` significativo y no engañoso (no afirma que es el local); decorativas usan `alt=""`.
- **Given** el usuario tiene `prefers-reduced-motion`, **When** navega, **Then** las animaciones se desactivan o reducen.
- **Given** el menú móvil, **When** se abre/cierra, **Then** expone `aria-expanded`/`aria-controls` y es operable con teclado.

### REQ-011 — Responsive mobile-first (P1)
Fuente: brief L119, L129, L182; QG-06.
- **Given** viewport de 360px, **When** se renderiza cualquier página, **Then** no hay scroll horizontal, los CTA "Cómo llegar" y "Llamar" son visibles y con área táctil ≥ 44×44px, y el texto es legible sin zoom.
- **Given** 768px y 1440px, **When** se renderiza, **Then** la grilla de categorías se adapta (p. ej. 1/2/3 columnas) y el contenido mantiene ancho máximo legible.
- **Given** no hay navegador disponible, **When** QA reporta, **Then** no afirma revisión visual realizada.

### REQ-012 — Rendimiento e imágenes (P2)
Fuente: brief L107, L131-132, L170-173; constitución restricciones.
- **Given** imágenes del sitio, **When** se construye, **Then** se sirven optimizadas (componente de imagen de Astro, formatos modernos, dimensiones explícitas, `loading="lazy"` salvo la imagen del hero).
- **Given** cada imagen, **When** se documenta, **Then** consta su origen y licencia (stock con licencia o ilustración propia) en el inventario de contenido; nunca fotos de otros supermercados presentadas como el local.
- **Given** el sitio estático, **When** se carga, **Then** no incluye JS de cliente salvo el mínimo justificado (p. ej. menú móvil) y las fuentes Plus Jakarta Sans e Inter se cargan con `font-display: swap` y subconjunto limitado de pesos.
- **Given** no se ejecutó Lighthouse, **When** se reporta, **Then** no se inventan puntuaciones.

### REQ-013 — Sin ecommerce, carritos ni formularios simulados (P1)
Fuente: brief L52, L136, L139, L174-175; constitución II.
- **Given** cualquier página, **When** se inspecciona, **Then** no existen carrito, botón "Comprar"/"Agregar", precios, checkout, login ni formularios (`<form>`) que aparenten enviar datos.
- **Given** no hay popups requeridos, **When** se carga cualquier página, **Then** no aparece modal, popup ni banner invasivo.

### REQ-014 — No afirmar servicios no confirmados (P1)
Fuente: brief L24-25, L155, L169.
- **Given** cualquier texto, metadato o JSON-LD, **When** se revisa, **Then** no se menciona delivery, envío a domicilio, compra online, pedidos por WhatsApp, medios de pago, estacionamiento ni otros servicios no listados en el brief.
- **Given** WhatsApp está `PENDIENTE`, **When** se renderiza el sitio, **Then** no hay botón flotante ni enlace `wa.me`.

### REQ-015 — Contenido separado del diseño (P1)
Fuente: brief L179-180, L176; constitución III.
- **Given** datos comerciales (nombre, dirección, teléfono, horarios, categorías, ofertas, textos, estados), **When** se implementa, **Then** viven en módulos TypeScript tipados (p. ej. `src/content/site.ts`) y los componentes los consumen por props.
- **Given** un dato `PLACEHOLDER`/`BRIEF-VALIDAR`, **When** se confirma, **Then** reemplazarlo requiere modificar un solo lugar.
- **Given** los componentes, **When** se revisan, **Then** son reutilizables (Button/CTA, CategoryCard, HoursTable, MapEmbed, Section, etc.).

### REQ-016 — Identidad visual propuesta (P2)
Fuente: brief L79-115.
- **Given** los tokens de diseño, **When** se definen en `@theme`, **Then** usan la paleta sugerida (#27834B, #185C38, #FFF9ED, #FFFFFF, #F5C84C, #27332D) y tipografías Plus Jakarta Sans (títulos) e Inter (textos), documentadas como propuesta, no identidad oficial.
- **Given** el estilo, **When** se revisa, **Then** presenta fondo claro con acentos verdes, tarjetas redondeadas, íconos simples, botones destacados y animaciones sutiles; no parece una plataforma tecnológica.

### REQ-017 — Navegación simple (P2)
Fuente: brief L120, L135.
- **Given** cualquier página, **When** el visitante usa la navegación, **Then** accede a las 4 páginas en un máximo de un clic y la página actual se indica con `aria-current="page"`.

### REQ-018 — Verificabilidad y build (P1)
Fuente: brief L178, L183; constitución VI; QG-01/02/05.
- **Given** el proyecto, **When** se ejecutan `npm run check` y `npm run build`, **Then** finalizan sin errores; `npm run dev` permite ver el sitio localmente.
- **Given** `scripts/validate_content.py` existe, **When** se ejecuta, **Then** no detecta CTA con datos ficticios.

---

## 4. No-requisitos explícitos (fuera de alcance MVP)

| ID | No-requisito | Fuente |
|---|---|---|
| NR-01 | Delivery / envío a domicilio | brief L24-25 |
| NR-02 | Compras online / ecommerce / carrito / checkout | brief L24, L52, L136, L174 |
| NR-03 | Pedidos o botón de WhatsApp | brief L25, L155 |
| NR-04 | Formularios de contacto o newsletter (sin backend) | brief L139, L175; CLAUDE.md scope |
| NR-05 | Precios, catálogo de productos o marcas específicas | brief L166-167 |
| NR-06 | Testimonios, reseñas, premios, certificaciones, trayectoria | brief L164-165 |
| NR-07 | Popups, modales promocionales, cookies banners no requeridos | brief L137 |
| NR-08 | CMS, autenticación, pagos | CLAUDE.md scope; constitución II |
| NR-09 | Indicador "abierto ahora" / lógica horaria con JS | no solicitado; evita JS innecesario |
| NR-10 | Enlaces a redes sociales | brief L156-157 (PENDIENTE) |
| NR-11 | Despliegue o publicación | CLAUDE.md quality gates |

## 5. Supuestos (ASSUMPTION, reversibles)

| ID | Supuesto | Motivo | Reversión |
|---|---|---|---|
| A-01 | Rutas `/`, `/productos`, `/nosotros`, `/contacto` | Brief no define slugs | Renombrar archivos en `src/pages` |
| A-02 | Hero e imágenes con stock con licencia libre (p. ej. Unsplash/Pexels) o ilustración, con `alt` que no afirme que es el local | Brief L71 pide foto de supermercado; L170-173 prohíbe presentar fotos ajenas como reales | Reemplazar por fotos reales del local cuando se provean |
| A-03 | Logo textual tipográfico "Supermercado Los Álamos" | Logo oficial no provisto | Sustituir por archivo de logo oficial |
| A-04 | Carnicería y Verdulería se muestran en preview con indicación "A confirmar" vía flag en contenido; en producción se confirman o retiran | Brief L20 "categorías a validar" | Cambiar flag en el módulo de contenido |
| A-05 | Sección de ofertas visible con estado vacío honesto (no se oculta) | Brief pide espacio (L75, L124) y prohíbe inventar (L166) | Cargar ofertas confirmadas o ocultar la sección |
| A-06 | Mapa vía iframe de Google Maps sin API key, lazy, con enlace alternativo | Brief L126 pide mapa; sin JS propio | Reemplazar por imagen estática/ilustración + enlace |
| A-07 | `lang="es-AR"` y voseo rioplatense en textos | Negocio en Argentina | Cambiar atributo y copy |
| A-08 | JSON-LD `GroceryStore` solo con nombre y dirección, sin URL (versión estricta, decisión del orquestador 2026-11-12) | SEO local (L130) y constitución V (solo hechos VERIFIED) | Agregar telephone/openingHours al validarse (B-03) |
| A-09 | Teléfono en formato E.164 `+540000000000` para `tel:` | Derivado de `0000 00-0000` (código de área 0000) | Corregir en el módulo de contenido |
| A-10 | Los beneficios (S4) se limitan a los cuatro atributos del brief (variedad, frescura, atención cercana, comodidad de comercio local) | Brief L12-14 | Editar textos en contenido |
| A-11 | Canales pendientes (email, WhatsApp, redes) no se renderizan en la UI; quedan como `null` documentado en el módulo | Evitar enlaces muertos/ficticios (L168) | Completar dato y el componente lo muestra |

## 6. Bloqueos y tensiones del brief

| ID | Tema | Estado | Tratamiento |
|---|---|---|---|
| B-01 | Ofertas y promociones "sujetas a confirmación" (L22) vs "sección visual de promociones" (L124) | BLOCKED (contenido) | Estado vacío honesto (REQ-006, A-05) |
| B-02 | "Hero con fotografía de supermercado" (L71) vs no hay fotos reales y no usar fotos de otros supermercados como reales (L170-171) | BLOCKED (fotos reales) | Stock con licencia/ilustración declarada (A-02) |
| B-03 | Teléfono y horario deben validarse antes de producción (L159-160) | BRIEF-VALIDAR | Se usan en preview; gate de pre-producción |
| B-04 | Carnicería y verdulería "a validar" (L20) | ASSUMPTION | A-04 |
| B-05 | URL pública / dominio no provisto | PENDIENTE | Sin canonical, og:url ni sitemap absoluto |
| B-06 | Email, WhatsApp, Instagram, Facebook PENDIENTE (L154-157) | PLACEHOLDER | No se muestran (A-11) |
| B-07 | Logo oficial no provisto | PLACEHOLDER | A-03 |
| B-08 | Horario en feriados no informado | PENDIENTE | No se menciona |

Ninguna tensión impide avanzar con el MVP local; todas tienen default reversible.

## 7. Checklist pre-producción (no ejecutar sin aprobación)
- [ ] Confirmar teléfono `0000 00-0000` y horarios con el comercio.
- [ ] Confirmar o retirar Carnicería y Verdulería.
- [ ] Cargar ofertas confirmadas o mantener estado vacío.
- [ ] Proveer fotos reales del local y logo oficial (opcional).
- [ ] Confirmar dominio para habilitar canonical, og:url y sitemap.
- [ ] Completar email/WhatsApp/redes si existen.

## 8. Matriz de trazabilidad resumida

| REQ | Prioridad | Líneas del brief |
|---|---|---|
| REQ-001 | P1 | L44-45, L54-56, L127 |
| REQ-002 | P1 | L48, L61, L128, L147-148, L159-160 |
| REQ-003 | P1 | L36, L46, L60, L125, L150-152 |
| REQ-004 | P1 | L68, L141-158 |
| REQ-005 | P1 | L17-21, L47, L73, L123, L167 |
| REQ-006 | P1 | L22, L37, L49, L75, L124, L166 |
| REQ-007 | P2 | L9-14, L67, L164-165 |
| REQ-008 | P1 | L76, L126 |
| REQ-009 | P1 | L7, L29-30, L130, L181 |
| REQ-010 | P1 | L109, L129 |
| REQ-011 | P1 | L119, L129, L182 |
| REQ-012 | P2 | L107, L131-132, L170-173 |
| REQ-013 | P1 | L52, L136-139, L174-175 |
| REQ-014 | P1 | L24-25, L155, L169 |
| REQ-015 | P1 | L176, L179-180 |
| REQ-016 | P2 | L79-115 |
| REQ-017 | P2 | L120, L135 |
| REQ-018 | P1 | L178, L183 |

# Mapa del sitio y arquitectura de páginas: Supermercado Los Álamos

> **Fuentes:** `briefs/supermercado-los-alamos.md` (L63-77), `docs/requirements.md` §2 (A-01), `docs/copy-deck.md` (IDs de copy), `docs/seo-plan.md` (metadatos), `docs/design-system.md` (componentes y tokens).
> **Rutas:** `ASSUMPTION` A-01 (reversible: renombrar archivos en `src/pages/`). Máximo 4 páginas + 404 (dentro del límite MVP de 5).
> **Convenciones:** `{MAPS_URL}`, `{TEL_HREF}` y demás variables salen del módulo de contenido (copy-deck §0). "Ext." = enlace externo en pestaña nueva con aviso accesible. Tono de sección: C = `crema`, B = `blanco`, V = `verde-oscuro` (banda), T = `tinta` (footer).

---

## 1. Árbol del sitio

```
/                  Inicio                         src/pages/index.astro
├── /productos     Productos                      src/pages/productos.astro
├── /nosotros      Nosotros                       src/pages/nosotros.astro
├── /contacto      Contacto y ubicación           src/pages/contacto.astro
└── /404           No encontramos esta página     src/pages/404.astro (opcional, no se enlaza en la nav)
```

Navegación (REQ-017): header y footer enlazan las 4 páginas desde cualquier página (1 clic). Página actual con `aria-current="page"`.

| Ítem header (GLB-NAV-*) | Ítem footer (GLB-FTR-NAV) | Destino |
|---|---|---|
| Inicio | Inicio | `/` |
| Productos | Productos | `/productos` |
| Nosotros | Nosotros | `/nosotros` |
| Contacto | Contacto y ubicación | `/contacto` |

### 1.1 Anclas

| Ancla | Página | Elemento | Usada por |
|---|---|---|---|
| `#contenido` | todas | `<main id="contenido" tabindex="-1">` | GLB-SKIP |
| `#horarios` | `/` | `<section id="horarios">` (S6 Ubicación y horarios) | HOME-S1-LINK, HOME-S5-CTA2 |
| `#horarios` | `/contacto` | `<h2 id="horarios">` dentro del bloque de horarios (CONT-S1-H2-HOURS); el bloque padre también recibe `scroll-margin` | PROD-S4-CTA2 y CTA-HOURS desde páginas que no son Inicio (`/contacto#horarios`) |
| `#mapa` | `/contacto` | `<section id="mapa">` (S2) | Opcional, anclaje interno |

Todas las anclas respetan `scroll-padding-top` (header sticky), por lo que el destino no queda oculto (design-system §2).

### 1.2 Mapa de CTA (REQ-001, REQ-002, REQ-003, SC-002)

| CTA | Componente | Destino | Tipo | Aparece en |
|---|---|---|---|---|
| Cómo llegar (CTA-MAPS) | `DirectionsButton` | `{MAPS_URL}` | Ext. | Header (todas), `/` S1, S6 y S7; `/productos` S4; `/nosotros` S3; `/contacto` S1; 404 |
| Abrir en Google Maps (CTA-MAPS-ALT) | `DirectionsButton label="alt"` | `{MAPS_URL}` | Ext. | `/contacto` S2 (bajo el mapa) |
| Llamar al supermercado (CTA-CALL) | `CallButton` | `{TEL_HREF}` | `tel:` | `/` S1, S5, S6 y S7; `/productos` S1 y S3; `/contacto` S1 |
| 0000 00-0000 (número enlazado) | `PhoneBlock` / footer | `{TEL_HREF}` | `tel:` | `/contacto` S1, footer (todas) |
| Consultar horarios (CTA-HOURS) | `HoursLink` | `#horarios` en `/`; `/contacto#horarios` en el resto | interno | `/` S1 y S5; `/productos` S4 |
| Ver productos (CTA-PRODUCTS) | `CtaLink` | `/productos` | interno | `/` S3; `/nosotros` S3 |

---

## 2. Elementos globales

| Bloque | Componentes | Copy IDs | Notas |
|---|---|---|---|
| Skip link | `SkipLink` | GLB-SKIP | Primer foco |
| Header (sticky, B) | `SiteHeader`, `Wordmark`, `NavLinks`, `DirectionsButton`, botón Menú | GLB-HDR-LOGO, GLB-HDR-LOGO-ARIA, GLB-NAV-ARIA, GLB-NAV-1..4, GLB-NAV-MENU, GLB-NAV-MENU-ARIA-OPEN/CLOSE, GLB-HDR-CTA, GLB-HDR-CTA-ARIA | Menú *disclosure* bajo md (design-system §7.2) |
| Footer (T) | `SiteFooter`, `Wordmark surface="dark"`, `AddressBlock`, `PhoneBlock`, `HoursList compact`, `NavLinks` | GLB-FTR-BRAND, GLB-FTR-TAGLINE, GLB-FTR-H-ADDR, GLB-FTR-ADDR, GLB-FTR-H-PHONE, GLB-FTR-PHONE, GLB-FTR-H-HOURS, GLB-FTR-HOURS-1/2, GLB-FTR-H-NAV, GLB-FTR-NAV, GLB-FTR-NAV-ARIA, GLB-FTR-IMG-NOTE (condicional, UX-10), GLB-FTR-COPY | Sin redes, email ni WhatsApp (A-11). Títulos de columna como `<h2>` visualmente pequeños (`text-small uppercase`), para no romper la jerarquía de la página (el footer va después del contenido principal) |

Footer, layout: base 1 col (marca → dirección → teléfono → horarios → secciones → nota/©); md 2×2 + fila inferior; lg 4 columnas (marca+bajada | dirección+teléfono | horarios | secciones) + línea inferior con nota y ©, separada por un borde de 1px `crema` al 20 %.

---

## 3. Inicio (`/`)

**SEO** (seo-plan §2.1): title "Supermercado Los Álamos | Tu súper de cercanía en Villa Ejemplo" · description según seo-plan · JSON-LD `GroceryStore` (name + address) · H1 = HOME-S1-H1.

| # | Sección | `id` / tono | Componentes | Copy IDs | CTA → destino | REQ |
|---|---|---|---|---|---|---|
| S1 | Hero | — / C (+ gradiente cálido opcional) | `HomeHero`, `HeroVisual` (`Illustration "mercado"` por defecto), `DirectionsButton` primary lg, `CallButton` secondary lg, `HoursLink` | HOME-S1-EYEBROW, HOME-S1-H1, HOME-S1-SUB, HOME-S1-CTA1, HOME-S1-CTA2, HOME-S1-LINK, HOME-S1-IMG-ALT (solo en modo foto) | Cómo llegar → `{MAPS_URL}` (Ext.) · Llamar al supermercado → `{TEL_HREF}` · Consultar horarios → `#horarios` | REQ-001, 002, 003, 012; SC-001 |
| S2 | Mensaje de cercanía | `cercania` / B | `Section`, `SectionHeader`, `Container width="texto"` | HOME-S2-H2, HOME-S2-P1, HOME-S2-P2 | — | REQ-007, 009 |
| S3 | Categorías principales | `categorias` / C | `Section`, `SectionHeader`, `CategoryGrid density="compact"`, `CategoryCard`, `IconTile`, `StatusBadge`, `CtaLink` secondary | HOME-S3-H2, HOME-S3-INTRO, HOME-S3-CARDS (CAT-*-SHORT, CAT-BADGE, CAT-BADGE-SR), HOME-S3-CTA | Ver productos → `/productos` | REQ-005, A-04 |
| S4 | Beneficios | `beneficios` / B | `Section`, `SectionHeader`, `BenefitList columns=4`, `BenefitItem`, `IconTile` | HOME-S4-H2, HOME-S4-B1..B4-T/-D | — | REQ-007, A-10 |
| S5 | Ofertas destacadas (vacío) | `ofertas` / C | `Section`, `SectionHeader`, `OffersSection` → `OffersEmptyState`, `CallButton` secondary, `HoursLink` | HOME-S5-H2, HOME-S5-EMPTY-T, HOME-S5-EMPTY-P, HOME-S5-CTA1, HOME-S5-CTA2 | Llamar al supermercado → `{TEL_HREF}` · Consultar horarios → `#horarios` | REQ-006, B-01 |
| S6 | Ubicación y horarios | **`horarios`** / B | `Section`, `SectionHeader`, `InfoCard` ×2 (`AddressBlock headingLevel=3`, `HoursList headingLevel=3`), `DirectionsButton` primary, `CallButton` secondary; `MapEmbed` desactivado (`showMap=false`, UX-11) | HOME-S6-H2, HOME-S6-H3-ADDR, HOME-S6-ADDR, HOME-S6-H3-HOURS, HOME-S6-HOURS-1/2, HOME-S6-CTA1, HOME-S6-CTA2 | Cómo llegar → `{MAPS_URL}` (Ext.) · Llamar al supermercado → `{TEL_HREF}` | REQ-001, 003, 008 |
| S7 | CTA final | `visitanos` / V | `CtaBand secondary="call"` | HOME-S7-H2, HOME-S7-P, HOME-S7-CTA1, HOME-S7-CTA2 | Cómo llegar → `{MAPS_URL}` (Ext.) · Llamar al supermercado → `{TEL_HREF}` | REQ-001, 002 |

Jerarquía de headings: H1 (S1) → H2 en S2..S7 → H3 en tarjetas de categoría, beneficios, estado vacío y bloques de S6.

### 3.1 Wireframe Inicio, móvil 360px

```
┌──────────────────────────────────────┐ 0
│ SUPERMERCADO     [⌖ Cómo llegar][≡ Menú]│ Header 64px, blanco, sticky
│ Los Álamos ❦•                              │
├──────────────────────────────────────┤ 64
│ S1 HERO (crema)                        │
│ SUPERMERCADO LOS ÁLAMOS (antetítulo)   │
│ Tu supermercado de                     │ H1 32px, 3 líneas
│ cercanía en Villa                      │
│ Ejemplo                                │
│ Alimentos, frescos, almacén y          │ bajada 17px
│ limpieza para tus compras de todos     │
│ los días, en Calle Ejemplo 123.        │
│ ┌──────────────────────────────────┐   │
│ │ ⌖  Cómo llegar               ↗  │   │ primary 48px, ancho completo  (≈ y 400: visible sin scroll)
│ └──────────────────────────────────┘   │
│ ┌──────────────────────────────────┐   │
│ │ ✆  Llamar al supermercado        │   │ secondary 48px
│ └──────────────────────────────────┘   │
│ ◷ Consultar horarios                   │ ghost 44px → #horarios
│ ╭──────────────────────────────────╮   │
│ │  ilustración "mercado" 4:3       │   │ (o foto stock con licencia)
│ ╰──────────────────────────────────╯   │
├──────────────────────────────────────┤
│ S2 (blanco)                            │
│ Las compras de todos los días, cerca   │ H2
│ Párrafo P1 · Párrafo P2                │
├──────────────────────────────────────┤
│ S3 (crema)                             │
│ Nuestras categorías principales        │ H2 + intro
│ ┌──────────────────────────────────┐   │
│ │[▣] Alimentos y bebidas           │   │ CategoryCard compact (fila)
│ │    Para el día a día de tu familia│  │
│ └──────────────────────────────────┘   │
│ ┌──────────────────────────────────┐   │
│ │[▣] Carnicería  (◷ A confirmar)   │   │ insignia amarillo/tinta
│ │    Para tus comidas de todos...  │   │
│ └──────────────────────────────────┘   │
│   … 6 tarjetas, 1 columna …            │
│ [ Ver productos → ]                    │ secondary, ancho completo
├──────────────────────────────────────┤
│ S4 (blanco) ¿Por qué comprar en Los Álamos?│
│ [▣] Variedad / texto                   │ 4 BenefitItem apilados
│ [▣] Frescura / texto                   │
│ [▣] Atención cercana / texto           │
│ [▣] Comodidad / texto                  │
├──────────────────────────────────────┤
│ S5 (crema) Ofertas destacadas          │
│ ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐   │ borde discontinuo
│   (ilustr. canasta)                    │
│   Todavía no hay ofertas publicadas    │ H3
│   Vamos a publicar acá…0000 00-0000   │
│   [ ✆ Llamar al supermercado ]         │
│   ◷ Consultar horarios                 │
│ └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘   │
├──────────────────────────────────────┤
│ S6 #horarios (blanco)                  │
│ Ubicación y horarios                   │ H2
│ ┌ Dónde estamos ──────────────────┐   │ InfoCard
│ │ Calle Ejemplo 123, B0000 Villa   │   │
│ │ Ejemplo, Provincia de Bs. As.    │   │
│ └──────────────────────────────────┘   │
│ ┌ Horarios de atención ───────────┐   │ InfoCard + <dl>
│ │ Lunes a sábado      07:30 a 21:00│   │
│ │ Domingo                  cerrado │   │
│ └──────────────────────────────────┘   │
│ [ ⌖ Cómo llegar ↗ ]                    │
│ [ ✆ Llamar al supermercado ]           │
├──────────────────────────────────────┤
│ S7 BANDA (verde oscuro)                │
│ Te esperamos                           │ H2 blanco
│ Vení a hacer tus compras a…            │ texto crema
│ [ ⌖ Cómo llegar ↗ ]  amarillo/tinta    │
│ [ ✆ Llamar al supermercado ] borde crema│
├──────────────────────────────────────┤
│ FOOTER (tinta)                         │
│ Supermercado Los Álamos · bajada           │
│ DIRECCIÓN … · TELÉFONO 0000 00-0000   │
│ HORARIOS … · SECCIONES (4 enlaces)     │
│ © {AÑO} Supermercado Los Álamos            │
└──────────────────────────────────────┘
```

### 3.2 Wireframe Inicio, escritorio 1440px (contenido 1152px centrado)

```
┌───────────────────────────────────────────────────────────────────────────────────────┐
│ SUPERMERCADO              Inicio  Productos  Nosotros  Contacto        [⌖ Cómo llegar ↗] │ 72px, sticky
│ Los Álamos ❦•                 ‾‾‾‾‾ (actual: barra verde)                                    │
├───────────────────────────────────────────────────────────────────────────────────────┤
│ S1 (crema)                                                                              │
│  SUPERMERCADO LOS ÁLAMOS                           ╭──────────────────────────────────╮     │
│  Tu supermercado de cercanía                   │                                  │     │
│  en Villa Ejemplo                     (H1 48px)  │   ilustración "mercado" 5:4      │     │
│  Alimentos, frescos, almacén y limpieza…       │   (o foto stock, eager)          │     │
│  [⌖ Cómo llegar ↗] [✆ Llamar al supermercado]  │                                  │     │
│  ◷ Consultar horarios                          ╰──────────────────────────────────╯     │
│  ← col 1-6 ───────────────────────────→        ← col 7-12 ─────────────────────→       │
├───────────────────────────────────────────────────────────────────────────────────────┤
│ S2 (blanco)            Las compras de todos los días, cerca     (centrado, max 640px)   │
│                        P1 · P2                                                          │
├───────────────────────────────────────────────────────────────────────────────────────┤
│ S3 (crema) Nuestras categorías principales                              [Ver productos →]│
│  ┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐              │
│  │[▣] Alimentos y bebidas│ │[▣] Almacén y consumo │ │[▣] Productos frescos │   3 col      │
│  └──────────────────────┘ └──────────────────────┘ └──────────────────────┘              │
│  ┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐              │
│  │[▣] Carnicería (A conf)│ │[▣] Verdulería (A conf)│ │[▣] Limpieza y hogar  │              │
│  └──────────────────────┘ └──────────────────────┘ └──────────────────────┘              │
├───────────────────────────────────────────────────────────────────────────────────────┤
│ S4 (blanco) ¿Por qué comprar en Los Álamos?                                                 │
│  [▣] Variedad       [▣] Frescura        [▣] Atención cercana   [▣] Comodidad   4 col    │
├───────────────────────────────────────────────────────────────────────────────────────┤
│ S5 (crema) Ofertas destacadas                                                           │
│  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐        │
│    (canasta)  Todavía no hay ofertas publicadas      [✆ Llamar] ◷ Consultar horarios    │
│               Vamos a publicar acá…                                                     │
│  └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘        │
├───────────────────────────────────────────────────────────────────────────────────────┤
│ S6 #horarios (blanco) Ubicación y horarios                                              │
│  ┌ Dónde estamos ─────────────┐ ┌ Horarios de atención ───────┐  [⌖ Cómo llegar ↗]       │
│  │ Calle Ejemplo 123, B0000…  │ │ Lunes a sábado  07:30 a 21:00│  [✆ Llamar al super…]    │
│  └────────────────────────────┘ │ Domingo              cerrado │   (col 9-12, apilados)   │
│   col 1-4                        └──────────────────────────────┘ col 5-8                 │
├───────────────────────────────────────────────────────────────────────────────────────┤
│ S7 BANDA verde oscuro   Te esperamos / Vení a hacer tus compras…  [⌖ Cómo llegar ↗][✆ Llamar…]│
├───────────────────────────────────────────────────────────────────────────────────────┤
│ FOOTER tinta: Marca+bajada | Dirección + Teléfono | Horarios | Secciones                │
│ ───────────────────────────────────────────────────────────────────────────────         │
│ © {AÑO} Supermercado Los Álamos                     (nota de imágenes solo si hay fotos)    │
└───────────────────────────────────────────────────────────────────────────────────────┘
```

Tablet 768px: header con nav en línea; hero apilado (texto arriba, visual debajo a ancho completo, aspect 16:10); CTA del hero en fila; categorías y beneficios en 2 columnas; S6 con las dos InfoCard lado a lado y los CTA en fila debajo.

---

## 4. Productos (`/productos`)

**SEO** (seo-plan §2.2): title "Productos y categorías | Supermercado Los Álamos, Villa Ejemplo" · description sin Carnicería/Verdulería ni ofertas · H1 = PROD-S1-H1.

| # | Sección | `id` / tono | Componentes | Copy IDs | CTA → destino | REQ |
|---|---|---|---|---|---|---|
| S1 | Intro | — / C | `PageHero illustration="canasta"`, `InfoNote action="call"` | PROD-S1-H1, PROD-S1-SUB, PROD-S1-NOTE, PROD-S1-NOTE-CTA | Llamar al supermercado → `{TEL_HREF}` (ghost) | REQ-005, 013 |
| S2 | Categorías | `categorias` / B | `Section`, `SectionHeader`, `CategoryGrid density="full"`, `CategoryCard`, `StatusBadge` | PROD-S2-H2, CAT-*-DESC, CAT-BADGE, CAT-BADGE-SR, IMG-CAT-* (solo modo foto; `alt=""` recomendado) | — | REQ-005, A-04 |
| S3 | Ofertas (vacío) | `ofertas` / C | `OffersSection` → `OffersEmptyState` (sin `HoursLink`) | PROD-S3-H2, PROD-S3-EMPTY-T, PROD-S3-EMPTY-P, PROD-S3-CTA | Llamar al supermercado → `{TEL_HREF}` | REQ-006 |
| S4 | Cierre | `visitanos` / V | `CtaBand secondary="hours" hoursHref="/contacto#horarios"` | PROD-S4-H2, PROD-S4-P, PROD-S4-CTA1, PROD-S4-CTA2 | Cómo llegar → `{MAPS_URL}` (Ext.) · Consultar horarios → `/contacto#horarios` | REQ-001, 003 |

Grilla de categorías: 360 = 1 col (media 16:10 arriba); 768 = 2 col; 1440 = 3 col (2 filas).

```
Móvil 360                               Escritorio 1440
┌──────────────────────────┐            ┌────────────────────────────────────────────────────┐
│ H1 Productos para tus…   │            │ H1 Productos para tus compras…      (ilustr. canasta)│
│ bajada                   │            │ bajada                                               │
│ ▌Este sitio es informat… │            │ ▌Este sitio es informativo… ✆ Llamar al supermercado │
│ ▌✆ Llamar al supermercado│            ├────────────────────────────────────────────────────┤
├──────────────────────────┤            │ Nuestras categorías                                  │
│ Nuestras categorías      │            │ ┌──────────┐ ┌──────────┐ ┌──────────┐               │
│ ┌──────────────────────┐ │            │ │ media    │ │ media    │ │ media    │               │
│ │ media 16:10 (ícono)  │ │            │ │ H3 + desc│ │ H3 + desc│ │ H3 + desc│               │
│ │ H3  (A confirmar)    │ │            │ └──────────┘ └──────────┘ └──────────┘  × 2 filas    │
│ │ descripción larga    │ │            ├────────────────────────────────────────────────────┤
│ └──────────────────────┘ │            │ Ofertas destacadas: estado vacío                     │
│  … ×6                    │            ├────────────────────────────────────────────────────┤
├──────────────────────────┤            │ BANDA: Vení a recorrer… [⌖ Cómo llegar ↗] ◷ Horarios │
│ Ofertas: estado vacío    │            └────────────────────────────────────────────────────┘
├──────────────────────────┤
│ BANDA cierre + CTA       │
└──────────────────────────┘
```

---

## 5. Nosotros (`/nosotros`)

**SEO** (seo-plan §2.3): title "Nosotros | Supermercado Los Álamos, Villa Ejemplo" · H1 = ABOUT-S1-H1. Solo afirmaciones del brief (REQ-007).

| # | Sección | `id` / tono | Componentes | Copy IDs | CTA → destino | REQ |
|---|---|---|---|---|---|---|
| S1 | Presentación | — / C | `PageHero illustration="gondola" paragraphs=[…]` | ABOUT-S1-H1, ABOUT-S1-P1, ABOUT-S1-P2-ALT, IMG-ABOUT (solo modo foto) | — | REQ-007 |
| S2 | Lo que vas a encontrar | `encontrar` / B | `Section`, `SectionHeader`, `BenefitList columns=2`, `BenefitItem` | ABOUT-S2-H2, ABOUT-S2-I1..I4 (título en negrita → H3, texto → párrafo) | — | REQ-007, A-10 |
| S3 | Visitanos | `visitanos` / V | `CtaBand secondary="products"` | ABOUT-S3-H2, ABOUT-S3-P, ABOUT-S3-CTA1, ABOUT-S3-CTA2 | Cómo llegar → `{MAPS_URL}` (Ext.) · Ver productos → `/productos` | REQ-001, 005 |

Sin fotos de personas, equipo, línea de tiempo, cifras ni "misión/visión" (REQ-007).

```
Móvil 360                         Escritorio 1440
┌────────────────────────┐        ┌──────────────────────────────────────────────────────┐
│ H1 Somos Supermercado  │        │ H1 Somos Supermercado Los Álamos       ╭───────────────╮  │
│ Los Álamos                 │        │ P1                                 │ ilustr.       │  │
│ P1 · P2                │        │ P2                                 │ góndola       │  │
├────────────────────────┤        │                                    ╰───────────────╯  │
│ Lo que vas a encontrar │        ├──────────────────────────────────────────────────────┤
│ [▣] Variedad           │        │ Lo que vas a encontrar                                 │
│ [▣] Frescura           │        │ [▣] Variedad          [▣] Frescura          2 × 2      │
│ [▣] Atención cercana   │        │ [▣] Atención cercana  [▣] Comodidad                    │
│ [▣] Comodidad          │        ├──────────────────────────────────────────────────────┤
├────────────────────────┤        │ BANDA Visitanos en Villa Ejemplo [⌖ Cómo llegar][Ver productos]│
│ BANDA + 2 CTA          │        └──────────────────────────────────────────────────────┘
└────────────────────────┘
```

---

## 6. Contacto y ubicación (`/contacto`)

**SEO** (seo-plan §2.4): title "Contacto y ubicación | Supermercado Los Álamos, Villa Ejemplo" · JSON-LD `GroceryStore` (name + address) · H1 = CONT-S1-H1. Sin formulario, email, WhatsApp ni redes (REQ-004).

| # | Sección | `id` / tono | Componentes | Copy IDs | CTA → destino | REQ |
|---|---|---|---|---|---|---|
| S0 | Encabezado | — / C | `PageHero illustration="pin"` (ilustración solo desde lg) | CONT-S1-H1, CONT-S1-SUB | — | REQ-004 |
| S1 | Datos de contacto | `datos` / B | `InfoCard icon="map-pin"` + `AddressBlock headingLevel=2 format="full" showDirections`; `InfoCard icon="clock"` + `HoursList headingLevel=2 headingId="horarios"`; `InfoCard icon="phone"` + `PhoneBlock headingLevel=2 showCallButton` | CONT-S1-H2-ADDR, CONT-S1-ADDR, CONT-S1-ADDR-CTA, CONT-S1-H2-HOURS, CONT-S1-HOURS-1/2, CONT-S1-H2-PHONE, CONT-S1-PHONE, CONT-S1-PHONE-CTA | Cómo llegar → `{MAPS_URL}` (Ext., primary) · 0000 00-0000 y Llamar al supermercado → `{TEL_HREF}` (secondary) | REQ-001, 002, 003, 004 |
| S2 | Mapa | `mapa` / B (continúa S1 en lg) | `Section`, `SectionHeader`, `MapEmbed` | CONT-S2-H2, CONT-S2-MAP-TITLE, CONT-S2-MAP-FALLBACK, CONT-S2-MAP-LINK | Abrir en Google Maps → `{MAPS_URL}` (Ext.) | REQ-008, A-06 |

Orden de bloques (UX-13): Dirección → Horarios → Teléfono → Mapa. Sin `CtaBand` al final: la página ya es el destino de contacto. El footer repite los datos.

Layout: en lg, S1 y S2 comparten una grilla de 12 columnas: columna izquierda `col-span-5` con las 3 InfoCard apiladas; columna derecha `col-span-7` con el H2 "Cómo llegar" y el mapa, `lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]`. En el DOM, S1 va antes que S2 (orden de lectura = orden visual).

### 6.1 Wireframe Contacto, móvil 360px

```
┌──────────────────────────────────────┐
│ SUPERMERCADO     [⌖ Cómo llegar][≡ Menú]│ header
│ Los Álamos ❦•                              │
├──────────────────────────────────────┤
│ (crema)                                │
│ Contacto y ubicación                   │ H1
│ Encontrá nuestra dirección, horarios   │ bajada
│ y teléfono. Te esperamos en el local.  │
├──────────────────────────────────────┤
│ (blanco)                               │
│ ┌──────────────────────────────────┐   │
│ │ [⌖]  Dirección                    │   │ H2
│ │ Calle Ejemplo 123, B0000 Villa    │   │ <address>
│ │ Ejemplo, Provincia de Buenos      │   │
│ │ Aires, Argentina                  │   │
│ │ ┌──────────────────────────────┐ │   │
│ │ │ ⌖ Cómo llegar             ↗ │ │   │ primary 48px
│ │ └──────────────────────────────┘ │   │
│ └──────────────────────────────────┘   │
│ ┌──────────────────────────────────┐   │
│ │ [◷]  Horarios de atención  #horarios│ │ H2 id="horarios"
│ │ Lunes a sábado      07:30 a 21:00 │   │
│ │ ───────────────────────────────── │   │
│ │ Domingo                  cerrado  │   │
│ └──────────────────────────────────┘   │
│ ┌──────────────────────────────────┐   │
│ │ [✆]  Teléfono                     │   │ H2
│ │ 0000 00-0000  (enlace tel:)      │   │
│ │ ┌──────────────────────────────┐ │   │
│ │ │ ✆ Llamar al supermercado     │ │   │ secondary 48px
│ │ └──────────────────────────────┘ │   │
│ └──────────────────────────────────┘   │
│                                        │
│ Cómo llegar                            │ H2 (S2 #mapa)
│ ╭──────────────────────────────────╮   │
│ │                                  │   │
│ │   iframe mapa 4:3, lazy          │   │ fondo: ilustración pin
│ │                                  │   │
│ ├──────────────────────────────────┤   │
│ │ ¿No ves el mapa? Abrí la         │   │ figcaption, siempre visible
│ │ ubicación directamente en…       │   │
│ │ ⌖ Abrir en Google Maps ↗         │   │ ghost 44px
│ ╰──────────────────────────────────╯   │
├──────────────────────────────────────┤
│ FOOTER (tinta)                         │
└──────────────────────────────────────┘
```

### 6.2 Wireframe Contacto, escritorio 1440px

```
┌───────────────────────────────────────────────────────────────────────────────────────┐
│ SUPERMERCADO              Inicio  Productos  Nosotros  Contacto        [⌖ Cómo llegar ↗] │
│ Los Álamos ❦•                                              ‾‾‾‾‾‾‾‾ (actual)                │
├───────────────────────────────────────────────────────────────────────────────────────┤
│ (crema)  Contacto y ubicación                                        ╭────────────╮     │
│          Encontrá nuestra dirección, horarios y teléfono…            │ ilustr. pin│     │
│                                                                      ╰────────────╯     │
├───────────────────────────────────────────────────────────────────────────────────────┤
│ (blanco)                                                                                │
│  ┌ [⌖] Dirección ─────────────────────┐   Cómo llegar                     (H2, col 6-12)│
│  │ Calle Ejemplo 123, B0000 Villa     │   ╭───────────────────────────────────────────╮ │
│  │ Ejemplo, Provincia de Buenos Aires,│   │                                           │ │
│  │ Argentina                          │   │                                           │ │
│  │ [⌖ Cómo llegar ↗]                  │   │        iframe mapa 16:10, lazy            │ │
│  └────────────────────────────────────┘   │        (sticky al hacer scroll)           │ │
│  ┌ [◷] Horarios de atención #horarios ┐   │                                           │ │
│  │ Lunes a sábado      07:30 a 21:00  │   ├───────────────────────────────────────────┤ │
│  │ Domingo                  cerrado   │   │ ¿No ves el mapa? …  ⌖ Abrir en Google Maps ↗│ │
│  └────────────────────────────────────┘   ╰───────────────────────────────────────────╯ │
│  ┌ [✆] Teléfono ──────────────────────┐                                                 │
│  │ 0000 00-0000                      │                                                 │
│  │ [✆ Llamar al supermercado]         │                                                 │
│  └────────────────────────────────────┘                                                 │
│   ← col 1-5 →                              ← col 6-12 →                                 │
├───────────────────────────────────────────────────────────────────────────────────────┤
│ FOOTER (tinta) Marca | Dirección + Teléfono | Horarios | Secciones   ·  © {AÑO}         │
└───────────────────────────────────────────────────────────────────────────────────────┘
```

Tablet 768px: las 3 InfoCard en una grilla de 2 columnas (Dirección | Horarios, y Teléfono debajo a ancho completo o en la primera columna); el mapa debajo a ancho completo, aspect 16:10.

---

## 7. 404 (`/404`, opcional)

| Sección | Tono | Componentes | Copy IDs | CTA → destino |
|---|---|---|---|---|
| Único bloque | C | `PageHero illustration="canasta"`, `CtaLink` primary, `DirectionsButton` secondary | SYS-404-H1, SYS-404-P, SYS-404-CTA | Ir al inicio → `/` · Cómo llegar → `{MAPS_URL}` (Ext.) |

`<title>` sugerido (ASSUMPTION): "Página no encontrada | Supermercado Los Álamos". Sin JSON-LD. Usa `BaseLayout` con header y footer completos.

---

## 8. Verificación de criterios de éxito sobre el diseño

| Criterio | Cómo lo resuelve la arquitectura |
|---|---|
| SC-001 | A 360×640, "Cómo llegar" aparece en el header (y ≈ 16px) y en el hero (≈ y 400px), sin scroll. "Consultar horarios" está en el hero y lleva a `#horarios` en 1 acción |
| SC-002 | Todos los "Cómo llegar" usan `DirectionsButton` y todos los "Llamar" usan `CallButton`/`PhoneBlock`, que leen la misma constante |
| SC-003 | No hay componentes de precio, carrito, formulario, testimonio ni WhatsApp. `OfferCard` no tiene campo de precio |
| SC-004 | Title/description por página según seo-plan, con `BaseLayout` sin canonical ni og:url |
| SC-005 | Combinaciones restringidas a design-system §3; foco visible según §6 |
| SC-007 | Horarios, teléfono, dirección, categorías (`status`, `visible`) e imágenes (`image`) se editan en un solo módulo |

# Tasks: Sitio institucional Supermercado Los Álamos

**Input**: Design documents from `specs/001-sitio-supermercado-los-alamos/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md
**Referencias de diseño**: `docs/design-system.md` (DS), `docs/site-map.md` (SM), `docs/copy-deck.md` (CD), `docs/seo-plan.md` (SEO)

**Tests**: no se generan tests automatizados (no solicitados). La verificación es estática: `npm run check`, `npm run build`, `scripts/validate_content.py` y contrato C-03.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: puede ejecutarse en paralelo (archivos distintos, sin dependencias pendientes)
- **[Story]**: US1 Cómo llegar/horarios (P1) · US2 Llamar (P1) · US3 Productos (P2) · US4 Nosotros (P3)

---

## Phase 1: Setup

- [x] T001 Eliminar la demo "Taller Aurora": vaciar `src/pages/index.astro` (se reescribe en US1) y quitar estilos demo de `src/styles/global.css`; borrar `dist/` y `.astro/` generados
- [x] T002 Crear estructura `src/content/`, `src/components/`, `src/components/icons/` y `public/` según plan.md §Project Structure
- [x] T003 [P] Reemplazar `src/styles/global.css` con `@import "tailwindcss";` + bloque `@theme` de DS §2 (incluye `--color-*: initial`, 6 colores del brief + `borde` #E8DFCB, escala tipográfica, radios, sombras, contenedores `site`/`texto`, animación `entrada`) y estilos base (body bg crema/texto tinta, `:focus-visible` DS §6.3, `prefers-reduced-motion` DS §9). Fuentes: `--font-display: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif` y `--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif` (research R-02)
- [x] T004 [P] Crear `public/favicon.svg` con monograma "F" verde-oscuro sobre crema (PLACEHOLDER, no logo oficial)

---

## Phase 2: Foundational (bloquea todas las historias)

- [x] T005 Crear `src/content/types.ts` con los tipos de DS §7.0 (`IconName`, `Surface`, `SectionTone`, `ImageAsset`, `Category`, `OpeningHours`, `Offer`) más `Address`, `Phone`, `PendingChannel`, `NavItem`, `PageSeo` de data-model.md. `Offer` "sin campo precio"
- [x] T006 Crear `src/content/site.ts` (contrato C-01): `business`, `address` (`street "Calle Ejemplo 123"`, `postalCode "B0000"`, `locality "Villa Ejemplo"`, `region "Provincia de Buenos Aires"`, `country "Argentina"`, `countryCode "AR"`, derivados `full`/`short`), `phone` (`display "0000 00-0000"`, `e164 "+540000000000"`), `hours` (`Lunes a sábado / 07:30 a 21:00`, `Domingo / Cerrado`), `categories` (6; `carn` y `verd` con `status: 'pending'`; `image: null`; textos CAT-* de CD), `offers: []`, `pendingChannels` (email/whatsapp/instagram/facebook con `value: null`), `navItems` (4), `MAPS_URL`, `TEL_HREF`, `MAP_EMBED_URL` (research R-04/R-05). Comentarios con estado VERIFIED/BRIEF-VALIDAR/ASSUMPTION/BLOCKED por campo
- [x] T007 [P] Crear `src/content/copy.ts` con todos los textos por ID de CD (GLB-*, HOME-*, PROD-*, ABOUT-*, CONT-*, SYS-*, CTA-*), interpolando `phone.display`/`address` desde `site.ts` (sin duplicar datos)
- [x] T008 [P] Crear `src/content/seo.ts`: `pageSeo` por página (`home`, `productos`, `nosotros`, `contacto`, `404`) con title/description/og de SEO §2 y `buildJsonLd()` que produce solo `@context`, `@type: "GroceryStore"`, `name`, `address` (PostalAddress)
- [x] T009 [P] Crear `src/components/icons/paths.ts` (`Record<IconName, string>`, set propio 24×24 trazo 2, DS §7.4) y `src/components/Icon.astro` (DS #34)
- [x] T010 [P] Crear `src/components/Illustration.astro` con SVG inline decorativos `mercado`, `canasta`, `gondola`, `pin`, `hojas` (DS §10.3, `aria-hidden`, `focusable="false"`)
- [x] T011 [P] Crear primitivas de layout `src/components/Container.astro`, `Section.astro`, `SectionHeader.astro` (DS #11-13)
- [x] T012 Crear `src/components/CtaLink.astro` (DS #7: variantes primary/secondary/ghost × surface light/dark, `external` con `target="_blank" rel="noopener noreferrer"` + aviso SYS-NEWTAB-SR, `min-h-11`, `block`)
- [x] T013 Crear `src/components/DirectionsButton.astro`, `CallButton.astro`, `HoursLink.astro` (DS #8-10) que leen `MAPS_URL`/`TEL_HREF` de `site.ts`
- [x] T014 [P] Crear `src/components/SkipLink.astro`, `Wordmark.astro`, `NavLinks.astro` (DS #2, #4, #5; `aria-current="page"`)
- [x] T015 Crear `src/components/SiteHeader.astro` con menú móvil disclosure y único script `is:inline` (DS §7.2: `aria-expanded`, `aria-controls="menu-principal"`, Escape devuelve foco, mejora progresiva)
- [x] T016 Crear `src/components/IconTile.astro`, `InfoCard.astro`, `HoursList.astro`, `AddressBlock.astro`, `PhoneBlock.astro` (DS #21, #27-30; datos solo desde `site.ts`; sin "abierto ahora" ni feriados)
- [x] T017 Crear `src/components/SiteFooter.astro` (DS #6: marca, dirección, teléfono `tel:`, horarios, nav, ©; sin redes; nota de imágenes solo si alguna `image` ≠ null)
- [x] T018 Reescribir `src/layouts/BaseLayout.astro` (DS #1, contrato C-02): `lang="es-AR"`, title, description, `og:title`, `og:description`, `og:type=website`, `og:locale=es_AR`, favicon, theme-color; SIN canonical, og:url ni og:image; JSON-LD opcional vía `buildJsonLd()`; SkipLink + SiteHeader + `<main id="contenido" tabindex="-1">` + SiteFooter

**Checkpoint**: base lista; las páginas pueden construirse.

---

## Phase 3: User Story 1 — Cómo llegar y horarios (P1) 🎯 MVP

**Goal**: el visitante encuentra "Cómo llegar", dirección, horarios y mapa.
**Independent Test**: `/` a 360px muestra "Cómo llegar" sin scroll; "Consultar horarios" → `#horarios`; `/contacto` muestra dirección, horarios, teléfono, mapa y Cómo llegar.

- [x] T019 [P] [US1] Crear `src/components/HeroVisual.astro` y `src/components/HomeHero.astro` (DS #14, #16; `image: null` → `Illustration "mercado"`; texto nunca sobre imagen)
- [x] T020 [P] [US1] Crear `src/components/CtaBand.astro` (DS #32, tono verde-oscuro, DirectionsButton + secundario `call|products|hours`)
- [x] T021 [P] [US1] Crear `src/components/PageHero.astro` (DS #15)
- [x] T022 [P] [US1] Crear `src/components/MapEmbed.astro` (DS §7.3: iframe `loading="lazy"`, `title`, figcaption con enlace "Abrir en Google Maps" siempre visible, prop `enabled`)
- [x] T023 [US1] Crear `src/pages/index.astro` con S1 Hero, S6 `#horarios` (Ubicación y horarios, sin mapa) y S7 CtaBand según SM §3; `pageSeo.home`; `jsonLd`
- [x] T024 [US1] Crear `src/pages/contacto.astro` según SM §6: PageHero, S1 datos (Address/Hours `headingId="horarios"`/Phone en InfoCard), S2 `#mapa` con MapEmbed; `pageSeo.contacto`; `jsonLd`

**Checkpoint**: US1 funcional y verificable con `npm run build`.

---

## Phase 4: User Story 2 — Llamar al supermercado (P1)

**Goal**: llamada desde Inicio, Contacto y footer; canales pendientes ausentes.
**Independent Test**: `grep "tel:+540000000000"` en `dist/index.html`, `dist/contacto/index.html` y footer de todas las páginas; sin `wa.me`/`mailto:`/redes.

- [x] T025 [US2] Verificar/ajustar en `src/components/HomeHero.astro`, `src/pages/contacto.astro` y `src/components/SiteFooter.astro` que CallButton/PhoneBlock usen `aria-label` con el número (columna aria-label de CD CTA-CALL) y muestren "0000 00-0000"
- [x] T026 [US2] Confirmar en `src/content/site.ts` que `pendingChannels` no se consume en ningún componente (`grep -R pendingChannels src/components src/pages` vacío)

---

## Phase 5: User Story 3 — Conocer productos (P2)

**Goal**: categorías y ofertas en estado vacío honesto.
**Independent Test**: `/productos` lista 6 categorías, 2 con "A confirmar", sin precios/marcas; ofertas en estado vacío.

- [x] T027 [P] [US3] Crear `src/components/StatusBadge.astro`, `CategoryCard.astro`, `CategoryGrid.astro` (DS #18-20; densidades `compact`/`full`; filtra `visible`; badge para `status === 'pending'`)
- [x] T028 [P] [US3] Crear `src/components/OffersSection.astro`, `OffersEmptyState.astro`, `OfferCard.astro`, `InfoNote.astro` (DS #24-26, #33; `offers.length === 0` → estado vacío)
- [x] T029 [US3] Agregar a `src/pages/index.astro` S3 Categorías (compact + "Ver productos" → `/productos`) y S5 Ofertas vacío (SM §3)
- [x] T030 [US3] Crear `src/pages/productos.astro` según SM §4 (PageHero + InfoNote, CategoryGrid full, Ofertas vacío, CtaBand `hours` → `/contacto#horarios`); `pageSeo.productos`

---

## Phase 6: User Story 4 — Conocer al comercio (P3)

**Goal**: Nosotros solo con hechos del brief; beneficios.
**Independent Test**: `/nosotros` sin años, cifras, nombres ni testimonios.

- [x] T031 [P] [US4] Crear `src/components/BenefitList.astro` y `BenefitItem.astro` (DS #22-23; 4 beneficios A-10)
- [x] T032 [US4] Agregar a `src/pages/index.astro` S2 Cercanía y S4 Beneficios (SM §3)
- [x] T033 [US4] Crear `src/pages/nosotros.astro` según SM §5 (PageHero `gondola` con ABOUT-S1-P1 y ABOUT-S1-P2-ALT, BenefitList columns=2, CtaBand `products`); `pageSeo.nosotros`

---

## Phase 7: Polish & Cross-Cutting

- [x] T034 [P] Crear `src/pages/404.astro` (SM §7, `pageSeo['404']`, enlaces a las 4 páginas)
- [x] T035 Ampliar `scripts/validate_content.py` para auditar también `dist/**/*.html` con los patrones prohibidos y obligatorios del contrato C-03 (`contracts/dist-audit.md`)
- [x] T036 Ejecutar `npm run check` y `npm run build`; corregir errores
- [x] T037 Ejecutar `python3 scripts/validate_content.py` y la auditoría de quickstart.md escenario 6; corregir hallazgos
- [x] T038 Verificar invariantes C-01: dirección/teléfono/horarios literales solo en `src/content/site.ts` (`grep -RE "Ejemplo|00-0000|07:30" src | grep -v src/content/site.ts` vacío)
- [x] T041 Revisión visual 360/768/1440 y teclado SOLO si hay navegador disponible; si no, registrar "NO EJECUTADA" en `docs/qa-report.md` (constitución IV/VI)
- [x] T039 Actualizar `docs/content-inventory.md` §4 (imágenes) registrando ilustraciones SVG propias e íconos propios (sin licencias de terceros)
- [ ] T040 [OPCIONAL — BLOQUEADA por aprobación del usuario] T-OPT-FONTS: `npm i @fontsource/plus-jakarta-sans @fontsource/inter` e importar `latin-600/700` y `latin-400/600` en `src/layouts/BaseLayout.astro` (DS §4.1)

---

## Dependencies & Execution Order

- Setup (T001-T004) → Foundational (T005-T018) → historias.
- US1 (T019-T024) primero (MVP). US2 depende de US1 (verifica componentes de US1). US3 y US4 dependen solo de Foundational, pero T029/T032 editan `src/pages/index.astro` tras T023 → serializar edición de index.
- Polish tras todas las historias. T040 solo con aprobación.

## Parallel Opportunities

- Setup: T003 ‖ T004.
- Foundational: T007 ‖ T008 ‖ T009 ‖ T010 ‖ T011 ‖ T014 (tras T005/T006).
- US1: T019 ‖ T020 ‖ T021 ‖ T022, luego T023 → T024.
- US3: T027 ‖ T028; US4: T031 en paralelo con US3.

## Implementation Strategy

1. MVP = Setup + Foundational + US1 → build verde → sitio útil (llegar + horarios + contacto).
2. US2 (verificación de llamadas) → US3 (productos/ofertas) → US4 (nosotros).
3. Polish: 404, auditoría C-03, invariantes, inventario.

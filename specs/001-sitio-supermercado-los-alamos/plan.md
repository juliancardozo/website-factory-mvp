# Implementation Plan: Sitio institucional Supermercado Los Álamos

**Branch**: `001-sitio-supermercado-los-alamos` | **Date**: 2026-11-12 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-sitio-supermercado-los-alamos/spec.md`

## Summary

Sitio estático de 4 páginas (+404) para un supermercado de cercanía en Villa Ejemplo cuyo objetivo es
llevar visitas al local: CTA "Cómo llegar" (Google Maps), "Llamar" (`tel:`), horarios y categorías.
Enfoque: Astro 5 estático + Tailwind CSS 4 con tokens de `docs/design-system.md`, contenido tipado en
un único módulo (`src/content/`), 34 componentes Astro reutilizables, ilustraciones SVG locales en
lugar de fotos, copy de `docs/copy-deck.md` y metadatos de `docs/seo-plan.md`. Sin backend, sin
formularios, un solo script de cliente (menú móvil). Reemplaza la demo "Taller Aurora".

## Technical Context

**Language/Version**: TypeScript 5 (modo estricto de Astro), Node 24 local

**Primary Dependencies**: Astro 5.18 (salida `static`), Tailwind CSS 4 + `@tailwindcss/vite`,
`@astrojs/check`. Sin dependencias nuevas (ver research R-02 sobre fuentes).

**Storage**: N/A (contenido en módulos TypeScript versionados)

**Testing**: `npm run check` (astro check), `npm run build`, `python3 scripts/validate_content.py`,
y auditoría estática de `dist/` con `grep` (contrato C-03). Sin navegador garantizado.

**Target Platform**: navegadores modernos móviles y de escritorio; hosting estático (no se despliega)

**Project Type**: sitio web estático (single project)

**Performance Goals**: 0 KB de JS salvo menú (< 1 KB inline); CSS único; sin imágenes rasterizadas en
el MVP; mapa con `loading="lazy"`.

**Constraints**: sin servicios externos en build; sin `canonical`/`og:url`; JSON-LD solo
name+address; WCAG 2.1 AA; 360/768/1440 sin scroll horizontal.

**Scale/Scope**: 4 páginas + 404, ~34 componentes, 1 módulo de contenido.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio | Cumplimiento en el plan | Estado |
|---|---|---|
| I. Brief como fuente de verdad | Datos solo desde `src/content/site.ts`, estados por campo; ofertas vacías; canales pendientes `null` no renderizados; "A confirmar" en categorías pendientes | PASS |
| II. Stack fijo y alcance | Astro + TS estático, Tailwind 4 vía vite, tokens en `@theme`, JS solo menú, 4 páginas, sin formularios | PASS |
| III. Contenido separado | `src/content/types.ts` + `site.ts` + `copy.ts`; componentes por props | PASS |
| IV. Accesibilidad y responsive | Contraste medido (design-system §3), skip link, foco visible, disclosure accesible, `prefers-reduced-motion`, mobile-first | PASS |
| V. SEO local honesto | title/description únicos, `lang="es-AR"`, OG sin url/imagen, JSON-LD estricto | PASS |
| VI. Verificabilidad | check + build + validate + auditoría `dist/`; QA no afirma pruebas de navegador no ejecutadas | PASS |
| Restricciones (imágenes, externos) | SVG propios; sin npm install nuevo sin aprobación; iframe de mapa es carga de tercero en runtime del visitante (no del build), justificado por REQ-008 y desactivable (`enabled`) | PASS (justificado) |

Re-check post diseño (Phase 1): PASS — el modelo de datos y los contratos no introducen campos de
precio, rating, URL pública ni canales no verificados.

## Project Structure

### Documentation (this feature)

```text
specs/001-sitio-supermercado-los-alamos/
├── plan.md              # este archivo
├── research.md          # Phase 0
├── data-model.md        # Phase 1
├── quickstart.md        # Phase 1
├── contracts/
│   ├── content-module.md   # C-01 contrato del módulo de contenido
│   ├── page-contract.md    # C-02 contrato de páginas (head, landmarks, CTA)
│   └── dist-audit.md       # C-03 patrones prohibidos en el HTML generado
├── checklists/requirements.md
└── tasks.md             # Phase 2 (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── content/
│   ├── types.ts          # tipos compartidos (design-system §7.0)
│   ├── site.ts           # comercio, dirección, teléfono, horarios, categorías, ofertas, canales, nav, derivados (MAPS_URL, TEL_HREF)
│   ├── copy.ts           # textos por ID del copy-deck
│   └── seo.ts            # title/description/OG por página + builder JSON-LD
├── components/
│   ├── icons/paths.ts    # trazos del set propio
│   ├── Icon.astro, Illustration.astro, IconTile.astro, StatusBadge.astro
│   ├── SkipLink.astro, Wordmark.astro, NavLinks.astro, SiteHeader.astro, SiteFooter.astro
│   ├── CtaLink.astro, DirectionsButton.astro, CallButton.astro, HoursLink.astro
│   ├── Container.astro, Section.astro, SectionHeader.astro, InfoCard.astro, InfoNote.astro
│   ├── HomeHero.astro, PageHero.astro, HeroVisual.astro, CtaBand.astro
│   ├── CategoryGrid.astro, CategoryCard.astro, BenefitList.astro, BenefitItem.astro
│   ├── OffersSection.astro, OffersEmptyState.astro, OfferCard.astro
│   └── HoursList.astro, AddressBlock.astro, PhoneBlock.astro, MapEmbed.astro
├── layouts/BaseLayout.astro
├── pages/index.astro, productos.astro, nosotros.astro, contacto.astro, 404.astro
└── styles/global.css     # @import tailwindcss + @theme (design-system §2) + base
public/favicon.svg        # monograma "F" provisional (PLACEHOLDER, no logo oficial)
scripts/validate_content.py  # se amplía con patrones del contrato C-03
```

**Structure Decision**: proyecto único Astro existente; se reemplaza `src/pages/index.astro` demo y
`global.css`; se agrega `src/content/` y `src/components/`. Sin carpeta `tests/`: la verificación es
estática (check/build/auditoría de `dist/`), suficiente para un sitio sin lógica.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| Iframe de Google Maps (tercero en runtime) | REQ-008 exige mapa; sin API key ni JS propio | Imagen estática del mapa requeriría descargar material con licencia dudosa; se deja `enabled=false` como reversión |

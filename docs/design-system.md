# Sistema de diseño: Supermercado Los Álamos

> **Fuentes:** `briefs/supermercado-los-alamos.md` (fuente de verdad, `L<n>` = línea), `specs/001-sitio-supermercado-los-alamos/spec.md`, `docs/requirements.md` (REQ-001 a REQ-018, A-01 a A-11, B-01 a B-08), `docs/brand-strategy.md` (BS-01 a BS-06), `docs/copy-deck.md` (IDs de copy), `docs/seo-plan.md`, `.specify/memory/constitution.md`.
> **Estado general:** paleta, tipografías y wordmark son una **propuesta** para el sitio y no la identidad oficial del comercio (L99-100, REQ-016). Las decisiones propias de este documento se identifican como `UX-xx` y son `ASSUMPTION` reversibles (ver sección 13).
> **Uso:** el `frontend-engineer` implementa estos tokens en `src/styles/global.css` (bloque `@theme`) y los componentes en `src/components/`. Este documento no define contenido: todo texto sale de `docs/copy-deck.md` a través del módulo de contenido (REQ-015).

---

## 1. Concepto visual

**"Mercado de barrio, ordenado y luminoso"** (BS-01). Fondo crema cálido, verdes de frescos, amarillo como señal de calidez (tipo cartel de góndola, sin imitar ninguna cadena). Moderno y limpio, sin estética de app ni de fintech (L114-115, REQ-016).

Principios de diseño que guían cada decisión:

1. **Lo útil primero.** Dirección, horarios, "Cómo llegar" y "Llamar" a la vista y a una acción de distancia (REQ-001, REQ-002, REQ-003, SC-001).
2. **Honestidad visual.** Nada parece lo que no es: las tarjetas no clicables no tienen hover, las ilustraciones no imitan fotos del local, el estado vacío de ofertas se ve como estado vacío (REQ-006, REQ-012, REQ-013).
3. **Funciona sin internet ni fotos.** El sitio se ve completo con ilustraciones SVG locales; las fotos son una mejora opcional (UX-05, REQ-012, B-02).
4. **Contraste medido, no estimado.** Solo se usan las combinaciones de la sección 3 (REQ-010, SC-005).
5. **Calma.** Pocas animaciones, cortas y desactivables (L121, L138, REQ-010).

---

## 2. Tokens para `@theme` (Tailwind CSS 4)

Copiar tal cual en `src/styles/global.css`. Los nombres generan utilidades (`bg-crema`, `text-verde-oscuro`, `font-display`, `text-h1`, `rounded-card`, `shadow-card`, `max-w-site`, `animate-entrada`).

```css
@import "tailwindcss";

@theme {
  /* Reinicia la paleta por defecto de Tailwind: solo se pueden usar colores aprobados (UX-01). */
  --color-*: initial;

  /* Paleta propuesta del brief (L91-98) — REQ-016 */
  --color-verde: #27834B;         /* Verde fresco: fondo de botón primario, íconos, barra de página actual */
  --color-verde-oscuro: #185C38;  /* Verde oscuro: títulos, enlaces, hover de botones, bandas oscuras, anillo de foco */
  --color-crema: #FFF9ED;         /* Fondo general de página */
  --color-blanco: #FFFFFF;        /* Superficies: header, tarjetas, secciones alternas */
  --color-amarillo: #F5C84C;      /* Acento: insignias, foco en fondos oscuros, ilustraciones. NUNCA texto sobre claro */
  --color-tinta: #27332D;         /* Texto principal, footer */

  /* Derivado decorativo (UX-02): bordes de tarjetas y separadores. No lleva texto ni comunica estado. */
  --color-borde: #E8DFCB;

  /* Tipografía (L103-104) — REQ-016, REQ-012 */
  --font-display: "Plus Jakarta Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;

  /* Escala fluida (sección 4). 360px = mínimo; 1440px = máximo. */
  --text-h1: clamp(2rem, 1.55rem + 1.9vw, 3rem);          /* 32 → 48px */
  --text-h1--line-height: 1.1;
  --text-h1--letter-spacing: -0.02em;
  --text-h2: clamp(1.625rem, 1.35rem + 1.2vw, 2.25rem);   /* 26 → 36px */
  --text-h2--line-height: 1.15;
  --text-h2--letter-spacing: -0.015em;
  --text-h3: clamp(1.25rem, 1.15rem + 0.45vw, 1.5rem);    /* 20 → 24px */
  --text-h3--line-height: 1.25;
  --text-lead: clamp(1.0625rem, 1rem + 0.3vw, 1.25rem);   /* 17 → 20px */
  --text-lead--line-height: 1.55;
  --text-body: 1rem;                                       /* 16px; en lg se usa text-body-lg */
  --text-body--line-height: 1.6;
  --text-body-lg: 1.0625rem;                               /* 17px */
  --text-body-lg--line-height: 1.65;
  --text-small: 0.875rem;                                  /* 14px: insignias, copyright, nota de imágenes */
  --text-small--line-height: 1.45;

  /* Radios (L108, BS-05) */
  --radius-btn: 0.75rem;     /* 12px botones */
  --radius-tile: 1rem;       /* 16px mosaicos de ícono */
  --radius-card: 1.25rem;    /* 20px tarjetas */
  --radius-media: 1.5rem;    /* 24px imágenes e ilustraciones grandes, mapa */

  /* Sombras suaves, tinta con baja opacidad */
  --shadow-card: 0 1px 2px rgb(39 51 45 / 0.06), 0 4px 16px rgb(39 51 45 / 0.06);
  --shadow-raised: 0 2px 4px rgb(39 51 45 / 0.08), 0 12px 28px rgb(39 51 45 / 0.10);

  /* Contenedores */
  --container-site: 72rem;   /* 1152px: ancho máximo de contenido */
  --container-texto: 40rem;  /* 640px: párrafos largos (aprox. 65-70 caracteres) */

  /* Movimiento (sección 9) */
  --ease-suave: cubic-bezier(0.2, 0.7, 0.2, 1);
  --animate-entrada: entrada 420ms var(--ease-suave) both;

  @keyframes entrada {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
}

:root {
  --header-h: 4rem;          /* 64px móvil; 4.5rem (72px) desde md */
}
@media (min-width: 48rem) { :root { --header-h: 4.5rem; } }

@layer base {
  html {
    background-color: var(--color-crema);
    color: var(--color-tinta);
    font-family: var(--font-sans);
    -webkit-text-size-adjust: 100%;
    scroll-padding-top: calc(var(--header-h) + 1rem); /* anclas #horarios no quedan bajo el header fijo */
  }
  body { font-size: var(--text-body); line-height: var(--text-body--line-height); }
  h1, h2, h3 { font-family: var(--font-display); text-wrap: balance; color: var(--color-verde-oscuro); }
  h1, h2 { font-weight: 700; }
  h3 { font-weight: 600; }
  p { text-wrap: pretty; }

  /* Foco visible global (REQ-010) */
  :focus-visible {
    outline: 3px solid var(--color-verde-oscuro);
    outline-offset: 3px;
    border-radius: 0.375rem;
  }
  /* Superficies oscuras: cualquier contenedor con data-surface="dark" */
  [data-surface="dark"] :focus-visible { outline-color: var(--color-amarillo); }
}

@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Notas de implementación:
- `bg-transparent`, `bg-current` y `text-inherit` siguen funcionando con `--color-*: initial`. Si algún plugin requiere `black`/`white`, usar `blanco`/`tinta`.
- **Espaciado:** se usa la escala por defecto de Tailwind 4 (`--spacing: 0.25rem`). No se agregan tokens propios; el ritmo de secciones se fija en la sección 5.
- **Prohibido** aplicar opacidad a colores de texto (`text-tinta/70`, `text-verde-oscuro/80`): esos valores no están medidos (UX-03).

### 2.1 Roles de color

| Token | Hex | Rol | Fuente |
|---|---|---|---|
| `verde` | #27834B | Fondo del botón primario (texto blanco), íconos sobre claro, barra de "página actual", trazos de ilustración | L92, REQ-016 |
| `verde-oscuro` | #185C38 | Títulos H1-H3, enlaces de texto, hover/active del primario, borde y texto del secundario, banda CTA, anillo de foco sobre claro | L93 |
| `crema` | #FFF9ED | Fondo de página y de secciones impares; fondo de mosaicos de ícono sobre tarjeta blanca | L94 |
| `blanco` | #FFFFFF | Header, tarjetas, secciones pares, texto sobre bandas verde oscuro | L95 |
| `amarillo` | #F5C84C | Insignia "A confirmar" (con texto tinta), botón primario sobre banda oscura, foco sobre oscuro, detalles decorativos | L96 |
| `tinta` | #27332D | Texto de cuerpo, fondo del footer | L97 |
| `borde` | #E8DFCB | Bordes de tarjeta, separadores de filas de horario (decorativo) | UX-02 |

---

## 3. Contraste: combinaciones permitidas y prohibidas (REQ-010, SC-005)

Ratios **medidos por el orquestador** con la fórmula WCAG 2.1. Umbrales: 4.5:1 texto normal, 3:1 texto grande (≥ 24px o ≥ 18.66px en negrita) y componentes de interfaz o íconos informativos.

### 3.1 Permitidas

| Texto o elemento | Fondo | Ratio | Uso autorizado |
|---|---|---|---|
| `tinta` #27332D | `blanco` | 13.14 | Cuerpo, todo tamaño |
| `tinta` | `crema` | 12.53 | Cuerpo, todo tamaño |
| `verde-oscuro` #185C38 | `blanco` | 7.99 | Títulos, enlaces, texto pequeño, íconos, borde de botón secundario |
| `verde-oscuro` | `crema` | 7.62 | Ídem |
| `blanco` | `verde-oscuro` | 7.99 | Texto en banda CTA, hover del primario, hover del secundario |
| `crema` | `verde-oscuro` | 7.62 | Texto secundario en banda CTA, botón secundario sobre oscuro |
| `blanco` | `verde` #27834B | 4.74 | **Solo** etiqueta del botón primario (≥ 16px, peso 600) |
| `verde` | `blanco` | 4.74 | Íconos y barra de página actual; texto solo ≥ 18px semibold (UX-03) |
| `verde` | `crema` | 4.52 | Íconos y elementos gráficos; **no** texto menor a 24px (margen mínimo) |
| `amarillo` #F5C84C | `verde-oscuro` | 5.04 | Antetítulo en banda, botón primario sobre oscuro, anillo de foco sobre oscuro |
| `verde-oscuro` | `amarillo` | 5.04 | Texto alternativo dentro de insignia (opcional) |
| `tinta` | `amarillo` | 8.29 | Insignia "A confirmar", botón primario sobre oscuro |
| `amarillo` | `tinta` | 8.29 | Foco y detalles en el footer |
| `blanco` / `crema` | `tinta` | 13.14 / 12.53 | Texto y enlaces del footer |

### 3.2 Prohibidas

| Texto o elemento | Fondo | Ratio | Motivo |
|---|---|---|---|
| `amarillo` | `blanco` | 1.59 | Falla texto e ícono. Solo decorativo (formas de ilustración, punto del wordmark) |
| `amarillo` | `crema` | 1.51 | Ídem. Nunca anillo de foco sobre claro |
| `blanco` | `amarillo` | 1.59 | Nunca texto blanco sobre amarillo |
| `amarillo` | `verde` | 2.99 | Falla incluso 3:1. Sin texto, íconos ni foco amarillo sobre el verde fresco |
| `tinta` | `verde` | 2.78 | Falla. El botón verde lleva texto **blanco** |
| `crema` | `verde` | 4.52 | Margen nulo con antialiasing: usar `blanco` (UX-03) |
| `verde` | `verde-oscuro` | (no medido, bajo) | Sin uso combinado |
| Cualquier texto | Fotografía | variable | Sin texto sobre fotos (UX-04, ver sección 10) |

Reglas adicionales:
- El estado nunca se comunica solo con color: la insignia dice "A confirmar" y la página actual tiene `aria-current` además de la barra (REQ-005, REQ-017).
- Los fondos decorativos con gradiente (sección 10.3) solo mezclan `crema`, `blanco` y `amarillo`. Sobre cualquier mezcla de ellos, `tinta` (≥ 8.29) y `verde-oscuro` (≥ 5.04) siguen cumpliendo; `blanco` y `verde` como texto quedan prohibidos.

---

## 4. Tipografía (REQ-016, REQ-012)

### 4.1 Carga de fuentes: `@fontsource` (decisión UX-06)

| Familia | Paquete npm | Pesos | Archivos a importar |
|---|---|---|---|
| Plus Jakarta Sans | `@fontsource/plus-jakarta-sans` | 600, 700 | `@fontsource/plus-jakarta-sans/latin-600.css`, `.../latin-700.css` |
| Inter | `@fontsource/inter` | 400, 600 | `@fontsource/inter/latin-400.css`, `.../latin-600.css` |

- **Por qué @fontsource y no Google Fonts:** las fuentes se empaquetan con el build y se sirven desde el mismo origen. No hay solicitudes a servicios de terceros en runtime (privacidad, sin dependencia externa, coherente con "sin acciones externas"). Tampoco hay `preconnect` ni bloqueo de render por CSS remoto. Fontsource usa `font-display: swap` por defecto (REQ-012).
- **Subconjunto `latin`:** cubre español completo (á, é, í, ó, ú, ñ, ü, ¿, ¡). Se importan solo 4 archivos y no las variantes cursivas.
- **Dónde importar:** en el frontmatter de `src/layouts/BaseLayout.astro` (`import "@fontsource/inter/latin-400.css";` etc.), antes de `global.css`.
- **Fallback sin red:** si `npm install` no pudo descargar los paquetes, el sitio funciona con la pila de sistema declarada en `--font-display` / `--font-sans`. Reportar como pendiente; **no** cambiar a Google Fonts CDN sin aprobación del orquestador.

### 4.2 Escala y uso

| Rol | Familia | Peso | Token | Móvil 360 | Escritorio 1440 | Color | Elemento |
|---|---|---|---|---|---|---|---|
| H1 | Plus Jakarta Sans | 700 | `text-h1` | 32px / 1.1 | 48px | `verde-oscuro` | Uno por página (REQ-010) |
| H2 | Plus Jakarta Sans | 700 | `text-h2` | 26px / 1.15 | 36px | `verde-oscuro` (blanco en banda) | Título de sección |
| H3 | Plus Jakarta Sans | 600 | `text-h3` | 20px / 1.25 | 24px | `verde-oscuro` o `tinta` | Tarjetas, beneficios, bloques |
| Antetítulo | Inter | 600 | `text-small` + `uppercase tracking-[0.08em]` | 14px | 14px | `verde-oscuro` (amarillo en banda) | Etiqueta encima del H1/H2 |
| Bajada | Inter | 400 | `text-lead` | 17px / 1.55 | 20px | `tinta` | Párrafo de hero y de intro |
| Cuerpo | Inter | 400 | `text-body` → `lg:text-body-lg` | 16px / 1.6 | 17px | `tinta` | Párrafos |
| Énfasis | Inter | 600 | — | — | — | `tinta` | Días en horarios, número de teléfono |
| Botón | Plus Jakarta Sans | 600 | `text-base` (16px) / `lg`: 17px | 16px | 17px | según variante | CTA |
| Navegación | Inter | 600 | `text-base` | 16px | 16px | `tinta`; actual `verde-oscuro` | Header |
| Pequeño | Inter | 400/600 | `text-small` | 14px | 14px | `tinta` (crema en footer) | Insignia, nota de imágenes, © |

Reglas: cuerpo nunca menor a 16px. Ancho de párrafo `max-w-texto` (≈ 65-70 caracteres). Las cifras de horario usan `font-variant-numeric: tabular-nums` (`tabular-nums`) para alinear. No usar cursivas ni mayúsculas en párrafos.

### 4.3 Wordmark provisional (A-03, B-07, BS-03: PLACEHOLDER)

- HTML, no imagen. Enlace a `/` con `aria-label` = GLB-HDR-LOGO-ARIA ("Supermercado Los Álamos, ir al inicio").
- Dos líneas: "Supermercado" en Plus Jakarta Sans 600, 12px (13px desde md), mayúsculas, `tracking-[0.12em]`, color `tinta`. Debajo, "Los Álamos" en Plus Jakarta Sans 700, 22px (26px desde md), color `verde-oscuro`.
- Detalle decorativo: hoja SVG de 10×14px en `verde` a la derecha de "Los Álamos", más un punto `amarillo` de 6px. Ambos `aria-hidden="true"`. No es un isotipo y no debe confundirse con un logo oficial.
- Footer: misma estructura en `blanco` / `crema` sobre `tinta`.
- Reemplazo: el componente `Wordmark` acepta en el futuro `logoSrc` para cargar el logo oficial sin tocar el header.

---

## 5. Layout: breakpoints, contenedor y grilla (REQ-011)

### 5.1 Breakpoints

Se usan los breakpoints **por defecto** de Tailwind 4, sin redefinirlos (UX-07, reversible). Se diseña mobile-first y se revisa en los tres anchos del quality gate.

| Viewport de revisión | Breakpoint activo | Cambio de layout |
|---|---|---|
| **360px** (móvil) | base (sin prefijo) | 1 columna, CTA a ancho completo, menú desplegable |
| `sm` 640px | `sm:` | CTA en fila (auto-width), categorías aún 1 col compacta |
| **768px** (tablet) | `md:` (48rem) | Navegación en línea en el header, grillas de 2 columnas, hero aún apilado |
| `lg` 1024px | `lg:` (64rem) | Layout de escritorio: hero en 2 columnas, categorías en 3, contacto en 2 columnas |
| **1440px** (escritorio) | `xl:` (80rem) | Mismo layout que `lg`; el contenido se limita a `max-w-site` (1152px) y crecen los márgenes |

### 5.2 Contenedor

`Container` = `mx-auto w-full max-w-site px-4 md:px-8 lg:px-10`.
- 360px: 16px de margen, 328px útiles. Ningún elemento puede tener ancho fijo mayor a 328px (REQ-011: sin scroll horizontal).
- 768px: 32px de margen, 704px útiles.
- 1440px: 1152px útiles, centrado.

### 5.3 Grilla y ritmo

| Aspecto | Base (360) | md (768) | lg+ (1024 / 1440) |
|---|---|---|---|
| Columnas | 4 (o flujo 1 col) | 8 (o 2 col) | 12 |
| Gutter (`gap`) | 16px (`gap-4`) | 24px (`gap-6`) | 32px (`gap-8`) |
| Padding vertical de sección | 56px (`py-14`) | 72px (`md:py-18`) | 96px (`lg:py-24`) |
| Separación título/contenido | 24px (`mb-6`) | 32px (`md:mb-8`) | 40px (`lg:mb-10`) |
| Separación entre tarjetas | 16px | 24px | 24-32px |

Alternancia de fondos de sección (BS ritmo): `crema` → `blanco` → `crema` → … → banda `verde-oscuro` (CtaBand) → footer `tinta`. Dos secciones contiguas nunca comparten fondo.

---

## 6. Interacción: estados y objetivos táctiles (REQ-010, REQ-011)

### 6.1 Objetivo táctil

- Botones (`CtaLink`): altura mínima **48px** (`min-h-12`), padding horizontal 20-24px. En el header, **44px** (`min-h-11`).
- Enlaces de navegación móvil: filas de **48px**. Enlaces del footer: `min-h-11` con `inline-flex items-center`.
- Enlace de teléfono en línea de texto: también `min-h-11 inline-flex items-center`.
- Separación mínima de 8px entre objetivos adyacentes.

### 6.2 Estados por variante de botón

| Variante | Superficie | Reposo | Hover | Active (presionado) | Focus-visible |
|---|---|---|---|---|---|
| `primary` | claro (crema/blanco) | bg `verde`, texto `blanco` (4.74), sombra `shadow-card` | bg `verde-oscuro` (7.99), sombra `shadow-raised` | bg `verde-oscuro`, `translate-y-px`, sin sombra | anillo 3px `verde-oscuro`, offset 3px (7.62 sobre crema) |
| `secondary` | claro | bg `blanco`, borde 2px `verde-oscuro`, texto `verde-oscuro` (7.99) | bg `verde-oscuro`, texto `blanco` | ídem hover + `translate-y-px` | anillo `verde-oscuro` offset 3px |
| `ghost` | claro | sin fondo, texto `verde-oscuro`, subrayado 1px offset 4px, ícono a la izquierda | subrayado 2px | `translate-y-px` | anillo `verde-oscuro` |
| `primary` | oscuro (`verde-oscuro`) | bg `amarillo`, texto `tinta` (8.29) | bg `blanco`, texto `verde-oscuro` (7.99) | `translate-y-px` | anillo `amarillo` offset 3px (5.04) |
| `secondary` | oscuro | borde 2px `crema`, texto `crema` (7.62) | bg `crema`, texto `verde-oscuro` (7.62) | `translate-y-px` | anillo `amarillo` |
| `ghost` | oscuro | texto `crema` subrayado | subrayado 2px | — | anillo `amarillo` |

- Transiciones: `transition-[background-color,color,box-shadow,transform] duration-150 ease-out`.
- No existe estado `disabled`: no hay formularios ni acciones condicionales (REQ-013).
- Cursor por defecto del navegador; sin efectos de "magnetismo" ni ripple.

### 6.3 Otros elementos

| Elemento | Reposo | Hover | Focus-visible | Actual |
|---|---|---|---|---|
| Enlace de texto (claro) | `verde-oscuro`, subrayado 1px, `underline-offset-[3px]` | subrayado 2px | anillo `verde-oscuro` | — |
| Enlace de texto (footer) | `crema`, subrayado | `blanco`, subrayado 2px | anillo `amarillo` | — |
| Ítem de nav (desktop) | `tinta` 600 | `verde-oscuro` + subrayado | anillo `verde-oscuro` | `verde-oscuro` + barra inferior 3px `verde` (4.74) + `aria-current="page"` |
| Ítem de nav (móvil) | fila 48px, `tinta` | bg `crema` | anillo inset `verde-oscuro` (`outline-offset: -3px`) | barra izquierda 4px `verde` + texto `verde-oscuro` + `aria-current` |
| Tarjetas (Category, Benefit) | estáticas | **sin hover** (no son clicables, UX-08) | no reciben foco | — |
| Skip link | oculto fuera de pantalla | — | visible arriba a la izquierda, bg `verde-oscuro`, texto `blanco`, `z-50` | — |

---

## 7. Inventario de componentes Astro

Ubicación: `src/components/` (UI) y `src/components/icons/`. Todos reciben datos por props desde `src/content/*.ts` (REQ-015). Los componentes "con conocimiento del negocio" (`DirectionsButton`, `CallButton`, `HoursList`, `AddressBlock`) leen la **única fuente** del módulo de contenido para garantizar SC-002 y SC-007.

### 7.0 Tipos compartidos (sugeridos para `src/content/types.ts`)

```ts
export type IconName =
  | 'map-pin' | 'clock' | 'phone' | 'external' | 'arrow-right' | 'menu' | 'close'
  | 'basket' | 'leaf' | 'smile' | 'home'                      // beneficios
  | 'bottle' | 'jar' | 'apple' | 'meat' | 'carrot' | 'spray'; // categorías
// Prohibidos: carrito con contador, WhatsApp, redes sociales, moto/delivery (REQ-013, REQ-014).

export type Surface = 'light' | 'dark';
export type SectionTone = 'crema' | 'blanco' | 'verde-oscuro';

export interface ImageAsset {          // solo si hay foto con licencia registrada (sección 10)
  src: ImageMetadata;                  // import de src/assets/images/...
  alt: string;                         // '' si es decorativa
  credit: { source: 'Unsplash' | 'Pexels' | 'Propia'; author: string; url: string; license: string };
}

export interface Category {
  id: 'alim' | 'alma' | 'fres' | 'carn' | 'verd' | 'limp';
  title: string; descShort: string; descLong: string;
  icon: IconName;
  status: 'confirmed' | 'pending';     // pending => insignia "A confirmar" (A-04)
  visible: boolean;                    // false => se retira sin tocar componentes
  image: ImageAsset | null;            // null => mosaico ilustrado (UX-05)
}

export interface OpeningHours { days: string; value: string; closed: boolean } // "Lunes a sábado" / "07:30 a 21:00"
export interface Offer { title: string; description: string; validity: string } // sin campo precio (REQ-006)
```

### 7.1 Tabla de componentes

| # | Componente | Props (TypeScript) | Responsabilidad / notas | REQ |
|---|---|---|---|---|
| 1 | `BaseLayout.astro` (`src/layouts/`) | `{ title: string; description: string; ogTitle?: string; ogDescription?: string; jsonLd?: boolean; currentPath: string }` | `<html lang="es-AR">`, meta (sin canonical/og:url), fuentes, `SkipLink`, `SiteHeader`, `<main id="contenido" tabindex="-1">`, `SiteFooter`, JSON-LD opcional | REQ-009, REQ-010 |
| 2 | `SkipLink.astro` | `{ targetId?: string /* 'contenido' */; label: string /* GLB-SKIP */ }` | Primer elemento enfocable | REQ-010 |
| 3 | `SiteHeader.astro` | `{ currentPath: string }` | Wordmark, nav, `DirectionsButton` compacto, botón Menú (< md). Sticky (`sticky top-0 z-40`), bg `blanco`, borde inferior `borde`. Ver 7.2 | REQ-001, REQ-017 |
| 4 | `Wordmark.astro` | `{ surface: Surface; size?: 'sm' \| 'md'; logoSrc?: ImageMetadata }` | Logotipo textual provisional (4.3) | A-03 |
| 5 | `NavLinks.astro` | `{ items: { href: string; label: string }[]; currentPath: string; layout: 'inline' \| 'stacked' }` | `aria-current="page"` en la ruta actual (comparar sin barra final) | REQ-017 |
| 6 | `SiteFooter.astro` | `{}` (lee contenido) | 4 bloques: marca + bajada, dirección, teléfono, horarios; nav del pie; nota de imágenes condicional; ©. `data-surface="dark"`, bg `tinta`. Sin redes | REQ-002, REQ-003, REQ-004, A-11 |
| 7 | `CtaLink.astro` | `{ href: string; label: string; variant: 'primary' \| 'secondary' \| 'ghost'; surface?: Surface; size?: 'md' \| 'lg'; icon?: IconName; external?: boolean; ariaLabel?: string; block?: 'mobile' \| 'always' \| 'never'; class?: string }` | Siempre `<a>` (no hay acciones de botón). Si `external`: `target="_blank" rel="noopener noreferrer"`, ícono `external` visible (`aria-hidden`) y `aria-label` que empieza con el texto visible y termina en "(abre en una pestaña nueva)"; si no se pasa `ariaLabel`, agrega `<span class="sr-only">` SYS-NEWTAB-SR. `block='mobile'` = `w-full sm:w-auto` | REQ-001, REQ-010, REQ-011 |
| 8 | `DirectionsButton.astro` | `{ variant?: 'primary' \| 'secondary' \| 'ghost'; surface?: Surface; size?: 'md' \| 'lg'; label?: 'default' \| 'alt'; block?: CtaLink['block'] }` | Envuelve `CtaLink` con `{MAPS_URL}`, ícono `map-pin`, `external`, copy CTA-MAPS o CTA-MAPS-ALT | REQ-001, SC-002 |
| 9 | `CallButton.astro` | `{ variant?: 'primary' \| 'secondary' \| 'ghost'; surface?: Surface; short?: boolean; block?: CtaLink['block'] }` | `CtaLink` con `{TEL_HREF}`, ícono `phone`, copy CTA-CALL / CTA-CALL-SHORT, `aria-label` con el número | REQ-002, SC-002 |
| 10 | `HoursLink.astro` | `{ href: '#horarios' \| '/#horarios' \| '/contacto#horarios'; surface?: Surface }` | `CtaLink` `ghost` con ícono `clock`, copy CTA-HOURS | REQ-003 |
| 11 | `Container.astro` | `{ as?: 'div' \| 'section'; width?: 'site' \| 'texto'; class?: string }` | Contenedor 5.2 | REQ-011 |
| 12 | `Section.astro` | `{ id?: string; tone: SectionTone; labelledBy: string; spacing?: 'md' \| 'lg'; class?: string }` | `<section aria-labelledby>`. Si `tone='verde-oscuro'`, agrega `data-surface="dark"` | REQ-010 |
| 13 | `SectionHeader.astro` | `{ headingId: string; title: string; eyebrow?: string; intro?: string; align?: 'start' \| 'center'; surface?: Surface }` | Siempre H2. Intro con `max-w-texto` | REQ-010 |
| 14 | `HomeHero.astro` | `{ eyebrow: string; title: string; subtitle: string; image: ImageAsset \| null }` | H1 de Inicio + `DirectionsButton` primary lg + `CallButton` secondary lg + `HoursLink` (`#horarios`) + `HeroVisual`. Texto **nunca** sobre la imagen (UX-04) | REQ-001, REQ-002, REQ-003, SC-001 |
| 15 | `PageHero.astro` | `{ title: string; subtitle?: string; paragraphs?: string[]; visual?: 'none' \| 'illustration'; illustration?: 'canasta' \| 'pin' \| 'gondola'; image?: ImageAsset \| null }` | H1 de páginas internas; bg `crema`; visual a la derecha solo desde `lg` | REQ-010 |
| 16 | `HeroVisual.astro` | `{ image: ImageAsset \| null; priority?: boolean }` | Si `image`: `<Image>` de `astro:assets`, `loading="eager"`, `fetchpriority="high"`, `widths`/`sizes`, `rounded-media`, aspect 4:3 (móvil) / 5:4 (lg). Si `null`: `Illustration name="mercado"` | REQ-012, B-02 |
| 17 | `Illustration.astro` | `{ name: 'mercado' \| 'canasta' \| 'pin' \| 'gondola'; class?: string }` | SVG inline decorativo (`aria-hidden="true"`, `focusable="false"`), ver 10.3 | REQ-012, UX-05 |
| 18 | `CategoryGrid.astro` | `{ categories: Category[]; density: 'compact' \| 'full'; headingLevel?: 3 }` | `<ul role="list">` de tarjetas; filtra `visible`. Grid: base 1 col → `md:grid-cols-2` → `lg:grid-cols-3` | REQ-005 |
| 19 | `CategoryCard.astro` | `{ category: Category; density: 'compact' \| 'full'; headingLevel?: 3 }` | Tarjeta **no clicable** (`<li>`/`<article>`). `compact` (Inicio): fila con mosaico de ícono 56px + H3 + `descShort`. `full` (Productos): media 16:10 arriba (foto o mosaico ilustrado) + H3 + `descLong`. `status='pending'` → `StatusBadge` junto al H3 | REQ-005, A-04 |
| 20 | `StatusBadge.astro` | `{ label: string /* CAT-BADGE */; srText: string /* CAT-BADGE-SR */ }` | Pastilla `bg-amarillo text-tinta` (8.29), `text-small font-semibold`, `rounded-full px-2.5 py-0.5`, ícono `clock` 14px decorativo | REQ-005, REQ-010 |
| 21 | `IconTile.astro` | `{ icon: IconName; size?: 'md' \| 'lg'; tone?: 'crema' \| 'blanco' }` | Mosaico `rounded-tile`, ícono `verde-oscuro` (7.62/7.99); md 56px / ícono 28px, lg 96px / ícono 48px | REQ-016 |
| 22 | `BenefitList.astro` | `{ items: { title: string; description: string; icon: IconName }[]; columns?: 2 \| 4 }` | `<ul>`: base 1 col → `md:grid-cols-2` → `lg:grid-cols-4` (Inicio) o `lg:grid-cols-2` (Nosotros) | REQ-007, A-10 |
| 23 | `BenefitItem.astro` | `{ title: string; description: string; icon: IconName; headingLevel?: 3 }` | `IconTile` + H3 + texto. Sin cifras | REQ-007 |
| 24 | `OffersSection.astro` | `{ headingId: string; title: string; offers: Offer[]; empty: { title: string; text: string }; showHoursLink?: boolean; hoursHref?: HoursLink['href'] }` | Si `offers.length === 0` → `OffersEmptyState`; si no → grilla de `OfferCard` (sin cambiar el diseño, FR-006) | REQ-006 |
| 25 | `OffersEmptyState.astro` | `{ title: string; text: string; showHoursLink?: boolean; hoursHref?: string }` | Tarjeta `blanco`, borde 2px **discontinuo** `borde`, `rounded-card`, `Illustration name="canasta"` pequeña (decorativa), H3 + texto + `CallButton` secondary + `HoursLink` opcional. Sin precios, %, fechas | REQ-006, B-01 |
| 26 | `OfferCard.astro` | `{ offer: Offer }` | Para el futuro: H3, descripción, "Vigencia: …". No hay campo de precio | REQ-006 |
| 27 | `HoursList.astro` | `{ title?: string; headingLevel?: 2 \| 3; headingId?: string; surface?: Surface; compact?: boolean }` | Lee `hours[]`. `<dl>`: cada fila `div.flex justify-between` con `<dt>` (600) y `<dd>` (`tabular-nums`), separador `borde`. "cerrado" como texto. Sin "abierto ahora" ni feriados | REQ-003, B-08 |
| 28 | `AddressBlock.astro` | `{ title?: string; headingLevel?: 2 \| 3; format: 'full' \| 'short'; showDirections?: boolean; surface?: Surface }` | `<address class="not-italic">` con la dirección del módulo; opcional `DirectionsButton` | REQ-001, REQ-004 |
| 29 | `PhoneBlock.astro` | `{ title?: string; headingLevel?: 2 \| 3; showCallButton?: boolean }` | Número visible como enlace `tel:` (600, `tabular-nums`) + `CallButton` opcional | REQ-002, REQ-004 |
| 30 | `InfoCard.astro` | `{ icon: IconName; class?: string }` + slot | Tarjeta contenedora `blanco` / `rounded-card` / `shadow-card` / `p-6` con `IconTile` en la cabecera; usada por Address/Phone/Hours | REQ-016 |
| 31 | `MapEmbed.astro` | `{ title: string /* CONT-S2-MAP-TITLE */; query: string; fallbackText: string; enabled?: boolean /* default true */ }` | Ver 7.3 | REQ-008, A-06 |
| 32 | `CtaBand.astro` | `{ headingId: string; title: string; text: string; secondary: 'call' \| 'products' \| 'hours'; hoursHref?: string }` | `Section tone="verde-oscuro"`. H2 `blanco`, texto `crema`, `DirectionsButton` primary sobre oscuro + secundario sobre oscuro. Fondo con `Illustration` de hojas en `verde` al 30 % (decorativo, sin texto encima) | REQ-001, REQ-002 |
| 33 | `InfoNote.astro` | `{ text: string; action?: 'call' }` | Nota informativa (PROD-S1-NOTE): borde izquierdo 4px `verde`, bg `blanco`, ícono `basket`, texto `tinta`, `CallButton` ghost. No es alerta (`role` no se usa) | REQ-013 |
| 34 | `Icon.astro` | `{ name: IconName; size?: 16 \| 20 \| 24 \| 28 \| 32 \| 48; label?: string; class?: string }` | SVG inline, `viewBox="0 0 24 24"`, `fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`. Sin `label`: `aria-hidden="true" focusable="false"`. Con `label`: `role="img" aria-label` | REQ-016, REQ-010 |

### 7.2 SiteHeader y menú móvil (REQ-010, REQ-017, REQ-001)

**Móvil (< md):** fila de 64px: `Wordmark size="sm"` | `DirectionsButton` compacto (variante `primary`, `min-h-11`, `px-3`, ícono `map-pin` 20px + "Cómo llegar", 15px) | botón "Menú" (`min-h-11 min-w-11`, ícono `menu` + texto GLB-NAV-MENU, borde 2px `verde-oscuro`, texto `verde-oscuro`). Presupuesto a 360px: wordmark ≈ 96px + CTA ≈ 124px + Menú ≈ 84px + 2 gaps de 8px = 320px ≤ 328px. Si se supera, el texto "Menú" pasa a `sr-only` por debajo de 360px (`max-[359px]:sr-only`) y el botón conserva su `aria-label`.

**Patrón:** *disclosure* (no es un diálogo modal):
- `<button type="button" aria-expanded="false" aria-controls="menu-principal" aria-label="Abrir menú">`. Al abrir: `aria-expanded="true"`, `aria-label="Cerrar menú"` (GLB-NAV-MENU-ARIA-*), ícono `close`.
- Panel `<div id="menu-principal">` debajo del header, ancho completo, bg `blanco`, `shadow-raised`; contiene `<nav aria-label="Navegación principal">` con `NavLinks layout="stacked"` (filas de 48px).
- Cierra con: el mismo botón, `Escape` (devuelve el foco al botón), clic en un enlace, o cuando el viewport alcanza `md`. Sin bloqueo de scroll ni trampa de foco (UX-09).
- Mejora progresiva: sin JS, el panel se renderiza visible (lista estática bajo el header). El script inline (≤ 30 líneas, `is:inline`) agrega `hidden` al cargar y conecta el botón. Es el **único JS de cliente** del sitio (REQ-012).
- Apertura sin animación de altura; solo `opacity` 150ms (se anula con movimiento reducido).

**md+ (≥ 768px):** 72px de alto: `Wordmark size="md"` | `NavLinks layout="inline"` (gap 24px; 4 ítems: Inicio, Productos, Nosotros, Contacto) | `DirectionsButton` primary `min-h-11`. Sin botón Menú. El `<nav aria-label="Navegación principal">` es el mismo landmark.

### 7.3 MapEmbed (REQ-008, A-06)

```html
<figure class="overflow-hidden rounded-media border border-borde bg-crema">
  <div class="relative aspect-[4/3] md:aspect-[16/10]">
    <!-- capa de fondo: Illustration "pin" + dirección corta, visible mientras carga o si el iframe no pinta -->
    <iframe
      src="https://www.google.com/maps?q={encodeURIComponent(query)}&output=embed"
      title="{CONT-S2-MAP-TITLE}"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      class="absolute inset-0 h-full w-full border-0"></iframe>
  </div>
  <figcaption class="p-4 md:p-5">{CONT-S2-MAP-FALLBACK} + DirectionsButton label="alt" variant="ghost"</figcaption>
</figure>
```

- Sin API key ni JS. `query` = `{DIRECCION_COMPLETA}` desde el módulo (única fuente).
- **Fallback siempre presente:** el `figcaption` con texto y enlace "Abrir en Google Maps" se ve **siempre**, no solo en caso de error (un iframe bloqueado no dispara un evento confiable).
- `enabled=false` (reversión de A-06): no se renderiza el iframe; queda la composición `pin` + dirección + enlace. Útil si el orquestador decide no cargar terceros.
- Altura mínima a 360px: ≈ 246px (4:3 sobre 328px).
- Teclado: el iframe es enfocable; el enlace alternativo está inmediatamente después.

### 7.4 Íconos (REQ-016)

- Set propio de trazo simple (24×24, trazo 2px, extremos redondeados), dibujado a mano con formas geométricas y guardado en `src/components/icons/paths.ts` (`Record<IconName, string>`). No requiere internet.
- Alternativa: copiar trazos de **Lucide** (licencia ISC) si el paquete ya está disponible localmente; registrar la licencia en `docs/content-inventory.md` §4. No mezclar sets.
- Asignación: beneficios → Variedad `basket`, Frescura `leaf`, Atención cercana `smile`, Comodidad `home`. Categorías → Alimentos y bebidas `bottle`, Almacén `jar`, Frescos `apple`, Carnicería `meat`, Verdulería `carrot`, Limpieza `spray`. Utilidad → `map-pin`, `clock`, `phone`, `external`, `arrow-right`, `menu`, `close`.
- Color: `currentColor`. Sobre claro, `verde-oscuro` o `verde`; sobre oscuro, `amarillo` o `crema`.

---

## 8. Patrones de página reutilizables

| Patrón | Composición | Dónde |
|---|---|---|
| Hero de Inicio | base: texto → CTA apilados (`block="mobile"`) → enlace horarios → visual 4:3. lg: grid 12 col, texto `col-span-6`, visual `col-span-6` | `/` |
| Hero interno | Fondo crema, H1 + bajada `max-w-texto`; lg: ilustración 5 col a la derecha | `/productos`, `/nosotros`, `/contacto` |
| Bloque de datos | 3 `InfoCard` (Dirección, Horarios, Teléfono) | `/contacto`, Inicio S6 |
| Banda CTA | `CtaBand` al cierre de cada página salvo Contacto | `/`, `/productos`, `/nosotros` |

Detalle por página y wireframes: `docs/site-map.md`.

---

## 9. Movimiento (L121, L138, REQ-010)

| Uso | Efecto | Duración | Con `prefers-reduced-motion: reduce` |
|---|---|---|---|
| Entrada del hero (texto y visual) | `animate-entrada` (opacidad 0→1, `translateY` 8px→0), visual con `animation-delay: 80ms` | 420ms, una vez | Sin animación (regla global) |
| Botones | color, sombra, `translate-y-px` al presionar | 150ms | Cambio instantáneo |
| Enlaces | grosor del subrayado | 150ms | Instantáneo |
| Menú móvil | opacidad del panel | 150ms | Instantáneo |
| Anclas (`#horarios`) | `scroll-behavior: smooth` solo con `no-preference` | nativo | Salto directo |

Prohibido: animaciones al hacer scroll (requieren JS), parallax, carruseles automáticos, contadores, parpadeos, elementos que se muevan solos más de una vez (REQ-013: sin popups ni banners).

---

## 10. Imágenes (REQ-012, B-02, A-02, BS-06)

### 10.1 Decisión: ilustración SVG local por defecto, fotos opcionales (UX-05)

El implementador **no** tiene acceso a internet garantizado. Por eso el MVP se diseña para verse completo **sin ninguna fotografía**:

| Slot | Modo por defecto (sin fotos) | Modo foto (cuando haya archivo con licencia) |
|---|---|---|
| Hero Inicio | `Illustration name="mercado"` en `rounded-media`, aspect 4:3 / 5:4 | `<Image>` stock, mismo marco y aspect |
| Tarjetas de categoría (`full`) | Mosaico ilustrado: bg `crema`, `IconTile` lg con el ícono de la categoría + 2-3 formas decorativas (círculos `amarillo`, hoja `verde`) | `<Image>` 16:10 con `alt=""` (el H3 ya nombra la categoría; evita lectura duplicada) |
| Tarjetas de categoría (`compact`, Inicio) | `IconTile` md | Igual (sin foto, para mantener la carga ligera) |
| Hero interno | `Illustration` `canasta` (Productos), `gondola` (Nosotros), `pin` (Contacto) | `<Image>` opcional |
| Ofertas vacío | `Illustration name="canasta"` pequeña | No aplica (no hay imágenes de ofertas, REQ-006) |

Cambio de modo: en el módulo de contenido, `image: null` → `image: { src, alt, credit }`. **Un solo cambio por slot, sin tocar componentes** (REQ-015, SC-007).

### 10.2 Fuente de fotos stock y registro de licencias

- **Fuente elegida: Unsplash** (Unsplash License: uso comercial gratuito, sin atribución obligatoria; no se permite revender la foto sin modificarla ni sugerir respaldo de personas o marcas). **Alternativa: Pexels** (Pexels License, condiciones equivalentes). Las condiciones vigentes se verifican en el sitio de cada fuente al descargar; este documento no reemplaza esa lectura.
- Descarga: la hace el orquestador o una persona con aprobación, **no** se descargan imágenes de forma automática sin permiso (sin acciones externas).
- Ubicación: `src/assets/images/stock/<nombre-descriptivo>.jpg` (p. ej. `frutas-verduras-cajones.jpg`) para que `astro:assets` genere WebP/AVIF con dimensiones.
- Tamaño de origen: hero ≥ 1600×1200; categorías ≥ 960×600.
- **Registro obligatorio** en dos lugares:
  1. En el módulo de contenido, campo `credit` del `ImageAsset`: `{ source, author, url, license }`.
  2. En `docs/content-inventory.md` §4, una fila por imagen: archivo · fuente · autor · URL de la página de la foto · licencia · fecha de descarga · uso (slot) · `alt` usado (ID de copy-deck §6).
- Criterios de selección y exclusión: los de `docs/brand-strategy.md` §7 (sin marcas legibles, sin fachadas ni cartelería de otros supermercados, sin precios, sin delivery, sin personas presentadas como personal o clientes).
- `alt`: IDs IMG-* de `docs/copy-deck.md` §6. Nunca "nuestro local".
- Nota del footer GLB-FTR-IMG-NOTE ("Las fotografías del sitio son imágenes ilustrativas."): **se renderiza solo si existe al menos un slot en modo foto** (UX-10). Con ilustraciones no hace falta, porque nadie las confunde con fotos reales.
- Fotos reales del local (futuro): reemplazan el `src`, se cambia `credit.source` a "Propia", se reescribe el `alt` y se quita la nota del footer.

### 10.3 Especificación de ilustraciones SVG (100 % locales)

Estilo común: plano, formas redondeadas, sin texto dentro del SVG, sin contornos negros, paleta exclusiva (`verde`, `verde-oscuro`, `amarillo`, `crema`, `blanco`, `borde`). `aria-hidden="true"`, `focusable="false"`, `preserveAspectRatio="xMidYMid slice"` para el hero. Peso objetivo < 6 KB cada una.

- **`mercado` (hero, viewBox 0 0 640 520):** fondo `verde-oscuro` con un círculo grande `verde` desplazado (sensación de luz). En el tercio inferior, un **cajón de mercado**: rectángulo redondeado `amarillo` (radio 20) con 3 listones horizontales `blanco` a baja opacidad. Encima del cajón, una "montaña" de frutas y verduras geométricas: 4-5 círculos `verde` y `crema` (manzanas), 3 óvalos `amarillo` (limones), 2 hojas en `verde` con nervadura `crema`. Arriba a la derecha, un "cartel de góndola" rectangular `crema` **sin texto** con una franja `verde`. Pequeños destellos (círculos 6-10px `amarillo`).
- **`canasta`:** canasta trapezoidal `verde-oscuro` con asa en arco, rebosando con hoja `verde`, círculo `amarillo` y baguette ovalada `crema` con trazo `borde`.
- **`gondola`:** tres estantes `crema` sobre fondo `verde`; en cada estante, rectángulos y cilindros de distintas alturas en `blanco`, `amarillo` y `verde-oscuro` (envases genéricos, sin etiquetas).
- **`pin`:** fondo `crema` con trazos de calles en `borde` (líneas gruesas redondeadas, **no** un mapa real), un pin `verde-oscuro` con círculo interior `amarillo` en el centro. No representa la ubicación geográfica real y se usa solo como decoración.
- **Fondo de banda CTA (`hojas`):** 3-4 hojas grandes `verde` en las esquinas, recortadas por el borde de la banda, sin solaparse con el texto (contenido en un contenedor con `relative z-10`).
- **Gradiente cálido opcional del hero:** `radial-gradient(60% 50% at 85% 10%, rgb(245 200 76 / 0.25), transparent)` sobre `crema`. Solo mezcla crema y amarillo (sección 3.2: texto `tinta` / `verde-oscuro` sigue en AA).

### 10.4 Rendimiento

- `astro:assets` `<Image>` con `width`/`height` explícitos, `sizes` (hero: `(min-width: 1024px) 560px, 100vw`; categoría: `(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw`), formatos `avif`/`webp`.
- Hero: `loading="eager"` + `fetchpriority="high"`. Resto: `loading="lazy"` + `decoding="async"`.
- Las ilustraciones van inline (sin solicitudes extra). El iframe del mapa usa `loading="lazy"`.

---

## 11. Accesibilidad: checklist de diseño (REQ-010)

- Un `h1` por página; H2 por sección; H3 en tarjetas, beneficios y bloques. Sin saltos.
- Landmarks: `header`, `nav` (x2 con `aria-label` distintos: GLB-NAV-ARIA, GLB-FTR-NAV-ARIA), `main#contenido`, `footer`. Cada `section` con `aria-labelledby` hacia su H2.
- Skip link GLB-SKIP como primer foco.
- Foco visible 3px con offset en todo elemento interactivo; color según superficie (sección 6).
- Enlaces externos anuncian "(abre en una pestaña nueva)" (CTA-MAPS-ARIA o SYS-NEWTAB-SR) y muestran el ícono `external`.
- `aria-label` de CTA empieza con el texto visible (WCAG 2.5.3).
- Insignia "A confirmar" con texto visible + texto `sr-only` (CAT-BADGE-SR).
- Horarios y dirección en texto HTML; `<address>` para la dirección; `<dl>` para horarios.
- Orden de lectura = orden visual (no se usa `order-*` para invertir texto y visual en el hero: en el DOM el texto va primero).
- Zoom al 200 % y texto con espaciado aumentado: sin alturas fijas en contenedores de texto.
- Sin JS de cliente salvo el menú; todo el contenido es visible sin JS.

---

## 12. Lo que no existe en la interfaz (REQ-004, REQ-013, REQ-014, A-11)

No se diseñan ni se dejan huecos visuales para: email, WhatsApp (ni botón flotante), Instagram, Facebook, formularios, buscador, carrito, botones "Comprar"/"Agregar", precios, porcentajes, contadores, popups, modales, banners de cookies, indicador "abierto ahora", feriados, reseñas, estrellas o sellos. Si en el futuro se confirma un canal, se agrega un componente nuevo y se actualiza este documento.

---

## 13. Decisiones de diseño (ASSUMPTION, reversibles)

| ID | Decisión | Motivo | Reversión | REQ |
|---|---|---|---|---|
| UX-01 | `--color-*: initial` para restringir la paleta | Evita colores no medidos (SC-005) | Quitar la línea | REQ-010, REQ-016 |
| UX-02 | Token `borde` #E8DFCB, solo decorativo | Las tarjetas blancas sobre crema necesitan un borde sutil | Cambiar el hex | REQ-016 |
| UX-03 | Sin opacidad en textos; `verde` como texto solo ≥ 18px semibold; `crema` sobre `verde` prohibido | Márgenes de contraste mínimos (4.52 / 4.74) | Medir nuevas combinaciones antes de habilitarlas | REQ-010 |
| UX-04 | Hero en dos columnas, sin texto sobre la imagen | Contraste garantizado y funciona con o sin foto | Hero con foto de fondo + overlay `verde-oscuro` ≥ 85 % (requiere nueva medición) | REQ-010, REQ-012 |
| UX-05 | Ilustraciones SVG locales por defecto; fotos stock opcionales por slot | Sin internet garantizado; evita confusión con fotos del local | `image: ImageAsset` en el módulo | REQ-012, B-02 |
| UX-06 | Fuentes vía `@fontsource` (subset latin, 4 archivos) | Sin dependencia de terceros en runtime | Cambiar imports | REQ-012, REQ-016 |
| UX-07 | Breakpoints por defecto de Tailwind; escritorio desde `lg` | Menos configuración; 1440 cae en `xl` con contenedor fijo | Definir `--breakpoint-*` en `@theme` | REQ-011 |
| UX-08 | Tarjetas de categoría y beneficios no clicables y sin hover | No prometer páginas de detalle inexistentes | Convertir a enlaces si se crean subpáginas (fuera del MVP) | REQ-005, REQ-013 |
| UX-09 | Menú móvil como *disclosure*, sin trampa de foco | Patrón más simple y robusto; panel no modal | Diálogo modal (`<dialog>`) | REQ-010 |
| UX-10 | Nota de imágenes del footer solo si hay fotos stock | Con ilustraciones es innecesaria | Mostrarla siempre | REQ-012 |
| UX-11 | Sin mapa en Inicio S6; solo en Contacto (prop `showMap` en la sección para activarlo) | Un solo iframe de terceros; Inicio más liviano | `showMap=true` en Inicio | REQ-008, REQ-012 |
| UX-12 | Header sticky con "Cómo llegar" visible en todas las páginas | CTA principal a un toque en todo el sitio | Header estático | REQ-001 |
| UX-13 | Orden en Contacto: Dirección → Horarios → Teléfono → Mapa | Prioridad de las historias P1 (llegar, cuándo abre); sigue `brand-strategy` §5.4 | Reordenar los bloques | REQ-004 |

# Research — 001 Sitio Supermercado Los Álamos

No quedaron `NEEDS CLARIFICATION` en el Technical Context. Decisiones consolidadas:

## R-01 Salida y rutas
- **Decision**: Astro `output: 'static'` (default), rutas `/`, `/productos`, `/nosotros`, `/contacto`, `/404`.
- **Rationale**: sin lógica de servidor; A-01.
- **Alternatives**: rutas con slug largo (`/contacto-y-ubicacion`) — más largas en móvil, sin ganancia SEO real.

## R-02 Fuentes tipográficas
- **Decision**: no agregar `@fontsource` en esta iteración. `--font-display: "Plus Jakarta Sans", ui-sans-serif, system-ui, …` y `--font-sans: "Inter", ui-sans-serif, system-ui, …`.
- **Rationale**: instalar paquetes requiere acceso a npm (servicio externo) y CLAUDE.md exige permiso previo; la pila con fallback de sistema garantiza legibilidad y CLS bajo.
- **Alternatives**: Google Fonts CDN (petición a tercero en runtime, rechazado sin aprobación); `@fontsource` (recomendado por UX-06; queda como tarea opcional `T-OPT-FONTS` tras aprobación: `npm i @fontsource/plus-jakarta-sans @fontsource/inter` + imports en BaseLayout).

## R-03 Imágenes
- **Decision**: ilustraciones SVG inline propias (`mercado`, `canasta`, `gondola`, `pin`, `hojas`) + mosaicos de ícono; `image: null` en contenido.
- **Rationale**: B-02, constitución (no fotos ajenas como reales), sin descarga de terceros.
- **Alternatives**: Unsplash/Pexels con registro de licencia (UX-05; reversible cambiando `image` a `ImageAsset`).

## R-04 Mapa
- **Decision**: iframe `https://www.google.com/maps?q=<dirección>&output=embed`, `loading="lazy"`, `title`, figcaption con enlace siempre visible; prop `enabled`.
- **Rationale**: REQ-008/A-06, sin API key.
- **Alternatives**: OpenStreetMap embed (requiere coordenadas → dato no verificado; rechazado).

## R-05 Enlaces de acción
- **Decision**: `MAPS_URL = https://www.google.com/maps/search/?api=1&query=<encodeURIComponent(dirección completa)>`; `TEL_HREF = tel:+540000000000` derivado de `0000 00-0000`.
- **Rationale**: URL pública documentada de Google Maps; E.164 (A-09).

## R-06 Datos estructurados
- **Decision**: JSON-LD `GroceryStore` con `name` y `address` (PostalAddress) en `/` y `/contacto`.
- **Rationale**: constitución V; decisión del orquestador (B-03).

## R-07 JavaScript
- **Decision**: único script `is:inline` del menú móvil (disclosure), mejora progresiva.
- **Rationale**: REQ-012, design-system §7.2.

## R-08 Verificación
- **Decision**: `astro check`, `astro build`, `validate_content.py` ampliado con patrones del contrato C-03 aplicados también a `dist/`.
- **Rationale**: sin navegador garantizado; la auditoría estática cubre SC-003/SC-004.

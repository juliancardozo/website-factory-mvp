# Plan SEO local: Supermercado Los Álamos

> **Fuente de verdad:** `briefs/supermercado-los-alamos.md`. Requisitos: REQ-009 (SEO local), REQ-014 (sin servicios no confirmados), REQ-010 (un H1 por página). Constitución, principio V (SEO local honesto).
> **Copy:** los H1 y textos provienen de `docs/copy-deck.md` (IDs entre paréntesis).
> **Estados:** `VERIFIED` · `BRIEF-VALIDAR` · `ASSUMPTION` · `PLACEHOLDER` · `BLOCKED` (ver `docs/requirements.md`).

---

## 1. Decisiones globales

| Elemento | Valor | Estado / motivo |
|---|---|---|
| `<html lang>` | `es-AR` | ASSUMPTION (A-07) |
| `<meta charset>` / `viewport` | `utf-8` / `width=device-width, initial-scale=1` | Estándar |
| `canonical` | **Omitido** | PENDIENTE: no hay dominio confirmado (B-05) |
| `og:url` | **Omitido** | PENDIENTE (B-05) |
| `og:type` | `website` | ASSUMPTION |
| `og:locale` | `es_AR` | ASSUMPTION |
| `og:site_name` | `Supermercado Los Álamos` | VERIFIED (L5) |
| `og:image` | **Omitido en la vista previa** | ASSUMPTION: Open Graph requiere URL absoluta y no hay dominio. Se agrega con una imagen con licencia (1200×630) cuando exista dominio. |
| `robots` | Sin meta `robots` (indexable por defecto) | ASSUMPTION. El sitio no se publica en el MVP; si se publica un preview en una URL temporal, usar `noindex`. |
| `sitemap.xml` / `robots.txt` con URL absoluta | **No generar** | PENDIENTE (B-05) |
| Twitter/X cards | No necesarias; Open Graph alcanza | ASSUMPTION |
| Separador de títulos | ` \| ` | ASSUMPTION |

---

## 2. Metadatos por página

Conteo de caracteres con espacios. Titles de 60 o menos; descriptions de 140 a 160.

### 2.1 Inicio (`/`)

| Campo | Valor | Car. | Estado |
|---|---|---|---|
| `<title>` | Supermercado Los Álamos \| Tu súper de cercanía en Villa Ejemplo | 58 | VERIFIED (contenido) / ASSUMPTION (redacción) |
| `meta description` | Supermercado Los Álamos: tu supermercado de cercanía en Calle Ejemplo 123, Villa Ejemplo. Alimentos, bebidas, almacén, frescos y limpieza. Horarios y cómo llegar. | 156 | VERIFIED (L9-10, L17-21, L143) |
| H1 (HOME-S1-H1) | Tu supermercado de cercanía en Villa Ejemplo | 42 | VERIFIED |
| `og:title` | Supermercado Los Álamos: tu súper de cercanía en Villa Ejemplo | 56 | ASSUMPTION |
| `og:description` | Alimentos, bebidas, almacén, frescos y limpieza en Calle Ejemplo 123, Villa Ejemplo. Mirá horarios y cómo llegar. | 111 | VERIFIED |
| JSON-LD | Sí (sección 4) | — | ASSUMPTION (ubicación) |

**Keywords objetivo:** principal "supermercado Villa Ejemplo"; secundarias "supermercado de cercanía Villa Ejemplo", "supermercado Calle Ejemplo Villa Ejemplo" y "supermercado cerca de Pueblo Vecino" (solo en el cuerpo, HOME-S2-P1, como público).

### 2.2 Productos (`/productos`)

| Campo | Valor | Car. | Estado |
|---|---|---|---|
| `<title>` | Productos y categorías \| Supermercado Los Álamos, Villa Ejemplo | 57 | ASSUMPTION (redacción) |
| `meta description` | Categorías de Supermercado Los Álamos en Villa Ejemplo: alimentos y bebidas, almacén, productos frescos, limpieza y artículos para el hogar. Visitanos en el local. | 157 | VERIFIED (L17-21) |
| H1 (PROD-S1-H1) | Productos para tus compras de todos los días | 44 | VERIFIED / ASSUMPTION |
| `og:title` | Productos \| Supermercado Los Álamos, Villa Ejemplo | 44 | ASSUMPTION |
| `og:description` | Alimentos y bebidas, almacén, frescos, limpieza y artículos para el hogar en un supermercado de cercanía en Villa Ejemplo. | 119 | VERIFIED |

**Keywords objetivo:** "productos de almacén Villa Ejemplo", "productos frescos Villa Ejemplo", "artículos de limpieza Villa Ejemplo", "supermercado Villa Ejemplo categorías".
**Regla:** la description y el `og:description` **no** mencionan Carnicería ni Verdulería mientras sigan como ASSUMPTION (A-04). Tampoco hablan de ofertas (BLOCKED).

### 2.3 Nosotros (`/nosotros`)

| Campo | Valor | Car. | Estado |
|---|---|---|---|
| `<title>` | Nosotros \| Supermercado Los Álamos, Villa Ejemplo | 43 | ASSUMPTION |
| `meta description` | Supermercado Los Álamos es un supermercado de cercanía en Villa Ejemplo, pensado para las compras cotidianas de familias y vecinos, con variedad y atención cercana. | 158 | VERIFIED (L9-14) |
| H1 (ABOUT-S1-H1) | Somos Supermercado Los Álamos | 25 | VERIFIED |
| `og:title` | Nosotros \| Supermercado Los Álamos | 30 | ASSUMPTION |
| `og:description` | Un supermercado de cercanía en Villa Ejemplo, con variedad, frescura y atención cercana. | 86 | VERIFIED |

**Keywords objetivo:** "Supermercado Los Álamos", "supermercado de barrio Villa Ejemplo", "comercio local Villa Ejemplo".

### 2.4 Contacto y ubicación (`/contacto`)

| Campo | Valor | Car. | Estado |
|---|---|---|---|
| `<title>` | Contacto y ubicación \| Supermercado Los Álamos, Villa Ejemplo | 55 | ASSUMPTION |
| `meta description` | Supermercado Los Álamos: Calle Ejemplo 123, Villa Ejemplo. Teléfono 0000 00-0000. Lunes a sábado de 07:30 a 21:00; domingo cerrado. Mapa y cómo llegar. | 146 | VERIFIED (dirección) / BRIEF-VALIDAR (tel. y horario) |
| H1 (CONT-S1-H1) | Contacto y ubicación | 20 | VERIFIED |
| `og:title` | Contacto y ubicación \| Supermercado Los Álamos | 42 | ASSUMPTION |
| `og:description` | Calle Ejemplo 123, Villa Ejemplo. Lunes a sábado de 07:30 a 21:00. Teléfono 0000 00-0000. | 89 | BRIEF-VALIDAR |
| JSON-LD | Sí (sección 4) | — | ASSUMPTION |

**Keywords objetivo:** "horario supermercado Villa Ejemplo", "supermercado Calle Ejemplo 123", "teléfono Supermercado Los Álamos", "cómo llegar Supermercado Los Álamos".
**Description alternativa** (si el teléfono o el horario no se validan antes de producción): `Encontrá Supermercado Los Álamos en Calle Ejemplo 123, B0000 Villa Ejemplo, Provincia de Buenos Aires. Dirección, mapa y cómo llegar a tu supermercado de cercanía.` (152 car.).

---

## 3. Pautas de contenido on-page

- **Un H1 por página** (REQ-010), sin saltos de nivel: H1 → H2 por sección → H3 en tarjetas o ítems.
- "Villa Ejemplo" aparece de forma natural en el H1 o la bajada de Inicio, en el cuerpo de cada página y en la dirección del footer. Sin repeticiones forzadas ni listas de localidades (sin keyword stuffing).
- "Pueblo Vecino" aparece una o dos veces en todo el sitio (HOME-S2-P1, ABOUT-S1-P2-ALT) y siempre como público ("vecinos de..."), nunca como zona de reparto ni como sede.
- Dirección en `<address>` y en texto plano, igual en todas las páginas (consistencia NAP: nombre, dirección, teléfono).
- Horarios en texto HTML, no en imágenes (REQ-003).
- Textos de enlace descriptivos ("Cómo llegar", "Ver productos"); nunca "clic acá".
- Prohibido en metadatos y cuerpo: delivery, envíos, compra online, WhatsApp, precios, ofertas concretas, "el mejor", "los más baratos", años de trayectoria y reseñas (REQ-014, SC-003).
- Imágenes: nombres de archivo descriptivos (p. ej. `frutas-verduras-cajones.webp`), `alt` según la sección 6 del copy deck, dimensiones declaradas (REQ-012).

---

## 4. Datos estructurados (JSON-LD)

**Decisión del orquestador:** `GroceryStore` solo con `name` y `address`. `telephone` y `openingHoursSpecification` se agregan **solo después de validarlos** con el comercio (B-03). Esto sustituye la versión amplia de A-08 en `docs/requirements.md`.

Ubicación: Inicio y Contacto y ubicación (ASSUMPTION; también es válido incluirlo en el layout global). Se genera desde el módulo de contenido, sin duplicar datos (REQ-015).

```json
{
  "@context": "https://schema.org",
  "@type": "GroceryStore",
  "name": "Supermercado Los Álamos",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Ejemplo 123",
    "postalCode": "B0000",
    "addressLocality": "Villa Ejemplo",
    "addressRegion": "Provincia de Buenos Aires",
    "addressCountry": "AR"
  }
}
```

**Prohibido** hasta tener el dato confirmado: `url`, `@id` con dominio, `image` absoluta, `geo` (no hay coordenadas), `telephone`, `openingHoursSpecification`, `priceRange`, `aggregateRating`, `review`, `sameAs`, `paymentAccepted`, `hasOfferCatalog`, `areaServed` (podría leerse como zona de servicio).

**Ampliación posterior** (solo con validación, referencia para el futuro):
- `"telephone": "+54 0000 00-0000"`
- `"openingHoursSpecification": [{ "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], "opens": "07:30", "closes": "21:00" }]`
- `"url"` cuando exista dominio.

---

## 5. Checklist SEO pre-producción (no ejecutar sin aprobación del orquestador)

- [ ] **Dominio confirmado** → agregar `canonical` por página, `og:url`, `og:image` absoluta (1200×630, con licencia) y `url` en JSON-LD.
- [ ] **Sitemap** → habilitar `@astrojs/sitemap` con `site` configurado y `robots.txt` con la URL del sitemap.
- [ ] **Teléfono y horarios validados** → agregar `telephone` y `openingHoursSpecification` al JSON-LD. Si no se validan, usar la description alternativa de Contacto.
- [ ] **Carnicería y Verdulería** → si se confirman, evaluar sumarlas a la description de Productos (vigilar el límite de 160 caracteres). Si se retiran, verificar que no queden en el HTML.
- [ ] **Ofertas** → mantener el estado vacío o cargar ofertas confirmadas. No incluir precios en metadatos.
- [ ] **Consistencia NAP** → nombre, dirección y teléfono idénticos en el sitio, el JSON-LD y los perfiles externos.
- [ ] **Google Business Profile (recomendación, no acción):** sugerir al comercio que reclame o verifique su ficha con los mismos datos NAP y horarios, y que la vincule al dominio cuando exista. No se crea ni se edita ninguna ficha desde este proyecto.
- [ ] **Validación técnica** (cuando haya URL pública y aprobación): Rich Results Test de Google para el JSON-LD y Lighthouse SEO. No reportar resultados que no se hayan ejecutado.
- [ ] Quitar `GLB-FTR-IMG-NOTE` y actualizar los `alt` al incorporar fotos reales del local.
- [ ] Verificar la ausencia de `noindex` en la versión de producción.

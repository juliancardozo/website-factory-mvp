# Data Model — 001 Sitio Supermercado Los Álamos

Fuente de tipos: `docs/design-system.md` §7.0. Todo vive en `src/content/` (REQ-015, SC-007).

| Entidad | Campos | Validación / reglas | Estado de datos |
|---|---|---|---|
| `Business` | `name`, `category`, `positioning`, `address: Address`, `phone: Phone` | `name = "Supermercado Los Álamos"` | VERIFIED |
| `Address` | `street "Calle Ejemplo 123"`, `postalCode "B0000"`, `locality "Villa Ejemplo"`, `region "Provincia de Buenos Aires"`, `country "Argentina"`, `countryCode "AR"`; derivados `full`, `short` | única fuente para MAPS_URL, iframe, JSON-LD | VERIFIED |
| `Phone` | `display "0000 00-0000"`, `e164 "+540000000000"`; derivado `href` | `href` siempre `tel:` + e164 | BRIEF-VALIDAR |
| `OpeningHours[]` | `{ days, value, closed }` → `Lunes a sábado / 07:30 a 21:00 / false`, `Domingo / Cerrado / true` | sin feriados ni "abierto ahora" | BRIEF-VALIDAR |
| `Category[]` | `id`, `title`, `descShort`, `descLong`, `icon`, `status: confirmed\|pending`, `visible`, `image: null` | 6 ítems; `carn`, `verd` = `pending`; sin marcas/precios | VERIFIED / ASSUMPTION |
| `Offer[]` | `title`, `description`, `validity` (sin precio) | lista vacía `[]` | BLOCKED |
| `PendingChannel[]` | `type: email\|whatsapp\|instagram\|facebook`, `value: null` | nunca se renderiza mientras `null` | PLACEHOLDER |
| `NavItem[]` | `href`, `label` | 4 ítems | ASSUMPTION (A-01) |
| `PageSeo` | `title`, `description`, `ogTitle`, `ogDescription`, `jsonLd: boolean` | title ≤ 60, description 140-160; sin url | ver seo-plan |

## Transiciones de estado
- `Category.status`: `pending` → `confirmed` (quita insignia) o `visible: false` (retira).
- `Offer[]`: `[]` (estado vacío) → `[offer…]` (grilla de `OfferCard`) sin cambiar componentes.
- `Phone`/`OpeningHours` validados → agregar `telephone`/`openingHoursSpecification` al builder JSON-LD.
- `PendingChannel.value`: `null` → valor real habilita su render (fuera del MVP).

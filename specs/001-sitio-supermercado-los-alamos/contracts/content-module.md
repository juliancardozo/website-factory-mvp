# C-01 Contrato del módulo de contenido

- `src/content/site.ts` exporta: `business`, `address`, `phone`, `hours`, `categories`, `offers`, `pendingChannels`, `navItems`, `MAPS_URL`, `TEL_HREF`, `MAP_EMBED_URL`.
- `src/content/copy.ts` exporta los textos por ID de `docs/copy-deck.md` (sin datos comerciales duplicados: interpolan `phone.display`, `address.*`).
- `src/content/seo.ts` exporta `pageSeo: Record<'home'|'productos'|'nosotros'|'contacto'|'404', PageSeo>` y `buildJsonLd()`.
- Invariantes:
  1. Dirección, teléfono y horarios aparecen literalmente **una sola vez** en `src/` (en `site.ts`).
  2. Ningún componente contiene strings con dirección, teléfono u horarios.
  3. `offers` no tiene campo de precio; `pendingChannels[*].value === null`.
  4. `buildJsonLd()` produce solo `@context`, `@type: GroceryStore`, `name`, `address`.

# C-03 Auditoría del HTML generado (dist/)

Patrones que MUST NOT aparecer en `dist/**/*.html` (insensible a mayúsculas salvo nota):
- Precios / descuentos: `\$\s?\d`, `\d+\s?%\s?(off|de descuento)`, `2x1`, `3x2`
- Servicios no confirmados: `delivery`, `envío a domicilio`, `envios a domicilio`, `compr[aá] online`, `tienda online`
- Canales pendientes: `wa.me`, `whatsapp`, `instagram.com`, `facebook.com`, `mailto:`
- Ecommerce/formularios: `<form`, `carrito`, `checkout`, `agregar al carrito`
- SEO ficticio: `rel="canonical"`, `og:url`, `example.com`, `aggregateRating`, `"review"`
- Trayectoria inventada: `desde 19\d\d`, `desde 20\d\d`, `años de (experiencia|trayectoria)`

Patrones que MUST aparecer:
- `tel:+540000000000` en `/`, `/contacto` y footer.
- `google.com/maps` en todas las páginas (header).
- `lang="es-AR"` en todas las páginas.

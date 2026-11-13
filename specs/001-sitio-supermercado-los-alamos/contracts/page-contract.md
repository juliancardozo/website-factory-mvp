# C-02 Contrato de páginas

Cada página generada en `dist/` MUST:
- `<html lang="es-AR">`, un único `<h1>`, landmarks `header`, `nav[aria-label]`, `main#contenido`, `footer`.
- `<title>` y `<meta name="description">` únicos (seo-plan); `og:title`, `og:description`, `og:type=website`, `og:locale=es_AR`.
- NO `rel="canonical"`, NO `og:url`, NO `og:image`, NO URLs absolutas propias.
- Skip link como primer enfocable; `aria-current="page"` en el ítem de nav actual.
- Enlaces externos: `target="_blank" rel="noopener noreferrer"` + aviso accesible "abre en una pestaña nueva".

Por página:
| Ruta | Requisitos visibles | CTA |
|---|---|---|
| `/` | hero, cercanía, categorías compactas (6, 2 con "A confirmar"), beneficios (4), ofertas vacío, `#horarios` + dirección, CtaBand; JSON-LD | Cómo llegar ×≥3, Llamar, Ver productos, Consultar horarios |
| `/productos` | categorías completas, nota de consulta, ofertas vacío | Cómo llegar, Llamar |
| `/nosotros` | solo hechos del brief, beneficios | Cómo llegar |
| `/contacto` | dirección, `#horarios`, teléfono, `#mapa` (iframe lazy + fallback); JSON-LD | Cómo llegar, Llamar |
| `/404` | mensaje + enlaces a páginas | Volver al inicio |

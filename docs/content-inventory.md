# Inventario de contenido — Supermercado Los Álamos

> Fuente primaria: `briefs/supermercado-los-alamos.md` (`L<n>` = línea del brief). Requisitos: `docs/requirements.md`.
>
> **Estados**
> - `VERIFIED` = declarado en el brief (no auditado externamente).
> - `BRIEF (validar antes de producción)` = está en el brief, pero el propio brief exige validarlo (L159-160).
> - `ASSUMPTION` = default reversible elegido en modo autónomo o categoría a validar.
> - `PLACEHOLDER` / `PENDIENTE` = dato faltante; no se inventa ni se publica dato de ejemplo.
> - `BLOCKED` = no se publica contenido hasta confirmación del comercio.

## 1. Identidad y negocio

| Dato | Valor | Estado | Fuente | Uso |
|---|---|---|---|---|
| Nombre comercial | Supermercado Los Álamos | VERIFIED | L5 | Header, title, JSON-LD |
| Rubro | Supermercado minorista y alimentos | VERIFIED | L6 | Meta description, JSON-LD (`GroceryStore`) |
| Posicionamiento | Supermercado de cercanía para las compras cotidianas de familias y vecinos de Villa Ejemplo | VERIFIED | L9-10 | Hero, Nosotros |
| Atributos a destacar | Variedad de productos, frescura, atención cercana, comodidad de comprar en un comercio local | VERIFIED (mensaje, no métrica) | L12-14 | Beneficios, Nosotros |
| Público / zona | Familias, vecinos y consumidores de Villa Ejemplo, Pueblo Vecino y localidades cercanas | VERIFIED | L29-30 | Copy SEO local (como público, no zona de envío) |
| Año de fundación / trayectoria | — | PENDIENTE (no inventar) | L165 | No se muestra |
| Dueños / equipo | — | PENDIENTE (no inventar) | L164-165 | No se muestra |
| Testimonios, clientes, premios, certificaciones | — | No aplica / prohibido | L164-165 | No se muestra |
| Razón social / CUIT / datos legales | — | PENDIENTE | — | No se muestra |
| Logo oficial | No provisto | PLACEHOLDER | — | Logotipo textual tipográfico (A-03) |

## 2. Contacto y ubicación

| Dato | Valor | Estado | Fuente | Uso |
|---|---|---|---|---|
| Dirección | Calle Ejemplo 123, B0000 Villa Ejemplo, Provincia de Buenos Aires, Argentina | VERIFIED | L7, L143-145 | Contacto, footer, JSON-LD, enlace Maps |
| Código postal | B0000 | VERIFIED | L144 | Dirección, JSON-LD |
| Enlace "Cómo llegar" | `https://www.google.com/maps/search/?api=1&query=Calle+Ejemplo+123,+B0000+Villa+Ejemplo,+Provincia+de+Buenos+Aires,+Argentina` | ASSUMPTION (derivado de la dirección VERIFIED) | L127, L143-145 | CTA principal |
| Mapa embebido | iframe Google Maps por query de dirección, lazy, sin API key | ASSUMPTION (A-06) | L126 | Contacto, Inicio S6 |
| Coordenadas geo | — | PENDIENTE (no inventar) | — | No se incluye en JSON-LD |
| Teléfono (visible) | 0000 00-0000 | BRIEF (validar antes de producción) | L147-148, L159 | Contacto, footer, CTA Llamar |
| Teléfono (`tel:`) | `tel:+540000000000` | BRIEF (validar) + ASSUMPTION de formato (A-09) | L148 | CTA Llamar |
| Horario lunes a sábado | 07:30 a 21:00 | BRIEF (validar antes de producción) | L151, L159-160 | Inicio S6, Contacto, footer, JSON-LD |
| Horario domingo | Cerrado | BRIEF (validar antes de producción) | L152, L159-160 | Ídem |
| Horario feriados | — | PENDIENTE | — | No se menciona |
| Email | — | PENDIENTE / PLACEHOLDER | L154 | No se renderiza |
| WhatsApp | — | PENDIENTE / PLACEHOLDER | L155 | No se renderiza; sin `wa.me` |
| Instagram | — | PENDIENTE / PLACEHOLDER | L156 | No se renderiza |
| Facebook | — | PENDIENTE / PLACEHOLDER | L157 | No se renderiza |
| Dominio / URL pública | — | PENDIENTE | — | Sin canonical, og:url, sitemap absoluto ni `url` en JSON-LD |

## 3. Servicios y categorías

| Categoría / servicio | Estado | Fuente | Uso |
|---|---|---|---|
| Alimentos y bebidas (venta minorista) | VERIFIED | L17 | Tarjeta de categoría |
| Almacén y consumo cotidiano | VERIFIED | L18 | Tarjeta de categoría |
| Productos frescos | VERIFIED | L19 | Tarjeta de categoría |
| Carnicería | ASSUMPTION (categoría a validar) | L20 | Tarjeta con flag "A confirmar" en preview (A-04) |
| Verdulería | ASSUMPTION (categoría a validar) | L20 | Tarjeta con flag "A confirmar" en preview (A-04) |
| Limpieza y artículos para el hogar | VERIFIED | L21 | Tarjeta de categoría |
| Ofertas y promociones | BLOCKED (sujetas a confirmación) | L22, L166 | Estado vacío honesto |
| Marcas / productos específicos / precios | Prohibido sin dato | L166-167 | No se muestran |
| Delivery / envío a domicilio | No confirmado — no afirmar | L24-25 | No se menciona |
| Compra online / ecommerce | Fuera de alcance | L24, L52, L174 | No se implementa |
| Pedidos por WhatsApp | No confirmado — no afirmar | L25 | No se menciona |
| Medios de pago, estacionamiento, otros servicios | PENDIENTE (no están en el brief) | L169 | No se mencionan |

## 4. Visual

| Elemento | Valor | Estado | Fuente |
|---|---|---|---|
| Paleta | Verde fresco #27834B · Verde oscuro #185C38 · Crema #FFF9ED · Blanco #FFFFFF · Amarillo cálido #F5C84C · Gris oscuro #27332D | VERIFIED como **propuesta**, no identidad oficial | L91-100 |
| Tipografía títulos | Plus Jakarta Sans | VERIFIED como propuesta | L103 |
| Tipografía textos | Inter | VERIFIED como propuesta | L104 |
| Estilo | Moderno, cálido, comercial, familiar; fondo claro, acentos verdes, tarjetas redondeadas, íconos simples | VERIFIED (dirección de diseño) | L81, L106-112 |
| Fotos reales del local | No provistas | PLACEHOLDER | L170-173 |
| Imagen hero | Stock con licencia (p. ej. Unsplash/Pexels, licencia registrada por imagen) o ilustración; no presentada como el local | ASSUMPTION (A-02) | L71, L107, L170-173 |
| Imágenes de categorías | Stock con licencia o íconos/ilustraciones simples | ASSUMPTION (A-02) | L107, L110 |
| Registro de licencias | Tabla a completar por frontend: archivo, origen, autor, licencia | PENDIENTE (implementación) | L172-173 |

### 4.1 Registro de imágenes implementadas (MVP, T039)

No se usa ninguna fotografía ni recurso gráfico de terceros. Todas las piezas son SVG inline creados para este proyecto, decorativos (`aria-hidden="true"`, `focusable="false"`), sin texto y con la paleta propuesta. No requieren licencia externa ni atribución. Nota de imágenes del footer (GLB-FTR-IMG-NOTE) desactivada porque no hay fotos (UX-10).

| Archivo / pieza | Tipo | Origen | Licencia | Uso (slot) | `alt` | Estado |
|---|---|---|---|---|---|---|
| `src/components/Illustration.astro` → `mercado` | Ilustración SVG inline | Propia (frontend-engineer, 2026-11-12) | Propia del proyecto | Hero de Inicio (`heroImage: null`) | Decorativa (`aria-hidden`) | ASSUMPTION (UX-05) |
| `Illustration` → `canasta` | Ilustración SVG inline | Propia | Propia del proyecto | Hero de Productos, estado vacío de ofertas, 404 | Decorativa | ASSUMPTION |
| `Illustration` → `gondola` | Ilustración SVG inline | Propia | Propia del proyecto | Hero de Nosotros | Decorativa | ASSUMPTION |
| `Illustration` → `pin` | Ilustración SVG inline (calles genéricas, no es un mapa real) | Propia | Propia del proyecto | Hero de Contacto; fondo del mapa embebido | Decorativa | ASSUMPTION |
| `Illustration` → `hojas` | Fondo SVG inline | Propia | Propia del proyecto | Banda CTA (`CtaBand`) | Decorativa | ASSUMPTION |
| `src/components/icons/paths.ts` (17 íconos) | Set de íconos SVG 24×24, trazo 2 | Propio (formas geométricas simples, no copiado de Lucide ni de otro set) | Propia del proyecto | Botones, beneficios, categorías, tarjetas de datos | Decorativos (`aria-hidden`); el texto visible nombra la acción | ASSUMPTION |
| Mosaicos ilustrados de categoría (`CategoryCard` `full`) | Composición CSS/SVG (círculos y hoja) + ícono | Propio | Propia del proyecto | Tarjetas de `/productos` (`image: null`) | Decorativos | ASSUMPTION |
| Wordmark (hoja + punto) | SVG/HTML inline | Propio | Propia del proyecto | Header y footer | Decorativos; enlace con `aria-label` GLB-HDR-LOGO-ARIA | PLACEHOLDER (no es logo oficial, A-03) |
| `public/favicon.svg` | Monograma "F" | Propio | Propia del proyecto | Favicon | — | PLACEHOLDER (no es logo oficial) |
| Fotografías stock o del local | — | — | — | Ninguna en el MVP | — | PENDIENTE: si se agregan, registrar aquí archivo, fuente, autor, URL, licencia, fecha, slot y `alt` (design-system §10.2) |

Regla de `alt`: describir lo que muestra la imagen ("Góndola con frutas y verduras frescas"), nunca "Nuestro local" ni "Interior de Supermercado Los Álamos" mientras no sean fotos reales.

## 5. Copy base por página

Todo el copy se limita a lo que el brief permite. Redacción sugerida (ASSUMPTION de tono: voseo rioplatense, A-07); `content-seo-specialist` puede refinar sin agregar hechos.

### 5.1 Inicio

| Sección | Texto base | Estado | Fuente |
|---|---|---|---|
| S1 Hero — título | Tu supermercado de cercanía en Villa Ejemplo | VERIFIED (reformulación) | L9-10 |
| S1 Hero — bajada | Todo para las compras de todos los días, cerca de casa, en Calle Ejemplo 123. | VERIFIED (reformulación) | L9-10, L143 |
| S1 CTA | "Cómo llegar" (primario) · "Llamar al supermercado" (secundario) | VERIFIED | L56, L61 |
| S2 Mensaje de cercanía | Somos un supermercado de cercanía pensado para las compras cotidianas de las familias y vecinos de Villa Ejemplo. Te esperamos con variedad de productos, frescura y atención cercana. | VERIFIED (reformulación) | L9-14 |
| S3 Categorías — título | Nuestras categorías principales | VERIFIED | L47, L73 |
| S3 CTA | "Ver productos" | VERIFIED | L59 |
| S4 Beneficios | Variedad de productos · Productos frescos · Atención cercana · La comodidad de comprar en un comercio local (descripciones breves sin cifras ni superlativos comparativos) | VERIFIED (A-10) | L12-14 |
| S5 Ofertas — título | Ofertas destacadas | VERIFIED (espacio) | L75 |
| S5 Ofertas — estado vacío | Muy pronto vas a encontrar acá nuestras ofertas. Para conocer las promociones vigentes, acercate al local o llamanos al 0000 00-0000. | BLOCKED (contenido de ofertas) / texto ASSUMPTION | L22, L49, L166 |
| S6 Ubicación y horarios | Dirección + "Lunes a sábado: 07:30 a 21:00" + "Domingo: cerrado" + "Cómo llegar" | VERIFIED / BRIEF (validar) | L143-152 |
| S7 CTA final | Te esperamos en Calle Ejemplo 123, Villa Ejemplo. · "Cómo llegar" · "Llamar" | VERIFIED (reformulación) | L77, L143 |

### 5.2 Productos

| Elemento | Texto base | Estado | Fuente |
|---|---|---|---|
| H1 | Productos | VERIFIED | L66 |
| Intro | Encontrá lo que necesitás para tus compras cotidianas: alimentos, bebidas, almacén, productos frescos, limpieza y artículos para el hogar. | VERIFIED (reformulación) | L17-21 |
| Tarjetas | Ver sección 3 (descripción genérica de la categoría, sin marcas ni precios) | VERIFIED / ASSUMPTION | L17-21 |
| Ofertas | Mismo estado vacío que S5 | BLOCKED | L22 |
| Nota | No hay catálogo ni stock en línea; la disponibilidad se consulta en el local o por teléfono | ASSUMPTION (texto) | L52, L61 |

### 5.3 Nosotros

| Elemento | Texto base | Estado | Fuente |
|---|---|---|---|
| H1 | Nosotros | VERIFIED | L67 |
| Párrafo 1 | Supermercado Los Álamos es un supermercado de cercanía en Villa Ejemplo, orientado a las compras cotidianas de familias y vecinos. | VERIFIED | L5, L9-10 |
| Párrafo 2 | Queremos que hacer las compras sea simple y cómodo: variedad de productos, frescura y una atención cercana, en un comercio local. | VERIFIED (reformulación) | L12-14 |
| Párrafo 3 | Nos encontrás en Calle Ejemplo 123, Villa Ejemplo, de lunes a sábado de 07:30 a 21:00. | VERIFIED / BRIEF (validar) | L143, L151 |
| Excluido | Año de fundación, historia, trayectoria, cantidad de empleados/clientes, premios, testimonios, fotos del equipo | Prohibido sin dato | L164-165 |

### 5.4 Contacto y ubicación

| Elemento | Texto base | Estado | Fuente |
|---|---|---|---|
| H1 | Contacto y ubicación | VERIFIED | L68 |
| Dirección | Calle Ejemplo 123, B0000 Villa Ejemplo, Provincia de Buenos Aires, Argentina | VERIFIED | L143-145 |
| Teléfono | 0000 00-0000 (`tel:+540000000000`) | BRIEF (validar) | L148 |
| Horarios | Lunes a sábado: 07:30 a 21:00 · Domingo: cerrado | BRIEF (validar) | L151-152 |
| Mapa + "Cómo llegar" | Ver sección 2 | ASSUMPTION (A-06) | L126-127 |
| Email / WhatsApp / redes | No se muestran | PENDIENTE | L154-157 |
| Formulario | No existe | Fuera de alcance | L139, L175 |

## 6. Metadatos SEO (borrador)

| Página | `<title>` | Meta description | Estado |
|---|---|---|---|
| Inicio | Supermercado Los Álamos · Supermercado de cercanía en Villa Ejemplo | Supermercado de cercanía en Calle Ejemplo 123, Villa Ejemplo. Alimentos, bebidas, almacén, frescos y limpieza. Horarios y cómo llegar. | VERIFIED (contenido) / ASSUMPTION (redacción) |
| Productos | Productos · Supermercado Los Álamos, Villa Ejemplo | Categorías de Supermercado Los Álamos en Villa Ejemplo: alimentos y bebidas, almacén, productos frescos, limpieza y artículos para el hogar. | Ídem |
| Nosotros | Nosotros · Supermercado Los Álamos, Villa Ejemplo | Supermercado de cercanía para las compras cotidianas de familias y vecinos de Villa Ejemplo, con atención cercana. | Ídem |
| Contacto | Contacto y ubicación · Supermercado Los Álamos, Villa Ejemplo | Calle Ejemplo 123, Villa Ejemplo. Teléfono 0000 00-0000. Lunes a sábado de 07:30 a 21:00. Cómo llegar. | Ídem + BRIEF (validar) |

Las descripciones de Productos no deben incluir Carnicería/Verdulería mientras sigan como ASSUMPTION.

| Metadato | Valor | Estado |
|---|---|---|
| `lang` | `es-AR` | ASSUMPTION (A-07) |
| `og:locale` | `es_AR` | ASSUMPTION |
| `og:url`, `canonical` | Omitidos | PENDIENTE (sin dominio) |
| `og:image` | Ruta relativa a imagen con licencia, o se omite | ASSUMPTION |
| JSON-LD | `GroceryStore`: solo name y address; telephone y openingHoursSpecification se agregan tras validar (B-03); sin url, geo, priceRange, rating, review, sameAs | ASSUMPTION (A-08, estricta) |

## 7. Resumen por estado

| Estado | Datos |
|---|---|
| VERIFIED | Nombre, rubro, dirección, CP, posicionamiento, atributos a destacar, público/zona, categorías (alimentos y bebidas, almacén, frescos, limpieza/hogar), CTA, páginas y secciones, paleta/tipografías como propuesta |
| BRIEF (validar antes de producción) | Teléfono 0000 00-0000, horario L-S 07:30-21:00, domingo cerrado |
| ASSUMPTION | Carnicería, verdulería, formato `tel:`, enlace/embebido Maps, rutas, `lang`, JSON-LD, imágenes stock/ilustración, logo textual, redacción de copy |
| PLACEHOLDER / PENDIENTE | Email, WhatsApp, Instagram, Facebook, dominio/URL pública, logo oficial, fotos reales del local, coordenadas, feriados, datos legales, trayectoria |
| BLOCKED | Ofertas y promociones |

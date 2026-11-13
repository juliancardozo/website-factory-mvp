# Feature Specification: Sitio institucional Supermercado Los Álamos

**Feature Branch**: `001-sitio-supermercado-los-alamos`

**Created**: 2026-11-12

**Status**: Draft

**Input**: User description: "Sitio institucional de Supermercado Los Álamos (supermercado de cercanía en Calle Ejemplo 123, Villa Ejemplo, Buenos Aires). 4 páginas: Inicio, Productos, Nosotros, Contacto y ubicación. CTA principal 'Cómo llegar'; secundarios Ver productos, Consultar horarios, Llamar. Sin ecommerce, carrito, formularios, delivery ni WhatsApp. SEO local honesto, accesible, mobile-first, imágenes con licencia nunca presentadas como fotos del local. Mantener REQ-IDs."

**Fuentes y trazabilidad**: `briefs/supermercado-los-alamos.md` (fuente de verdad), `docs/requirements.md`
(REQ-001..REQ-018, supuestos A-01..A-11, bloqueos B-01..B-08), `docs/content-inventory.md`
(estados VERIFIED / BRIEF-VALIDAR / ASSUMPTION / PLACEHOLDER / BLOCKED). Cada FR indica su REQ.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Saber cómo llegar y cuándo está abierto (Priority: P1)

Un vecino de Villa Ejemplo o alrededores busca el supermercado en el celular para saber dónde queda y
a qué hora abre, y decide ir.

**Why this priority**: es el objetivo comercial principal del brief (incrementar visitas) y el CTA
principal "Cómo llegar".

**Independent Test**: abrir Inicio en un celular, ver dirección y horarios sin desplazarse más que
hasta la sección de ubicación, activar "Cómo llegar" y comprobar que abre el mapa con la dirección
exacta.

**Acceptance Scenarios**:

1. **Given** un visitante en Inicio, **When** ve la primera pantalla, **Then** encuentra el nombre
   del comercio, un mensaje de cercanía y el botón "Cómo llegar". (REQ-001)
2. **Given** el visitante activa "Cómo llegar" desde cualquier ubicación del sitio, **When** se abre
   el destino, **Then** es un mapa público con la dirección Calle Ejemplo 123, B0000 Villa Ejemplo,
   Provincia de Buenos Aires, en una pestaña nueva anunciada como tal. (REQ-001)
3. **Given** el visitante activa "Consultar horarios", **When** llega al bloque de horarios,
   **Then** lee "Lunes a sábado: 07:30 a 21:00" y "Domingo: cerrado" como texto. (REQ-003)
4. **Given** el visitante está en Contacto y ubicación, **When** carga la página, **Then** ve
   dirección, horarios, teléfono, mapa embebido y botón "Cómo llegar". (REQ-004, REQ-008)

---

### User Story 2 - Llamar al supermercado (Priority: P1)

Un cliente quiere consultar algo (por ejemplo, promociones vigentes) y llama por teléfono desde el
sitio.

**Why this priority**: "generar consultas telefónicas" es un objetivo secundario explícito y el
único canal de contacto publicado.

**Independent Test**: en un celular, activar "Llamar" en Inicio, Contacto o el pie de página y
comprobar que el teléfono inicia una llamada al 0000 00-0000.

**Acceptance Scenarios**:

1. **Given** un visitante en móvil, **When** activa "Llamar al supermercado", **Then** el
   dispositivo propone llamar al 0000 00-0000. (REQ-002)
2. **Given** el número se muestra en pantalla, **When** se lee, **Then** aparece en formato local
   "0000 00-0000". (REQ-002)
3. **Given** canales PENDIENTE (email, WhatsApp, Instagram, Facebook), **When** se recorre el
   sitio, **Then** no aparece ningún enlace, ícono ni dato de esos canales. (REQ-004, REQ-014)

---

### User Story 3 - Conocer qué productos hay (Priority: P2)

Una familia quiere saber si en Los Álamos puede hacer la compra cotidiana completa: almacén, frescos,
bebidas, limpieza.

**Why this priority**: mostrar categorías es objetivo secundario y CTA "Ver productos", pero el
valor principal sigue siendo la visita.

**Independent Test**: desde Inicio activar "Ver productos" y verificar que la página Productos
lista las categorías del brief sin precios, marcas ni productos específicos.

**Acceptance Scenarios**:

1. **Given** un visitante en Inicio o Productos, **When** ve las categorías, **Then** encuentra:
   Alimentos y bebidas; Almacén y consumo cotidiano; Productos frescos; Limpieza y artículos para el
   hogar. (REQ-005)
2. **Given** Carnicería y Verdulería están "a validar", **When** se muestran en la vista previa,
   **Then** llevan una indicación visible "A confirmar". (REQ-005, A-04)
3. **Given** no hay promociones confirmadas, **When** se ve la sección de ofertas, **Then** muestra
   un mensaje honesto de "próximamente" e invita a consultar en el local o por teléfono, sin precios,
   porcentajes, fechas ni productos. (REQ-006)

---

### User Story 4 - Conocer al comercio (Priority: P3)

Un vecino nuevo quiere saber qué tipo de comercio es Los Álamos antes de ir.

**Why this priority**: refuerza confianza y cercanía, pero el brief no aporta historia; contenido
limitado.

**Independent Test**: abrir Nosotros y verificar que solo contiene afirmaciones presentes en el
brief.

**Acceptance Scenarios**:

1. **Given** un visitante en Nosotros, **When** lee la página, **Then** encuentra el
   posicionamiento de comercio de cercanía en Villa Ejemplo, atención cercana, variedad, frescura y
   comodidad de comprar en un comercio local, y un CTA para visitar. (REQ-007)
2. **Given** el brief no aporta trayectoria, **When** se revisa la página, **Then** no aparecen año
   de fundación, cifras, nombres de personas, premios, certificaciones ni testimonios. (REQ-007)

---

### Edge Cases

- **Mapa embebido no carga** (sin conexión al proveedor, bloqueador): la dirección en texto y el
  enlace "Cómo llegar" siguen disponibles. (REQ-008)
- **Navegación solo con teclado o lector de pantalla**: todos los CTA alcanzables, foco visible,
  enlace "Saltar al contenido", menú móvil operable. (REQ-010)
- **Pantalla de 360px**: sin desplazamiento horizontal; "Cómo llegar" y "Llamar" con área táctil
  cómoda. (REQ-011)
- **Usuario con movimiento reducido**: animaciones desactivadas o reducidas. (REQ-010)
- **Dispositivo de escritorio sin telefonía**: el número sigue visible como texto para marcar a mano.
  (REQ-002)
- **Feriados**: no hay información; el sitio no afirma nada sobre feriados ni muestra "abierto
  ahora". (REQ-003, B-08)
- **Oferta confirmada en el futuro**: puede agregarse en el contenido sin cambiar el diseño. (REQ-006)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001** (REQ-001): El sitio MUST ofrecer "Cómo llegar" en el hero de Inicio, la sección
  Ubicación y horarios, el CTA final de Inicio y la página Contacto y ubicación, abriendo un mapa
  público con la dirección exacta del brief en pestaña nueva, con aviso accesible.
- **FR-002** (REQ-002): El sitio MUST ofrecer "Llamar al supermercado" que inicie una llamada al
  número publicado 0000 00-0000 (formato internacional +54 0000 00-0000) y mostrar el número legible.
- **FR-003** (REQ-003): Los horarios "Lunes a sábado: 07:30 a 21:00" y "Domingo: cerrado" MUST
  mostrarse como texto en Inicio, Contacto y pie de página, desde una única fuente; el CTA
  "Consultar horarios" MUST llevar al bloque de horarios.
- **FR-004** (REQ-004): La página Contacto y ubicación MUST reunir dirección completa, teléfono,
  horarios, botón "Cómo llegar" y mapa, sin formulario.
- **FR-005** (REQ-005): Inicio y Productos MUST mostrar las categorías del brief como tarjetas
  visuales sin marcas, productos específicos, precios ni stock; Carnicería y Verdulería MUST llevar
  la indicación "A confirmar" mientras no se validen.
- **FR-006** (REQ-006): La sección de ofertas MUST mostrar un estado vacío honesto mientras no haya
  promociones confirmadas, y MUST poder mostrar ofertas confirmadas sin rediseño.
- **FR-007** (REQ-007): Nosotros MUST contener solo afirmaciones presentes en el brief.
- **FR-008** (REQ-008): Contacto y ubicación MUST incluir un mapa de la dirección, cargado de forma
  diferida, con título descriptivo y alternativa textual.
- **FR-009** (REQ-009): Cada página MUST tener título y descripción únicos orientados a búsqueda
  local (Villa Ejemplo), idioma español de Argentina y metadatos para compartir básicos; MUST NOT
  incluir URL canónica, URL de compartir ni direcciones web absolutas mientras no exista dominio
  confirmado.
- **FR-010** (REQ-009): El sitio MUST incluir datos estructurados de comercio de alimentación solo
  con nombre y dirección (decisión del orquestador); teléfono y horario se agregan al validarse.
  MUST NOT incluir valoraciones, reseñas, rango de precios, coordenadas ni perfiles sociales.
- **FR-011** (REQ-010): El sitio MUST cumplir WCAG 2.1 AA en contraste, navegación por teclado,
  foco visible, jerarquía de títulos, regiones semánticas, textos alternativos no engañosos y
  respeto de preferencia de movimiento reducido.
- **FR-012** (REQ-011): El sitio MUST ser legible y usable en 360px, 768px y 1440px sin
  desplazamiento horizontal, con CTA principales de al menos 44×44px.
- **FR-013** (REQ-012): Las imágenes MUST estar optimizadas, con dimensiones declaradas y carga
  diferida fuera de la primera pantalla; cada imagen MUST tener origen y licencia documentados y
  MUST NOT presentarse como fotografía del local.
- **FR-014** (REQ-013): El sitio MUST NOT incluir carrito, botones de compra, precios, checkout,
  inicio de sesión, formularios ni ventanas emergentes.
- **FR-015** (REQ-014): Ningún texto ni metadato MUST mencionar delivery, envíos, compra online,
  pedidos por WhatsApp, medios de pago ni servicios no listados en el brief.
- **FR-016** (REQ-015): Todos los datos comerciales MUST gestionarse en un único origen de
  contenido, separado de la presentación; confirmar un dato pendiente MUST requerir un único cambio.
- **FR-017** (REQ-016): La identidad visual MUST basarse en la paleta y tipografías propuestas en
  el brief (documentadas como propuesta), con fondo claro, acentos verdes, tarjetas redondeadas,
  íconos simples y animaciones sutiles, con estética de supermercado local.
- **FR-018** (REQ-017): La navegación MUST dar acceso a las 4 páginas en un clic desde cualquier
  página e indicar la página actual.
- **FR-019** (REQ-018): El proyecto MUST pasar sus verificaciones de tipos, construcción y
  validación de contenido, y poder visualizarse localmente.

### Key Entities

- **Comercio**: nombre, rubro, posicionamiento, dirección postal (calle, número, código postal,
  localidad, provincia, país), teléfono (visible e internacional), estado de validación de cada dato.
- **Horario**: días, apertura, cierre o "cerrado"; estado BRIEF-VALIDAR.
- **Categoría**: nombre, descripción breve genérica, imagen con licencia, estado (confirmada / a
  confirmar).
- **Oferta**: título, descripción, vigencia; lista vacía hasta confirmación (BLOCKED).
- **Canal de contacto pendiente**: tipo (email, WhatsApp, Instagram, Facebook), valor nulo; no se
  renderiza.
- **Imagen**: archivo, texto alternativo, origen, licencia.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Desde la primera pantalla de Inicio en un celular de 360px, un visitante llega a
  "Cómo llegar" con 0 desplazamientos y a los horarios en 1 acción ("Consultar horarios").
- **SC-002**: 100% de los enlaces "Cómo llegar" apuntan a la misma dirección exacta del brief y
  100% de los enlaces "Llamar" al mismo número publicado.
- **SC-003**: 0 apariciones de precios, porcentajes de descuento, marcas, testimonios, años de
  trayectoria, delivery, WhatsApp, carritos o formularios en el sitio generado.
- **SC-004**: Las 4 páginas tienen título y descripción únicos que incluyen "Supermercado Los Álamos";
  0 URL canónicas o absolutas ficticias.
- **SC-005**: 0 combinaciones de texto/fondo bajo el contraste AA; 100% de los elementos
  interactivos alcanzables por teclado con foco visible.
- **SC-006**: Las verificaciones de tipos, construcción y validación de contenido finalizan sin
  errores.
- **SC-007**: Confirmar el teléfono, los horarios o una categoría pendiente requiere editar 1 solo
  lugar del contenido.

## Assumptions

- Rutas `/`, `/productos`, `/nosotros`, `/contacto` (A-01).
- Imágenes de stock con licencia libre o ilustración, declaradas como referencia (A-02, B-02).
- Logo tipográfico "Supermercado Los Álamos" hasta recibir el oficial (A-03, B-07).
- Carnicería y Verdulería visibles con "A confirmar" en la vista previa; antes de producción se
  confirman o retiran (A-04, B-04).
- Sección de ofertas visible con estado vacío honesto (A-05, B-01).
- Mapa embebido público sin credenciales, con enlace alternativo (A-06).
- Idioma español de Argentina con voseo (A-07).
- Datos estructurados solo con nombre y dirección (A-08 en versión estricta, decisión del
  orquestador conforme a la constitución V).
- Teléfono y horarios se usan en la vista previa; deben validarse antes de producción (B-03).
- Sin dominio confirmado: sin URL canónica ni sitemap absoluto (B-05).
- Email, WhatsApp y redes sociales no se muestran (A-11, B-06).
- Fuera de alcance: delivery, ecommerce, WhatsApp, formularios, CMS, despliegue (NR-01..NR-11).

<!--
Sync Impact Report
- Version change: (plantilla sin versión) → 1.0.0
- Principios definidos (antes: placeholders PRINCIPLE_1..5):
  I. Brief como fuente de verdad
  II. Stack fijo y alcance MVP
  III. Contenido separado del diseño
  IV. Accesibilidad y responsive
  V. SEO local honesto
  VI. Verificabilidad
- Secciones añadidas: Restricciones adicionales; Flujo de desarrollo y quality gates; Gobernanza
- Secciones eliminadas: ninguna
- Templates: plan/spec/tasks leen la constitución en tiempo de ejecución; no se modificaron.
- TODOs diferidos: ninguno
-->

# Website Factory Constitution

## Core Principles

### I. Brief como fuente de verdad

- El brief de la empresa es la fuente primaria. Nunca se MUST inventar logros, cifras, reseñas,
  testimonios, clientes, premios, certificaciones, trayectoria, precios, promociones, marcas,
  productos específicos, direcciones, datos legales ni canales de contacto.
- Cada dato comercial MUST clasificarse como `VERIFIED`, `ASSUMPTION`, `PLACEHOLDER` o `BLOCKED`
  en la documentación del proyecto.
- Los placeholders MUST mostrarse como tales en la interfaz; nunca se publican datos de ejemplo
  como si fueran reales.
- Servicios no confirmados (p. ej. delivery, compra online, pedidos por WhatsApp) MUST NOT
  afirmarse.

**Rationale**: un sitio institucional con datos falsos daña la confianza y expone legalmente a
la empresa.

### II. Stack fijo y alcance MVP

- Astro con TypeScript y salida estática; Tailwind CSS 4 vía `@tailwindcss/vite`.
- Tokens de diseño en `@theme` y variables CSS dentro de `src/styles/global.css`.
- JavaScript de cliente solo cuando una funcionalidad lo justifique explícitamente.
- MUST NOT incluir backend, CMS, pagos, autenticación, ecommerce ni formularios que aparenten
  enviar datos.
- Máximo 5 páginas por sitio en el MVP.

**Rationale**: un stack único y acotado permite producir, revisar y mantener sitios de forma
repetible y rápida.

### III. Contenido separado del diseño

- Los datos comerciales (contacto, horarios, categorías, textos) MUST vivir en módulos de
  contenido tipados (TypeScript), no incrustados en los componentes.
- La interfaz se construye con componentes Astro reutilizables y parametrizables.
- Reemplazar un placeholder por un dato verificado MUST requerir cambiar un solo lugar.

**Rationale**: facilita validar datos pendientes y reutilizar la fábrica entre clientes.

### IV. Accesibilidad y responsive

- HTML semántico, jerarquía de headings correcta, navegación completa por teclado y foco
  visible.
- Contraste de texto mínimo WCAG 2.1 AA; `alt` significativo en imágenes informativas y vacío en
  decorativas.
- Diseño mobile-first, revisado en 360px, 768px y 1440px.
- Animaciones sutiles y respetuosas de `prefers-reduced-motion`; sin popups invasivos.

**Rationale**: el público objetivo es amplio y usa mayoritariamente el móvil.

### V. SEO local honesto

- Cada página MUST tener `<title>`, meta description, `lang` correcto y Open Graph básico.
- `canonical`, `og:url` y datos estructurados con URL MUST incluirse solo cuando exista una URL
  pública confirmada; nunca URLs ficticias.
- Los datos estructurados (p. ej. schema.org) MUST limitarse a hechos `VERIFIED`.

**Rationale**: el SEO local depende de datos consistentes y veraces; datos falsos se penalizan.

### VI. Verificabilidad

- `npm run check`, `npm run build` y `python3 scripts/validate_content.py` MUST finalizar en
  verde antes de entregar.
- Cada requisito se trazabiliza con un `REQ-ID` desde el brief hasta el código.
- Nunca se afirma haber ejecutado pruebas de navegador, capturas o Lighthouse si no se
  ejecutaron realmente.

**Rationale**: la entrega debe ser comprobable por terceros, no una declaración de confianza.

## Restricciones adicionales

- Imágenes: solo stock o referencia con licencia adecuada (o ilustraciones propias), nunca
  presentadas como fotografías reales del local ni tomadas de otros comercios.
- Paletas y tipografías propuestas se documentan como propuesta, no como identidad oficial.
- No desplegar, publicar ni realizar acciones en servicios externos sin aprobación explícita.
- No incluir claves, secretos ni datos personales en el repositorio.

## Flujo de desarrollo y quality gates

- Spec-Driven Development con Spec Kit: constitution → specify → clarify (solo bloqueos) →
  plan → tasks → analyze → implement → converge.
- En modo autónomo se eligen defaults reversibles y se documentan como `ASSUMPTION`.
- Subagentes especializados reciben prompts con `MISSION`, `INPUTS`, `OUTPUT FILES`,
  `ACCEPTANCE`, `CONSTRAINTS`, `STOP CONDITIONS`; cada ejecución se registra en
  `docs/agent-runs.md`.
- Edición de un mismo archivo se serializa; investigación y copy pueden paralelizarse.
- QA independiente contra brief, spec y código; máximo dos iteraciones de corrección por
  fallo, con defectos y pendientes registrados en `docs/qa-report.md`.

## Governance

- `CLAUDE.md` del orquestador prevalece sobre esta constitución en caso de conflicto; esta
  constitución prevalece sobre specs, planes y tareas.
- Las enmiendas se documentan con Sync Impact Report y versión semántica: MAJOR para remover o
  redefinir principios, MINOR para añadir principios o secciones, PATCH para aclaraciones.
- `/speckit.analyze` y `qa-reviewer` MUST verificar cumplimiento de estos principios antes de
  la entrega.

**Version**: 1.0.0 | **Ratified**: 2026-11-12 | **Last Amended**: 2026-11-12

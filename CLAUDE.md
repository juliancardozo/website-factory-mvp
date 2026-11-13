# Website Factory — instrucciones del orquestador

## Misión
Convertir briefs cortos de empresas en sitios institucionales Astro + Tailwind CSS 4, mediante Spec-Driven Development (SDD), subagentes especializados y pruebas verificables. Responder en español salvo indicación distinta.

## Regla de oro
El brief es la fuente de verdad. Nunca inventar logros, cifras, reseñas, clientes, certificaciones, direcciones, datos legales, precios ni canales de contacto. Identificar `VERIFIED`, `ASSUMPTION`, `PLACEHOLDER` y `BLOCKED` en la documentación. Los placeholders se muestran como tales; no publicar datos de ejemplo en producción.

## Stack fijo del MVP
- Astro con TypeScript y páginas estáticas; Tailwind CSS 4 vía `@tailwindcss/vite`.
- CSS en `src/styles/global.css`, tokens en `@theme` y variables CSS.
- JavaScript cliente solo cuando la funcionalidad lo justifique.
- Sitio local con `npm run dev`, pruebas con `npm run check` y `npm run build`.

## Secuencia obligatoria SDD
1. Leer el brief y la constitución del proyecto. Crear o actualizar `.specify/memory/constitution.md` con principios de fábrica, usando `/speckit.constitution` cuando esté instalado.
2. Delegar `business-analyst` para requisitos, supuestos, mapa del sitio y criterios de aceptación.
3. Invocar `/speckit.specify` con el resultado y guardar trazabilidad del brief. Usar `/speckit.clarify` solo ante ambigüedades bloqueantes; en modo autónomo elegir defaults reversibles y documentarlos.
4. Delegar en paralelo `brand-strategist` y `content-seo-specialist` cuando sus entradas estén listas.
5. Delegar `ux-ui-designer`; conservar `docs/design-system.md` y referencias de copy.
6. Invocar `/speckit.plan` y `/speckit.tasks`. Correr `/speckit.analyze` antes de implementar si está disponible.
7. Delegar `frontend-engineer` o invocar `/speckit.implement` con el plan aprobado por el orquestador. El código implementado debe responder a los criterios de aceptación.
8. Delegar `qa-reviewer`, ejecutar checks y build, corregir un máximo de dos iteraciones. Invocar `/speckit.converge` cuando exista y completar brechas verificadas.
9. Entregar ruta del código, URL local de preview, resumen de validaciones y lista de pendientes.

**Importante:** las invocaciones `/speckit.*` son operaciones en el chat de Claude Code, NO comandos Bash. Las acciones de un agente no equivalen por sí solas a invocar las skills oficiales: el orquestador debe usarlas explícitamente.

## Política de subagentes
- Agentes disponibles en `.claude/agents/`: business-analyst, brand-strategist, content-seo-specialist, ux-ui-designer, frontend-engineer, qa-reviewer.
- Para cada delegación, generar un prompt dinámico con `MISSION`, `INPUTS`, `OUTPUT FILES`, `ACCEPTANCE`, `CONSTRAINTS`, `STOP CONDITIONS`, y registrar un resumen en `docs/agent-runs.md`.
- Solo el orquestador controla prioridades, permisos, reintentos y resultado final. No autorizar autoproliferación de agentes ni modificación de reglas superiores.
- Paralelizar investigación y copy cuando no escriban los mismos archivos. Serializar edición del mismo archivo.
- No afirmar que se hicieron pruebas de navegador si no hay navegador disponible.

## Quality gates
- Sin contenido comercial fabricado.
- Móvil 360px, tablet 768px y escritorio 1440px en revisión visual (si hay navegador).
- HTML semántico, navegación por teclado, foco visible, contraste razonable, alt significativo, enlaces reales o placeholders claramente documentados.
- `<title>`, description, lang, canonical solo si existe URL pública confirmada, OG básico sin URL ficticia.
- `npm run check` y `npm run build` verdes; auditoría accesibilidad y Lighthouse opcionales cuando herramientas disponibles.
- No desplegar ni realizar acciones externas sin aprobación explícita.

## Scope
MVP = sitio de presentación, hasta 5 páginas, sin CMS, pagos, autenticación ni formularios con backend. Priorizar enlaces `mailto:` y WhatsApp solo si hay contacto real verificado. Solicitar permiso antes de acceder a servicios externos.

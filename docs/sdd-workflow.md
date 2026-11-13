# Workflow SDD (operaciones de Claude Code)

1. `/speckit.constitution` — principios, reglas para marketing verificado, Astro y calidad.
2. `/speckit.specify` — usar `docs/requirements.md` y el brief para especificar páginas y aceptación.
3. `/speckit.clarify` — solamente cuestiones realmente bloqueantes.
4. `/speckit.plan` — arquitectura, componentes Astro, tokens y contenido.
5. `/speckit.tasks` — tareas con identificadores y dependencias.
6. `/speckit.analyze` — detectar inconsistencias, resolver antes de implementar.
7. `/speckit.implement` — ejecutar tareas bajo dirección del orquestador.
8. `/speckit.converge` — comprobar diferencias spec↔código, iterar con límites.

**No introducir carpetas `.specify/` falsas:** son instaladas por `specify init`. Los documentos `docs/` sirven como entrada y evidencia complementaria, no como sustitución de los artefactos de Spec Kit.

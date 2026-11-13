---
name: website-factory
description: Convierte un brief de empresa en un sitio web Astro + Tailwind, mediante agentes y Spec Kit SDD. Usar al pedir crear una web desde un brief o al invocar /website-factory.
argument-hint: "ruta a brief .md o descripción corta de la empresa"
---

# Website Factory — skill orquestadora

**Entrada:** `$ARGUMENTS` como ruta a brief Markdown o texto libre. Si está vacío, usar `briefs/example.md` y explicar que es un caso demostrativo.

## 1. Preparación
- Leer `CLAUDE.md`, `templates/brief-template.md`, `docs/quality-gates.md` y el brief.
- Verificar que existe la integración oficial de Spec Kit; si falta, indicar ejecutar `specify init --here --integration claude` y continuar solo con el prototipo básico si el usuario lo autoriza.
- Derivar un ID de proyecto seguro sin datos sensibles y registrar el brief en `briefs/`.

## 2. Brief → especificación
- Crear un prompt dinámico para `business-analyst`: contexto exacto, objetivos, supuestos, entregables y criterios de aceptación.
- Pedir artefactos `docs/requirements.md` y `docs/content-inventory.md`.
- Ejecutar la skill oficial `/speckit.constitution` si la constitución no existe; después `/speckit.specify` para generar `spec.md` y `/speckit.clarify` solo si hay bloqueos.
- Mantener la referencia `REQ-ID` de cada requisito. **No sustituir Spec Kit por documentación artesanal.**

## 3. Estrategia y diseño
- Ejecutar `brand-strategist` y `content-seo-specialist` en paralelo si no hay escrituras compartidas.
- Ejecutar `ux-ui-designer` con esos resultados. Generar `docs/design-system.md`, `docs/site-map.md` y copy documentado.
- Autonomía de diseño habilitada: elegir propuesta justificada y continuar, sin esperar aprobación. Marcar los cambios reversibles.

## 4. Plan y ejecución
- Ejecutar `/speckit.plan`, `/speckit.tasks`, `/speckit.analyze` (si disponible).
- Crear prompt específico a `frontend-engineer` con requisitos, estructura, componentes y pruebas, o ejecutar `/speckit.implement` como paso conductor de implementación sin duplicar cambios.
- Respetar stack Astro + Tailwind 4, TypeScript. No crear backend ni recolectar datos reales innecesarios.

## 5. Verificación
- Ejecutar `npm install` (si hace falta), `npm run check`, `npm run build` y `python3 scripts/validate_content.py`.
- Delegar `qa-reviewer` para contrastar brief, especificación, diseño y código.
- Corregir como máximo dos veces por fallo, registrar defectos y pendientes. Ejecutar `/speckit.converge` cuando esté disponible.
- Si herramientas de navegador no están disponibles, no afirmar haber medido Lighthouse o capturado capturas.

## 6. Entrega
- Mostrar las instrucciones `npm run dev -- --host 127.0.0.1`, URL `http://localhost:4321`, pruebas realizadas y asuntos bloqueantes.
- Reportar `docs/agent-runs.md` y `docs/qa-report.md`.
- Nunca desplegar sin aprobación.

## Prompt dinámico: contrato obligatorio
Para delegar, construir:
```
MISSION: [responsabilidad concreta]
INPUTS: [rutas exactas y brief]
OUTPUT FILES: [rutas propiedad del agente]
ACCEPTANCE: [criterios medibles, REQ-ID]
CONSTRAINTS: [stack, hechos verificados, prohibiciones]
STOP CONDITIONS: [incertidumbre crítica, permisos, límites]
```
No afirmar que existe ejecución real si la herramienta de subagentes no está habilitada.

# Quality Gates — MVP

| ID | Gate | Método |
|---|---|---|
| QG-01 | `npm run check` finaliza exitosamente | Astro check |
| QG-02 | `npm run build` finaliza exitosamente | Astro build |
| QG-03 | El brief no se contradice ni se fabrican claims | QA manual contra brief |
| QG-04 | Título y meta description; lang correcto | Inspección de HTML |
| QG-05 | CTA no apunta a datos ficticios | QA + script `validate_content.py` |
| QG-06 | Diseño legible 360/768/1440 | Navegador humano/automatizado si disponible |
| QG-07 | Teclado, foco, alt, headings | Inspección + auditoría si disponible |
| QG-08 | No hay claves ni datos sensibles en repo | Revisión/escáner disponible |

**Nota:** build OK no demuestra accesibilidad completa, compatibilidad visual ni performance. No inventar puntuaciones Lighthouse.

# Quickstart — validación 001

## Prerrequisitos
Node ≥ 20, dependencias ya instaladas (`node_modules/`). Sin red requerida.

## Ejecutar
```bash
npm run dev -- --host 127.0.0.1   # http://localhost:4321
npm run check                      # 0 errores
npm run build                      # genera dist/ con 5 páginas
python3 scripts/validate_content.py  # PASS (src/ y dist/, contrato C-03)
```

## Escenarios
1. **US1**: abrir `/` a 360px → "Cómo llegar" visible sin scroll; activar → Google Maps con "Calle Ejemplo 123, B0000 Villa Ejemplo…" en pestaña nueva. "Consultar horarios" → `#horarios`.
2. **US2**: "Llamar" → `tel:+540000000000`; número visible "0000 00-0000".
3. **US3**: "Ver productos" → `/productos` con 6 categorías; Carnicería y Verdulería con "A confirmar"; ofertas en estado vacío.
4. **US4**: `/nosotros` sin años, cifras ni testimonios.
5. Teclado: Tab desde el inicio → skip link → header → menú (en móvil, Enter/Escape).
6. Auditoría: `grep -RniE "wa\.me|canonical|og:url|<form|delivery" dist/` → sin resultados.

Referencias: [contracts/](./contracts/), [data-model.md](./data-model.md).

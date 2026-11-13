#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
if ! command -v specify >/dev/null 2>&1; then
  echo "Falta Spec Kit: instalar con 'uv tool install specify-cli --from git+https://github.com/github/spec-kit.git'" >&2
  exit 1
fi
if [[ -d .specify ]]; then
  echo "Spec Kit ya está inicializado. No se sobrescribió."; exit 0
fi
cp CLAUDE.md CLAUDE.md.pre-speckit-backup
printf 'Se guardó respaldo en CLAUDE.md.pre-speckit-backup\n'
echo 'Se ejecutará la inicialización oficial en este directorio.'
specify init --here --integration claude
if [[ ! -f CLAUDE.md ]]; then cp CLAUDE.md.pre-speckit-backup CLAUDE.md; fi
echo 'Comparar CLAUDE.md con el respaldo si Spec Kit lo modificó.'

#!/usr/bin/env python3
"""Comprobación estática (no reemplaza revisión humana ni pruebas de navegador).

1. src/: secretos, dominios de ejemplo, contactos falsos.
2. src/: invariante C-01 (dirección, teléfono y horarios literales solo en src/content/site.ts).
3. dist/**/*.html: patrones prohibidos y obligatorios del contrato C-03
   (specs/001-sitio-supermercado-los-alamos/contracts/dist-audit.md) y chequeos de C-02.
"""
from pathlib import Path
import html
import re
import sys

root = Path(__file__).resolve().parents[1]
src = root / 'src'
dist = root / 'dist'
errors: list[str] = []

# --- 1. src/ ---------------------------------------------------------------
src_files = [f for ext in ('*.astro', '*.css', '*.ts') for f in src.rglob(ext)]
src_patterns = {
    'secret-like': r'(?i)(?:sk-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{20,})',
    'placeholder-domain': r'(?:https?://)(?:example\.com|test\.com)',
    'fake-contact': r'(?:mailto:demo@|wa\.me/0000)',
}
for f in src_files:
    s = f.read_text(encoding='utf-8')
    for key, p in src_patterns.items():
        if re.search(p, s):
            errors.append(f'{f.relative_to(root)}: {key}')

# --- 2. Invariante C-01 ------------------------------------------------------
single_source = src / 'content' / 'site.ts'
for f in src_files:
    if f == single_source:
        continue
    s = f.read_text(encoding='utf-8')
    for m in re.finditer(r'Ejemplo|B0000|00-0000|000000|07:30|21:00', s):
        errors.append(f'{f.relative_to(root)}: C-01 dato comercial literal fuera de site.ts ("{m.group(0)}")')

# --- 3. dist/ (C-03 + C-02) ----------------------------------------------------
forbidden = {
    'precio': r'\$\s?\d',
    'descuento': r'\d+\s?%\s?(?:off|de descuento)',
    '2x1/3x2': r'\b(?:2x1|3x2)\b',
    'delivery': r'delivery',
    'envio-a-domicilio': r'env[ií]os? a domicilio',
    'compra-online': r'(?<!no se hacen )compr(?:a|as|á) online',  # única negación permitida: PROD-S1-NOTE
    'tienda-online': r'tienda online',
    'wa.me': r'wa\.me',
    'whatsapp': r'whatsapp',
    'instagram': r'instagram\.com',
    'facebook': r'facebook\.com',
    'mailto': r'mailto:',
    'form': r'<form',
    'carrito': r'carrito',
    'checkout': r'checkout',
    'agregar-al-carrito': r'agregar al carrito',
    'canonical': r'rel="canonical"',
    'og:url': r'og:url',
    'og:image': r'og:image',
    'example.com': r'example\.com',
    'aggregateRating': r'aggregaterating',
    'review': r'"review"',
    'trayectoria-19xx': r'desde 19\d\d',
    'trayectoria-20xx': r'desde 20\d\d',
    'anios': r'años de (?:experiencia|trayectoria)',
}
TEL = 'tel:+540000000000'
MAPS = 'https://www.google.com/maps/search/?api=1&query=Calle%20Ejemplo%20123%2C%20B0000%20Villa%20Ejemplo%2C%20Provincia%20de%20Buenos%20Aires%2C%20Argentina'
expected_pages = ['index.html', 'productos/index.html', 'nosotros/index.html', 'contacto/index.html', '404.html']
jsonld_pages = {'index.html', 'contacto/index.html'}
tel_pages = {'index.html', 'contacto/index.html'}

html_files = sorted(dist.rglob('*.html')) if dist.exists() else []
if not html_files:
    errors.append('dist/: no hay HTML generado (ejecutar npm run build antes de validar)')
for rel in expected_pages:
    if not (dist / rel).exists():
        errors.append(f'dist/{rel}: página esperada inexistente')

for f in html_files:
    rel = f.relative_to(dist).as_posix()
    s = f.read_text(encoding='utf-8')
    low = s.lower()
    for key, p in forbidden.items():
        m = re.search(p, low)
        if m:
            ctx = low[max(0, m.start() - 40): m.end() + 40].replace('\n', ' ')
            errors.append(f'dist/{rel}: prohibido "{key}" -> …{ctx}…')
    # Obligatorios C-03
    if 'lang="es-AR"' not in s:
        errors.append(f'dist/{rel}: falta lang="es-AR"')
    if 'google.com/maps' not in s:
        errors.append(f'dist/{rel}: falta enlace google.com/maps')
    if TEL not in s:
        errors.append(f'dist/{rel}: falta {TEL} (footer)')
    if rel in tel_pages and s.count(TEL) < 2:
        errors.append(f'dist/{rel}: se esperan CTA de llamada además del footer')
    # C-02
    if len(re.findall(r'<h1[\s>]', s)) != 1:
        errors.append(f'dist/{rel}: debe haber exactamente un <h1>')
    for tag in ('<header', '<footer', '<main id="contenido"'):
        if tag not in s:
            errors.append(f'dist/{rel}: falta landmark {tag}')
    if not re.search(r'<nav aria-label="[^"]+"', s):
        errors.append(f'dist/{rel}: falta <nav aria-label>')
    if not re.search(r'<body[^>]*>\s*<a href="#contenido"', s):
        errors.append(f'dist/{rel}: el skip link no es el primer elemento del body')
    if rel != '404.html' and 'aria-current="page"' not in s:
        errors.append(f'dist/{rel}: falta aria-current="page"')
    for meta in ('og:title', 'og:description', 'og:type" content="website', 'og:locale" content="es_AR', 'name="description"', '<title>'):
        if meta not in s:
            errors.append(f'dist/{rel}: falta {meta}')
    has_jsonld = 'application/ld+json' in s
    if rel in jsonld_pages and not has_jsonld:
        errors.append(f'dist/{rel}: falta JSON-LD')
    if rel not in jsonld_pages and has_jsonld:
        errors.append(f'dist/{rel}: JSON-LD no esperado')
    if has_jsonld:
        block = re.search(r'<script type="application/ld\+json">(.*?)</script>', s, re.S)
        if block:
            keys = set(re.findall(r'"([@A-Za-z]+)":', block.group(1)))
            allowed = {'@context', '@type', 'name', 'address', 'streetAddress', 'postalCode',
                       'addressLocality', 'addressRegion', 'addressCountry'}
            if keys - allowed:
                errors.append(f'dist/{rel}: JSON-LD con campos no permitidos {sorted(keys - allowed)}')
    # Enlaces externos y Maps
    for m in re.finditer(r'<a [^>]*href="(https?://[^"]+)"[^>]*>', s):
        a = m.group(0)
        if 'target="_blank"' not in a or 'rel="noopener noreferrer"' not in a:
            errors.append(f'dist/{rel}: enlace externo sin target/rel: {m.group(1)[:60]}')
        href = html.unescape(m.group(1))
        if 'google.com/maps/search' in href and href != MAPS:
            errors.append(f'dist/{rel}: enlace de Maps distinto de MAPS_URL: {m.group(1)[:80]}')
    for m in re.finditer(r'href="tel:([^"]+)"', s):
        if m.group(1) != '+540000000000':
            errors.append(f'dist/{rel}: tel: inesperado {m.group(1)}')
    scripts = re.findall(r'<script(?![^>]*application/ld\+json)[^>]*>', s)
    if len(scripts) > 1:
        errors.append(f'dist/{rel}: más de un script de cliente ({len(scripts)})')
    if re.search(r'fonts\.googleapis|fonts\.gstatic', low):
        errors.append(f'dist/{rel}: fuentes externas')

if errors:
    print('FAIL\n' + '\n'.join(errors))
    sys.exit(1)
print(f'PASS: {len(src_files)} archivos de src/ y {len(html_files)} páginas de dist/ analizados '
      '(C-01, C-02, C-03). Revisión editorial y visual sigue siendo necesaria.')

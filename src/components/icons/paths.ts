// Set de íconos propio (design-system §7.4): 24×24, trazo 2, extremos redondeados.
// Dibujados para este proyecto con formas geométricas simples; sin licencias de terceros.
import type { IconName } from '../../content/types';

export const iconPaths: Record<IconName, string> = {
  'map-pin': '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  external: '<path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  'arrow-right': '<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>',
  menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
  close: '<path d="M6 6l12 12"/><path d="M18 6L6 18"/>',
  basket: '<path d="M3 10h18l-2 9a2 2 0 0 1-2 1.6H7a2 2 0 0 1-2-1.6z"/><path d="M8 10l4-6 4 6"/><path d="M9 14v3"/><path d="M15 14v3"/>',
  leaf: '<path d="M5 19C5 11 10 5 20 4c-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',
  smile: '<circle cx="12" cy="12" r="9"/><path d="M8.5 14a4.5 4.5 0 0 0 7 0"/><path d="M9 9.5h.01"/><path d="M15 9.5h.01"/>',
  home: '<path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/><path d="M10 20v-6h4v6"/>',
  bottle: '<path d="M10 3h4v3l2 3v11a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V9l2-3z"/><path d="M8 13h8"/>',
  jar: '<rect x="7" y="3" width="10" height="3" rx="1"/><path d="M6 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"/><path d="M6 12h12"/>',
  apple: '<path d="M12 7c-2-1.5-7-1-7 5 0 4 3 9 5 9 1 0 1.5-.5 2-.5s1 .5 2 .5c2 0 5-5 5-9 0-6-5-6.5-7-5z"/><path d="M12 7c0-2 1-4 3-4"/>',
  meat: '<path d="M15 4c3 0 5 2.5 5 5.5 0 4-4 8.5-9 10.5-3 1-7-1-7-4 0-2 1.5-3.5 3-4.5C9 10 9 4 15 4z"/><circle cx="14.5" cy="9.5" r="2"/>',
  carrot: '<path d="M15 9c-2-2-5-1-6 1L4 20l10-5c2-1 3-4 1-6z"/><path d="M15 9l3-3"/><path d="M15 9l1-5"/><path d="M15 9l5-1"/>',
  spray: '<path d="M8 10h7v10a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z"/><path d="M9 10V7h5v3"/><path d="M14 7h3l1 2"/><path d="M20 5h.01"/><path d="M21 8h.01"/><path d="M20 11h.01"/>',
};

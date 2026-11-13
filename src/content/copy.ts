// Textos por ID de docs/copy-deck.md. Los datos comerciales se interpolan desde site.ts
// (contrato C-01): este archivo no contiene dirección, teléfono ni horarios literales.
import { address, business, hours, phone } from './site';

const weekday = hours.find((h) => !h.closed) ?? hours[0];
const weekdayText = `${weekday.days.toLowerCase()}, de ${weekday.value}`;
const NEWTAB = '(abre en una pestaña nueva)';

export const SYS = {
  NEWTAB_SR: NEWTAB,
  '404_H1': 'No encontramos esta página',
  '404_P': 'Volvé al inicio o consultá cómo llegar al supermercado.',
  '404_CTA': 'Ir al inicio',
} as const;

export const CTA = {
  MAPS: 'Cómo llegar',
  MAPS_ARIA: `Cómo llegar a ${business.name} en Google Maps ${NEWTAB}`,
  MAPS_ALT: 'Abrir en Google Maps',
  MAPS_ALT_ARIA: `Abrir la ubicación de ${business.name} en Google Maps ${NEWTAB}`,
  CALL: 'Llamar al supermercado',
  CALL_SHORT: 'Llamar',
  CALL_ARIA: `Llamar al supermercado al ${phone.display}`,
  HOURS: 'Consultar horarios',
  PRODUCTS: 'Ver productos',
} as const;

export const GLB = {
  SKIP: 'Saltar al contenido',
  HDR_LOGO: business.name,
  HDR_LOGO_ARIA: `${business.name}, ir al inicio`,
  NAV_ARIA: 'Navegación principal',
  NAV_MENU: 'Menú',
  NAV_MENU_ARIA_OPEN: 'Abrir menú',
  NAV_MENU_ARIA_CLOSE: 'Cerrar menú',
  HDR_CTA: CTA.MAPS,
  HDR_CTA_ARIA: CTA.MAPS_ARIA,
  FTR_BRAND: business.name,
  FTR_TAGLINE: `Tu supermercado de cercanía en ${address.locality}.`,
  FTR_H_ADDR: 'Dirección',
  FTR_H_PHONE: 'Teléfono',
  FTR_H_HOURS: 'Horarios',
  FTR_H_NAV: 'Secciones',
  FTR_NAV_ARIA: 'Navegación del pie de página',
  FTR_IMG_NOTE: 'Las fotografías del sitio son imágenes ilustrativas.',
  FTR_COPY: (year: number) => `© ${year} ${business.name}`,
} as const;

const OFFERS_EMPTY_T = 'Todavía no hay ofertas publicadas';
const OFFERS_EMPTY_P = `Vamos a publicar acá las ofertas cuando estén confirmadas. Para consultar promociones, acercate al local o llamanos al ${phone.display}.`;

export const HOME = {
  S1_EYEBROW: business.name,
  S1_H1: `Tu supermercado de cercanía en ${address.locality}`,
  S1_SUB: `Alimentos, frescos, almacén y limpieza para tus compras de todos los días, en ${address.street}.`,
  S2_H2: 'Las compras de todos los días, cerca',
  S2_P1: `Somos un supermercado de cercanía pensado para las familias y los vecinos de ${address.locality}, Pueblo Vecino y alrededores.`,
  S2_P2: 'Te esperamos con variedad de productos, frescura y una atención cercana.',
  S3_H2: 'Nuestras categorías principales',
  S3_INTRO: 'Lo que necesitás para la compra diaria, en un solo lugar.',
  S4_H2: '¿Por qué comprar en Los Álamos?',
  S4_BENEFITS: [
    { title: 'Variedad', description: 'Alimentos, bebidas, almacén, limpieza y artículos para el hogar en un mismo lugar.', icon: 'basket' },
    { title: 'Frescura', description: 'Productos frescos para la mesa de todos los días.', icon: 'leaf' },
    { title: 'Atención cercana', description: 'Te atendemos con el trato de un comercio de barrio.', icon: 'smile' },
    { title: 'Comodidad', description: `Comprá cerca de casa, en un comercio local de ${address.locality}.`, icon: 'home' },
  ],
  S5_H2: 'Ofertas destacadas',
  S5_EMPTY_T: OFFERS_EMPTY_T,
  S5_EMPTY_P: OFFERS_EMPTY_P,
  S6_H2: 'Ubicación y horarios',
  S6_H3_ADDR: 'Dónde estamos',
  S6_H3_HOURS: 'Horarios de atención',
  S7_H2: 'Te esperamos',
  S7_P: `Vení a hacer tus compras a ${address.short}. De ${weekdayText}.`,
} as const;

export const PROD = {
  S1_H1: 'Productos para tus compras de todos los días',
  S1_SUB: `Alimentos, bebidas, almacén, productos frescos, limpieza y artículos para el hogar, en un supermercado de cercanía en ${address.locality}.`,
  S1_NOTE: 'Este sitio es informativo: no se hacen compras online. Para consultar disponibilidad, acercate al local o llamanos.',
  S2_H2: 'Nuestras categorías',
  S3_H2: 'Ofertas destacadas',
  S3_EMPTY_T: OFFERS_EMPTY_T,
  S3_EMPTY_P: OFFERS_EMPTY_P,
  S4_H2: 'Vení a recorrer nuestras góndolas',
  S4_P: `Te esperamos en ${address.short}.`,
} as const;

export const CAT = {
  BADGE: 'A confirmar',
  BADGE_SR: '(categoría pendiente de confirmación)',
} as const;

export const ABOUT = {
  S1_H1: `Somos ${business.name}`,
  S1_P1: `Somos un supermercado de cercanía en ${address.locality}, pensado para las compras cotidianas de familias y vecinos.`,
  S1_P2_ALT: `Te esperamos si vivís en ${address.locality}, Pueblo Vecino o en las localidades cercanas.`,
  S2_H2: 'Lo que vas a encontrar',
  S2_ITEMS: [
    { title: 'Variedad', description: 'Productos para resolver la compra de todos los días.', icon: 'basket' },
    { title: 'Frescura', description: 'Productos frescos para tu mesa.', icon: 'leaf' },
    { title: 'Atención cercana', description: 'El trato de un comercio de barrio.', icon: 'smile' },
    { title: 'Comodidad', description: 'Un comercio local, cerca de casa.', icon: 'home' },
  ],
  S3_H2: `Visitanos en ${address.locality}`,
  S3_P: `Estamos en ${address.street}. Abrimos de ${weekdayText}.`,
} as const;

export const CONT = {
  S1_H1: 'Contacto y ubicación',
  S1_SUB: 'Encontrá nuestra dirección, horarios y teléfono. Te esperamos en el local.',
  S1_H2_ADDR: 'Dirección',
  S1_H2_PHONE: 'Teléfono',
  S1_H2_HOURS: 'Horarios de atención',
  S2_H2: 'Cómo llegar',
  S2_MAP_TITLE: `Mapa de ubicación de ${business.name}, ${address.short}`,
  S2_MAP_FALLBACK: '¿No ves el mapa? Abrí la ubicación directamente en Google Maps.',
} as const;

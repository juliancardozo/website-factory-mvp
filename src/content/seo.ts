// Metadatos por página (docs/seo-plan.md §2) y JSON-LD estricto (§4: solo name + address).
// Los datos comerciales se interpolan desde site.ts (contrato C-01).
import { address, business, hours, phone } from './site';
import type { PageSeo } from './types';

const weekday = hours.find((h) => !h.closed) ?? hours[0];
const closedDays = hours.filter((h) => h.closed);
const closedText = closedDays.map((h) => `${h.days.toLowerCase()} ${h.value.toLowerCase()}`).join('; ');

export type PageKey = 'home' | 'productos' | 'nosotros' | 'contacto' | '404';

export const SITE_NAME = business.name;

export const pageSeo: Record<PageKey, PageSeo> = {
  home: {
    title: `${business.name} | Tu súper de cercanía en ${address.locality}`,
    description: `${business.name}: tu supermercado de cercanía en ${address.short}. Alimentos, bebidas, almacén, frescos y limpieza. Horarios y cómo llegar.`,
    ogTitle: `${business.name}: tu súper de cercanía en ${address.locality}`,
    ogDescription: `Alimentos, bebidas, almacén, frescos y limpieza en ${address.short}. Mirá horarios y cómo llegar.`,
    jsonLd: true,
  },
  productos: {
    title: `Productos y categorías | ${business.name}, ${address.locality}`,
    description: `Categorías de ${business.name} en ${address.locality}: alimentos y bebidas, almacén, productos frescos, limpieza y artículos para el hogar. Visitanos en el local.`,
    ogTitle: `Productos | ${business.name}, ${address.locality}`,
    ogDescription: `Alimentos y bebidas, almacén, frescos, limpieza y artículos para el hogar en un supermercado de cercanía en ${address.locality}.`,
    jsonLd: false,
  },
  nosotros: {
    title: `Nosotros | ${business.name}, ${address.locality}`,
    description: `${business.name} es un supermercado de cercanía en ${address.locality}, pensado para las compras cotidianas de familias y vecinos, con variedad y atención cercana.`,
    ogTitle: `Nosotros | ${business.name}`,
    ogDescription: `Un supermercado de cercanía en ${address.locality}, con variedad, frescura y atención cercana.`,
    jsonLd: false,
  },
  contacto: {
    title: `Contacto y ubicación | ${business.name}, ${address.locality}`,
    description: `${business.name}: ${address.short}. Teléfono ${phone.display}. ${weekday.days} de ${weekday.value}; ${closedText}. Mapa y cómo llegar.`,
    ogTitle: `Contacto y ubicación | ${business.name}`,
    ogDescription: `${address.short}. ${weekday.days} de ${weekday.value}. Teléfono ${phone.display}.`,
    jsonLd: true,
  },
  '404': {
    // ASSUMPTION (site-map §7): title sugerido; description = SYS-404-P.
    title: `Página no encontrada | ${business.name}`,
    description: 'Volvé al inicio o consultá cómo llegar al supermercado.',
    ogTitle: `Página no encontrada | ${business.name}`,
    ogDescription: 'Volvé al inicio o consultá cómo llegar al supermercado.',
    jsonLd: false,
  },
};

/** JSON-LD GroceryStore: solo @context, @type, name y address (decisión del orquestador, B-03). */
export function buildJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GroceryStore',
    name: business.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      postalCode: address.postalCode,
      addressLocality: address.locality,
      addressRegion: address.region,
      addressCountry: address.countryCode,
    },
  };
}

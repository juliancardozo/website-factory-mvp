// Única fuente de datos comerciales (contrato C-01). Dirección, teléfono y horarios
// aparecen literalmente SOLO en este archivo. Estados por campo según docs/content-inventory.md.
import type {
  Address, Business, Category, ImageAsset, NavItem, Offer, OpeningHours, PendingChannel, Phone,
} from './types';

// --- Dirección: VERIFIED (brief L7, L143-145) ---
const street = 'Calle Ejemplo 123';      // VERIFIED
const postalCode = 'B0000';              // VERIFIED
const locality = 'Villa Ejemplo';          // VERIFIED
const region = 'Provincia de Buenos Aires'; // VERIFIED
const country = 'Argentina';             // VERIFIED
const countryCode = 'AR';                // VERIFIED

export const address: Address = {
  street,
  postalCode,
  locality,
  region,
  country,
  countryCode,
  full: `${street}, ${postalCode} ${locality}, ${region}, ${country}`,
  short: `${street}, ${locality}`,
  regional: `${street}, ${postalCode} ${locality}, ${region}`,
};

// --- Teléfono: BRIEF-VALIDAR (brief L148, B-03); formato E.164 = ASSUMPTION (A-09) ---
const phoneE164 = '+540000000000';
export const phone: Phone = {
  display: '0000 00-0000', // BRIEF-VALIDAR
  e164: phoneE164,          // ASSUMPTION (A-09)
  href: `tel:${phoneE164}`,
};

// --- Horarios: BRIEF-VALIDAR (brief L151-152). Sin feriados (PENDIENTE) ni "abierto ahora". ---
export const hours: OpeningHours[] = [
  { days: 'Lunes a sábado', value: '07:30 a 21:00', closed: false }, // BRIEF-VALIDAR
  { days: 'Domingo', value: 'Cerrado', closed: true },               // BRIEF-VALIDAR
];

// --- Comercio: VERIFIED (brief L5-L10) ---
export const business: Business = {
  name: 'Supermercado Los Álamos',                        // VERIFIED
  category: 'Supermercado minorista y alimentos',     // VERIFIED
  positioning: 'Supermercado de cercanía para las compras cotidianas de familias y vecinos de Villa Ejemplo', // VERIFIED
  address,
  phone,
};

// --- Categorías (copy-deck §3.2). carn/verd = ASSUMPTION "A confirmar" (A-04). ---
export const categories: Category[] = [
  {
    id: 'alim', title: 'Alimentos y bebidas', icon: 'bottle', status: 'confirmed', visible: true, image: null, // VERIFIED
    descLong: 'Alimentos y bebidas para el día a día de tu familia.',
    descShort: 'Para el día a día de tu familia.',
  },
  {
    id: 'alma', title: 'Almacén y consumo cotidiano', icon: 'jar', status: 'confirmed', visible: true, image: null, // VERIFIED
    descLong: 'Productos de almacén y de consumo cotidiano para completar la compra.',
    descShort: 'Lo básico para completar la compra.',
  },
  {
    id: 'fres', title: 'Productos frescos', icon: 'apple', status: 'confirmed', visible: true, image: null, // VERIFIED
    descLong: 'Productos frescos para la mesa de todos los días.',
    descShort: 'Para la mesa de todos los días.',
  },
  {
    id: 'carn', title: 'Carnicería', icon: 'meat', status: 'pending', visible: true, image: null, // ASSUMPTION (A-04)
    descLong: 'Carnes para tus comidas de todos los días.',
    descShort: 'Para tus comidas de todos los días.',
  },
  {
    id: 'verd', title: 'Verdulería', icon: 'carrot', status: 'pending', visible: true, image: null, // ASSUMPTION (A-04)
    descLong: 'Frutas y verduras para tu compra diaria.',
    descShort: 'Frutas y verduras para tu compra.',
  },
  {
    id: 'limp', title: 'Limpieza y artículos para el hogar', icon: 'spray', status: 'confirmed', visible: true, image: null, // VERIFIED
    descLong: 'Productos de limpieza y artículos para mantener tu casa en orden.',
    descShort: 'Para mantener tu casa en orden.',
  },
];

// --- Imagen del hero: null => ilustración SVG local (UX-05). ---
export const heroImage: ImageAsset | null = null;

// --- Ofertas: BLOCKED (B-01). Lista vacía => estado vacío honesto. ---
export const offers: Offer[] = [];

// --- Canales pendientes: PLACEHOLDER (brief L154-157). NUNCA se renderizan mientras value === null. ---
export const pendingChannels: PendingChannel[] = [
  { type: 'email', value: null },
  { type: 'whatsapp', value: null },
  { type: 'instagram', value: null },
  { type: 'facebook', value: null },
];

// --- Navegación: ASSUMPTION (A-01) ---
export const navItems: NavItem[] = [
  { href: '/', label: 'Inicio' },
  { href: '/productos', label: 'Productos' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto', footerLabel: 'Contacto y ubicación' },
];

// --- Derivados (research R-04/R-05): ASSUMPTION derivada de la dirección VERIFIED ---
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.full)}`;
export const TEL_HREF = phone.href;
export const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(address.full)}&output=embed`;

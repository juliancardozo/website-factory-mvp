// Tipos compartidos del módulo de contenido (docs/design-system.md §7.0, data-model.md).
import type { ImageMetadata } from 'astro';

export type IconName =
  | 'map-pin' | 'clock' | 'phone' | 'external' | 'arrow-right' | 'menu' | 'close'
  | 'basket' | 'leaf' | 'smile' | 'home'
  | 'bottle' | 'jar' | 'apple' | 'meat' | 'carrot' | 'spray';
// Prohibidos: carrito con contador, WhatsApp, redes sociales, moto/delivery (REQ-013, REQ-014).

export type Surface = 'light' | 'dark';
export type SectionTone = 'crema' | 'blanco' | 'verde-oscuro';

/** Solo si hay foto con licencia registrada (design-system §10). */
export interface ImageAsset {
  src: ImageMetadata;
  alt: string;
  credit: { source: 'Unsplash' | 'Pexels' | 'Propia'; author: string; url: string; license: string };
}

export interface Category {
  id: 'alim' | 'alma' | 'fres' | 'carn' | 'verd' | 'limp';
  title: string;
  descShort: string;
  descLong: string;
  icon: IconName;
  /** pending => insignia "A confirmar" (A-04) */
  status: 'confirmed' | 'pending';
  /** false => se retira sin tocar componentes */
  visible: boolean;
  /** null => mosaico ilustrado (UX-05) */
  image: ImageAsset | null;
}

export interface OpeningHours { days: string; value: string; closed: boolean }

/** Sin campo precio (REQ-006). */
export interface Offer { title: string; description: string; validity: string }

export interface Address {
  street: string;
  postalCode: string;
  locality: string;
  region: string;
  country: string;
  countryCode: string;
  /** Calle, CP + localidad, provincia, país */
  full: string;
  /** Calle + localidad */
  short: string;
  /** Calle, CP + localidad, provincia (sin país) */
  regional: string;
}

export interface Phone {
  display: string;
  e164: string;
  href: string;
}

export interface PendingChannel {
  type: 'email' | 'whatsapp' | 'instagram' | 'facebook';
  /** null => nunca se renderiza */
  value: null;
}

export interface NavItem {
  href: string;
  label: string;
  /** Etiqueta alternativa en el pie (GLB-FTR-NAV) */
  footerLabel?: string;
}

export interface PageSeo {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  jsonLd: boolean;
}

export interface Business {
  name: string;
  category: string;
  positioning: string;
  address: Address;
  phone: Phone;
}

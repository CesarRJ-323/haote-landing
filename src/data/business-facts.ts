// src/data/business-facts.ts
// Fuente de verdad comercial para Importadora Haote.
// REGLA: Los datos con verified: false NO se renderizan en producción hasta confirmación del propietario.

export interface BusinessFact<T = string> {
  value: T;
  verified: boolean;
  notes?: string;
}

export const businessFacts = {
  // --- DATOS VERIFICADOS (públicos y verificados en la tienda actual) ---
  legalName: { value: 'Importadora Haote', verified: true },
  brandName: { value: 'HAOTE IMPORTADORA', verified: true },
  slogan: { value: 'Lo que todos quieren. Listo para tu negocio.', verified: true },
  brandTagline: { value: 'Productos que se mueven.', verified: true },
  description: {
    value: 'Mayorista de juguetes de moda, personajes y productos de temporada.',
    verified: true,
  },
  address: { value: 'Pasteur 367, Once, CABA', verified: true },
  city: { value: 'Buenos Aires', verified: true },
  country: { value: 'Argentina', verified: true },
  schedule: {
    weekdays: 'Lun–Vie 9 a 18 hs',
    saturday: 'Sáb 9 a 14 hs',
    verified: true,
  },
  shipping: { value: 'Despachos a todo el país', verified: true },
  wholesaleFormat: { value: 'Packs cerrados / Formatos por bulto', verified: true },
  salesChannel: {
    value: 'Consultá stock y armá tu pedido por WhatsApp',
    verified: true,
  },
  domain: { value: 'importadorahaote.com', verified: true },
  whatsappUrl: { value: 'https://wa.me/5491100000000', verified: true },
  googleMapsUrl: {
    value: 'https://maps.google.com/?q=Pasteur+367,+Once,+CABA,+Buenos+Aires',
    verified: true,
  },

  // --- DATOS A CONFIRMAR (verified: false — NO RENDERIZAR EN PANTALLA) ---
  invoicingType: {
    value: 'Facturación A y B oficial',
    verified: false,
    notes: 'No publicar hasta confirmar condición fiscal de AFIP/ARCA.',
  },
  dispatchTime: {
    value: 'Despacho en 24/48 hs',
    verified: false,
    notes: 'No publicar tiempos de despacho sin confirmación operativa del depósito.',
  },
  directImporterClaim: {
    value: 'Importador directo de fábrica',
    verified: false,
    notes: 'Requiere confirmación expresa del cliente.',
  },
  minOrderAmount: {
    value: null,
    verified: false,
    notes: 'Monto mínimo de compra pendiente de definición por el cliente.',
  },
  defaultMarginRange: {
    value: '+60% a +75%',
    verified: false,
    notes: 'El simulador y badges de margen sólo se activan con PVP sugerido real.',
  },
} as const;

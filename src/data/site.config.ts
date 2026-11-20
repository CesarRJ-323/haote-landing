import { businessFacts } from './business-facts';

/**
 * CONFIGURACIÓN PRINCIPAL DEL SITIO - IMPORTADORA HAOTE
 * 
 * Todo el contenido clave, datos de contacto, enlaces y mensajes
 * están centralizados en este archivo para que sean 100% editables.
 */

const whatsappNumber = businessFacts.whatsappUrl.value.replace('https://wa.me/', '');

export const siteConfig = {
  name: businessFacts.brandName.value,
  legalName: businessFacts.legalName.value,
  slogan: businessFacts.slogan.value,
  description: businessFacts.description.value,
  
  /**
   * ATENCIÓN: Reemplazar este número con el WhatsApp comercial real del cliente.
   * Formato internacional sin símbolos: Código país (54) + Código móvil (9) + Código de área (11) + Número local.
   * Ejemplo: '5491112345678'
   */
  whatsappNumber,

  location: {
    address: businessFacts.address.value,
    neighborhood: 'Once',
    city: businessFacts.city.value,
    country: businessFacts.country.value,
    mapsUrl: businessFacts.googleMapsUrl.value,
    schedule: `${businessFacts.schedule.weekdays} · ${businessFacts.schedule.saturday}`,
    notes: `${businessFacts.wholesaleFormat.value}. ${businessFacts.salesChannel.value}.`,
  },

  trustMetrics: [
    { value: 1400, prefix: '+', label: 'Productos en catálogo', detail: 'Actualizados semanalmente' },
    { value: 100, suffix: '%', label: 'Envíos a todo el país', detail: 'Por expreso o transporte' },
    { value: 15, prefix: '+', suffix: ' años', label: 'Trayectoria en Once', detail: 'Pasteur 367, CABA' },
    { value: 24, suffix: ' hs', label: 'Respuesta por WhatsApp', detail: 'Atención personalizada' },
  ],

  marqueeItems: [
    'LEGO Y BLOQUES SURTIDOS',
    'STITCH',
    'POKÉMON',
    'SPIDERMAN',
    'BLUEY',
    'MINECRAFT',
    'DRAGON BALL',
    'PLANTAS VS ZOMBIES',
    'POP COLECCIONABLES',
    'PELUCHES Y LLAVEROS',
    'PISTOLAS DE AGUA',
    'CALENDARIOS DE ADVIENTO',
    'DISFRACES INFANTILES',
    'JUEGOS DIDÁCTICOS',
    'CAPIBARA',
    'KUROMI',
  ],

  howToBuySteps: [
    {
      step: '01',
      title: 'Elegí tus productos',
      description: 'Mirá nuestro catálogo online o pedí la lista completa actualizada con fotos, precios y formatos de pack.',
      icon: 'catalog',
    },
    {
      step: '02',
      title: 'Te cotizamos por WhatsApp',
      description: 'Envianos tu pedido por chat. Un asesor mayorista confirma stock en minutos y te pasa el total exacto.',
      icon: 'whatsapp',
    },
    {
      step: '03',
      title: 'Envíos o retiro en Once',
      description: 'Pagás por transferencia o efectivo al retirar en Pasteur 367, o te lo despachamos en el día a tu expreso.',
      icon: 'truck',
    },
  ],

  seasonBanner: {
    badge: 'Temporada Activa 2026',
    title: '¡Anticipate a la temporada de Fiestas y Verano!',
    description: 'Stock limitado en Calendarios de Adviento Navideños y línea completa de agua (pistolas mochila, inflables y antiparras). Asegurá tu mercadería antes que se agote.',
    ctaText: 'Consultar stock de temporada',
    whatsappMessage: '¡Hola! Quiero consultar stock y precios mayoristas de la línea de temporada (Navidad / Verano).',
  },
};

/**
 * Generador de enlace directo a WhatsApp con texto codificado
 */
export function getWhatsAppLink(customMessage?: string): string {
  const message = customMessage || '¡Hola! Quiero consultar la lista de precios mayoristas de Importadora Haote.';
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

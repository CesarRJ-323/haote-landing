export interface Category {
  id: string;
  name: string;
  badge: string;
  description: string;
  itemCount: string;
  pastelBg: string;
  badgeBg: string;
  accentColor: string;
  popularItems: string[];
}

export const categories: Category[] = [
  {
    id: 'lego-bloques',
    name: 'Lego y Bloques',
    badge: 'Más Vendido',
    description: 'Sets y muñecos tipo Lego por pack cerrado. Personajes virales listos para reventa rápida.',
    itemCount: '+350 modelos',
    pastelBg: 'bg-pastel-turquesa/15 border-teal-200',
    badgeBg: 'bg-pastel-turquesa text-brand-dark',
    accentColor: '#4DD0E1',
    popularItems: ['Spiderman', 'Stitch', 'Minecraft', 'Pokémon', 'Dragon Ball'],
  },
  {
    id: 'peluches-llaveros',
    name: 'Peluches y Llaveros',
    badge: 'Tendencia',
    description: 'Peluches suaves de calidad superior, llaveros sonoros y colgantes para mochilas.',
    itemCount: '+220 modelos',
    pastelBg: 'bg-pastel-rosa/15 border-pink-200',
    badgeBg: 'bg-pastel-rosa text-brand-dark',
    accentColor: '#F48FB1',
    popularItems: ['Capibara', 'Stitch 35cm', 'Kuromi', 'Pikachu', 'Bluey'],
  },
  {
    id: 'personajes-pop',
    name: 'Personajes y Pop',
    badge: 'Coleccionable',
    description: 'Figuras coleccionables estilo Pop en caja individual. El producto de impulso ideal para kioscos.',
    itemCount: '+180 figuras',
    pastelBg: 'bg-pastel-violeta/15 border-purple-200',
    badgeBg: 'bg-pastel-violeta text-brand-dark',
    accentColor: '#B39DDB',
    popularItems: ['Avengers', 'Mario Bros', 'Sonic', 'Anime', 'Star Wars'],
  },
  {
    id: 'disfraces-mascaras',
    name: 'Disfraces y Máscaras',
    badge: 'Fiestas y Eventos',
    description: 'Línea de trajes infantiles, capas, guantes con luces y máscaras rígidas de alta durabilidad.',
    itemCount: '+90 artículos',
    pastelBg: 'bg-pastel-amarillo/30 border-amber-200',
    badgeBg: 'bg-pastel-amarillo text-brand-dark',
    accentColor: '#FFE082',
    popularItems: ['Spiderman lanzador', 'Princesas', 'Batman', 'Dinosaurios'],
  },
  {
    id: 'verano-playa',
    name: 'Línea Verano y Agua',
    badge: 'Temporada Fuerte',
    description: 'Pistolas de agua estilo mochila, inflables, antiparras y flotadores de alta resistencia.',
    itemCount: '+140 artículos',
    pastelBg: 'bg-pastel-turquesa/15 border-teal-200',
    badgeBg: 'bg-pastel-turquesa text-brand-dark',
    accentColor: '#4DD0E1',
    popularItems: ['Mochila lanza agua', 'Flotadores gigantes', 'Pistolas automáticas'],
  },
  {
    id: 'didacticos-cartas',
    name: 'Juegos Didácticos',
    badge: 'Todo el Año',
    description: 'Cubos mágicos, cartas coleccionables, juegos de ingenio y bloques sensoriales.',
    itemCount: '+160 artículos',
    pastelBg: 'bg-pastel-violeta/15 border-purple-200',
    badgeBg: 'bg-pastel-violeta text-brand-dark',
    accentColor: '#B39DDB',
    popularItems: ['Cubos 3x3', 'Cartas Pokémon', 'Puzzles madera', 'Pop it'],
  },
];

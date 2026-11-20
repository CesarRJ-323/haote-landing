'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { businessFacts } from '../data/business-facts';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { MotionTypewriter } from './motion-typewriter';

// Icon component for contact details (shadcn / 21st.dev style)
const InfoIcon = ({ type }: { type: 'website' | 'phone' | 'address' }) => {
  const icons = {
    website: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-[var(--accent-coral-action)]"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    phone: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-[var(--accent-coral-action)]"
        aria-hidden="true"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    address: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-[var(--accent-coral-action)]"
        aria-hidden="true"
      >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  };
  return <div className="mr-2.5 flex-shrink-0">{icons[type]}</div>;
};

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const heroWhatsAppMessage = 'Hola, quisiera consultar el catálogo, los precios y la disponibilidad de productos mayoristas de Importadora Haote.';
  const heroWhatsAppUrl = `${businessFacts.whatsappUrl.value}?text=${encodeURIComponent(heroWhatsAppMessage)}`;

  // Orquestación escalonada inspirada en hero-section-2 (21st.dev)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { y: 16, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      className="relative overflow-hidden bg-[var(--bg-canvas)] pt-6 pb-12 lg:py-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="page-shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Lado Izquierdo: Contenido con jerarquía editorial (7 cols en desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10">
            {/* Header / Eyebrow de Marca como Chip Destacado */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 mb-3.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-[var(--border-line)] shadow-xs w-fit"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-coral-action)] animate-pulse" aria-hidden="true" />
              <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase text-[var(--text-main)]">
                Mayorista de Juguetes · Once, CABA
              </span>
            </motion.div>

            {/* Titular Imponente y Llamativo en Celular y PC */}
            <motion.div
              variants={itemVariants}
              className="font-heading text-[3.25rem] xs:text-[3.75rem] sm:text-6xl lg:text-6xl xl:text-7xl font-bold leading-[0.93] tracking-tight mb-4 text-balance"
            >
              <MotionTypewriter
                speed={35}
                className="font-heading font-bold"
                lines={[
                  { text: 'Lo que todos quieren.', className: 'text-[var(--text-main)]' },
                  { text: 'Listo para tu negocio.', className: 'text-[var(--accent-coral-action)] mt-1.5 sm:mt-1' },
                ]}
              />
            </motion.div>

            {/* Barra de Acento Estilo hero-section-2 */}
            <motion.div
              variants={itemVariants}
              className="my-3 sm:my-4 h-2 w-24 bg-[var(--accent-coral-action)] rounded-full"
              aria-hidden="true"
            />

            {/* Subtítulo nítido y legible */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-[var(--text-main)]/85 font-semibold leading-relaxed max-w-[560px] mb-6 sm:mb-8 text-pretty"
            >
              {businessFacts.description.value}
            </motion.p>

            {/* Botones de Acción con Interactive Hover Button */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-6 sm:mb-8"
            >
              <InteractiveHoverButton
                text="Explorar catálogo"
                href="/catalogo"
                className="w-full sm:w-[230px] h-[54px] sm:h-[56px] text-base font-bold shadow-md"
              />
              <a
                href={heroWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center cursor-pointer overflow-hidden rounded-full border border-[#25D366] bg-[#25D366] hover:bg-[#1fbd5b] text-white px-6 py-3 h-[52px] sm:h-[56px] text-center font-bold text-sm sm:text-base shadow-sm transition-all duration-300 w-full sm:w-auto gap-2 active:scale-[0.98]"
              >
                <svg
                  className="w-6 h-6 text-white transition-colors duration-300 flex-shrink-0"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
                </svg>
                <span>Pedir por WhatsApp</span>
              </a>
            </motion.div>

            {/* BLOQUE VISUAL EN CELULAR: Sin ningún recorte diagonal. Foto nítida, completa y rectangular redondeada */}
            <motion.div
              variants={itemVariants}
              className="block lg:hidden w-full mb-6"
            >
              <div className="relative w-full h-[280px] sm:h-[340px] rounded-2xl overflow-hidden border border-[var(--border-line)] shadow-lg bg-[var(--bg-subtle)]">
                <Image
                  src="/images/brand/warehouse-hero.png"
                  alt="Depósito mayorista de juguetes Importadora Haote en Once"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center filter saturate-[0.95] contrast-[0.98]"
                />
                <div className="absolute bottom-3 right-3 z-20 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[var(--border-line)] shadow-sm text-xs font-bold text-[var(--text-main)]">
                  Stock en Once · Pasteur 367
                </div>
              </div>
            </motion.div>

            {/* Footer de Contacto y Confianza en 3 Columnas (estilo hero-section-2) */}
            <motion.footer
              variants={itemVariants}
              className="pt-5 border-t border-[var(--border-line)]/70 w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs sm:text-sm font-bold text-[var(--text-muted)]">
                <div className="flex items-center">
                  <InfoIcon type="website" />
                  <span className="truncate">{businessFacts.domain.value}</span>
                </div>
                <div className="flex items-center">
                  <InfoIcon type="phone" />
                  <span className="truncate">{businessFacts.shipping.value}</span>
                </div>
                <div className="flex items-center">
                  <InfoIcon type="address" />
                  <span className="truncate">{businessFacts.address.value}</span>
                </div>
              </div>
            </motion.footer>
          </div>

          {/* Lado Derecho EXCLUSIVO para PC: Imagen con Animación de Corte Inclinado (Clip Path) */}
          <div className="hidden lg:block lg:col-span-5 relative w-full h-[540px]">
            <motion.div
              className="relative w-full h-full overflow-hidden rounded-3xl border border-[var(--border-line)] shadow-xl bg-[var(--bg-subtle)]"
              initial={
                shouldReduceMotion
                  ? { clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }
                  : { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }
              }
              animate={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
              transition={{ duration: 1.2, ease: "circOut" as const }}
            >
              <Image
                src="/images/brand/warehouse-hero.png"
                alt="Depósito mayorista de juguetes Importadora Haote en Once"
                fill
                priority
                sizes="45vw"
                className="object-cover object-center filter saturate-[0.92] contrast-[0.98]"
              />

              {/* Badge discreto y profesional de Stock en Once */}
              <motion.div
                className="absolute bottom-5 right-5 z-20 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-[var(--border-line)] shadow-md text-xs font-bold text-[var(--text-main)]"
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                Stock en Once · Pasteur 367
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}

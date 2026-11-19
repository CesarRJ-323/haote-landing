'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { businessFacts } from '../data/business-facts';

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
            {/* Header / Eyebrow de Marca */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-coral-action)]" aria-hidden="true" />
              <span className="eyebrow text-xs tracking-wider font-bold text-[var(--text-muted)]">
                MAYORISTA DE JUGUETES · ONCE, CABA
              </span>
            </motion.div>

            {/* Titular Imponente con Acento */}
            <motion.h1
              variants={itemVariants}
              className="font-heading text-[clamp(2.5rem,8vw,5.2rem)] font-bold text-[var(--text-main)] leading-[0.94] tracking-tight mb-4 text-balance"
            >
              Lo que todos quieren.{' '}
              <span className="text-[var(--accent-coral-action)] block sm:inline">
                Listo para tu negocio.
              </span>
            </motion.h1>

            {/* Barra de Acento Estilo hero-section-2 */}
            <motion.div
              variants={itemVariants}
              className="my-3 sm:my-4 h-1.5 w-20 bg-[var(--accent-coral-action)] rounded-full"
              aria-hidden="true"
            />

            {/* Subtítulo */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-xl text-[var(--text-muted)] font-medium leading-relaxed max-w-[560px] mb-6 sm:mb-8 text-pretty"
            >
              {businessFacts.description.value}
            </motion.p>

            {/* Botones de Acción */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8"
            >
              <Link
                href="/catalogo"
                className="button button-primary h-[54px] text-base sm:text-lg shadow-md w-full sm:w-auto text-center"
              >
                Explorar catálogo
              </Link>
              <a
                href={businessFacts.whatsappUrl.value}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-secondary h-[50px] text-sm sm:text-base w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5 text-[#25D366] flex-shrink-0"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
                </svg>
                <span>Pedir por WhatsApp</span>
              </a>
            </motion.div>

            {/* Footer de Contacto y Confianza en 3 Columnas (estilo hero-section-2) */}
            <motion.footer
              variants={itemVariants}
              className="pt-5 border-t border-[var(--border-line)]/70 w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm font-bold text-[var(--text-muted)]">
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

          {/* Lado Derecho: Imagen con Animación de Corte Inclinado (Clip Path) en PC */}
          <div className="lg:col-span-5 relative w-full h-[280px] sm:h-[360px] lg:h-[540px]">
            {/* Versión PC: Corte diagonal arquitectónico animado */}
            <motion.div
              className="relative w-full h-full overflow-hidden rounded-2xl lg:rounded-3xl border border-[var(--border-line)] shadow-xl bg-[var(--bg-subtle)]"
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
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center filter saturate-[0.92] contrast-[0.98]"
              />

              {/* Badge discreto y profesional de Stock en Once */}
              <motion.div
                className="absolute bottom-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[var(--border-line)] shadow-sm text-xs font-bold text-[var(--text-main)]"
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

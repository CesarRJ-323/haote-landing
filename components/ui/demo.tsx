'use client';

import React from 'react';
import { HeroSection } from '@/components/ui/hero-section-2';

export default function HeroSectionDemo() {
  return (
    <div className="w-full">
      <HeroSection
        logo={{
          url: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&auto=format&fit=crop&q=60",
          alt: "Company Logo",
          text: "Haote Mayorista"
        }}
        slogan="IMPORTADORA DE JUGUETES EN ONCE"
        title={
          <>
            Lo que todos quieren. <br />
            <span className="text-primary">Listo para tu negocio.</span>
          </>
        }
        subtitle="Venta mayorista directa por bulto cerrado y surtido. Stock permanente en Once con envíos rápidos a todo el país."
        callToAction={{
          text: "EXPLORAR CATÁLOGO COMPLETO",
          href: "/catalogo",
        }}
        backgroundImage="/images/brand/warehouse-hero.png"
        contactInfo={{
          website: "importadorahaote.com",
          phone: "+54 9 11 3110-6868",
          address: "Pasteur 367, Once, CABA",
        }}
      />
    </div>
  );
}

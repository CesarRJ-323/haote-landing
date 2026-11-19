'use client';
import { useEffect } from 'react';

export function ScrollReveal() {
  useEffect(() => {
    // Garantiza visibilidad inmediata de todo el documento
    document.body.style.visibility = 'visible';
    
    // Parallax suave y seguro solo en hero art si existe
    const heroArt = document.querySelector<HTMLElement>('.hero-art');
    let frame = 0;
    
    const updateScrollProgress = () => {
      frame = 0;
      if (!heroArt || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const rect = heroArt.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      heroArt.style.setProperty('--scroll-progress', progress.toFixed(3));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateScrollProgress);
    };

    updateScrollProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}

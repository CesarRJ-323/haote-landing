'use client';
import { useEffect } from 'react';

export function ScrollReveal(){
  useEffect(()=>{
    document.body.style.visibility='visible';
    document.body.classList.add('js-motion-ready');
    const selectors=['main > section:not(.hero) > .page-shell > *','main > section:not(.hero) > *','main h1','main h2','main h3','main p','main .eyebrow','main .button','main .product-card','main .hero-note','main .brand-strip > div','main .hero-card','main .hero-orbit','main .catalog-head > *','main .catalog-toolbar','main .catalog-sidebar'];
    const elements=Array.from(document.querySelectorAll(selectors.join(',')));
    elements.forEach((element,index)=>{
      const isObject=element.matches('.button,.product-card,.hero-note,.brand-strip > div,.hero-card,.hero-orbit,.catalog-toolbar,.catalog-sidebar');
      element.classList.add(isObject?'drop-reveal':'scroll-reveal');
      element.setAttribute('data-reveal-index',String(index%6));
    });
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      const element=entry.target as HTMLElement;
      element.classList.add(element.classList.contains('drop-reveal')?'drop-revealed':'is-revealed');
      observer.unobserve(element);
    }),{threshold:.12,rootMargin:'0px 0px -12% 0px'});
    elements.forEach(element=>observer.observe(element));

    const heroArt=document.querySelector<HTMLElement>('.hero-art');
    let frame=0;
    const updateScrollProgress=()=>{
      frame=0;
      if(!heroArt || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const rect=heroArt.getBoundingClientRect();
      const progress=Math.max(0,Math.min(1,(window.innerHeight-rect.top)/(window.innerHeight+rect.height)));
      heroArt.style.setProperty('--scroll-progress',progress.toFixed(3));
    };
    const onScroll=()=>{
      if(frame) return;
      frame=window.requestAnimationFrame(updateScrollProgress);
    };
    updateScrollProgress();
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll);
    return()=>{
      observer.disconnect();
      window.removeEventListener('scroll',onScroll);
      window.removeEventListener('resize',onScroll);
      if(frame) window.cancelAnimationFrame(frame);
      document.body.classList.remove('js-motion-ready');
      document.body.style.visibility='visible';
    };
  },[]);
  return null;
}

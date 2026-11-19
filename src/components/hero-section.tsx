'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function HeroSection(){
  return <motion.section className="hero editorial-hero" initial="hidden" animate="visible" variants={{hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.12,delayChildren:.12}}}}>
    <div className="page-shell hero-grid">
      <div className="hero-copy">
        <motion.h1 className="display hero-title" variants={{hidden:{y:24,opacity:0},visible:{y:0,opacity:1,transition:{duration:.6,ease:[.23,1,.32,1]}}}}>Lo que todos quieren.<br/><span>Listo para tu negocio.</span></motion.h1>
        <motion.div className="hero-rule" variants={{hidden:{scaleX:0,opacity:0},visible:{scaleX:1,opacity:1,transition:{duration:.5,ease:[.23,1,.32,1]}}}}/>
        <motion.p variants={{hidden:{y:18,opacity:0},visible:{y:0,opacity:1,transition:{duration:.5,ease:[.23,1,.32,1]}}}}>Juguetes de moda, personajes y productos de temporada para locales que necesitan stock que se mueve.</motion.p>
        <motion.div className="hero-actions" variants={{hidden:{y:18,opacity:0},visible:{y:0,opacity:1,transition:{duration:.5,ease:[.23,1,.32,1]}}}}><Link href="/catalogo" className="hero-cta">EXPLORAR CATÁLOGO ↗</Link></motion.div>
        <motion.footer className="hero-contact" variants={{hidden:{y:18,opacity:0},visible:{y:0,opacity:1,transition:{duration:.5,ease:[.23,1,.32,1]}}}}><span>◉ <b>importadorahaote.com</b></span><span>⌂ <b>Once, CABA</b></span><span>◌ <b>Despachos a todo el país</b></span></motion.footer>
      </div>
      <motion.div className="hero-art editorial-hero-art" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.2}}>
        <div className="hero-art-reveal">
          <img className="hero-warehouse-image" src="/images/brand/warehouse-hero.png" alt="Depósito mayorista de juguetes Haote" />
          <div className="hero-sticker sticker-top">Stock<br/><strong>que rota</strong></div>
          <div className="hero-sticker sticker-bottom">Packs<br/><strong>mayoristas</strong></div>
          <motion.div className="hero-reveal-wipe" initial={{scaleX:1}} animate={{scaleX:0}} transition={{duration:1.2,ease:[.77,0,.175,1]}} aria-hidden="true"/>
        </div>
      </motion.div>
    </div>
  </motion.section>;
}

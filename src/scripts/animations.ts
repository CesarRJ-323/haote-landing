import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Registrar ScrollTrigger con GSAP
gsap.registerPlugin(ScrollTrigger);

export function initSiteExperience() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Inicializar Lenis Smooth Scroll
  let lenis: Lenis | null = null;
  if (!prefersReducedMotion) {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  // 2. Navbar solid effect on scroll
  const navbar = document.getElementById('main-navbar');
  if (navbar) {
    ScrollTrigger.create({
      start: 'top -40',
      onUpdate: (self) => {
        if (self.progress > 0) {
          navbar.classList.add('shadow-lg', 'border-white/10');
        } else {
          navbar.classList.remove('shadow-lg', 'border-white/10');
        }
      },
    });
  }

  // 3. Menú móvil interactivo
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenuLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      } else {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });

    closeMenuLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu?.classList.add('hidden');
        document.body.style.overflow = '';
      });
    });
  }

  // 4. Cursor Interactivo y Efecto de Ratón en Desktop
  if (!prefersReducedMotion && window.innerWidth >= 1024) {
    // Halo de luz seguidor de ratón
    const cursorGlow = document.createElement('div');
    cursorGlow.id = 'interactive-cursor-glow';
    cursorGlow.className = 'pointer-events-none fixed z-30 w-80 h-80 rounded-full opacity-0 transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2 blur-2xl';
    cursorGlow.style.background = 'radial-gradient(circle, rgba(77, 208, 225, 0.25) 0%, rgba(244, 143, 177, 0.16) 40%, rgba(255, 224, 130, 0.1) 60%, transparent 75%)';
    document.body.appendChild(cursorGlow);

    // Anillo lúdico seguidor de puntero
    const cursorRing = document.createElement('div');
    cursorRing.id = 'interactive-cursor-ring';
    cursorRing.className = 'pointer-events-none fixed z-40 w-8 h-8 rounded-full border-2 border-teal-400 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-all duration-150 ease-out';
    document.body.appendChild(cursorRing);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorGlow.style.opacity = '1';
      cursorRing.style.opacity = '0.9';
    });

    window.addEventListener('mouseleave', () => {
      cursorGlow.style.opacity = '0';
      cursorRing.style.opacity = '0';
    });

    // Loop suave de seguimiento del ratón (Lerp fluido a 60fps)
    gsap.ticker.add(() => {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;

      ringX += (mouseX - ringX) * 0.35;
      ringY += (mouseY - ringY) * 0.35;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
    });

    // Reacción al pasar por botones, enlaces y tarjetas
    const interactiveTargets = document.querySelectorAll<HTMLElement>('.btn-tactile, .card-tactile, a, button');
    interactiveTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1.6)';
        cursorRing.style.backgroundColor = 'rgba(77, 208, 225, 0.2)';
        cursorRing.style.borderColor = '#F48FB1';
      });

      el.addEventListener('mouseleave', () => {
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorRing.style.backgroundColor = 'transparent';
        cursorRing.style.borderColor = '#4DD0E1';
      });
    });

    // Reacción magnética física en botones principales y tarjetas
    const magneticElements = document.querySelectorAll<HTMLElement>('.btn-tactile, .card-tactile');
    magneticElements.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, {
          x: x * 0.1,
          y: y * 0.1,
          duration: 0.2,
          ease: 'power1.out',
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      });
    });
  }

  if (prefersReducedMotion) {
    gsap.set('[data-drop], [data-reveal], [data-drop-single]', { opacity: 1, y: 0, scale: 1 });
    return;
  }

  // 5. Hero Entrance: Título y elementos del Hero con caída
  const heroTitle = document.querySelector('.hero-title');
  const heroSub = document.querySelector('.hero-subtitle');
  const heroCta = document.querySelector('.hero-cta');
  const heroCard = document.querySelector('.hero-product-card');

  const heroTl = gsap.timeline({ delay: 0.15 });

  if (heroTitle) {
    heroTl.fromTo(
      heroTitle,
      { y: -60, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.85, ease: 'power3.out' }
    );
  }

  if (heroSub && heroCta) {
    heroTl.fromTo(
      [heroSub, heroCta],
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out' },
      '-=0.45'
    );
  }

  if (heroCard) {
    heroTl.fromTo(
      heroCard,
      { y: -90, opacity: 0, scale: 0.92, rotation: -3 },
      { y: 0, opacity: 1, scale: 1, rotation: 0, duration: 0.95, ease: 'power3.out' },
      '-=0.5'
    );
  }

  // 6. ANIMACIÓN DE CAÍDA POR SCROLL ("Falling Drop-In Effect")
  // Los elementos están inicialmente arriba e invisibles y caen a medida que el usuario scrollea
  const dropContainers = document.querySelectorAll('[data-drop-group]');

  dropContainers.forEach((container) => {
    const items = container.querySelectorAll('[data-drop]');
    if (items.length === 0) return;

    gsap.fromTo(
      items,
      {
        y: -75,
        opacity: 0,
        scale: 0.93,
      },
      {
        scrollTrigger: {
          trigger: container,
          start: 'top 82%',
          once: true,
        },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      }
    );
  });

  // Elementos individuales con caída al scrollear
  const singleDropElements = document.querySelectorAll('[data-drop-single]');
  singleDropElements.forEach((el) => {
    gsap.fromTo(
      el,
      {
        y: -65,
        opacity: 0,
        scale: 0.95,
      },
      {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.75,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      }
    );
  });

  // 7. Contadores animados de la barra de confianza
  const counters = document.querySelectorAll<HTMLElement>('.counter-value');
  counters.forEach((counter) => {
    const targetValue = parseInt(counter.dataset.target || '0', 10);
    ScrollTrigger.create({
      trigger: counter,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          counter,
          { innerText: 0 },
          {
            innerText: targetValue,
            duration: 1.5,
            ease: 'power2.out',
            snap: { innerText: 1 },
          }
        );
      },
    });
  });

  // Actualizar ScrollTrigger
  ScrollTrigger.refresh();
}

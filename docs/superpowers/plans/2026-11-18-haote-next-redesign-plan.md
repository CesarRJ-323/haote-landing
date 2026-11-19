# Haote Next Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a two-page Next.js + React beta redesign for Importadora Haote with a presentation home and a full catalog experience.

**Architecture:** Replace the Astro entrypoint with Next.js App Router. Keep product/category data typed and local, render shared shell/components, and isolate catalog filtering in a client component. Use CSS variables and GSAP for authored motion with reduced-motion handling.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, GSAP, existing local SVG assets, Lucide-free inline SVG icons.

**Spec:** `docs/superpowers/specs/2026-11-18-haote-next-redesign-design.md`

## Global Constraints

- Only two primary routes: `/` and `/catalogo`.
- Preserve existing product assets and commercial truth; demo prices are illustrative until approved.
- Motion must use transform/opacity-first animation and respect `prefers-reduced-motion`.
- Responsive targets: 1440, 1024, 768 and 390 px.
- No checkout, payment, inventory or backend integration in this beta.

## Review Focus

- Empty catalog search/filter state: show recovery action instead of a blank grid.
- Mobile catalog: filters must remain reachable without breaking the product grid.
- Reduced motion: page remains fully usable with animation disabled.
- Long product names and uneven images: cards remain aligned without clipping.
- Keyboard focus: navigation, search, filter controls and CTA buttons have visible focus.

### Task 1: Migrate project shell to Next.js

**Files:** `package.json`, `next.config.mjs`, `tsconfig.json`, `app/layout.tsx`, `app/page.tsx`, `app/catalogo/page.tsx`, `app/globals.css`

- [ ] Add Next.js dependencies/scripts and App Router shell.
- [ ] Move global tokens, font imports and accessibility base styles into `app/globals.css`.
- [ ] Add route metadata and shared body structure.
- [ ] Run `npm run build` and verify both routes compile.

### Task 2: Create typed data and shared UI primitives

**Files:** `src/data/catalog.ts`, `src/components/site-header.tsx`, `src/components/site-footer.tsx`, `src/components/ui.tsx`

- [ ] Normalize existing product/category data into typed catalog records with stable slugs.
- [ ] Build shared header, footer, buttons, product card and section intro primitives.
- [ ] Add clear focus, hover, active and disabled states.

### Task 3: Build the presentation home

**Files:** `src/components/home-page.tsx`, `src/components/hero.tsx`, `src/components/home-sections.tsx`, `app/page.tsx`

- [ ] Compose hero, trust signal, top products, new products, brand information, contact/location and final CTA.
- [ ] Use a single authored hero entrance plus section reveals and tactile hover states.
- [ ] Verify the home at desktop and mobile widths.

### Task 4: Build the functional catalog page

**Files:** `src/components/catalog-page.tsx`, `src/components/catalog-controls.tsx`, `app/catalogo/page.tsx`

- [ ] Implement client-side search, category filtering and sorting.
- [ ] Match the attached reference structure: search, category/filter rail, sort control and product grid, adapted to Haote’s palette.
- [ ] Add empty-state recovery and mobile filter drawer behavior without introducing a modal.

### Task 5: Add motion layer and verification

**Files:** `src/components/motion-provider.tsx`, `src/lib/motion.ts`, `app/globals.css`

- [ ] Add GSAP reveal helpers with reduced-motion fallback.
- [ ] Add hover image zoom, button press feedback and catalog result transitions.
- [ ] Run build, inspect responsive rendering and fix any overflow, contrast or focus issues.

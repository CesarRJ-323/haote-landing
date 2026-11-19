'use client';

import { useState } from 'react';
import { businessFacts } from '../data/business-facts';

// Flag de control: Solo se activa en producción con PVP real confirmado
export const SHOW_MARGIN_CALCULATOR = false;

export function MarginCalculator() {
  const [investment, setInvestment] = useState<100000 | 250000 | 500000>(250000);

  // Estimaciones orientativas estándar para el simulador
  const multiplier = 1.7; // Margen estimado 70% de ganancia en mostrador
  const estimatedRevenue = investment * multiplier;
  const estimatedProfit = estimatedRevenue - investment;
  const estimatedPacks = Math.round(investment / 24000);

  if (!SHOW_MARGIN_CALCULATOR) {
    return null;
  }

  return (
    <section className="section bg-[var(--bg-subtle)] border-t border-[var(--border-line)]">
      <div className="page-shell">
        <div className="max-w-[720px] mx-auto text-center mb-10">
          <span className="eyebrow block mb-2">Simulador para Revendedores</span>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[var(--text-main)] leading-tight mb-3">
            Calculá tu Margen de Ganancia Mayorista
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-muted)]">
            Elegí una inversión estimada para ver la proyección orientativa de rotación y ganancia para tu negocio.
          </p>
        </div>

        <div className="max-w-[680px] mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-[var(--border-line)] shadow-lg">
          <div className="mb-6">
            <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-3 text-center">
              Seleccioná tu inversión estimada:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[100000, 250000, 500000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setInvestment(val as any)}
                  className={`h-12 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    investment === val
                      ? 'bg-[var(--accent-coral-action)] text-white shadow-md'
                      : 'bg-[var(--bg-subtle)] text-[var(--text-main)] hover:bg-[var(--border-line)]/50'
                  }`}
                >
                  ${(val / 1000).toLocaleString('es-AR')}k
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 py-6 border-y border-[var(--border-line)] text-center">
            <div>
              <span className="text-xs text-[var(--text-muted)] font-semibold block mb-1">
                Packs Surtidos
              </span>
              <strong className="font-heading text-xl sm:text-2xl text-[var(--text-main)] font-bold">
                ~{estimatedPacks}
              </strong>
            </div>
            <div>
              <span className="text-xs text-[var(--text-muted)] font-semibold block mb-1">
                Venta en Mostrador
              </span>
              <strong className="font-heading text-xl sm:text-2xl text-[var(--text-main)] font-bold">
                ${Math.round(estimatedRevenue).toLocaleString('es-AR')}
              </strong>
            </div>
            <div>
              <span className="text-xs text-[var(--accent-coral-text)] font-semibold block mb-1">
                Ganancia Estimada
              </span>
              <strong className="font-heading text-xl sm:text-2xl text-emerald-600 font-bold">
                +${Math.round(estimatedProfit).toLocaleString('es-AR')}
              </strong>
            </div>
          </div>

          <p className="text-[11px] text-[var(--text-muted)] text-center my-4">
            * Estimación orientativa. Los precios finales de reventa dependen de cada comercio y zona.
          </p>

          <a
            href={`${businessFacts.whatsappUrl.value}?text=${encodeURIComponent(
              `¡Hola! Quiero armar un pedido mayorista con un presupuesto estimado de $${investment.toLocaleString(
                'es-AR'
              )}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-primary w-full h-12 text-sm sm:text-base mt-2"
          >
            Armar este pedido por WhatsApp ↗
          </a>
        </div>
      </div>
    </section>
  );
}

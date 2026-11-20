'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

type Mode = 'login' | 'register';

export function LoginPage() {
  const [mode, setMode] = useState<Mode>('login');
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
  const switchMode = (nextMode: Mode) => { setMode(nextMode); setSubmitted(false); };

  return (
    <main className="login-page">
      <div className="login-shell">
        <section className="login-intro">
          <Link href="/" className="login-brand" aria-label="Volver al inicio"><span>H</span><strong>HAOTE</strong></Link>
          <span className="eyebrow">Cuenta mayorista</span>
          <h1 className="font-heading">Tu negocio, más simple.</h1>
          <p>Guardá tus productos favoritos y prepará tus próximos pedidos mayoristas desde un solo lugar.</p>
          <div className="login-intro-note"><span>✦</span><p>Esta es una vista de muestra. El acceso todavía no está conectado a una cuenta real.</p></div>
        </section>
        <section className="login-card" aria-labelledby="login-title">
          <div className="login-tabs" role="tablist" aria-label="Acceso a la cuenta">
            <button type="button" role="tab" aria-selected={mode === 'login'} className={mode === 'login' ? 'is-active' : ''} onClick={() => switchMode('login')}>Iniciar sesión</button>
            <button type="button" role="tab" aria-selected={mode === 'register'} className={mode === 'register' ? 'is-active' : ''} onClick={() => switchMode('register')}>Crear cuenta</button>
          </div>
          <div className="login-card-heading"><h2 id="login-title" className="font-heading">{mode === 'login' ? 'Bienvenido de nuevo' : 'Creá tu cuenta'}</h2><p>{mode === 'login' ? 'Ingresá para continuar con tu pedido.' : 'Completá tus datos para comenzar.'}</p></div>
          {submitted ? (
            <div className="login-success" role="status"><span aria-hidden="true">✓</span><strong>{mode === 'login' ? 'Inicio de sesión simulado' : 'Cuenta creada de muestra'}</strong><p>Esta demo no guarda datos ni crea una cuenta real.</p><button type="button" className="button button-secondary w-full h-12" onClick={() => setSubmitted(false)}>Volver al formulario</button></div>
          ) : (
            <form className="login-form" onSubmit={handleSubmit}>
              {mode === 'register' && <label>Nombre del negocio<input type="text" name="business" placeholder="Ej. Kiosco Once" required /></label>}
              <label>Email comercial<input type="email" name="email" placeholder="tu@negocio.com" required /></label>
              <label>Contraseña<input type="password" name="password" placeholder="Mínimo 8 caracteres" minLength={8} required /></label>
              {mode === 'register' && <label className="login-check"><input type="checkbox" required /><span>Acepto recibir novedades y disponibilidad de stock.</span></label>}
              {mode === 'login' && <button type="button" className="login-forgot" onClick={() => setSubmitted(true)}>¿Olvidaste tu contraseña?</button>}
              <button type="submit" className="button button-primary w-full h-12">{mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</button>
            </form>
          )}
          <p className="login-demo-label">Modo demostración · Sin datos reales</p>
        </section>
      </div>
    </main>
  );
}

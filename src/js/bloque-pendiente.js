/* =========================================================================
   bloque-pendiente.js — Plantilla de los bloques aún no impartidos (2–5).
   Lee el nº de bloque de <div id="app" data-bloque="N">. Si el bloque está
   bloqueado, difumina el contenido y muestra un velo con candado; si está
   desbloqueado (unlock.js o unlockBlock(n) en consola), enseña el avance.
   ========================================================================= */
import { Header, Chip, Kpi, Button, Badge, escapeHtml } from "../components/index.js";
import { MODULO, BLOQUES } from "../data/contenido.js";
import { isUnlocked, LOCK_SVG, registerUnlockApi } from "./unlock.js";
import { initProgressBar } from "./scrolly.js";
import { initReveal } from "./reveal.js";

const app = document.querySelector("#app");
const n = Number(app.dataset.bloque);
const bloque = BLOQUES.find((b) => b.n === n);

function contenido() {
  return `
  ${Header({
    variant: "light",
    breadcrumb: [
      { label: "Hub", href: "/index.html" },
      { label: `Bloque ${n}`, current: true },
    ],
    nav: [{ label: "Hub", href: "/index.html" }],
  })}
  <main id="contenido">
    <section class="section section--ink bloque-hero">
      <span class="bloque-hero__num" aria-hidden="true" style="color:var(--c-b${n})">0${n}</span>
      <div class="wrap bloque-hero__inner">
        ${Badge({ bloque: n, label: `Bloque ${n}` })}
        <h1 class="bloque-hero__title">${escapeHtml(bloque.titulo)}</h1>
        <p class="lead">${escapeHtml(bloque.lema)}.</p>
        <div class="row bloque-hero__meta">
          ${Chip({ label: "Entregable: " + bloque.entregable })}
          ${Chip({ label: "Cliente: " + MODULO.cliente })}
        </div>
      </div>
    </section>
    <section class="section section--light">
      <div class="wrap">
        <span class="chip">Avance</span>
        <h2>¿Qué haremos en este bloque?</h2>
        <p class="lead" style="max-width:46rem"><strong>Reto ${escapeHtml(MODULO.cliente)}:</strong>
        ${escapeHtml(bloque.reto)}</p>
        <p class="muted">El contenido completo se publicará cuando arranque el bloque.</p>
        <div class="row" style="margin-top:var(--sp-5)">
          ${Button({ label: "Volver al hub", href: "/index.html", variant: "secondary" })}
        </div>
      </div>
    </section>
  </main>
  <footer class="bloque-footer">${escapeHtml(MODULO.titulo)} · ${escapeHtml(MODULO.programa)}</footer>`;
}

function veil() {
  return `<div class="bloque-locked__veil">
    ${LOCK_SVG}
    <p class="lock__text">Disponible próximamente</p>
    <p class="lock__hint">El Bloque ${n} se desbloqueará cuando llegue su semana.</p>
    <p><a class="btn btn--primary" href="../index.html">Volver al hub</a></p>
  </div>`;
}

function render() {
  const abierto = isUnlocked(n);
  app.className = abierto ? "" : "bloque-locked";
  app.innerHTML = abierto
    ? contenido()
    : `<div class="bloque-locked__content" aria-hidden="true">${contenido()}</div>${veil()}`;
  initReveal(app);
}

render();
initProgressBar();

/* Desbloqueo en vivo desde consola (también funciona en esta página). */
registerUnlockApi((num) => { if (num === n) render(); });

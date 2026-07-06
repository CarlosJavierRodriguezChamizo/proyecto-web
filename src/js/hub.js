/* =========================================================================
   hub.js — Hub del módulo (portada + proyecto BBVA + bloques + contacto).
   Renderiza todo desde componentes + datos. Los bloques 2–5 aparecen con
   candado hasta que se desbloquean (ver src/js/unlock.js).
   ========================================================================= */
import { Header, Card, Chip, Kpi, Button, Badge, escapeHtml, appUrl } from "../components/index.js";
import { MODULO, PROFESOR, BLOQUES } from "../data/contenido.js";
import { unlockedBlocks, isUnlocked, LOCK_SVG, registerUnlockApi } from "./unlock.js";
import { initProgressBar } from "./scrolly.js";
import { initReveal } from "./reveal.js";

/* ------------------------------------------------------------------ Hero */
function hero() {
  return `<section class="section section--light hero" id="portada">
    <div class="wrap">
      <div class="row" data-reveal>
        <span class="chip chip--outline">${escapeHtml(MODULO.programa)}</span>
      </div>
      <h1 class="hero__title" data-reveal>Presencia digital:<br>proyecto web</h1>
      <p class="hero__subtitle lead" data-reveal>${escapeHtml(MODULO.lema)}</p>
      <div class="row hero__cta" data-reveal>
        ${Button({ label: "Empezar por el Bloque 1", href: "/bloques/b1.html", variant: "primary" })}
        ${Button({ label: "Ver los 5 bloques", href: "#bloques", variant: "secondary" })}
      </div>
    </div>
  </section>`;
}

/* -------------------------------------------- Banda azul: proyecto BBVA */
function gancho() {
  return `<section class="section section--blue" id="proyecto">
    <div class="wrap gancho">
      <div data-reveal>
        <span class="chip">El proyecto</span>
        <h2 class="gancho__q">${escapeHtml(MODULO.cliente)} necesita una nueva landing.<br>Tu equipo va a diseñarla, medirla y publicarla.</h2>
        <p class="lead">No hay caso inventado: trabajaréis sobre la identidad y los objetivos reales de
        ${escapeHtml(MODULO.cliente)}. Cada bloque del módulo añade una pieza al mismo proyecto,
        y al final la web sale de verdad.</p>
      </div>
      <div class="gancho__kpis" data-reveal>
        ${Kpi({ num: "5", label: "bloques, un único hilo conductor" })}
        ${Kpi({ num: "1", label: "cliente real: " + MODULO.cliente })}
        ${Kpi({ num: "100 %", label: "del recorrido: del wireframe a producción" })}
      </div>
    </div>
  </section>`;
}

/* -------------------------------------------------- Tarjeta de un bloque */
function bloqueCard(b) {
  const abierto = isUnlocked(b.n);
  const inner = `
    <div class="bloque-card__content">
      <div class="row" style="justify-content:space-between">
        ${Badge({ bloque: b.n, label: `Bloque ${b.n}` })}
        <span class="bloque-card__num" aria-hidden="true">0${b.n}</span>
      </div>
      <h3 class="bloque-card__title">${escapeHtml(b.titulo)}</h3>
      <p class="bloque-card__lema muted">${escapeHtml(b.lema)}</p>
      <p class="bloque-card__reto"><strong>Reto ${escapeHtml(MODULO.cliente)}:</strong> ${escapeHtml(b.reto)}</p>
      <div class="row bloque-card__foot">
        ${Chip({ label: b.entregable, outline: true })}
        <span class="bloque-card__go">${abierto ? "Entrar →" : ""}</span>
      </div>
    </div>
    ${abierto ? "" : `
    <div class="lock" role="note" aria-label="Bloque ${b.n} bloqueado">
      ${LOCK_SVG}
      <p class="lock__text">Disponible próximamente</p>
    </div>`}`;

  // Desbloqueado → toda la tarjeta es un enlace a su página.
  if (abierto) {
    return `<a class="bloque-card" data-bloque="${b.n}" href="${escapeHtml(appUrl(`/bloques/${b.slug}.html`))}" style="--c-bloque:var(--c-b${b.n})">${inner}</a>`;
  }
  return `<article class="bloque-card is-locked" data-bloque="${b.n}" style="--c-bloque:var(--c-b${b.n})">${inner}</article>`;
}

function bloques() {
  return `<section class="section section--light" id="bloques">
    <div class="wrap">
      <span class="chip" data-reveal>Objetivos del módulo</span>
      <h2 data-reveal>¿Qué vas a aprender?</h2>
      <p class="lead" style="max-width:46rem" data-reveal>Cinco bloques que se desbloquean a medida que
      avanza el curso. Cada uno termina con un entregable del proyecto ${escapeHtml(MODULO.cliente)}.</p>
      <div class="bloques-grid" id="bloques-grid">
        ${BLOQUES.map((b) => `<div data-reveal>${bloqueCard(b)}</div>`).join("")}
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------------------ Cierre + contacto */
function cierre() {
  return `<section class="section section--ink" id="contacto">
    <div class="wrap cierre">
      <div data-reveal>
        <h2 class="cierre__title">Al final del módulo, la web es vuestra.</h2>
        <p class="lead">Diseñada en Figma, argumentada con criterio técnico, complementada en No-Code,
        medida con un cuadro de mando y publicada en WordPress. El mismo recorrido que
        seguiréis en cualquier proyecto web profesional — aquí, con ${escapeHtml(MODULO.cliente)} como cliente.</p>
      </div>
      <div class="profe card" data-reveal>
        <img class="profe__foto" src="${escapeHtml(appUrl(PROFESOR.foto))}" alt="${escapeHtml(PROFESOR.nombre)}" loading="lazy" width="88" height="88" />
        <div>
          <p class="profe__label">Tu profesor</p>
          <p class="profe__name display">${escapeHtml(PROFESOR.nombre)}</p>
          <p class="profe__links">
            <a href="mailto:${escapeHtml(PROFESOR.email)}">${escapeHtml(PROFESOR.email)}</a> ·
            <a href="${escapeHtml(PROFESOR.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          </p>
        </div>
      </div>
    </div>
  </section>
  <footer class="hub-footer">
    ${escapeHtml(MODULO.titulo)} · ${escapeHtml(MODULO.programa)}
  </footer>`;
}

/* ------------------------------------------------------------- Render */
const app = document.querySelector("#app");
app.innerHTML = [
  Header({
    variant: "light",
    nav: [
      { label: "El proyecto", href: "#proyecto" },
      { label: "Bloques", href: "#bloques" },
      { label: "Deck · De la arquitectura al prototipo", href: "/decks/s2.html" },
      { label: "Contacto", href: "#contacto" },
    ],
  }),
  `<main id="contenido">`,
  hero(),
  gancho(),
  bloques(),
  cierre(),
  `</main>`,
].join("");

initProgressBar();
initReveal(app);

/* Desbloqueo en vivo desde consola: re-renderiza la tarjeta del bloque. */
registerUnlockApi((n) => {
  const card = app.querySelector(`.bloque-card[data-bloque="${n}"]`);
  if (!card) return;
  const b = BLOQUES.find((x) => x.n === n);
  const wrapper = card.parentElement;
  wrapper.classList.add("is-unlocking");
  // Pequeña transición: el candado se desvanece y entra la tarjeta activa.
  setTimeout(() => {
    wrapper.innerHTML = bloqueCard(b);
    wrapper.classList.remove("is-unlocking");
  }, 450);
});

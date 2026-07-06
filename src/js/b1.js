/* =========================================================================
   b1.js — Bloque 1: UX/UI a través de Figma.
   Historia scrollytelling "De la idea a la landing": un lienzo sticky que
   evoluciona de brief → user flow → wireframe → prototipo → UI de BBVA,
   seguida de la teoría, el reto BBVA y los recursos.
   ========================================================================= */
import { Header, Card, Chip, Kpi, Button, Badge, escapeHtml, appUrl } from "../components/index.js";
import { MODULO, PROFESOR, B1, BLOQUES } from "../data/contenido.js";
import { initScrolly, initProgressBar } from "./scrolly.js";
import { initReveal } from "./reveal.js";

const bloque = BLOQUES[0];

/* ----------------------------------------------------- Lienzo (SVG sticky)
   Un marco de navegador donde la landing de BBVA "se construye" escena a
   escena. Las transiciones las gobierna scrolly.css vía [data-scene].       */
function stageSvg() {
  // Marco del navegador: x 90–670 · y 80–520 (viewBox 760×600)
  return `<div class="scrolly__stage">
    <svg class="scrolly__svg" viewBox="0 0 760 600" role="img"
         aria-label="Una landing de BBVA que se construye por fases: flujo de usuario, wireframe, prototipo y diseño final.">
      <defs>
        <marker id="flecha" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill="rgba(0,19,63,.6)"/>
        </marker>
        <marker id="flecha-azul" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill="#0047e9"/>
        </marker>
      </defs>

      <!-- Marco de navegador (siempre visible) -->
      <g class="w-frame">
        <rect class="w-frame__glow" x="84" y="74" width="592" height="452" rx="16"/>
        <rect class="w-frame__body" x="90" y="80" width="580" height="440" rx="12"/>
        <rect class="w-frame__bar" x="90" y="80" width="580" height="36" rx="12"/>
        <rect class="w-frame__bar" x="90" y="104" width="580" height="12"/>
        <circle class="w-frame__dot" cx="112" cy="98" r="5"/>
        <circle class="w-frame__dot" cx="130" cy="98" r="5"/>
        <circle class="w-frame__dot" cx="148" cy="98" r="5"/>
      </g>

      <!-- Escena 2 · user flow -->
      <g class="w-flow">
        <rect class="w-flow__pill" x="120" y="270" width="105" height="42" rx="21"/>
        <text class="w-flow__label" x="172" y="296">Anuncio</text>
        <path class="w-flow__arrow" d="M228 291h34"/>
        <rect class="w-flow__pill" x="266" y="270" width="105" height="42" rx="21"/>
        <text class="w-flow__label" x="318" y="296">Landing</text>
        <path class="w-flow__arrow" d="M374 291h34"/>
        <rect class="w-flow__pill" x="412" y="270" width="105" height="42" rx="21"/>
        <text class="w-flow__label" x="464" y="296">Simulador</text>
        <path class="w-flow__arrow" d="M520 291h34"/>
        <rect class="w-flow__pill w-flow__pill--goal" x="558" y="270" width="105" height="42" rx="21"/>
        <text class="w-flow__label w-flow__label--goal" x="610" y="296">Contratar</text>
        <text class="w-flow__label" x="380" y="360" style="fill:rgba(0,19,63,.45);font-size:12px">¿Qué necesita ver el usuario en cada paso?</text>
      </g>

      <!-- Escenas 3+ · wireframe que en la 5 se viste con la UI de BBVA -->
      <g class="w-wire">
        <rect class="w-box w-box--nav" x="114" y="134" width="532" height="34" rx="6"/>
        <text class="w-wire__logo" x="130" y="157">BBVA</text>
        <rect class="w-box w-box--hero" x="114" y="184" width="340" height="126" rx="8"/>
        <rect class="w-line w-line--onhero" x="132" y="206" width="200" height="12" rx="4"/>
        <rect class="w-line w-line--onhero" x="132" y="228" width="260" height="8" rx="3"/>
        <rect class="w-line w-line--onhero" x="132" y="244" width="230" height="8" rx="3"/>
        <rect class="w-box w-box--cta" x="132" y="268" width="118" height="28" rx="14"/>
        <rect class="w-box w-box--img" x="470" y="184" width="176" height="126" rx="8"/>
        <line class="w-cross" x1="470" y1="184" x2="646" y2="310"/>
        <line class="w-cross" x1="646" y1="184" x2="470" y2="310"/>
        <rect class="w-box w-box--card" x="114" y="330" width="164" height="92" rx="8"/>
        <rect class="w-line" x="130" y="348" width="90" height="9" rx="3"/>
        <rect class="w-line" x="130" y="366" width="130" height="7" rx="3"/>
        <rect class="w-line" x="130" y="380" width="110" height="7" rx="3"/>
        <rect class="w-box w-box--card" x="298" y="330" width="164" height="92" rx="8"/>
        <rect class="w-line" x="314" y="348" width="90" height="9" rx="3"/>
        <rect class="w-line" x="314" y="366" width="130" height="7" rx="3"/>
        <rect class="w-line" x="314" y="380" width="110" height="7" rx="3"/>
        <rect class="w-box w-box--card" x="482" y="330" width="164" height="92" rx="8"/>
        <rect class="w-line" x="498" y="348" width="90" height="9" rx="3"/>
        <rect class="w-line" x="498" y="366" width="130" height="7" rx="3"/>
        <rect class="w-line" x="498" y="380" width="110" height="7" rx="3"/>
        <rect class="w-box" x="114" y="442" width="532" height="30" rx="6"/>
      </g>

      <!-- Escena 4 · prototipo navegable (hotspot + pantalla móvil) -->
      <g class="w-proto">
        <circle class="w-proto__hotspot" cx="191" cy="282" r="22"/>
        <path class="w-proto__conn" d="M254 282 C 420 240, 520 130, 606 148"/>
        <rect class="w-proto__phone" x="580" y="150" width="118" height="228" rx="16"/>
        <rect class="w-proto__screen" x="590" y="170" width="98" height="188" rx="6"/>
        <rect class="w-line" x="600" y="184" width="60" height="9" rx="3"/>
        <rect class="w-line" x="600" y="202" width="78" height="7" rx="3"/>
        <rect class="w-line" x="600" y="216" width="70" height="7" rx="3"/>
        <rect class="w-box w-box--cta" x="600" y="316" width="78" height="24" rx="12"/>
      </g>
    </svg>

    <!-- Escena 1 · el encargo (overlay azul) -->
    <div class="stage-overlay">
      <p class="o-q">${escapeHtml(MODULO.cliente)} tiene 5 segundos<br>para convencer. ¿Cómo?</p>
      <div class="o-kpis">
        <div><div class="o-num">1</div><div class="o-lab">landing page</div></div>
        <div><div class="o-num">2</div><div class="o-lab">flujos navegables</div></div>
        <div><div class="o-num">0</div><div class="o-lab">líneas de código</div></div>
      </div>
    </div>
  </div>`;
}

/* Pasos de la historia (escena, kicker, titular, párrafo) */
const STEPS = [
  { s: 1, k: "El encargo", h: "Una landing que convierta", p: `${MODULO.cliente} necesita una landing para captar nuevos clientes. Antes de escribir una sola línea de código, alguien tiene que decidir qué ve el usuario y por qué. Ese alguien eres tú.` },
  { s: 2, k: "El usuario", h: "Todo empieza en un user flow", p: "¿De dónde llega el usuario? ¿Qué necesita ver para confiar? ¿Dónde convierte? El flujo se dibuja antes que ninguna pantalla: es el mapa del recorrido." },
  { s: 3, k: "El esqueleto", h: "Wireframe: estructura sin ruido", p: "Cajas grises, cero color. El wireframe obliga a discutir la jerarquía y el orden — no si el azul gusta más claro u oscuro. Primero qué; después cómo se ve." },
  { s: 4, k: "El prototipo", h: "Se puede probar sin programar", p: "En Figma conectas pantallas y el diseño se vuelve clicable en el móvil. El prototipo se prueba con usuarios reales antes de invertir un euro en desarrollo." },
  { s: 5, k: "La piel", h: `UI: la identidad de ${MODULO.cliente}`, p: "Sobre el esqueleto validado entra la capa visual: color corporativo, tipografía y componentes. La marca aparece al final — cuando la estructura ya funciona." },
  { s: 6, k: "Tu turno", h: "Este es exactamente tu reto", p: "Lo que acabas de ver es el entregable del Bloque 1: wireframes, prototipo navegable e identidad visual aplicada. Baja al detalle del reto." },
];

function stepHtml(st) {
  const cta = st.s === 6
    ? `<p style="margin-top:var(--sp-4)"><a class="btn btn--primary" href="#reto">Ver el reto ${escapeHtml(MODULO.cliente)}</a></p>`
    : "";
  return `<div class="scrolly__step" data-scene="${st.s}">
    <div class="scrolly__card">
      <span class="scrolly__kicker">${escapeHtml(st.k)}</span>
      <h3>${escapeHtml(st.h)}</h3>
      <p>${escapeHtml(st.p)}</p>
      ${cta}
    </div>
  </div>`;
}

/* --------------------------------------------------------------- Teoría */
function uxuiSection() {
  const col = (lado) => `
    ${Card({
      title: lado.titulo,
      accent: true,
      body: `<p class="uxui__q">«${escapeHtml(lado.pregunta)}»</p>
        <ul class="uxui__list">${lado.items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>`,
    })}`;
  return `<section class="section section--light">
    <div class="wrap">
      <div class="teoria-head" data-reveal>
        <span class="chip">Base conceptual</span>
        <h2>¿Qué es UX/UI?</h2>
        <p class="lead">${escapeHtml(B1.uxui.intro)}</p>
      </div>
      <div class="grid grid--2">
        <div data-reveal>${col(B1.uxui.ux)}</div>
        <div data-reveal>${col(B1.uxui.ui)}</div>
      </div>
    </div>
  </section>`;
}

function figmaSection() {
  return `<section class="section section--light" style="background:#f7f9ff">
    <div class="wrap">
      <div class="teoria-head" data-reveal>
        <span class="chip">La herramienta</span>
        <h2>¿Por qué Figma?</h2>
      </div>
      <div class="grid grid--2">
        ${B1.figma.map((f) => `<div data-reveal>${Card({ title: f.t, body: `<p style="margin:0">${escapeHtml(f.p)}</p>` })}</div>`).join("")}
      </div>
    </div>
  </section>`;
}

function conceptosSection() {
  return `<section class="section section--light">
    <div class="wrap">
      <div class="teoria-head" data-reveal>
        <span class="chip">Vocabulario</span>
        <h2>Conceptos clave</h2>
        <p class="lead">Cuatro palabras que usarás cada día del bloque.</p>
      </div>
      <div class="grid grid--2 grid--4">
        ${B1.conceptos.map((c) => `<div data-reveal>${Card({
          accent: true,
          body: `<h3 class="concepto__term">${escapeHtml(c.t)}</h3><p class="concepto__def">${escapeHtml(c.p)}</p>`,
        })}</div>`).join("")}
      </div>
    </div>
  </section>`;
}

function retoSection() {
  return `<section class="section section--blue" id="reto">
    <div class="wrap reto">
      <div data-reveal>
        <span class="chip">El reto ${escapeHtml(MODULO.cliente)} · Bloque 1</span>
        <h2 class="reto__title">Diseña la landing de ${escapeHtml(MODULO.cliente)} en Figma</h2>
        <p class="lead">${escapeHtml(bloque.reto)}</p>
        <ul class="reto__check">
          ${B1.retoChecklist.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}
        </ul>
        <div class="row" style="margin-top:var(--sp-5)">
          ${Button({ label: "Abrir Figma", href: "https://figma.com", variant: "primary", extra: { target: "_blank", rel: "noopener noreferrer" } })}
          ${Button({ label: "Volver al hub", href: "/index.html", variant: "secondary" })}
        </div>
      </div>
      <div class="gancho__kpis" data-reveal>
        ${Kpi({ num: "2", label: "flujos navegables mínimos" })}
        ${Kpi({ num: "×2", label: "wireframes: mobile y desktop" })}
        ${Kpi({ num: "1", label: "entregable: " + bloque.entregable })}
      </div>
    </div>
  </section>`;
}

function recursosSection() {
  return `<section class="section section--light">
    <div class="wrap">
      <div class="teoria-head" data-reveal>
        <span class="chip">Para ir más lejos</span>
        <h2>Recursos</h2>
        <p class="lead">Material de apoyo del bloque. Los enlaces se irán actualizando durante el curso.</p>
      </div>
      <div class="recursos" data-reveal>
        ${B1.recursos.map((r) => `<a class="recurso" href="${escapeHtml(r.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(r.t)}</a>`).join("")}
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------------------------- Render */
const app = document.querySelector("#app");
app.innerHTML = [
  Header({
    variant: "light",
    breadcrumb: [
      { label: "Hub", href: "/index.html" },
      { label: "Bloque 1 · UX/UI", current: true },
    ],
    nav: [
      { label: "La historia", href: "#historia" },
      { label: "El reto", href: "#reto" },
      { label: "Hub", href: "/index.html" },
    ],
  }),
  `<main id="contenido">`,

  /* Hero del bloque (tinta + número decorativo gigante) */
  `<section class="section section--ink bloque-hero">
    <span class="bloque-hero__num" aria-hidden="true">01</span>
    <div class="wrap bloque-hero__inner">
      <div data-reveal>${Badge({ bloque: 1, label: "Bloque 1" })}</div>
      <h1 class="bloque-hero__title" data-reveal>UX/UI a través<br>de Figma</h1>
      <p class="lead" data-reveal>${escapeHtml(bloque.lema)}: la base de toda presencia digital.</p>
      <div class="row bloque-hero__meta" data-reveal>
        ${Chip({ label: "Entregable: " + bloque.entregable })}
        ${Chip({ label: "Herramienta: Figma" })}
        ${Chip({ label: "Cliente: " + MODULO.cliente })}
      </div>
    </div>
  </section>`,

  /* Historia scrollytelling */
  `<section class="section section--light" id="historia">
    <div class="wrap">
      <div class="teoria-head" data-reveal>
        <span class="chip">Historia visual</span>
        <h2>De la idea a la landing</h2>
        <p class="lead">Desplázate: así se construye una landing antes de programarla.</p>
      </div>
      <div class="scrolly" data-scene="1">
        <div class="scrolly__inner">
          <div class="scrolly__visual">${stageSvg()}</div>
          <div class="scrolly__steps">${STEPS.map(stepHtml).join("")}</div>
        </div>
      </div>
    </div>
  </section>`,

  uxuiSection(),
  figmaSection(),
  conceptosSection(),
  retoSection(),
  recursosSection(),

  `</main>
  <footer class="bloque-footer">
    ${escapeHtml(MODULO.titulo)} · ${escapeHtml(MODULO.programa)} —
    <a href="${escapeHtml(PROFESOR.linkedin)}" target="_blank" rel="noopener noreferrer">${escapeHtml(PROFESOR.nombre)}</a>
  </footer>`,
].join("");

initProgressBar();
initReveal(app);
initScrolly(app.querySelector(".scrolly"));

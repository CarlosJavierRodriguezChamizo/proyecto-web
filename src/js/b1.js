/* =========================================================================
   b1.js — Bloque 1: UX/UI a través de Figma.
   Página completa del bloque: historia scrollytelling "De la idea a la
   landing" + todo el temario (timeline UX, arquitectura y SEO, mobile-first,
   responsive vs adaptive, rendimiento, proceso, Figma, sistemas de diseño,
   Cialdini y práctica del wireframe), el reto BBVA y los recursos.
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

/* --------------------------------------------- Timeline de un proyecto UX
   Diagrama propio (idea del clásico "A Web Site Designed" de John Furness):
   fases sobre 8 semanas, hitos del diseñador arriba y del cliente abajo.   */
function timelineSvg() {
  const FASES = [
    { x0: 40,  x1: 92,  c: "#5a5a72", n: "Contacto inicial" },
    { x0: 92,  x1: 252, c: "#0047e9", n: "Planificación" },
    { x0: 252, x1: 372, c: "#6a2cf5", n: "Contenido" },
    { x0: 372, x1: 590, c: "#0a826e", n: "Diseño" },
    { x0: 590, x1: 830, c: "#b26a00", n: "Desarrollo" },
    { x0: 830, x1: 920, c: "#c01d6a", n: "Lanzamiento" },
  ];
  // Hitos: lvl 1 = etiqueta cercana al eje, lvl 2 = etiqueta más lejana
  const DISENADOR = [
    { x: 62,  l: "Reunión\ninicial", v: 2 },
    { x: 145, l: "Research", v: 1 },
    { x: 225, l: "Site map", v: 2 },
    { x: 305, l: "Wireframes", v: 1 },
    { x: 465, l: "Diseño\nvisual", v: 2 },
    { x: 655, l: "Desarrollo", v: 1 },
    { x: 785, l: "Testing\nmulti-navegador", v: 2 },
    { x: 880, l: "Lanzamiento\n+ SEO", v: 1 },
  ];
  const CLIENTE = [
    { x: 100, l: "Feedback de\nnecesidades", v: 1 },
    { x: 255, l: "Revisión\nde site map", v: 2 },
    { x: 340, l: "Revisión de\nwireframes", v: 1 },
    { x: 430, l: "Entrega de\ncontenidos", v: 2 },
    { x: 545, l: "Revisión\ndel diseño", v: 1 },
    { x: 800, l: "Revisión\nfinal", v: 2 },
  ];

  const texto = (x, y, lines, anchor = "middle") =>
    lines.split("\n").map((t, i) =>
      `<text x="${x}" y="${y + i * 15}" text-anchor="${anchor}" font-size="12.5" font-weight="600" fill="var(--c-ink)">${escapeHtml(t)}</text>`
    ).join("");

  const hito = ({ x, l, v }, arriba) => {
    const dotY = arriba ? 186 : 232;
    const labY = arriba ? (v === 1 ? 148 : 96) : (v === 1 ? 268 : 320);
    const lineEnd = arriba ? labY + 12 : labY - 26;
    return `
      <line x1="${x}" y1="${dotY}" x2="${x}" y2="${lineEnd}" stroke="rgba(0,19,63,.3)" stroke-width="1.3"/>
      <circle cx="${x}" cy="${dotY}" r="6" fill="#fff" stroke="var(--c-accent-blue)" stroke-width="2.5"/>
      <circle cx="${x}" cy="${dotY}" r="2.2" fill="var(--c-accent-blue)"/>
      ${texto(x, arriba ? labY - 20 : labY, l)}`;
  };

  const semanas = Array.from({ length: 8 }, (_, i) =>
    `<text x="${95 + i * 110}" y="${213}" text-anchor="middle" font-size="11.5" font-weight="700" fill="#fff" opacity=".85">S${i + 1}</text>`
  ).join("");

  return `<svg class="d-svg" viewBox="0 0 960 350" role="img"
      aria-label="Timeline de 8 semanas de un proyecto web: fases de contacto inicial, planificación, contenido, diseño, desarrollo y lanzamiento, con hitos del diseñador arriba y del cliente abajo.">
    <text x="18" y="150" font-size="12" font-weight="700" letter-spacing="2" fill="var(--c-ink-soft)" transform="rotate(-90 18 150)" text-anchor="middle">DISEÑADOR</text>
    <text x="18" y="285" font-size="12" font-weight="700" letter-spacing="2" fill="var(--c-ink-soft)" transform="rotate(-90 18 285)" text-anchor="middle">CLIENTE</text>
    <g>
      ${FASES.map((f) => `<rect x="${f.x0}" y="192" width="${f.x1 - f.x0}" height="34" fill="${f.c}"/>`).join("")}
      <rect x="40" y="192" width="880" height="34" rx="17" fill="none" stroke="#fff" stroke-width="3"/>
    </g>
    ${semanas}
    ${DISENADOR.map((h) => hito(h, true)).join("")}
    ${CLIENTE.map((h) => hito(h, false)).join("")}
  </svg>
  <div class="fases-leyenda">
    ${FASES.map((f) => `<span class="fase-chip" style="--fase:${f.c}">${escapeHtml(f.n)}</span>`).join("")}
  </div>`;
}

function timelineSection() {
  return `<section class="section section--light" id="timeline" style="background:#f7f9ff">
    <div class="wrap">
      <div class="teoria-head" data-reveal>
        <span class="chip">El proyecto en el tiempo</span>
        <h2>Timeline de un proyecto UX</h2>
        <p class="lead">Un proyecto web tipo dura unas 8 semanas y pasa por 6 fases. Dos lecturas
        importan más que las fechas: <strong>el trabajo cambia de naturaleza por fase</strong> —
        y <strong>el cliente participa de principio a fin</strong>, no solo al final.</p>
      </div>
      <div data-reveal>${timelineSvg()}</div>
      <p class="d-cap" data-reveal>Cada revisión del cliente (site map, wireframes, diseño) es una
      <strong>puerta de validación</strong>: lo que se aprueba ahí ya no se rehace después. Idea basada en el
      clásico <em>A Web Site Designed</em> de John Furness.</p>
      <div class="bbva-note" data-reveal>
        <p style="margin:0"><strong>En vuestro proyecto ${escapeHtml(MODULO.cliente)}:</strong> TE1 fue la fase de
        planificación y contenido; hoy estáis en pleno diseño (wireframes); TE3 será desarrollo y lanzamiento.</p>
      </div>
    </div>
  </section>`;
}

/* ------------------------------------ Arquitectura web y correlación SEO */
function arquitecturaSection() {
  return `<section class="section section--light" id="arquitectura">
    <div class="wrap">
      <div class="teoria-head" data-reveal>
        <span class="chip">Estructura</span>
        <h2>Arquitectura web y su correlación con SEO</h2>
        <p class="lead">La organización <strong>jerárquica</strong> de las páginas de un sitio y de los
        enlaces entre ellas: qué existe, dónde vive y cómo se llega hasta ahí.</p>
      </div>

      <div class="grid grid--3">
        <div data-reveal>${Card({ title: "Jerarquía", accent: true, body: `<p style="margin:0">El sitemap: qué páginas existen y de cuál cuelga cada una.</p>` })}</div>
        <div data-reveal>${Card({ title: "Navegación", accent: true, body: `<p style="margin:0">Menús y breadcrumbs: cómo se mueve el usuario por el sitio.</p>` })}</div>
        <div data-reveal>${Card({ title: "Enlazado interno", accent: true, body: `<p style="margin:0">Los links entre páginas que conectan y jerarquizan el contenido.</p>` })}</div>
      </div>

      <h3 style="margin-top:var(--sp-7)" data-reveal>Tipos: plana vs. profunda</h3>
      <div data-reveal>
        <svg class="d-svg" viewBox="0 0 920 300" role="img" aria-label="Comparativa: arquitectura plana con pocos niveles frente a arquitectura profunda con muchos niveles.">
          <text x="215" y="24" text-anchor="middle" font-size="17" font-weight="700" fill="var(--c-ink)">PLANA</text>
          <rect x="175" y="40" width="80" height="34" rx="8" fill="var(--c-accent-blue)"/>
          <text x="215" y="62" text-anchor="middle" font-size="13" fill="#fff">Home</text>
          <g fill="#e8ecf7" stroke="var(--c-line)">
            <rect x="15" y="130" width="70" height="30" rx="7"/><rect x="95" y="130" width="70" height="30" rx="7"/>
            <rect x="175" y="130" width="70" height="30" rx="7"/><rect x="255" y="130" width="70" height="30" rx="7"/>
            <rect x="335" y="130" width="70" height="30" rx="7"/>
          </g>
          <g stroke="var(--c-ink-soft)" stroke-width="1.5">
            <line x1="215" y1="74" x2="50" y2="130"/><line x1="215" y1="74" x2="130" y2="130"/>
            <line x1="215" y1="74" x2="215" y2="130"/><line x1="215" y1="74" x2="290" y2="130"/>
            <line x1="215" y1="74" x2="370" y2="130"/>
          </g>
          <text x="215" y="205" text-anchor="middle" font-size="14" fill="var(--c-ink-soft)">Todo a 1-2 clics…</text>
          <text x="215" y="226" text-anchor="middle" font-size="14" fill="#c01d1d">…pero el menú se satura al crecer</text>
          <line x1="460" y1="20" x2="460" y2="280" stroke="var(--c-line)" stroke-width="1.5" stroke-dasharray="6 6"/>
          <text x="700" y="24" text-anchor="middle" font-size="17" font-weight="700" fill="var(--c-ink)">PROFUNDA</text>
          <rect x="660" y="40" width="80" height="32" rx="8" fill="var(--c-accent-blue)"/>
          <text x="700" y="61" text-anchor="middle" font-size="13" fill="#fff">Home</text>
          <g fill="#e8ecf7" stroke="var(--c-line)">
            <rect x="580" y="100" width="70" height="28" rx="7"/><rect x="750" y="100" width="70" height="28" rx="7"/>
            <rect x="580" y="156" width="70" height="28" rx="7"/><rect x="750" y="156" width="70" height="28" rx="7"/>
            <rect x="580" y="212" width="70" height="28" rx="7"/><rect x="750" y="212" width="70" height="28" rx="7"/>
          </g>
          <g stroke="var(--c-ink-soft)" stroke-width="1.5">
            <line x1="700" y1="72" x2="615" y2="100"/><line x1="700" y1="72" x2="785" y2="100"/>
            <line x1="615" y1="128" x2="615" y2="156"/><line x1="785" y1="128" x2="785" y2="156"/>
            <line x1="615" y1="184" x2="615" y2="212"/><line x1="785" y1="184" x2="785" y2="212"/>
          </g>
          <text x="700" y="272" text-anchor="middle" font-size="14" fill="#c01d1d">Ordenada, pero el contenido se entierra</text>
        </svg>
        <p class="d-cap">Regla práctica: <strong>ninguna página a más de 3-4 clics de la home</strong>.</p>
      </div>

      <h3 style="margin-top:var(--sp-7)" data-reveal>El patrón profesional: silo / hub-and-spoke</h3>
      <div class="grid grid--2" style="align-items:center" data-reveal>
        <svg class="d-svg" viewBox="0 0 640 300" role="img" aria-label="Una página pilar central conectada en ambos sentidos con seis contenidos específicos que también se enlazan entre sí.">
          <g stroke="var(--c-accent-blue)" stroke-width="1.8">
            <line x1="320" y1="150" x2="320" y2="52"/><line x1="320" y1="150" x2="475" y2="88"/>
            <line x1="320" y1="150" x2="475" y2="216"/><line x1="320" y1="150" x2="320" y2="252"/>
            <line x1="320" y1="150" x2="165" y2="216"/><line x1="320" y1="150" x2="165" y2="88"/>
          </g>
          <g stroke="var(--c-accent-blue)" stroke-width="1.5" stroke-dasharray="5 5" fill="none" opacity=".55">
            <path d="M320 40 Q 420 30 475 76"/>
            <path d="M487 100 Q 520 150 487 204"/>
            <path d="M165 100 Q 132 150 165 204"/>
          </g>
          <circle cx="320" cy="150" r="52" fill="var(--c-accent-blue)"/>
          <text x="320" y="146" text-anchor="middle" font-size="14" fill="#fff" font-weight="700">Página</text>
          <text x="320" y="164" text-anchor="middle" font-size="14" fill="#fff" font-weight="700">pilar</text>
          <g fill="#e8ecf7" stroke="var(--c-accent-blue)" stroke-width="1.5">
            <circle cx="320" cy="40" r="24"/><circle cx="475" cy="82" r="24"/><circle cx="475" cy="222" r="24"/>
            <circle cx="320" cy="260" r="24"/><circle cx="165" cy="222" r="24"/><circle cx="165" cy="82" r="24"/>
          </g>
          <g text-anchor="middle" font-size="11" fill="var(--c-ink)">
            <text x="320" y="44">tema 1</text><text x="475" y="86">tema 2</text><text x="475" y="226">tema 3</text>
            <text x="320" y="264">tema 4</text><text x="165" y="226">tema 5</text><text x="165" y="86">tema 6</text>
          </g>
        </svg>
        <div>
          <p>Una <strong>página pilar</strong> (hub) enlaza al contenido específico relacionado
          (spokes); estos se enlazan entre sí <strong>y de vuelta al hub</strong>.</p>
          <p class="muted">Es el patrón habitual en proyectos reales de contenido SEO: agrupa la
          autoridad temática y hace el sitio legible para usuarios y para bots.</p>
        </div>
      </div>

      <h3 style="margin-top:var(--sp-7)" data-reveal>Por qué esto es SEO, no solo UX</h3>
      <div class="grid grid--2">
        <div data-reveal>${Card({ title: "Rastreabilidad", body: `<p style="margin:0">Una arquitectura clara facilita que los bots descubran todas las páginas — el <strong>crawl budget</strong> no es infinito.</p>` })}</div>
        <div data-reveal>${Card({ title: "Indexabilidad", body: `<p style="margin:0">URLs limpias, canonical claros, sitemap.xml y robots.txt coherentes con la jerarquía real.</p>` })}</div>
        <div data-reveal>${Card({ title: "Autoridad temática", body: `<p style="margin:0">El enlazado interno reparte <strong>link equity</strong> desde las páginas fuertes hacia las que quieres posicionar.</p>` })}</div>
        <div data-reveal>${Card({ title: "Experiencia como señal", body: `<p style="margin:0">Core Web Vitals, tiempo en página y rebote dependen de si el usuario encuentra rápido — y retroalimentan el ranking.</p>` })}</div>
      </div>

      <div class="bbva-note" data-reveal>
        <p style="margin:0"><strong>Aplicado al caso ${escapeHtml(MODULO.cliente)}:</strong> árbol mínimo para la landing
        Gen Z — Home / Producto / Cómo funciona / Ventajas &amp; partners / Sobre la marca / Contacto-Hazte cliente.
        Es el punto de partida de la práctica de wireframes (TE2).</p>
      </div>
    </div>
  </section>`;
}

/* -------------------------------------------- Mobile-first, con datos */
function mobileFirstSection() {
  return `<section class="section section--light" id="mobile-first" style="background:#f7f9ff">
    <div class="wrap">
      <div class="teoria-head" data-reveal>
        <span class="chip">Enfoque</span>
        <h2>Mobile-first, validado con datos</h2>
        <p class="lead">«Todo el mundo diseña mobile-first.» Sí — pero ¿por qué, con qué dato?
        Tres cifras (con su fuente) sostienen la decisión.</p>
      </div>
      <div class="grid grid--2" style="align-items:center">
        <div class="gancho__kpis" style="grid-template-columns:1fr" data-reveal>
          ${Kpi({ num: "52,27 %", label: "del tráfico web mundial es móvil (Q1 2026) — mayoritario, pero fluctúa: un año antes era el 62,39 %. Varía mucho por país y sector." })}
          ${Kpi({ num: "96,2 %", label: "de los usuarios de internet del mundo se conecta con el móvil al menos alguna vez. Casi nadie vive fuera del móvil." })}
          ${Kpi({ num: "100 %", label: "de los sitios se evalúan con indexación mobile-first: Google posiciona mirando tu versión móvil, exista o no la de escritorio." })}
        </div>
        <!-- width/height reservan el espacio (lección CLS) y lazy evita cargarla antes de tiempo -->
        <img data-reveal src="${escapeHtml(appUrl("/assets/mobile-first.jpg"))}"
             alt="Ilustración: una mano sostiene un móvil con una interfaz en primer plano, nítido, mientras el monitor de escritorio queda desenfocado detrás — el móvil es la prioridad."
             width="1400" height="1047" loading="lazy"
             style="border-radius:var(--radius); box-shadow:var(--shadow-sm)" />
      </div>
      <p class="src-note" data-reveal>Fuentes: StatCounter vía Statista (tráfico, Q1 2026) · DataReportal
      (penetración de uso) · Google Search Central (mobile-first indexing). El reparto de tráfico depende de la
      metodología (filtrado de bots, sesiones vs. tiempo).</p>
      <div class="bbva-note" data-reveal>
        <p style="margin:0"><strong>Para la Gen Z de ${escapeHtml(MODULO.cliente)}:</strong> el segmento 18-24 es nativo móvil
        por definición. Cualquier fricción en el móvil (formularios largos, procesos complejos) pierde a este
        público antes de convertir. En la práctica: el primer frame que abriréis en Figma es el de móvil.</p>
      </div>
    </div>
  </section>`;
}

/* --------------------------------------------- Responsive vs. Adaptive */
function responsiveSection() {
  return `<section class="section section--light" id="responsive">
    <div class="wrap">
      <div class="teoria-head" data-reveal>
        <span class="chip">Estrategia multi-dispositivo</span>
        <h2>Responsive vs. Adaptive</h2>
        <p class="lead"><strong>Responsive:</strong> un único código base con layout fluido que se reorganiza
        de forma continua según el ancho de pantalla. <strong>Adaptive:</strong> varios layouts fijos para
        anchos concretos (320, 768, 1024, 1440&nbsp;px); se sirve el más cercano, a saltos.</p>
      </div>
      <div data-reveal>
        <table class="tablon">
          <tr><th></th><th>Responsive</th><th>Adaptive</th></tr>
          <tr><td>Código</td><td>Un único código base</td><td>Varios layouts por breakpoint</td></tr>
          <tr><td>Adaptación</td><td>Fluida y continua, a cualquier tamaño</td><td>Por saltos, a puntos fijos</td></tr>
          <tr><td>Mantenimiento</td><td>Más sencillo a largo plazo</td><td>Más control fino, más esfuerzo</td></tr>
          <tr><td>Rendimiento</td><td>Puede cargar recursos de más</td><td>Puede optimizar mejor por dispositivo</td></tr>
          <tr><td>Caso típico</td><td>Sitios de contenido, la mayoría de webs</td><td>Necesidades muy distintas por dispositivo (p. ej. checkout diferenciado)</td></tr>
        </table>
      </div>
      <p class="d-cap" data-reveal>Hoy casi siempre elegimos <strong>responsive</strong>: menos coste de
      mantenimiento, cubre dispositivos nuevos sin rediseñar y es el enfoque que espera Google con
      mobile-first indexing.</p>
      <div class="bbva-note" data-reveal>
        <p style="margin:0"><strong>En la práctica:</strong> la landing de ${escapeHtml(MODULO.cliente)} Gen Z se diseña
        responsive — un único wireframe pensado para <strong>fluir de móvil a desktop</strong>, no layouts independientes.</p>
      </div>
    </div>
  </section>`;
}

/* ------------------------------------ El rendimiento se decide en diseño */
function rendimientoSection() {
  return `<section class="section section--light" id="rendimiento" style="background:#f7f9ff">
    <div class="wrap">
      <div class="teoria-head" data-reveal>
        <span class="chip">Rendimiento</span>
        <h2>El rendimiento se trabaja desde el diseño</h2>
        <p class="lead">Las decisiones de diseño determinan el <strong>70-80 % del rendimiento</strong> antes
        de escribir una línea de código. No es «cosa de desarrollo» que se arregla al final.</p>
      </div>
      <div class="grid grid--3">
        <div data-reveal>${Card({ title: "LCP · Largest Contentful Paint", accent: true, body: `<p style="margin:0">Qué tan rápido carga el elemento más grande visible.<br><strong>Decisión de diseño:</strong> tamaño y formato de la imagen o vídeo del hero.</p>` })}</div>
        <div data-reveal>${Card({ title: "INP · Interaction to Next Paint", accent: true, body: `<p style="margin:0">Qué tan rápido responde la interfaz al interactuar.<br><strong>Decisión de diseño:</strong> cuántos elementos animados hay sobre el pliegue.</p>` })}</div>
        <div data-reveal>${Card({ title: "CLS · Cumulative Layout Shift", accent: true, body: `<p style="margin:0">Cuánto «salta» el layout mientras carga.<br><strong>Decisión de diseño:</strong> reservar espacio a imágenes, banners y fuentes.</p>` })}</div>
      </div>
      <h3 style="margin-top:var(--sp-6)" data-reveal>Decisiones de diseño que pesan</h3>
      <ul class="reto__check" style="margin-top:var(--sp-4)" data-reveal>
        <li><strong>Nº de fuentes web</strong> y sus pesos — cada familia + variante es una petición más.</li>
        <li><strong>El hero:</strong> WebP/AVIF vs. JPEG pesado; dimensiones reales vs. escaladas por CSS.</li>
        <li><strong>Autoplay de vídeo de fondo</strong> — frecuente en heroes «bonitos», carísimo en móvil.</li>
        <li><strong>Embeds de terceros</strong> (mapas, redes, chat, tracking) — JS ajeno que no controlas.</li>
        <li><strong>Above the fold:</strong> cuánto hay que cargar antes de que el usuario vea algo útil.</li>
      </ul>
      <div class="bbva-note" data-reveal>
        <p style="margin:0"><strong>Herramienta mental — presupuesto de rendimiento:</strong> fija el límite
        <em>antes</em> de diseñar (p. ej. &lt;200&nbsp;KB de imágenes en el hero, máx. 2 fuentes web), no como
        corrección posterior. Al construir el wireframe, pensad qué «pesa» y priorizad lo esencial en la primera pantalla.</p>
      </div>
    </div>
  </section>`;
}

/* ------------------- Proceso: Sketch → Wireframe → Mockup → Prototipo */
function procesoSection() {
  return `<section class="section section--light" id="proceso">
    <div class="wrap">
      <div class="teoria-head" data-reveal>
        <span class="chip">Método</span>
        <h2>El proceso: Sketch → Wireframe → Mockup → Prototipo</h2>
        <p class="lead">Cuatro etapas de <strong>fidelidad creciente</strong>. Cada una resuelve un tipo de
        duda distinto — y cambia quién valida.</p>
      </div>
      <div class="flow4" data-reveal>
        <div class="flow4__etapa">
          <span class="flow4__fid" style="width:25%"></span>
          <span class="flow4__num">Etapa 1</span>
          <h4>Sketch</h4>
          <p>Boceto muy rápido, a mano o digital, sin cuidar estética: explorar muchas ideas de estructura en poco tiempo. La fealdad es una ventaja — evita discutir estética demasiado pronto.</p>
          <span class="flow4__who">Valida: el equipo</span>
        </div>
        <div class="flow4__etapa hoy">
          <span class="flow4__fid" style="width:50%"></span>
          <span class="flow4__num">Etapa 2 · La de este bloque</span>
          <h4>Wireframe</h4>
          <p>Estructura en blanco y negro, sin contenido final ni estilo: jerarquía de la información, bloques y funcionalidades (formularios, CTAs, menús).</p>
          <span class="flow4__who">Valida: equipo + cliente (estructura, no estética)</span>
        </div>
        <div class="flow4__etapa">
          <span class="flow4__fid" style="width:75%"></span>
          <span class="flow4__num">Etapa 3</span>
          <h4>Mockup</h4>
          <p>El diseño visual final — color, tipografía, imágenes definitivas — sobre la estructura del wireframe. Estático, no interactivo.</p>
          <span class="flow4__who">Valida: estética y marca</span>
        </div>
        <div class="flow4__etapa">
          <span class="flow4__fid" style="width:100%"></span>
          <span class="flow4__num">Etapa 4</span>
          <h4>Prototipo</h4>
          <p>El mockup conectado con interacciones (clics, transiciones, estados): simula la navegación real sin programar y se testea con usuarios.</p>
          <span class="flow4__who">Valida: usuarios reales</span>
        </div>
      </div>
      <p class="d-cap" data-reveal><strong>Por qué el orden importa:</strong> invertir en mockup antes de validar
      el wireframe significa rehacer diseño visual sobre una estructura que puede cambiar. El error clásico es
      saltar al color antes de validar la estructura.</p>
    </div>
  </section>`;
}

/* --------------------------------------------------- Introducción a Figma */
function figmaSection() {
  return `<section class="section section--light" id="figma" style="background:#f7f9ff">
    <div class="wrap">
      <div class="teoria-head" data-reveal>
        <span class="chip">La herramienta</span>
        <h2>Introducción a Figma</h2>
        <p class="lead">Diseño de interfaz <strong>colaborativo y en el navegador</strong>, con edición en
        tiempo real multi-usuario — el «Google Docs del diseño». A diferencia de Sketch o Adobe XD, no hay
        que exportar ni sincronizar archivos.</p>
      </div>
      <div class="cards-grid grid grid--2">
        ${B1.figma.map((f) => `<div data-reveal>${Card({ title: f.t, body: `<p style="margin:0">${escapeHtml(f.p)}</p>` })}</div>`).join("")}
      </div>
      <h3 style="margin-top:var(--sp-6)" data-reveal>Los 5 conceptos de la interfaz</h3>
      <div class="grid grid--3" style="margin-top:var(--sp-4)">
        <div data-reveal>${Card({ title: "Frames", accent: true, body: `<p style="margin:0">Los «lienzos» que representan pantallas o tamaños de dispositivo.</p>` })}</div>
        <div data-reveal>${Card({ title: "Componentes y variantes", accent: true, body: `<p style="margin:0">Elementos reutilizables (botones, inputs, cards) que se actualizan globalmente al cambiar el original — la base de un sistema de diseño.</p>` })}</div>
        <div data-reveal>${Card({ title: "Auto Layout", accent: true, body: `<p style="margin:0">Layout tipo flexbox dentro de Figma: el componente se adapta al contenido y simula comportamiento responsive.</p>` })}</div>
        <div data-reveal>${Card({ title: "Modo Prototipo", accent: true, body: `<p style="margin:0">Conectar frames con interacciones (clic → navega, hover → cambia estado) para simular la navegación real.</p>` })}</div>
        <div data-reveal>${Card({ title: "Dev Mode", accent: true, body: `<p style="margin:0">Vista para desarrollo: medidas, espaciados, colores y código CSS/iOS/Android generado desde el diseño.</p>` })}</div>
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------- ¿Qué es un sistema de diseño? */
function sistemaDisenoSection() {
  return `<section class="section section--light" id="sistema-diseno">
    <div class="wrap">
      <div class="teoria-head" data-reveal>
        <span class="chip">Escalar el diseño</span>
        <h2>¿Qué es un sistema de diseño?</h2>
        <p class="lead">Una <strong>biblioteca viva</strong> de componentes, estilos y reglas de uso que
        garantiza coherencia entre pantallas, equipos y plataformas. En Figma se construye con
        componentes + variantes + estilos compartidos.</p>
      </div>
      <div class="grid grid--3">
        <div data-reveal>${Card({ title: "Coherencia", body: `<p style="margin:0">El mismo botón se ve y se comporta igual en toda la web y la app: la marca se percibe sólida.</p>` })}</div>
        <div data-reveal>${Card({ title: "Velocidad", body: `<p style="margin:0">No se rediseña desde cero: se compone con piezas ya validadas. Cambiar el original actualiza todo.</p>` })}</div>
        <div data-reveal>${Card({ title: "Lenguaje común", body: `<p style="margin:0">Diseño y desarrollo hablan de las mismas piezas con los mismos nombres — menos fricción, menos errores.</p>` })}</div>
      </div>
      <div class="live-card" data-reveal>
        <span class="live-card__chip">Se comparte en clase</span>
        <h4>El caso FIFA</h4>
        <p>🖥️ Un sistema de diseño real, en Figma, pieza a pieza. Se muestra en directo durante la sesión.</p>
      </div>
    </div>
  </section>`;
}

/* --------------------------------- Principios de Cialdini en un sitio web */
function cialdiniSection() {
  const P = [
    { n: "1 · Reciprocidad", d: "Dar algo de valor antes de pedir algo a cambio.", b: "Educación financiera gratuita en micro-formato (stories/reels) antes de pedir el alta — parte literal de la propuesta de valor del briefing." },
    { n: "2 · Compromiso y coherencia", d: "Un «sí» pequeño primero facilita el «sí» grande después.", b: "Onboarding con un primer paso ligero: «descubre tu perfil financiero» en 30 segundos, antes de pedir la apertura de cuenta." },
    { n: "3 · Prueba social", d: "Confiamos en lo que otros ya validaron.", b: "Testimonios afines y datos de adopción visibles: «+18M de clientes digitales», cifras del propio dossier." },
    { n: "4 · Autoridad", d: "Confiamos más en quien demuestra expertise.", b: "Sellos de seguridad y solidez del grupo (presencia en +25 países) con criterio, sin saturar de datos corporativos." },
    { n: "5 · Simpatía", d: "Confiamos más en marcas que percibimos afines.", b: "Tono, identidad y contextos que se parecen a la vida Gen Z: gaming, música, deporte — los partners del briefing." },
    { n: "6 · Escasez", d: "Lo limitado en tiempo o disponibilidad genera acción.", b: "Ventajas por tiempo limitado e incentivos gamificados — con cuidado, sin caer en dark patterns." },
    { n: "Bonus · Unidad", d: "Pertenencia a un grupo, identidad compartida (el 7º principio).", b: "Especialmente potente para Gen Z: ser miembro de un «club» de la marca, no solo cliente." },
  ];
  return `<section class="section section--light" id="cialdini" style="background:#f7f9ff">
    <div class="wrap">
      <div class="teoria-head" data-reveal>
        <span class="chip">Persuasión</span>
        <h2>Los principios de Cialdini aplicados a un sitio web</h2>
        <p class="lead">Robert Cialdini (<em>Influence</em>, 1984) describió por qué decimos «sí».
        Cada principio se puede <strong>diseñar deliberadamente</strong> en una interfaz — aquí, siempre
        aplicado a la web de ${escapeHtml(MODULO.cliente)} para la Gen Z.</p>
      </div>
      <div class="grid grid--2">
        ${P.map((p) => `<div data-reveal>${Card({
          title: p.n,
          accent: true,
          body: `<p style="margin:0 0 var(--sp-3)">${escapeHtml(p.d)}</p>
                 <p style="margin:0;font-size:.88rem"><strong style="color:#1464f4">En la web ${escapeHtml(MODULO.cliente)} Gen Z:</strong> ${escapeHtml(p.b)}</p>`,
        })}</div>`).join("")}
      </div>
      <div class="bbva-note" data-reveal style="border-left-color:var(--c-ink)">
        <p style="margin:0"><strong style="color:var(--c-ink)">Persuasión, no manipulación.</strong> La línea la marca la
        transparencia: escasez real (una promo que de verdad termina) sí; falsa urgencia (el contador que se
        reinicia) es un dark pattern — y la Gen Z los detecta.</p>
      </div>
    </div>
  </section>`;
}

/* --------------------------------- Práctica: wireframe dentro de Figma */
function practicaSection() {
  return `<section class="section section--light" id="practica">
    <div class="wrap">
      <div class="teoria-head" data-reveal>
        <span class="chip">Manos a la obra</span>
        <h2>Construcción de un wireframe en Figma</h2>
        <p class="lead">La práctica del bloque, alineada con el entregable TE2 del manual.</p>
      </div>
      <div class="grid grid--2" style="align-items:start">
        <div data-reveal>${Card({ title: "Instrucciones", accent: true, body: `
          <ul class="uxui__list" style="margin-top:var(--sp-2)">
            <li>Partid del <strong>árbol de contenidos</strong> visto en la sección de arquitectura.</li>
            <li>Al menos las <strong>5 pantallas mínimas</strong> del manual: inicio, servicios, sobre nosotros, casos de éxito, contacto.</li>
            <li><strong>Mobile-first:</strong> empezad por el frame de móvil, no por desktop.</li>
            <li>Un archivo de Figma <strong>compartido por grupo</strong>: todos editáis a la vez.</li>
          </ul>` })}</div>
        <div data-reveal>${Card({ title: "Cada pantalla debe tener", accent: true, body: `
          <ul class="uxui__list" style="margin-top:var(--sp-2)">
            <li><strong>Jerarquía clara</strong> de la información.</li>
            <li><strong>CTA principal visible sin scroll.</strong></li>
            <li>Al menos una <strong>funcionalidad del buyer persona</strong> (formulario, chat, simulador…).</li>
            <li>Un principio de <strong>Cialdini aplicado de forma consciente.</strong></li>
          </ul>` })}</div>
      </div>
      <div class="row" style="margin-top:var(--sp-5)" data-reveal>
        ${Button({ label: "Abrir Figma", href: "https://figma.com", variant: "primary", extra: { target: "_blank", rel: "noopener noreferrer" } })}
        ${Button({ label: "Ver el reto completo", href: "#reto", variant: "secondary" })}
      </div>
    </div>
  </section>`;
}

/* ---------------------------------------------------- Conceptos clave */
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
  return `<section class="section section--light" id="recursos" style="background:#f7f9ff">
    <div class="wrap">
      <div class="teoria-head" data-reveal>
        <span class="chip">Para ir más lejos</span>
        <h2>Recursos</h2>
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
      { label: "Arquitectura", href: "#arquitectura" },
      { label: "Práctica", href: "#practica" },
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
  timelineSection(),
  arquitecturaSection(),
  mobileFirstSection(),
  responsiveSection(),
  rendimientoSection(),
  procesoSection(),
  figmaSection(),
  sistemaDisenoSection(),
  cialdiniSection(),
  conceptosSection(),
  practicaSection(),
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

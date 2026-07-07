/* =========================================================================
   b2.js — Bloque 2: Tecnologías para la construcción de un sitio web.
   Historia scrollytelling "¿Qué pasa cuando pulsas Enter?" (dominio → SSL →
   hosting → frontend) + temario: dominios, certificados, hosting, lenguajes,
   soluciones (SaaS/CMS/a medida y vibe-coding), flujo Claude Design → Claude
   Code, GitHub, GitHub Pages y Vercel, y el reto BBVA del bloque.
   ========================================================================= */
import { Header, Card, Chip, Button, Badge, escapeHtml } from "../components/index.js";
import { MODULO, PROFESOR, BLOQUES } from "../data/contenido.js";
import { initScrolly, initProgressBar } from "./scrolly.js";
import { initReveal } from "./reveal.js";

const bloque = BLOQUES[1];
const WEB_EJEMPLO = "https://carlosjavierrodriguezchamizo.github.io/proyecto-web/";

/* ----------------------------------------------------- Lienzo (SVG sticky)
   Un navegador donde se revela lo que ocurre tras pulsar Enter: DNS, canal
   cifrado, servidor que responde y frontend que se pinta. Las escenas las
   gobierna b2.css vía [data-scene]; el marco reutiliza scrolly.css.        */
function stageSvg() {
  return `<div class="scrolly__stage">
    <svg class="scrolly__svg" viewBox="0 0 760 600" role="img"
         aria-label="Lo que ocurre al visitar una web: el DNS traduce el dominio a una IP, se cifra el canal, el servidor responde y el navegador pinta HTML, CSS y JavaScript.">
      <defs>
        <marker id="t2-flecha" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill="rgba(0,19,63,.6)"/>
        </marker>
        <marker id="t2-flecha-azul" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill="#0047e9"/>
        </marker>
      </defs>

      <!-- Marco de navegador (clases de scrolly.css, siempre visible) -->
      <g class="w-frame">
        <rect class="w-frame__glow" x="84" y="74" width="592" height="452" rx="16"/>
        <rect class="w-frame__body" x="90" y="80" width="580" height="440" rx="12"/>
        <rect class="w-frame__bar" x="90" y="80" width="580" height="36" rx="12"/>
        <rect class="w-frame__bar" x="90" y="104" width="580" height="12"/>
        <circle class="w-frame__dot" cx="112" cy="98" r="5"/>
        <circle class="w-frame__dot" cx="130" cy="98" r="5"/>
        <circle class="w-frame__dot" cx="148" cy="98" r="5"/>
        <!-- Barra de direcciones: la premisa de toda la historia -->
        <rect x="170" y="87" width="410" height="22" rx="11" fill="#fff" stroke="rgba(0,19,63,.15)"/>
        <g class="t2-url__lock">
          <rect x="184" y="94" width="9" height="7" rx="1.5" fill="#0a826e"/>
          <path d="M186 94v-2.2a2.5 2.5 0 0 1 5 0V94" fill="none" stroke="#0a826e" stroke-width="1.4"/>
        </g>
        <text x="202" y="102" font-size="12.5" fill="rgba(0,19,63,.65)" font-family="monospace">https://genz.bbva.es</text>
      </g>

      <!-- Escena 2 · Dominio / DNS -->
      <g class="t2-dns">
        <rect class="t2-node" x="135" y="225" width="160" height="42" rx="21"/>
        <text class="t2-label" x="215" y="251">genz.bbva.es</text>
        <path class="t2-arrow" d="M300 246h115"/>
        <text class="t2-cap" x="357" y="236">¿quién es?</text>
        <rect class="t2-node" x="425" y="205" width="130" height="86" rx="12"/>
        <text class="t2-label" x="490" y="242" style="font-size:17px">DNS</text>
        <text class="t2-cap" x="490" y="262">la «guía telefónica»</text>
        <text class="t2-cap" x="490" y="278">de internet</text>
        <path class="t2-arrow t2-arrow--dash" d="M425 300 C 370 330, 310 330, 300 322"/>
        <rect class="t2-node t2-node--solid" x="135" y="305" width="160" height="38" rx="19"/>
        <text class="t2-label" x="215" y="329" style="fill:#fff">76.76.21.21</text>
        <text class="t2-cap" x="380" y="420">El nombre que compras se traduce a la dirección IP</text>
        <text class="t2-cap" x="380" y="438">del servidor donde vive tu web.</text>
      </g>

      <!-- Escena 3 · SSL / canal cifrado -->
      <g class="t2-ssl">
        <rect class="t2-node" x="140" y="255" width="96" height="70" rx="10"/>
        <rect x="140" y="255" width="96" height="16" rx="8" fill="rgba(0,71,233,.2)" stroke="none"/>
        <text class="t2-cap" x="188" y="345">tu navegador</text>
        <rect class="t2-node" x="524" y="245" width="76" height="92" rx="10"/>
        <circle cx="540" cy="264" r="3.5" fill="#0047e9"/><circle cx="540" cy="286" r="3.5" fill="#0047e9"/><circle cx="540" cy="308" r="3.5" fill="rgba(0,19,63,.3)"/>
        <line x1="554" y1="264" x2="586" y2="264" stroke="rgba(0,19,63,.25)" stroke-width="3"/>
        <line x1="554" y1="286" x2="586" y2="286" stroke="rgba(0,19,63,.25)" stroke-width="3"/>
        <line x1="554" y1="308" x2="586" y2="308" stroke="rgba(0,19,63,.25)" stroke-width="3"/>
        <text class="t2-cap" x="562" y="357">el servidor</text>
        <line x1="242" y1="290" x2="518" y2="290" stroke="#0047e9" stroke-width="3" stroke-dasharray="8 7"/>
        <rect x="352" y="272" width="56" height="40" rx="8" fill="#0a826e"/>
        <path d="M366 272v-8a14 14 0 0 1 28 0v8" fill="none" stroke="#0a826e" stroke-width="5"/>
        <circle cx="380" cy="290" r="5" fill="#fff"/>
        <rect x="377.5" y="292" width="5" height="9" rx="2.5" fill="#fff"/>
        <text class="t2-cap" x="380" y="400">Nada viaja en claro: navegador y servidor</text>
        <text class="t2-cap" x="380" y="418">acuerdan un cifrado antes del primer byte.</text>
      </g>

      <!-- Escena 4 · Hosting / el servidor responde -->
      <g class="t2-host">
        <g>
          <rect class="t2-node" x="450" y="180" width="150" height="46" rx="8"/>
          <circle cx="472" cy="203" r="4" fill="rgba(0,19,63,.25)"/><line x1="490" y1="203" x2="580" y2="203" stroke="rgba(0,19,63,.2)" stroke-width="3"/>
          <rect x="450" y="236" width="150" height="46" rx="8" fill="rgba(0,71,233,.12)" stroke="#0047e9" stroke-width="2.5"/>
          <circle cx="472" cy="259" r="4" fill="#0047e9"/><line x1="490" y1="259" x2="580" y2="259" stroke="rgba(0,71,233,.45)" stroke-width="3"/>
          <rect class="t2-node" x="450" y="292" width="150" height="46" rx="8"/>
          <circle cx="472" cy="315" r="4" fill="rgba(0,19,63,.25)"/><line x1="490" y1="315" x2="580" y2="315" stroke="rgba(0,19,63,.2)" stroke-width="3"/>
        </g>
        <text class="t2-cap" x="525" y="368">tu web vive aquí, encendida 24/7</text>
        <path class="t2-arrow t2-arrow--dash" d="M444 259 C 360 259, 330 280, 292 292"/>
        <rect class="t2-node" x="160" y="272" width="120" height="130" rx="10"/>
        <rect x="176" y="292" width="60" height="10" rx="4" fill="rgba(0,71,233,.5)"/>
        <rect x="176" y="312" width="88" height="7" rx="3.5" fill="rgba(0,19,63,.18)"/>
        <rect x="176" y="327" width="76" height="7" rx="3.5" fill="rgba(0,19,63,.18)"/>
        <rect x="176" y="342" width="84" height="7" rx="3.5" fill="rgba(0,19,63,.18)"/>
        <rect x="176" y="365" width="52" height="16" rx="8" fill="rgba(0,71,233,.4)"/>
        <text class="t2-cap" x="220" y="425">index.html + assets</text>
      </g>

      <!-- Escenas 5-6 · Frontend: HTML estructura, CSS viste, JS da vida -->
      <g class="t2-front">
        <g font-family="monospace" font-size="13" font-weight="700">
          <text x="150" y="215" fill="#c0392b">&lt;html&gt;</text>
          <text x="150" y="243" fill="rgba(0,19,63,.55)">estructura</text>
          <text x="150" y="295" fill="#0047e9">css {}</text>
          <text x="150" y="323" fill="rgba(0,19,63,.55)">estilo</text>
          <text x="150" y="375" fill="#6a2cf5">js()</text>
          <text x="150" y="403" fill="rgba(0,19,63,.55)">interacción</text>
        </g>
        <g>
          <rect class="t2-node" x="300" y="170" width="330" height="280" rx="12" style="fill:#fff"/>
          <rect class="t2-box t2-box--nav" x="318" y="188" width="294" height="26" rx="5"/>
          <rect class="t2-box t2-box--hero" x="318" y="226" width="188" height="92" rx="7"/>
          <rect class="t2-box" x="518" y="226" width="94" height="92" rx="7"/>
          <rect class="t2-box" x="318" y="330" width="140" height="62" rx="7"/>
          <rect class="t2-box" x="472" y="330" width="140" height="62" rx="7"/>
          <circle class="t2-pulse" cx="382" cy="420" r="16"/>
          <rect class="t2-box t2-box--cta" x="318" y="406" width="128" height="28" rx="14"/>
        </g>
        <text class="t2-cap" x="465" y="478">Tres capas, una página.</text>
      </g>
    </svg>

    <!-- Escena 1 · overlay: la pregunta que abre el bloque -->
    <div class="stage-overlay">
      <p class="o-q">Escribes genz.bbva.es<br>y pulsas Enter. ¿Qué pasa?</p>
      <div class="o-kpis">
        <div><div class="o-num">4</div><div class="o-lab">paradas invisibles</div></div>
        <div><div class="o-num">1</div><div class="o-lab">candado</div></div>
        <div><div class="o-num">~300</div><div class="o-lab">milisegundos</div></div>
      </div>
    </div>
  </div>`;
}

/* Pasos de la historia */
const STEPS = [
  { s: 1, k: "El misterio", h: "Pulsas Enter. ¿Y ahora qué?", p: "En unos 300 milisegundos pasan cuatro cosas invisibles: se resuelve un nombre, se cifra un canal, responde una máquina y el navegador pinta la página. Ese recorrido completo es «el stack» — y hoy aprendes a elegir cada pieza." },
  { s: 2, k: "Parada 1 · El dominio", h: "Un nombre que apunta a una máquina", p: "genz.bbva.es no es la web: es un nombre alquilado que el DNS traduce a la dirección IP del servidor donde vive. Sin dominio no hay marca que se pueda escribir." },
  { s: 3, k: "Parada 2 · El certificado", h: "SSL: el canal se cifra", p: "Antes de enviar un solo byte, navegador y servidor acuerdan un cifrado. El candado no es decoración: sin HTTPS no hay banco, no hay pagos y Google te marca como «no seguro»." },
  { s: 4, k: "Parada 3 · El hosting", h: "Una máquina encendida 24/7", p: "Tu web son ficheros que alguien tiene que servir a cualquier hora. Compartido, VPS o dedicado: son distintas formas de pagar por esa máquina y por su potencia." },
  { s: 5, k: "Parada 4 · El frontend", h: "HTML estructura, CSS viste, JS da vida", p: "El navegador recibe la estructura (HTML), le aplica el estilo (CSS) y le añade el comportamiento (JS). Todo lo que ves en cualquier pantalla es la suma de esas tres capas." },
  { s: 6, k: "Tu turno", h: "Hoy eliges tu stack", p: "Dominio, certificado, hosting, lenguajes y plataforma de despliegue: el reto del bloque es elegir cada pieza para la web de BBVA — y saber defender la elección." },
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

/* ------------------------------------------------------------- Dominios */
function dominiosSection() {
  return `<section class="section section--light" id="dominios">
    <div class="wrap">
      <div class="teoria-head" data-reveal>
        <span class="chip">1 · La dirección</span>
        <h2>Dominios</h2>
        <p class="lead">Un dominio es el <strong>nombre único</strong> que identifica tu web en internet.
        No se compra para siempre: se <strong>registra por años</strong> (y se renueva) a través de un registrador
        acreditado. Es la primera decisión de marca del proyecto.</p>
      </div>

      <div data-reveal>
        <div class="url-anat" aria-label="Anatomía de una URL: protocolo, subdominio, dominio y extensión">
          <span class="url-anat__seg url-anat__seg--proto"><span class="url-anat__txt">https://</span><small>protocolo</small></span>
          <span class="url-anat__seg url-anat__seg--sub"><span class="url-anat__txt">genz</span><small>subdominio</small></span>
          <span class="url-anat__seg url-anat__seg--proto"><span class="url-anat__txt">.</span><small>&nbsp;</small></span>
          <span class="url-anat__seg url-anat__seg--dom"><span class="url-anat__txt">bbva</span><small>dominio</small></span>
          <span class="url-anat__seg url-anat__seg--tld"><span class="url-anat__txt">.es</span><small>extensión (TLD)</small></span>
        </div>
      </div>

      <h3 style="margin-top:var(--sp-7)" data-reveal>Extensiones: qué transmite cada una</h3>
      <div class="grid grid--3">
        <div data-reveal>${Card({ title: "Genéricas (gTLD)", accent: true, body: `<p style="margin:0"><strong>.com</strong> (el estándar global), .org (organizaciones), .net. Si el .com está libre, casi siempre es la opción segura.</p>` })}</div>
        <div data-reveal>${Card({ title: "Territoriales (ccTLD)", accent: true, body: `<p style="margin:0"><strong>.es</strong>, .fr, .de, .mx… Señalan país: útiles si el negocio es local y refuerzan la orientación geográfica en SEO.</p>` })}</div>
        <div data-reveal>${Card({ title: "Nuevas", accent: true, body: `<p style="margin:0"><strong>.io, .app, .dev, .ai, .shop</strong>… Tono tech o sectorial. Ojo: .app y .dev obligan a HTTPS por diseño.</p>` })}</div>
      </div>

      <h3 style="margin-top:var(--sp-7)" data-reveal>Dónde se compran</h3>
      <p data-reveal style="max-width:46rem">En un <strong>registrador</strong>: Namecheap, Cloudflare Registrar, IONOS, OVH,
      GoDaddy o Squarespace Domains, entre otros. Un .com o .es ronda los <strong>10-20 € al año</strong>.
      Consejo de agencia: registrad el dominio <strong>a nombre del cliente</strong>, no de la agencia — y activad la renovación automática.</p>

      <h3 style="margin-top:var(--sp-6)" data-reveal>Subdominios</h3>
      <div class="grid grid--2" style="align-items:start">
        <div data-reveal>${Card({ title: "Qué son", body: `<p style="margin:0">Prefijos que cuelgan de tu dominio: <strong>genz.bbva.es</strong>, blog.marca.es, app.marca.es. Se crean <strong>gratis</strong> en el panel DNS del dominio — no se compran.</p>` })}</div>
        <div data-reveal>${Card({ title: "Subdominio vs. subcarpeta", body: `<p style="margin:0"><strong>genz.bbva.es</strong> aísla el proyecto (otra web, otro hosting posible); <strong>bbva.es/genz</strong> hereda directamente la autoridad SEO del dominio. Es una decisión de arquitectura, no un capricho.</p>` })}</div>
      </div>

      <div class="bbva-note" data-reveal>
        <p style="margin:0"><strong>Decisión para el reto:</strong> ¿vuestra propuesta vive en un dominio nuevo
        (marca nueva → nombre nuevo), en un subdominio de ${escapeHtml(MODULO.cliente)} o en una subcarpeta?
        Cada opción dice algo distinto de la marca.</p>
      </div>
    </div>
  </section>`;
}

/* --------------------------------------------------------------- SSL */
function sslSection() {
  return `<section class="section section--light" id="ssl" style="background:#f7f9ff">
    <div class="wrap">
      <div class="teoria-head" data-reveal>
        <span class="chip">2 · El candado</span>
        <h2>Certificado SSL</h2>
        <p class="lead">El certificado SSL/TLS es lo que convierte <strong>http://</strong> en
        <strong>https://</strong>: cifra la comunicación entre el navegador y el servidor y acredita que
        el dominio es quien dice ser. Hoy no es opcional — Chrome marca «no seguro» sin él y es señal SEO.</p>
      </div>
      <div data-reveal>
        <table class="tablon">
          <tr><th></th><th>Let's Encrypt (gratuito)</th><th>De pago (DigiCert, Sectigo…)</th></tr>
          <tr><td>Precio</td><td>0 € — proyecto sin ánimo de lucro</td><td>Desde ~50 € hasta cientos de €/año</td></tr>
          <tr><td>Validación</td><td>De dominio (DV): demuestra que controlas el dominio</td><td>DV, de organización (OV) o extendida (EV): verifican la empresa</td></tr>
          <tr><td>Emisión y renovación</td><td>Automáticas (cada 90 días, sin tocar nada)</td><td>Manual o gestionada; duración 1 año</td></tr>
          <tr><td>Garantía y soporte</td><td>Sin garantía económica ni soporte dedicado</td><td>Garantía ante fallos de emisión + soporte</td></tr>
          <tr><td>Para quién</td><td>La inmensa mayoría de webs — incluida la vuestra</td><td>Banca, seguros y corporaciones con requisitos de compliance</td></tr>
        </table>
      </div>
      <p class="d-cap" data-reveal>En la práctica: los hostings modernos y plataformas como GitHub Pages, Vercel
      o Netlify <strong>incluyen y renuevan el certificado automáticamente</strong>. Si en 2026 una web os pide
      instalar el SSL a mano, sospechad del hosting.</p>
    </div>
  </section>`;
}

/* ------------------------------------------------------------- Hosting */
function hostingSection() {
  return `<section class="section section--light" id="hosting">
    <div class="wrap">
      <div class="teoria-head" data-reveal>
        <span class="chip">3 · La máquina</span>
        <h2>Hosting: del compartido al dedicado</h2>
        <p class="lead">El hosting es el <strong>ordenador siempre encendido</strong> donde viven tus ficheros.
        La metáfora que no falla es la vivienda: piso compartido, apartamento propio o casa entera.</p>
      </div>
      <div class="flow4 flow4--3" data-reveal>
        <div class="flow4__etapa">
          <span class="flow4__fid" style="width:33%"></span>
          <span class="flow4__num">Nivel 1 · el piso compartido</span>
          <h4>Hosting compartido</h4>
          <p>Cientos de webs en el mismo servidor compartiendo recursos. Barato (3-10 €/mes), con panel tipo cPanel y WordPress con un clic. Si un vecino consume mucho, tu web lo nota.</p>
          <span class="flow4__who">Para: webs pequeñas y primeros proyectos</span>
        </div>
        <div class="flow4__etapa">
          <span class="flow4__fid" style="width:66%"></span>
          <span class="flow4__num">Nivel 2 · tu apartamento</span>
          <h4>VPS (servidor virtual)</h4>
          <p>Una porción garantizada de un servidor físico, con acceso root: instalas lo que quieras y escalas recursos. 5-40 €/mes — pero la administración es cosa tuya.</p>
          <span class="flow4__who">Para: proyectos en crecimiento con equipo técnico</span>
        </div>
        <div class="flow4__etapa">
          <span class="flow4__fid" style="width:100%"></span>
          <span class="flow4__num">Nivel 3 · la casa entera</span>
          <h4>Servidor dedicado</h4>
          <p>Una máquina física completa para ti: máximo rendimiento, control y aislamiento. 80-300+ €/mes y requiere administración profesional.</p>
          <span class="flow4__who">Para: alto tráfico y requisitos estrictos</span>
        </div>
      </div>
      <p class="d-cap" data-reveal>La evolución natural de esta escalera es el <strong>cloud y las plataformas
      de despliegue</strong> (GitHub Pages, Vercel, Netlify): no alquilas una máquina, pagas por lo que la web
      consume — o nada. Lo vemos al final del bloque.</p>
    </div>
  </section>`;
}

/* -------------------------------------------------- Lenguajes de programación */
function lenguajesSection() {
  return `<section class="section section--light" id="lenguajes" style="background:#f7f9ff">
    <div class="wrap">
      <div class="teoria-head" data-reveal>
        <span class="chip">4 · El código</span>
        <h2>Lenguajes: frontend y backend</h2>
        <p class="lead"><strong>Frontend</strong> es lo que se ejecuta en el navegador del usuario;
        <strong>backend</strong>, lo que se ejecuta en el servidor (lógica de negocio, usuarios, base de datos).
        Una landing puede vivir solo de frontend; una app necesita los dos.</p>
      </div>

      <h3 data-reveal>El trío del frontend</h3>
      <div class="grid grid--3">
        <div data-reveal>${Card({ title: "HTML", accent: true, body: `<p style="margin:0"><strong>La estructura.</strong> Qué hay en la página y en qué orden: títulos, párrafos, imágenes, enlaces, formularios. El esqueleto semántico.</p>` })}</div>
        <div data-reveal>${Card({ title: "CSS", accent: true, body: `<p style="margin:0"><strong>El estilo.</strong> Color, tipografía, espaciado y layout — incluido el responsive con media queries que visteis en el Bloque 1.</p>` })}</div>
        <div data-reveal>${Card({ title: "JavaScript", accent: true, body: `<p style="margin:0"><strong>El comportamiento.</strong> Todo lo que reacciona: menús, validaciones, animaciones, datos en vivo. El único lenguaje de programación del navegador.</p>` })}</div>
      </div>

      <h3 style="margin-top:var(--sp-6)" data-reveal>Frameworks de JavaScript</h3>
      <p data-reveal style="max-width:46rem">Para aplicaciones grandes, JS «a pelo» se queda corto: los frameworks
      organizan la interfaz en <strong>componentes reutilizables</strong> (la misma idea que visteis en Figma).</p>
      <div class="grid grid--4">
        <div data-reveal>${Card({ title: "React", body: `<p style="margin:0">De Meta. El más usado y el que más mercado laboral mueve. Ecosistema enorme (Next.js).</p>` })}</div>
        <div data-reveal>${Card({ title: "Vue", body: `<p style="margin:0">Progresivo y con la curva de entrada más suave. Muy popular en Europa y Asia (Nuxt).</p>` })}</div>
        <div data-reveal>${Card({ title: "Angular", body: `<p style="margin:0">De Google. Completo y opinionado: frecuente en entornos corporativos y banca.</p>` })}</div>
        <div data-reveal>${Card({ title: "Svelte", body: `<p style="margin:0">Compila a JS puro: menos peso en el navegador. El favorito emergente de los desarrolladores.</p>` })}</div>
      </div>

      <h3 style="margin-top:var(--sp-6)" data-reveal>Y en el backend</h3>
      <p data-reveal style="max-width:46rem">Lo nombramos para que os suene: <strong>PHP</strong> (mueve WordPress y
      buena parte de la web), <strong>Python</strong>, <strong>Node.js</strong> (JavaScript también en el servidor),
      <strong>Java/C#</strong> en gran empresa — y una base de datos detrás (MySQL, PostgreSQL). En este máster
      no programaréis backend: os basta con saber qué es y quién lo habla.</p>
    </div>
  </section>`;
}

/* ------------------------------------- Soluciones: SaaS, CMS y a medida */
function solucionesSection() {
  const VIBE = [
    { t: "Lovable", p: "Describe la app en un chat y genera el producto completo (front, back y despliegue)." },
    { t: "Supabase", p: "El backend listo para usar: base de datos, autenticación y APIs sin montarlas tú." },
    { t: "Netlify", p: "Despliegue y hosting moderno para webs y apps, conectado a tu repositorio." },
    { t: "Cursor", p: "Editor de código con IA integrada: autocompleta, refactoriza y explica." },
    { t: "Codex", p: "El agente de programación de OpenAI: le encargas tareas y trabaja sobre tu repo." },
    { t: "Antigravity", p: "El entorno agéntico de Google: varios agentes trabajando sobre el proyecto." },
    { t: "Claude Code", p: "El agente de Anthropic en terminal e IDE. Con él está construida esta misma web.", destacada: true },
  ];
  return `<section class="section section--light" id="soluciones">
    <div class="wrap">
      <div class="teoria-head" data-reveal>
        <span class="chip">5 · Las soluciones</span>
        <h2>SaaS, CMS o desarrollo a medida</h2>
        <p class="lead">No siempre se programa desde cero. El espectro va de <strong>alquilar una plataforma</strong>
        a <strong>construirlo todo</strong> — y la elección correcta depende del proyecto, no de la moda.</p>
      </div>
      <div class="flow4 flow4--3" data-reveal>
        <div class="flow4__etapa">
          <span class="flow4__fid" style="width:33%"></span>
          <span class="flow4__num">Control bajo · velocidad alta</span>
          <h4>SaaS</h4>
          <p>Wix, Squarespace, Shopify. Alquilas la plataforma: en horas tienes web, pero juegas con sus reglas y sus plantillas.</p>
          <span class="flow4__who">Para: validar rápido, e-commerce estándar</span>
        </div>
        <div class="flow4__etapa">
          <span class="flow4__fid" style="width:66%"></span>
          <span class="flow4__num">El punto medio</span>
          <h4>CMS</h4>
          <p><strong>WordPress</strong> (≈4 de cada 10 webs del mundo), Drupal, Joomla. Instalas, eliges tema y plugins, y personalizas. Es lo que usaréis en TE3.</p>
          <span class="flow4__who">Para: la mayoría de webs de contenido y corporativas</span>
        </div>
        <div class="flow4__etapa">
          <span class="flow4__fid" style="width:100%"></span>
          <span class="flow4__num">Control total · coste alto</span>
          <h4>Desarrollo a medida</h4>
          <p>Código propio con los lenguajes y frameworks de la sección anterior. Máxima libertad — y la tendencia que lo está cambiando todo: el vibe-coding.</p>
          <span class="flow4__who">Para: producto digital diferencial</span>
        </div>
      </div>

      <h3 style="margin-top:var(--sp-7)" data-reveal>La tendencia: vibe-coding</h3>
      <p data-reveal style="max-width:46rem">Describir lo que quieres <strong>en lenguaje natural</strong> y que un
      agente de IA escriba, ejecute y corrija el código. El desarrollo a medida deja de ser solo para programadores —
      pero exige saber <strong>qué pedir y cómo evaluar el resultado</strong> (todo lo que estáis aprendiendo).</p>
      <div class="grid grid--4" style="margin-top:var(--sp-4)">
        ${VIBE.map((v) => `<div data-reveal>${Card({ title: v.t, extra: v.destacada ? { style: "border:2px solid var(--c-accent-blue)" } : {}, body: `<p style="margin:0">${escapeHtml(v.p)}</p>` })}</div>`).join("")}
      </div>
      <div class="bbva-note" data-reveal>
        <p style="margin:0"><strong>Decisión para el reto:</strong> ¿la landing de ${escapeHtml(MODULO.cliente)} Gen Z
        se hace en SaaS, en WordPress o a medida con vibe-coding? No hay respuesta única — hay decisiones bien
        y mal defendidas.</p>
      </div>
    </div>
  </section>`;
}

/* --------------------------------- Flujo: Claude Design → Claude Code */
function flujoClaudeSection() {
  return `<section class="section section--light" id="flujo" style="background:#f7f9ff">
    <div class="wrap">
      <div class="teoria-head" data-reveal>
        <span class="chip">6 · El flujo de trabajo</span>
        <h2>De Claude Design a Claude Code</h2>
        <p class="lead">El flujo que usaremos en clase para pasar <strong>de la idea a la web publicada</strong>
        sin escribir código a mano — pero tomando todas las decisiones de diseño nosotros.</p>
      </div>
      <div class="flow4 flow4--5" data-reveal>
        <div class="flow4__etapa">
          <span class="flow4__fid"></span>
          <span class="flow4__num">Paso 1</span>
          <h4>Brief y diseño</h4>
          <p>Describes el producto a Claude y generas el diseño: estructura, estilo y contenido (Claude Design).</p>
        </div>
        <div class="flow4__etapa">
          <span class="flow4__fid"></span>
          <span class="flow4__num">Paso 2</span>
          <h4>Del diseño al código</h4>
          <p>Claude Code convierte ese diseño en un proyecto real multi-fichero (HTML, CSS, JS) en tu máquina.</p>
        </div>
        <div class="flow4__etapa">
          <span class="flow4__fid"></span>
          <span class="flow4__num">Paso 3</span>
          <h4>Itera conversando</h4>
          <p>«Cambia el color», «añade una sección», «elimina esa frase»: cada cambio, en lenguaje natural.</p>
        </div>
        <div class="flow4__etapa">
          <span class="flow4__fid"></span>
          <span class="flow4__num">Paso 4</span>
          <h4>Versiona en GitHub</h4>
          <p>Cada avance queda registrado como un commit: historial completo y marcha atrás garantizada.</p>
        </div>
        <div class="flow4__etapa">
          <span class="flow4__fid"></span>
          <span class="flow4__num">Paso 5</span>
          <h4>Publica</h4>
          <p>GitHub Pages o Vercel despliegan la web con cada push. De la idea a producción, el mismo día.</p>
        </div>
      </div>
      <div class="bbva-note" data-reveal>
        <p style="margin:0"><strong>Meta-ejemplo:</strong> la web que estáis leyendo ahora mismo se ha construido
        exactamente con este flujo — diseño con Claude, código con Claude Code, versionado en GitHub y
        despliegue automático en GitHub Pages.</p>
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------------------------- GitHub */
function githubSection() {
  return `<section class="section section--light" id="github">
    <div class="wrap">
      <div class="teoria-head" data-reveal>
        <span class="chip">7 · El almacén</span>
        <h2>GitHub: qué es y para qué sirve</h2>
        <p class="lead">La plataforma donde vive el código del mundo. Combina <strong>Git</strong> (control de
        versiones: el historial completo de cambios de un proyecto) con una capa social y de colaboración.</p>
      </div>
      <div class="grid grid--3">
        <div data-reveal>${Card({ title: "Historial y marcha atrás", accent: true, body: `<p style="margin:0">Cada cambio queda registrado como un <strong>commit</strong>. Si algo se rompe, vuelves a cualquier punto anterior. Se acabó el «web_final_v3_DEFINITIVA».</p>` })}</div>
        <div data-reveal>${Card({ title: "Colaboración", accent: true, body: `<p style="margin:0">Varias personas sobre el mismo proyecto sin pisarse: ramas, <strong>pull requests</strong> y revisión de cambios antes de mezclar.</p>` })}</div>
        <div data-reveal>${Card({ title: "Portfolio profesional", accent: true, body: `<p style="margin:0">Tu perfil de GitHub es tu carta de presentación técnica: los reclutadores lo miran. Cada proyecto del máster puede sumar.</p>` })}</div>
      </div>
      <div class="row" style="margin-top:var(--sp-5)" data-reveal>
        ${Chip({ label: "repositorio · el proyecto", outline: true })}
        ${Chip({ label: "commit · un cambio guardado", outline: true })}
        ${Chip({ label: "push · subir los cambios", outline: true })}
        ${Chip({ label: "branch · una línea de trabajo", outline: true })}
        ${Chip({ label: "pull request · proponer y revisar", outline: true })}
      </div>

      <h3 style="margin-top:var(--sp-6)" data-reveal>Cómo lo activamos en Claude Code</h3>
      <div data-reveal>${Card({ body: `
        <ol style="margin:0; padding-left:1.2em; display:grid; gap:.6em">
          <li>Crea tu cuenta gratuita en <strong>github.com</strong>.</li>
          <li>En Claude Code, pídeselo en lenguaje natural: <em>«inicializa git y crea el repositorio en GitHub»</em>.</li>
          <li>La primera vez te pedirá autenticarte (clave SSH o el CLI oficial <strong>gh</strong>) — se hace una sola vez.</li>
          <li>A partir de ahí: <em>«sube los cambios»</em> = commit + push. Y si el despliegue está conectado, publicar.</li>
        </ol>` })}</div>
    </div>
  </section>`;
}

/* ------------------------------------- Despliegue: GitHub Pages y Vercel */
function despliegueSection() {
  return `<section class="section section--light" id="despliegue" style="background:#f7f9ff">
    <div class="wrap">
      <div class="teoria-head" data-reveal>
        <span class="chip">8 y 9 · Publicar</span>
        <h2>Desplegar: GitHub Pages y Vercel</h2>
        <p class="lead">Publicar ya no es «subir por FTP»: conectas el repositorio y <strong>cada push despliega
        solo</strong>. Dos plataformas cubren casi todos los casos del máster.</p>
      </div>
      <div class="grid grid--2" style="align-items:start">
        <div data-reveal>${Card({ title: "GitHub Pages — para webs", accent: true, body: `
          <p style="margin:0 0 var(--sp-3)">Hosting <strong>estático y gratuito</strong> integrado en GitHub. HTTPS incluido y URL del tipo <em>usuario.github.io/proyecto</em>.</p>
          <ol style="margin:0; padding-left:1.2em; display:grid; gap:.5em; font-size:.92rem">
            <li>Repositorio público en GitHub.</li>
            <li>Settings → Pages → Source: <strong>GitHub Actions</strong>.</li>
            <li>Cada push a <em>main</em> publica la web (~1 minuto).</li>
          </ol>
          <p style="margin:var(--sp-3) 0 0; font-size:.88rem"><a href="${escapeHtml(WEB_EJEMPLO)}" target="_blank" rel="noopener noreferrer">Ejemplo real: esta misma web ↗</a></p>` })}</div>
        <div data-reveal>${Card({ title: "Vercel — para aplicaciones", accent: true, body: `
          <p style="margin:0 0 var(--sp-3)">Plataforma de despliegue para <strong>aplicaciones con framework</strong> (Next.js, Vue, React…): build automática, funciones de servidor y dominios propios.</p>
          <ol style="margin:0; padding-left:1.2em; display:grid; gap:.5em; font-size:.92rem">
            <li>vercel.com → <strong>Import Git Repository</strong>.</li>
            <li>Detecta el framework y construye sola.</li>
            <li>Cada push despliega — y cada pull request genera una <strong>preview con URL propia</strong> para enseñar al cliente.</li>
          </ol>` })}</div>
      </div>
      <div data-reveal>
        <table class="tablon">
          <tr><th></th><th>GitHub Pages</th><th>Vercel</th></tr>
          <tr><td>Qué sirve</td><td>Webs estáticas (HTML/CSS/JS)</td><td>Apps con framework y lógica de servidor</td></tr>
          <tr><td>Precio</td><td>Gratis (repo público)</td><td>Gratis para proyectos personales; de pago en equipo</td></tr>
          <tr><td>Previews por PR</td><td>No</td><td>Sí — su gran superpoder</td></tr>
          <tr><td>Caso del máster</td><td>Landing y webs docentes</td><td>Prototipos de app y proyectos con backend ligero</td></tr>
        </table>
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------------ El reto BBVA del bloque */
function retoSection() {
  return `<section class="section section--blue" id="reto">
    <div class="wrap reto">
      <div data-reveal>
        <span class="chip">El reto ${escapeHtml(MODULO.cliente)} · Bloque 2 · Manos a la obra</span>
        <h2 class="reto__title">Elige el stack de la web ${escapeHtml(MODULO.cliente)} Gen Z</h2>
        <p class="lead">${escapeHtml(bloque.reto)}</p>
        <ul class="reto__check">
          <li>Dominio y extensión (¿dominio nuevo, subdominio o subcarpeta?)</li>
          <li>Certificado SSL y dónde queda cubierto</li>
          <li>Hosting o plataforma (compartido, VPS, dedicado… o Pages/Vercel)</li>
          <li>Solución: SaaS, CMS o a medida — y con qué lenguajes o herramientas</li>
          <li>Cómo se despliega y qué cuesta al año</li>
        </ul>
        <div class="row" style="margin-top:var(--sp-5)">
          ${Button({ label: "Volver al hub", href: "/index.html", variant: "secondary" })}
        </div>
      </div>
      <div class="stack" data-reveal>
        ${Card({ title: "Cómo defenderlo", body: `
          <ul class="reto__check" style="font-size:.92rem">
            <li>Cada decisión, <strong>comparada con al menos una alternativa</strong> descartada.</li>
            <li>Un <strong>coste anual estimado</strong> del stack completo.</li>
            <li>Por qué encaja con el <strong>público Gen Z</strong> y con los plazos de TE3.</li>
            <li>Bonus: una <strong>demo desplegada</strong> (Pages o Vercel) vale más que mil slides.</li>
          </ul>` })}
        ${Card({ title: "Entregable", body: `<p style="margin:0"><strong>${escapeHtml(bloque.entregable)}</strong>: un documento breve (o una página web) con el mapa de decisiones y su justificación.</p>` })}
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
      { label: "Bloque 2 · Tecnologías", current: true },
    ],
    nav: [
      { label: "La historia", href: "#historia" },
      { label: "Dominios", href: "#dominios" },
      { label: "Soluciones", href: "#soluciones" },
      { label: "Despliegue", href: "#despliegue" },
      { label: "El reto", href: "#reto" },
      { label: "Hub", href: "/index.html" },
    ],
  }),
  `<main id="contenido">`,

  /* Hero del bloque */
  `<section class="section section--ink bloque-hero">
    <span class="bloque-hero__num" aria-hidden="true" style="color:var(--c-b2)">02</span>
    <div class="wrap bloque-hero__inner">
      <div data-reveal>${Badge({ bloque: 2, label: "Bloque 2" })}</div>
      <h1 class="bloque-hero__title" data-reveal>Tecnologías para construir<br>un sitio web</h1>
      <p class="lead" data-reveal>${escapeHtml(bloque.lema)}: del dominio al despliegue.</p>
      <div class="row bloque-hero__meta" data-reveal>
        ${Chip({ label: "Entregable: " + bloque.entregable })}
        ${Chip({ label: "Cliente: " + MODULO.cliente })}
      </div>
    </div>
  </section>`,

  /* Historia scrollytelling */
  `<section class="section section--light" id="historia">
    <div class="wrap">
      <div class="teoria-head" data-reveal>
        <span class="chip">Historia visual</span>
        <h2>¿Qué pasa cuando pulsas Enter?</h2>
        <p class="lead">Desplázate: el viaje invisible de una petición web, parada a parada.</p>
      </div>
      <div class="scrolly" data-scene="1">
        <div class="scrolly__inner">
          <div class="scrolly__visual">${stageSvg()}</div>
          <div class="scrolly__steps">${STEPS.map(stepHtml).join("")}</div>
        </div>
      </div>
    </div>
  </section>`,

  dominiosSection(),
  sslSection(),
  hostingSection(),
  lenguajesSection(),
  solucionesSection(),
  flujoClaudeSection(),
  githubSection(),
  despliegueSection(),
  retoSection(),

  `</main>
  <footer class="bloque-footer">
    ${escapeHtml(MODULO.titulo)} · ${escapeHtml(MODULO.programa)} —
    <a href="${escapeHtml(PROFESOR.linkedin)}" target="_blank" rel="noopener noreferrer">${escapeHtml(PROFESOR.nombre)}</a>
  </footer>`,
].join("");

initProgressBar();
initReveal(app);
initScrolly(app.querySelector(".scrolly"));

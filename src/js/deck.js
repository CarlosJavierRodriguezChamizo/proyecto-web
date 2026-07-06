/* =========================================================================
   deck.js — Inicialización común de los mazos RevealJS (offline, vía npm).
   Cada deck HTML incluye su markup .reveal/.slides y un módulo que importa
   `initDeck()` de aquí. Plugins: Notes (vista de ponente con tecla S).
   Navegación de sesión larga: overview integrado con Esc / O.
   ========================================================================= */
import Reveal from "reveal.js";
import Notes from "reveal.js/plugin/notes";
import "reveal.js/reveal.css";
import "../styles/deck.css";

/**
 * Arranca Reveal con la configuración común del proyecto.
 * @returns {Reveal} instancia inicializada (promesa en deck.on ready)
 */
export function initDeck() {
  const deck = new Reveal({
    hash: true,            // hash de slide en la URL (para retomar donde ibas)
    controls: true,
    progress: true,
    slideNumber: "c/t",
    center: true,
    transition: "fade",    // discreta: es una sesión de 3 h, no un show
    transitionSpeed: "fast",
    width: 1280,           // lienzo 16:9; Reveal lo escala a la pantalla
    height: 720,
    margin: 0.06,
    plugins: [Notes],      // vista de ponente (tecla S)
  });

  /* El logo ESIC cambia (azul/blanco) según el fondo de la slide actual:
     slides oscuras (.slide--blue, .slide--live, .slide--cover) → logo blanco. */
  const sincronizarLogo = () => {
    const s = deck.getCurrentSlide();
    const oscura = !!s && !!s.closest(".slide--blue, .slide--live, .slide--cover");
    document.body.classList.toggle("dark-slide", oscura);
  };

  deck.initialize().then(sincronizarLogo);
  deck.addEventListener("slidechanged", sincronizarLogo);
  return deck;
}

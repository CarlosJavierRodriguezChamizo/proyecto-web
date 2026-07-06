/* =========================================================================
   reveal.js — Animación de entrada al hacer scroll (vanilla, offline).
   Los elementos con [data-reveal] entran con fade-up cuando cruzan el
   viewport; el escalonado se consigue con transition-delay por posición
   dentro de la misma sección. Respeta prefers-reduced-motion.
   ========================================================================= */

export function initReveal(root = document) {
  const els = [...root.querySelectorAll("[data-reveal]")];
  if (!els.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  // Escalonado: retardo según el orden del elemento dentro de su sección.
  const bySection = new Map();
  els.forEach((el) => {
    const section = el.closest("section") || document.body;
    const i = bySection.get(section) ?? 0;
    bySection.set(section, i + 1);
    el.style.transitionDelay = `${Math.min(i * 90, 450)}ms`;
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target); // solo anima la primera vez
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0 }
  );
  els.forEach((el) => io.observe(el));
}

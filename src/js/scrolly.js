/* =========================================================================
   scrolly.js — Motor de scrollytelling reutilizable (vanilla, offline).
   Observa los pasos (.scrolly__step) y, al entrar en la zona central del
   viewport, marca la escena activa en el contenedor (data-scene) y llama a
   un callback opcional. La parte visual reacciona vía CSS [data-scene].
   ========================================================================= */

/**
 * @param {HTMLElement} root        Contenedor .scrolly
 * @param {(scene:string, stepEl:HTMLElement)=>void} [onScene]  Callback por escena
 */
export function initScrolly(root, onScene) {
  const steps = [...root.querySelectorAll(".scrolly__step")];
  if (!steps.length) return;

  const activar = (stepEl) => {
    const scene = stepEl.dataset.scene;
    if (root.dataset.scene === scene && stepEl.classList.contains("is-active")) return;
    root.dataset.scene = scene;
    steps.forEach((s) => s.classList.toggle("is-active", s === stepEl));
    onScene?.(scene, stepEl);
  };

  const io = new IntersectionObserver(
    (entries) => {
      // Activa el paso cuya zona cruza el centro del viewport.
      entries.forEach((e) => { if (e.isIntersecting) activar(e.target); });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );
  steps.forEach((s) => io.observe(s));

  // Escena inicial
  activar(steps[0]);
}

/* -------------------------------------------------------------------------
   Barra de progreso de lectura (línea fina superior). Se actualiza con el
   scroll real del documento; rAF-throttled.
   ------------------------------------------------------------------------- */
export function initProgressBar() {
  const bar = document.createElement("div");
  bar.className = "read-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);

  let ticking = false;
  const update = () => {
    ticking = false;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    bar.style.transform = `scaleX(${p})`;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
}

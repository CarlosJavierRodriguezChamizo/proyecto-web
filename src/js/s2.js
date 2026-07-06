/* =========================================================================
   s2.js — Deck: De la arquitectura al prototipo.
   Inicializa el deck común y añade el temporizador del ejercicio (punto 11):
   presets 30/45/60 min, iniciar/pausar, y aviso visual bajo 2 minutos.
   ========================================================================= */
import { initDeck } from "./deck.js";

initDeck();

/* --------------------------- Temporizador del ejercicio ------------------ */
const display = document.getElementById("timer-display");
const btns = document.getElementById("timer-btns");
const toggle = document.getElementById("timer-toggle");

if (display && btns) {
  let restante = 45 * 60; // segundos
  let intervalo = null;

  const pintar = () => {
    const m = String(Math.floor(restante / 60)).padStart(2, "0");
    const s = String(restante % 60).padStart(2, "0");
    display.textContent = `${m}:${s}`;
    display.classList.toggle("is-low", restante <= 120); // últimos 2 min en rojo
  };

  const parar = () => {
    clearInterval(intervalo);
    intervalo = null;
    toggle.textContent = "▶ Iniciar";
  };

  const arrancar = () => {
    if (restante <= 0) return;
    intervalo = setInterval(() => {
      restante = Math.max(0, restante - 1);
      pintar();
      if (restante === 0) parar();
    }, 1000);
    toggle.textContent = "❚❚ Pausar";
  };

  btns.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    if (btn.dataset.min) {
      // Preset: fija el tiempo y detiene el reloj
      parar();
      restante = Number(btn.dataset.min) * 60;
      pintar();
    } else if (btn.dataset.action === "toggle") {
      intervalo ? parar() : arrancar();
    }
  });

  pintar();
}

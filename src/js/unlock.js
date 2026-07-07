/* =========================================================================
   unlock.js — Sistema de bloqueo progresivo de bloques.

   Estado por defecto: solo el Bloque 1 desbloqueado. Para desbloquear de
   forma permanente, añade números a `unlockedBlocks` y despliega.

   Durante la clase también se puede desbloquear EN VIVO desde la consola
   del navegador:  unlockBlock(2)
   (estado en memoria: no persiste entre recargas, por diseño).
   ========================================================================= */

/* ➜ EDITA ESTE ARRAY para desbloquear bloques de forma permanente. */
export const unlockedBlocks = [1, 2];

/** ¿Está desbloqueado el bloque n? */
export function isUnlocked(n) {
  return unlockedBlocks.includes(Number(n));
}

/* Candado SVG que se muestra sobre el contenido bloqueado. */
export const LOCK_SVG = `
  <svg class="lock__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    <circle cx="12" cy="16" r="1.6" fill="currentColor" stroke="none"/>
  </svg>`;

/**
 * Registra la API de consola. Cada página pasa un callback `onUnlock(n)`
 * que actualiza su propio DOM cuando el bloque se desbloquea.
 * @param {(n:number)=>void} onUnlock
 */
export function registerUnlockApi(onUnlock) {
  window.unlockBlock = (n) => {
    n = Number(n);
    if (!Number.isInteger(n) || n < 1 || n > 5) {
      console.warn(`unlockBlock: bloque inválido (${n}). Usa un número del 1 al 5.`);
      return;
    }
    if (isUnlocked(n)) {
      console.info(`unlockBlock: el bloque ${n} ya está desbloqueado.`);
      return;
    }
    unlockedBlocks.push(n);
    onUnlock(n);
    console.info(`🔓 Bloque ${n} desbloqueado (en memoria — edita unlock.js para hacerlo permanente).`);
  };
}

/* badge.js — Etiqueta de bloque (B1…B5) con el color del bloque. */
import { escapeHtml, cx } from "./_util.js";

/**
 * @param {object} o
 * @param {string|number} [o.bloque]  Número de bloque (1–5) → color.
 * @param {string} o.label            Texto de la etiqueta.
 * @returns {string} HTML
 */
export function Badge({ bloque, label } = {}) {
  const cls = cx("badge", bloque && `badge--b${bloque}`);
  return `<span class="${cls}">${escapeHtml(label)}</span>`;
}

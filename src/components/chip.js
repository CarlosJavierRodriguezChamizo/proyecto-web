/* chip.js — Píldora compacta para etiquetas y metadatos. */
import { escapeHtml, cx } from "./_util.js";

/**
 * @param {object} o
 * @param {string} o.label
 * @param {boolean} [o.outline]  Variante con contorno (sin fondo de acento).
 * @returns {string} HTML
 */
export function Chip({ label, outline = false } = {}) {
  return `<span class="${cx("chip", outline && "chip--outline")}">${escapeHtml(label)}</span>`;
}

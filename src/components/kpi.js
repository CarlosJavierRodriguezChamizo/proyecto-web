/* kpi.js — Número grande con etiqueta (para heros y bandas azules). */
import { escapeHtml } from "./_util.js";

/**
 * @param {object} o
 * @param {string} o.num     El dato ("5", "1 landing", "100 %").
 * @param {string} o.label   Qué significa.
 * @returns {string} HTML
 */
export function Kpi({ num, label } = {}) {
  return `<div class="kpi">
    <div class="kpi__num">${escapeHtml(num)}</div>
    <div class="kpi__label">${escapeHtml(label)}</div>
  </div>`;
}

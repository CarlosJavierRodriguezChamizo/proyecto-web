/* button.js — Botón/enlace con las variantes del sistema. */
import { escapeHtml, cx, attrs, appUrl } from "./_util.js";

/**
 * @param {object} o
 * @param {string} o.label
 * @param {string} [o.href]                 Si se pasa, es un <a>; si no, <button>.
 * @param {"primary"|"secondary"|"ghost"} [o.variant="primary"]
 * @param {Record<string,unknown>} [o.extra]
 * @returns {string} HTML
 */
export function Button({ label, href, variant = "primary", extra = {} } = {}) {
  const cls = cx("btn", `btn--${variant}`);
  if (href) {
    return `<a class="${cls}" href="${escapeHtml(appUrl(href))}"${attrs(extra)}>${escapeHtml(label)}</a>`;
  }
  return `<button class="${cls}" type="button"${attrs(extra)}>${escapeHtml(label)}</button>`;
}

/* =========================================================================
   index.js — Barrel de componentes. Importa desde aquí:
     import { Header, Card, Chip, Kpi, Button, Badge } from "../components/index.js";
   Todos son funciones puras que devuelven strings de HTML.
   Recuerda enlazar también src/styles/components.css en la página.
   ========================================================================= */
export { Header, Breadcrumb } from "./header.js";
export { Card } from "./card.js";
export { Chip } from "./chip.js";
export { Kpi } from "./kpi.js";
export { Button } from "./button.js";
export { Badge } from "./badge.js";
export { escapeHtml, cx, attrs, appUrl, APP_BASE } from "./_util.js";

/* =========================================================================
   contenido.js — Textos editoriales y estructura del módulo.
   Única fuente de verdad del contenido: bloques, retos BBVA, contacto.
   ========================================================================= */

export const MODULO = {
  titulo: "Presencia Digital: Proyecto Web",
  programa: "Máster en Marketing Digital · ESIC Business & Marketing School",
  cliente: "BBVA",
  lema: "Un cliente real. Cinco bloques. Una web que sale a producción.",
};

export const PROFESOR = {
  nombre: "Carlos Chamizo",
  foto: "/assets/carlos-chamizo.png",
  linkedin: "https://www.linkedin.com/in/carloschamizo/",
  email: "profesor@esic.edu", // placeholder — sustituir por el correo real
};

/* Los 5 bloques del módulo. `reto` es el objetivo del proyecto BBVA.
   El desbloqueo NO vive aquí: ver src/js/unlock.js (unlockedBlocks). */
export const BLOQUES = [
  {
    n: 1,
    slug: "b1",
    titulo: "UX/UI a través de Figma",
    lema: "Diseña antes de construir",
    reto: "Crear una landing page para BBVA: wireframes, prototipo navegable e identidad visual.",
    entregable: "Prototipo Figma navegable",
  },
  {
    n: 2,
    slug: "b2",
    titulo: "Tecnologías para la construcción de un sitio web",
    lema: "Elige las piezas de tu stack",
    reto: "Elegir las tecnologías que usaréis para construir la web de BBVA, comparando alternativas y justificando la decisión.",
    entregable: "Stack tecnológico justificado",
  },
  {
    n: 3,
    slug: "b3",
    titulo: "Soluciones No-Code",
    lema: "Construye sin escribir código",
    reto: "Crear una solución No-Code que complemente la presencia digital de BBVA.",
    entregable: "Solución No-Code funcionando",
  },
  {
    n: 4,
    slug: "b4",
    titulo: "Analítica Digital",
    lema: "Lo que no se mide, no mejora",
    reto: "Establecer un plan de medición para la landing de BBVA y elaborar un cuadro de mando.",
    entregable: "Plan de medición + cuadro de mando",
  },
  {
    n: 5,
    slug: "b5",
    titulo: "Creación de sitio web en WordPress",
    lema: "Del diseño a la web publicada",
    reto: "Crear la landing page de BBVA en WordPress, aplicando todo lo aprendido en los bloques anteriores.",
    entregable: "Landing BBVA publicada en WordPress",
  },
];

/* ------------------------- Contenido del Bloque 1 ------------------------ */

export const B1 = {
  uxui: {
    intro:
      "Dos disciplinas complementarias: la UX define cómo se siente y funciona un producto; la UI define cómo se ve. Un buen diseño necesita las dos.",
    ux: {
      titulo: "UX · User Experience",
      pregunta: "¿Funciona bien y resuelve el problema?",
      items: ["Investigación de usuarios", "User flows y arquitectura", "Wireframes y tests de usabilidad"],
    },
    ui: {
      titulo: "UI · User Interface",
      pregunta: "¿Es claro, atractivo y coherente con la marca?",
      items: ["Sistemas de diseño", "Color, tipografía e iconografía", "Componentes y estados"],
    },
  },
  figma: [
    { t: "Colaborativo en tiempo real", p: "Todo el equipo sobre el mismo archivo a la vez, como en un documento compartido. Se acabaron los «versión_final_v3».", },
    { t: "Funciona en el navegador", p: "Sin instalaciones ni licencias caras: una cuenta gratuita y listo. Mac, Windows o el portátil del aula.", },
    { t: "Prototipado navegable", p: "Tus pantallas se convierten en un prototipo clicable que se prueba con usuarios reales sin programar.", },
    { t: "Estándar de la industria", p: "Es la herramienta de los equipos de producto y agencias con los que trabajarás. Incluido BBVA.", },
  ],
  conceptos: [
    { t: "Wireframe", p: "Esquema en baja fidelidad: estructura y jerarquía, sin color ni detalle visual." },
    { t: "Prototipo", p: "Versión interactiva del diseño que simula la navegación real antes de desarrollar." },
    { t: "User Flow", p: "Mapa del recorrido del usuario para completar una tarea, paso a paso." },
    { t: "Componentes", p: "Piezas reutilizables (botones, cards, menús) que garantizan coherencia." },
  ],
  retoChecklist: [
    "Wireframes de la landing (mobile y desktop)",
    "Prototipo navegable con al menos 2 flujos",
    "Identidad visual BBVA aplicada: color, tipografía y componentes",
  ],
  recursos: [
    { t: "Tutorial oficial · Figma para principiantes", href: "#" },
    { t: "Comunidad de Figma · Plantillas y kits UI", href: "#" },
    { t: "Guía de identidad visual de BBVA", href: "#" },
    { t: "De wireframe a prototipo en 60 minutos", href: "#" },
  ],
};

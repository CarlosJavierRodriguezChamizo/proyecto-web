// Configuración de Vite — proyecto multipágina, offline-first.
// base:'./' => rutas relativas: sirve igual desde la raíz de un dominio,
// desde una subcarpeta (GitHub Pages de proyecto) o abriendo el HTML local.
import { defineConfig } from 'vite';
import { resolve } from 'path';

const r = (p) => resolve(__dirname, p);

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      // Todas las páginas declaradas como entradas.
      input: {
        // Hub del módulo (portada + objetivos + bloques)
        index: r('index.html'),
        // Bloque 1 — UX/UI a través de Figma (desbloqueado)
        b1: r('bloques/b1.html'),
        // Bloques 2–5 — páginas con candado hasta que se desbloqueen
        b2: r('bloques/b2.html'),
        b3: r('bloques/b3.html'),
        b4: r('bloques/b4.html'),
        b5: r('bloques/b5.html'),
        // Decks de sesión (RevealJS)
        s2: r('decks/s2.html'),
      },
    },
  },
});

# Presencia Digital: Proyecto Web · ESIC

Web docente de aula (Máster en Marketing Digital, ESIC) que sustituye al
PowerPoint para el módulo **Presencia Digital: Proyecto Web**, anclada al
proyecto real de **BBVA**: diseñar, construir, medir y publicar su landing.

Misma arquitectura y sistema de diseño que la web de *Sistemas de Información*.

## Stack

- **Vite 4** (vanilla JS, sin frameworks) · multipágina.
- **Offline-first**: fuente, logos y JS/CSS se sirven localmente (sin CDN).
  Funciona aunque caiga el wifi del aula.
- Scrollytelling propio (`src/js/scrolly.js`, IntersectionObserver + CSS).
- Estado del desbloqueo **en memoria** (no persiste entre recargas, por diseño).

## Arranque

```bash
npm install
npm run dev      # servidor de desarrollo (http://localhost:5173)
```

## Build y previsualización

```bash
npm run build    # genera /dist (estático)
npm run preview  # sirve /dist localmente
```

`vite.config.js` usa `base: './'` (rutas relativas): `/dist` se puede servir
desde la raíz de un dominio, una subcarpeta (GitHub Pages) o abrirse en local.

## Estructura

```
index.html                Hub: portada, proyecto BBVA, bloques (con candado), contacto
bloques/  b1               Bloque 1 · UX/UI a través de Figma (scrollytelling + teoría + reto)
          b2 · b3 · b4 · b5  Bloques pendientes: página con candado hasta desbloquear
src/
  components/              Componentes JS (Header, Card, Kpi, Badge…) — funciones puras
  data/contenido.js        Textos editoriales y estructura del módulo
  js/                      Lógica de cada página + motores (scrolly, reveal, unlock)
  styles/                  tokens · base · components + estilos por página
public/assets/             Fuente y logos ESIC (offline)
```

## Sistema de bloqueo

- El estado por defecto vive en `src/js/unlock.js`:
  `export const unlockedBlocks = [1];` — añade números y despliega para
  desbloquear bloques de forma permanente.
- Durante la clase, desde la consola del navegador: `unlockBlock(2)`.
  El hub y las páginas de bloque se actualizan al momento (en memoria).

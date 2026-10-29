# Calcula Perú — contexto del proyecto

Sitio de calculadoras financieras para Perú. **Astro 7 estático**, sin backend: todos los cálculos se hacen en el navegador.

## URLs

- GitHub Pages (indexable): https://edumilla1994.github.io/calcula-pe/
- Cloudflare Pages (preview, `noindex`): https://calcula-pe.pages.dev/
- Repo: https://github.com/edumilla1994/calcula-pe

## Comandos

```bash
npm install
npm run dev        # http://localhost:4321/calcula-pe/
npm run build
npm run deploy     # GitHub Pages (base /calcula-pe)
npm run deploy:cf  # Cloudflare Pages (base /)
npm run test:e2e   # pruebas de las 5 calculadoras
```

## Reglas para trabajar aquí

1. **No cambiar fórmulas sin actualizar `e2e.mjs`** y volver a correr las pruebas.
2. Los resultados son referenciales: mantener el aviso legal en cada página.
3. No commitear claves ni tokens. El repo es público.
4. Español claro en la interfaz; sin jerga.
5. Antes de agregar una calculadora, verificar la norma peruana vigente (Gob.pe, SUNAT, leyes).
6. El estado detallado y los pendientes están en `CONTINUAR.md`.

## Estado actual

MVP online con 5 calculadoras: CTS, gratificación, indemnización, IGV y préstamo. Las 5 pasan pruebas E2E en GitHub Pages y Cloudflare Pages.

Pendiente: 5 calculadoras más, GA4/Search Console, AdSense y dominio propio.

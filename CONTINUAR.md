# Continuar el proyecto Calcula Perú

> Documento de traspaso para abrir una sesión nueva de OpenCode dentro de esta carpeta.
> Última actualización: 28 de octubre de 2026.

## Qué es

Sitio de calculadoras financieras para Perú, gratis y sin registro. Todo se calcula en el navegador (no hay backend ni base de datos).

## Estado: MVP online y funcionando

- **GitHub Pages:** https://edumilla1994.github.io/calcula-pe/
- **Cloudflare Pages:** https://calcula-pe.pages.dev/ (con `noindex` temporal para no duplicar contenido)
- **Repositorio:** https://github.com/edumilla1994/calcula-pe (público, licencia MIT)
- **Cuenta Cloudflare:** verificada con `edumilla1994@gmail.com`; proyecto `calcula-pe`.
- **Cuenta GitHub:** `edumilla1994`.

## Stack

| Área | Elección |
|---|---|
| Framework | Astro 7.4 (salida estática) |
| Estilos | CSS propio (`src/styles/global.css`) |
| Cálculos | JavaScript del lado del cliente |
| SEO | Títulos, descripciones, canonical, JSON-LD, sitemap, robots.txt |
| Deploy | GitHub Pages (`gh-pages`) y Cloudflare Pages |
| Pruebas | Playwright Core + Chromium headless (`e2e.mjs`) |

## Calculadoras implementadas

| Página | Fórmula / norma | Resultado de prueba |
|---|---|---|
| `/cts/` | DL 650: RC/12 × meses + RC/360 × días; RC = sueldo + asignación + gratificación/6 | S/ 2,000 → S/ 1,166.67 |
| `/gratificacion/` | Ley 27735: remuneración × meses/6 + bono 9% (EsSalud) o 6.75% (EPS); descuento ONP/AFP | S/ 2,000 → S/ 1,920.00 |
| `/indemnizacion/` | Despido arbitrario: 1.5 sueldos × años, tope 12 sueldos | 3a 6m, S/ 2,000 → S/ 10,500.00 |
| `/igv/` | 18% (16% IGV + 2% IPM), agregar o extraer | S/ 100 → S/ 118.00 |
| `/prestamo/` | Sistema francés; TEA convertida a mensual | S/ 10,000, 35%, 24m → S/ 561.13 |

Las 5 pruebas pasan contra GitHub Pages y Cloudflare Pages, sin errores JavaScript.

## Estructura

```
calcula-pe/
├── src/pages/          # una página por calculadora + legales
├── src/layouts/        # Base.astro
├── src/styles/         # global.css
├── public/             # favicon, robots.txt, _headers
├── scripts/            # deploy-cf.ps1
├── astro.config.mjs    # base dinámica: /calcula-pe (GitHub) o / (Cloudflare)
├── e2e.mjs             # pruebas Playwright
└── CONTINUAR.md        # este archivo
```

## Cómo trabajar

```bash
cd C:\Users\edumi\OneDrive\Desktop\Devue\PEnt\users\Code\calcula-pe
npm install
npm run dev
```

Antes de publicar:

```bash
npm run test:e2e
npm run deploy      # GitHub Pages
npm run deploy:cf   # Cloudflare Pages
```

## Pendientes, en orden

1. **Agregar 5 calculadoras** para llegar a 10 y poder aplicar a AdSense:
   - Sueldo neto (descuentos ONP/AFP)
   - AFP vs ONP
   - Renta de 4ta categoría (retención 8%)
   - Renta de 5ta categoría
   - Liquidación de beneficios sociales
2. **Google Analytics 4 + Search Console** con `edumilla1994@gmail.com`.
3. **AdSense** cuando haya 10 calculadoras y contenido suficiente.
4. **Dominio propio** (comprar 1 solo, no varios). Al comprarlo:
   - Quitar `noindex` de `public/_headers`.
   - Cambiar `SITE_URL` al dominio en `scripts/deploy-cf.ps1`.
   - Conectar el dominio en Cloudflare Pages.
5. **Panel de administración** solo si se agregan servicios con cuentas; usar Cloudflare Access + Google OAuth.

## Decisiones tomadas

- Español Perú primero; clon en inglés después, si el SEO funciona.
- Hosting gratis primero; dominio cuando haya tracción.
- No copiar fórmulas de otros países: verificar siempre la norma peruana.
- No commitear claves ni tokens (el repositorio es público).

## Prompt para pegar en la sesión nueva

```text
Estamos continuando el proyecto Calcula Perú en esta carpeta.
Lee AGENTS.md y CONTINUAR.md antes de hacer cambios.
Estado: MVP online con 5 calculadoras (CTS, gratificación, indemnización, IGV, préstamo),
desplegado en GitHub Pages y Cloudflare Pages, con pruebas E2E pasando.
Siguiente tarea: [agregar las 5 calculadoras pendientes / conectar GA4 / revisar X].
No cambies fórmulas ni estilos existentes sin correr `npm run test:e2e`.
```

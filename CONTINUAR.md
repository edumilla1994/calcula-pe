# Continuar el proyecto Calcula Perú

> Documento de traspaso para abrir una sesión nueva de OpenCode dentro de esta carpeta.
> Última actualización: 28 de octubre de 2026.

## Qué es

Sitio de calculadoras financieras para Perú, gratis y sin registro. Todo se calcula en el navegador (no hay backend ni base de datos).

## Estado: MVP online con 10 calculadoras

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

## Diseño

Dirección visual tomada de Open Design (`modern-minimal`) y del design system **Stripe**:
bordes hairline, radios de 6–10 px, sin sombras decorativas, números tabulares y header sticky claro.
Paleta: navy `#0a2540`, dorado `#f5b301` y gris frío `#f6f8fa`. Todo el sistema vive en `src/styles/global.css`.

## Calculadoras implementadas

| Página | Fórmula / norma | Resultado de prueba |
|---|---|---|
| `/sueldo-neto/` | ONP 13% o AFP (10% + comisión + prima 1.37%); renta 5ta con 7 UIT y tramos | S/ 2,000 ONP → S/ 1,740.00 |
| `/cts/` | DL 650: RC/12 × meses + RC/360 × días; RC = sueldo + asignación + gratificación/6 | S/ 2,000 → S/ 1,166.67 |
| `/gratificacion/` | Ley 27735: remuneración × meses/6 + bono 9% (EsSalud) o 6.75% (EPS); descuento ONP/AFP | S/ 2,000 → S/ 1,920.00 |
| `/liquidacion/` | CTS trunca + gratificación trunca + bono + vacaciones truncas + indemnización opcional | 01/01–30/06, S/ 2,000 → S/ 3,308.89 neto |
| `/indemnizacion/` | Despido arbitrario: 1.5 sueldos × años, tope 12 sueldos | 3a 6m, S/ 2,000 → S/ 10,500.00 |
| `/renta-quinta/` | 7 UIT + gastos (máx. 3 UIT); tramos 8/14/17/20/30% | S/ 3,000 + 2 grat. → S/ 280.00 anual |
| `/renta-cuarta/` | Retención 8% si el recibo supera S/ 1,500; 20% + 7 UIT + tramos | S/ 8,000 × 12 → retención S/ 640.00 |
| `/afp-vs-onp/` | Descuento AFP vs ONP y pensión estimada (45% ONP; fondo AFP ÷ meses de jubilación) | S/ 2,000 Habitat → S/ 256.80 |
| `/igv/` | 18% (16% IGV + 2% IPM), agregar o extraer | S/ 100 → S/ 118.00 |
| `/prestamo/` | Sistema francés; TEA convertida a mensual | S/ 10,000, 35%, 24m → S/ 561.13 |

Las 10 pruebas pasan contra GitHub Pages y Cloudflare Pages, sin errores JavaScript.

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

1. **Desplegar las 10 calculadoras** y correr `npm run test:e2e` contra GitHub Pages y Cloudflare Pages.
2. **Google Analytics 4 + Search Console** con `edumilla1994@gmail.com`.
3. **AdSense** ahora que hay 10 calculadoras y contenido suficiente.
4. **Dominio propio** (comprar 1 solo, no varios). Al comprarlo:
   - Quitar `noindex` de `public/_headers`.
   - Cambiar `SITE_URL` al dominio en `scripts/deploy-cf.ps1`.
   - Conectar el dominio en Cloudflare Pages.
5. **Panel de administración** solo si se agregan servicios con cuentas; usar Cloudflare Access + Google OAuth.
6. **Revisar tasas cada enero**: UIT (S/ 5,500 en 2026), RMV (S/ 1,230) y comisiones/prima de AFP.

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

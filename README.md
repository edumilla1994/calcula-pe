# Calcula Perú

Calculadoras financieras gratuitas para Perú, sin registro y sin backend. Todos los cálculos se
ejecutan en el navegador.

- **Sitio principal (indexable):** https://edumilla1994.github.io/calcula-pe/
- **Cloudflare Pages (preview, `noindex`):** https://calcula-pe.pages.dev/
- **Repositorio:** https://github.com/edumilla1994/calcula-pe

## Qué incluye

- 10 calculadoras: sueldo neto, CTS, gratificación, liquidación, indemnización, renta de 4ta,
  renta de 5ta, AFP vs ONP, IGV y préstamo.
- Calculadora rápida de sueldo neto en la portada, con resultado en vivo.
- Buscador y filtros por categoría (Trabajo, Impuestos, Dinero).
- 21 páginas de resultados por sueldo (`/ejemplos/`) para búsquedas de cola larga.
- Google Analytics 4 con aviso de cookies: no carga nada hasta que el visitante acepta.
- Espacios publicitarios listos para AdSense, activables por variables de entorno.
- SEO técnico: canonical, `sitemap-index.xml`, `robots.txt`, JSON-LD y Open Graph.

## Stack

| Área | Elección |
|---|---|
| Framework | Astro 7 (salida estática) |
| Estilos | CSS propio en `src/styles/global.css` |
| Cálculos | TypeScript/JavaScript del lado del cliente |
| Pruebas | Playwright Core + Chromium headless (`e2e.mjs`) |
| Deploy | GitHub Pages (`gh-pages`) y Cloudflare Pages |
| Analítica | GA4 opcional, con consentimiento |
| Publicidad | AdSense opcional, con consentimiento |

## Requisitos

- Node.js 20 o superior (recomendado 22+).
- npm 10 o superior.
- Para el deploy a Cloudflare: Wrangler autenticado.
- Para las pruebas: Chromium de Playwright instalado.

## Instalación

```bash
git clone https://github.com/edumilla1994/calcula-pe.git
cd calcula-pe
npm install
npm run dev
```

El servidor de desarrollo queda en http://localhost:4321/calcula-pe/.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Genera el sitio estático en `dist/` |
| `npm run preview` | Sirve `dist/` en local |
| `npm run deploy` | Compila y publica en GitHub Pages (rama `gh-pages`) |
| `npm run deploy:cf` | Compila con base `/` y publica en Cloudflare Pages |
| `npm run test:e2e` | Corre las pruebas de las 10 calculadoras y la portada |

## Variables de entorno

Copia `.env.example` como `.env`. El archivo `.env` está en `.gitignore` y nunca se sube al repo.

| Variable | Uso |
|---|---|
| `PUBLIC_GA_ID` | ID de medición de GA4 (`G-...`). Sin valor, no se carga analítica. |
| `PUBLIC_GSC_VERIFICATION` | Valor del meta tag de Search Console. |
| `PUBLIC_ADSENSE_CLIENT` | ID de editor de AdSense (`ca-pub-...`). |
| `PUBLIC_ADSENSE_SLOT` | ID de la unidad de anuncio. |

Sin variables de AdSense no se renderiza ningún espacio publicitario en producción. En desarrollo
se muestra un placeholder punteado para validar el layout.

## Estructura

```text
calcula-pe/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── _headers                  # noindex de Cloudflare hasta tener dominio
│   └── google*.html              # verificación de Search Console
├── scripts/
│   └── deploy-cf.ps1             # build con BASE_PATH=/ y SITE_URL de pages.dev
├── src/
│   ├── components/
│   │   ├── AdSlot.astro          # espacio publicitario condicionado
│   │   └── Analytics.astro       # banner de cookies + carga de GA4/AdSense
│   ├── layouts/
│   │   └── Base.astro            # head, header, footer, metadatos
│   ├── lib/
│   │   └── calc.ts               # fórmulas compartidas y formato de soles
│   ├── pages/
│   │   ├── ejemplos/
│   │   │   ├── [slug].astro      # 21 páginas generadas por monto
│   │   │   └── index.astro       # hub de ejemplos
│   │   ├── index.astro           # portada con calculadora rápida
│   │   └── *.astro               # una página por calculadora
│   └── styles/
│       └── global.css            # sistema visual completo
├── astro.config.mjs              # base dinámica: /calcula-pe o /
├── e2e.mjs                       # pruebas Playwright
├── CONTINUAR.md                  # estado, pendientes y decisiones
└── DIFUSION.md                   # textos y pasos para compartir
```

## Calculadoras

| Ruta | Qué calcula | Norma / fórmula |
|---|---|---|
| `/sueldo-neto/` | Sueldo neto con ONP o AFP y renta de 5ta | ONP 13%; AFP 10% + comisión + prima 1.37% |
| `/cts/` | CTS de mayo o noviembre | DL 650: RC/12 × meses + RC/360 × días |
| `/gratificacion/` | Gratificación con bono del 9% o 6.75% | Ley 27735 |
| `/liquidacion/` | CTS, gratificación y vacaciones truncas | DL 650 + Ley 27735 |
| `/indemnizacion/` | Despido arbitrario, tope 12 sueldos | 1.5 sueldos por año |
| `/renta-quinta/` | Impuesto de planilla | 7 UIT + tramos 8% a 30% |
| `/renta-cuarta/` | Retención del 8% por honorarios | 20% + 7 UIT + tramos |
| `/afp-vs-onp/` | Descuento y pensión estimada | Proyección con rentabilidad |
| `/igv/` | Agregar o extraer el 18% | 16% IGV + 2% IPM |
| `/prestamo/` | Cuota, intereses y cronograma | Sistema francés |

## Ejemplos por sueldo

`src/pages/ejemplos/[slug].astro` genera 21 páginas estáticas con `getStaticPaths`:

- 7 montos: S/ 1,000; 1,500; 2,000; 2,500; 3,000; 4,000 y 5,000.
- 3 cálculos: CTS, sueldo neto y gratificación.
- Cada página incluye resultado, desglose, fórmula y preguntas frecuentes.

Las fórmulas viven en `src/lib/calc.ts` y se usan tanto en el build como en las calculadoras, para
evitar resultados distintos entre páginas.

## Pruebas

```bash
npm run test:e2e
```

Por defecto prueba contra GitHub Pages. Para probar en local:

```powershell
$env:BASE_URL="http://localhost:4321/calcula-pe/"
node e2e.mjs
```

El script usa `playwright-core` y un Chromium local. Si tu ruta es distinta, ajusta la constante
`exe` al inicio de `e2e.mjs` o define `CHROME_PATH`.

Las pruebas cubren: las 10 calculadoras, la calculadora rápida de la portada, el buscador y una
página de ejemplo. También fallan si hay errores de JavaScript en consola.

## Deploy

### GitHub Pages

```bash
npm run deploy
```

Compila con `base: /calcula-pe` y publica `dist/` en la rama `gh-pages`.
URL: https://edumilla1994.github.io/calcula-pe/

### Cloudflare Pages

```bash
npm run deploy:cf
```

`scripts/deploy-cf.ps1` define `BASE_PATH=/` y `SITE_URL=https://calcula-pe.pages.dev`, compila y
sube `dist/` con Wrangler al proyecto `calcula-pe`.

Cloudflare mantiene `noindex` mediante `public/_headers` para no competir con GitHub Pages hasta
tener un dominio propio.

### Dominio propio (pendiente)

1. Comprar el dominio (por ejemplo `calcula.com.pe` en punto.pe).
2. Conectarlo a Cloudflare Pages.
3. Quitar `noindex` de `public/_headers`.
4. Cambiar `SITE_URL` en `scripts/deploy-cf.ps1` al dominio nuevo.
5. Actualizar la propiedad en Search Console y reenviar el sitemap.

## SEO y medición

- `sitemap-index.xml` se genera automáticamente con `@astrojs/sitemap` (36 URLs).
- `robots.txt` declara el sitemap.
- Cada página tiene `title`, `description`, canonical, Open Graph y JSON-LD.
- GA4 y Search Console están documentados en `CONTINUAR.md`.
- Las URLs nuevas se pueden inspeccionar en Search Console y solicitar indexación.

## Publicidad y cookies

- `Analytics.astro` muestra el aviso de cookies y **solo carga GA4/AdSense si el visitante acepta**.
- `AdSlot.astro` reserva el espacio y solo renderiza el anuncio cuando existen las variables.
- Los anuncios van etiquetados como «Publicidad» y nunca tapan el resultado del cálculo.
- La política de privacidad describe el uso de cookies, analítica y publicidad.

## Cómo agregar una calculadora

1. Crea `src/pages/mi-calculadora.astro` copiando el patrón de una existente.
2. Agrega la tarjeta en el array `tools` de `src/pages/index.astro`.
3. Si es una de las principales, añádela al `nav` de `src/layouts/Base.astro`.
4. Agrega la prueba correspondiente en `e2e.mjs`.
5. Corre `npm run build` y `npm run test:e2e`.
6. Actualiza la tabla de `CONTINUAR.md`.

El sitemap y los metadatos se generan solos.

## Documentación

- [`CONTINUAR.md`](CONTINUAR.md): estado, pendientes, decisiones y configuración de GA4/Search Console.
- [`DIFUSION.md`](DIFUSION.md): textos y pasos para compartir el sitio.
- [`AGENTS.md`](AGENTS.md): contexto para agentes que trabajan en el proyecto.

## Aviso legal

Los resultados son referenciales. No constituyen una liquidación oficial ni asesoría contable,
tributaria o legal. Verifica siempre con tu empleador, SUNAT o un profesional.

## Licencia

MIT — ver [LICENSE](LICENSE).

# Calcula Perú

Calculadoras gratuitas para Perú: **CTS, gratificación, indemnización, IGV y préstamos**.

- Sitio (GitHub Pages): https://edumilla1994.github.io/calcula-pe/
- Cloudflare Pages (preview, `noindex` hasta tener dominio): https://calcula-pe.pages.dev/
- Stack: Astro 7 (estático) + Cloudflare/GitHub Pages.
- Sin backend: todos los cálculos se hacen en el navegador.
- Sin registro, sin base de datos, sin almacenamiento de montos.

## Calculadoras

| Ruta | Qué calcula |
|---|---|
| `/cts/` | CTS de mayo o noviembre (DL 650) |
| `/gratificacion/` | Gratificación + bonificación 9% / 6.75% y descuentos |
| `/indemnizacion/` | Despido arbitrario: 1.5 sueldos/año, tope 12 sueldos |
| `/igv/` | Agregar o extraer IGV 18% |
| `/prestamo/` | Cuota francesa, intereses y cronograma con TEA |

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:4321/calcula-pe/
npm run build    # genera dist/
npm run preview  # sirve dist/
```

## Deploy

```bash
npm run deploy   # GitHub Pages: build base /calcula-pe + rama gh-pages
```

Cloudflare Pages (raíz `/`):

```powershell
npm run deploy:cf
```

GitHub Pages sirve la rama `gh-pages` en https://edumilla1994.github.io/calcula-pe/.
Cloudflare Pages sirve `calcula-pe.pages.dev` con `noindex` (para evitar contenido duplicado) hasta conectar el dominio propio.

Para un dominio propio: cambiar `site` y `base` en `astro.config.mjs`, luego configurar el dominio en GitHub Pages o migrar a Cloudflare Pages.

## Aviso

Los resultados son referenciales. No constituyen liquidación oficial, asesoría contable, tributaria ni legal. Verificar con el empleador, SUNAT o un profesional.

## Licencia

MIT — ver [LICENSE](LICENSE).

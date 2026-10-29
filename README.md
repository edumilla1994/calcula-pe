# Calcula Perú

Calculadoras gratuitas para Perú: **CTS, gratificación, indemnización, IGV y préstamos**.

- Sitio: https://edumilla1994.github.io/calcula-pe/
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
npm run deploy   # build + publica en la rama gh-pages
```

GitHub Pages sirve la rama `gh-pages` en https://edumilla1994.github.io/calcula-pe/.

Para un dominio propio: cambiar `site` y `base` en `astro.config.mjs`, luego configurar el dominio en GitHub Pages o migrar a Cloudflare Pages.

## Aviso

Los resultados son referenciales. No constituyen liquidación oficial, asesoría contable, tributaria ni legal. Verificar con el empleador, SUNAT o un profesional.

## Licencia

MIT — ver [LICENSE](LICENSE).

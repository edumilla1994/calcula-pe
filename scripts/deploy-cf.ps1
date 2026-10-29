# Deploy a Cloudflare Pages con base raíz y canonical de pages.dev
$ErrorActionPreference = "Stop"
$env:BASE_PATH = "/"
$env:SITE_URL = "https://calcula-pe.pages.dev"
try {
  npm run build
  if ($LASTEXITCODE -ne 0) { throw "astro build falló" }
  wrangler pages deploy dist --project-name calcula-pe --branch main
  if ($LASTEXITCODE -ne 0) { throw "wrangler pages deploy falló" }
} finally {
  Remove-Item Env:BASE_PATH, Env:SITE_URL -ErrorAction SilentlyContinue
}

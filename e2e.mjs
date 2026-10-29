import { chromium } from "playwright-core";

const exe = "C:/Users/edumi/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe";
const base = process.env.BASE_URL || "https://edumilla1994.github.io/calcula-pe/";
const browser = await chromium.launch({ executablePath: exe, headless: true });
const page = await browser.newPage();
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push(String(e)));

async function run(name, path, fillFn, readSel) {
  await page.goto(base + path, { waitUntil: "networkidle" });
  await fillFn(page);
  await page.click("button[type=submit]");
  await page.waitForTimeout(300);
  const value = (await page.textContent(readSel))?.trim();
  console.log(`${name}: ${value}`);
  return value;
}

const r1 = await run("CTS", "cts/", async (p) => {
  await p.fill("#sueldo", "2000");
  await p.fill("#gratificacion", "2000");
  await p.fill("#meses", "6");
  await p.fill("#dias", "0");
}, "#cts-total");

const r2 = await run("Gratificación", "gratificacion/", async (p) => {
  await p.fill("#sueldo", "2000");
  await p.fill("#meses", "6");
  await p.selectOption("#regimen", "0.09");
  await p.selectOption("#descuento", "0.13");
}, "#grat-neto");

const r3 = await run("Indemnización", "indemnizacion/", async (p) => {
  await p.fill("#sueldo", "2000");
  await p.fill("#anios", "3");
  await p.fill("#meses", "6");
  await p.fill("#dias", "0");
}, "#ind-total");

const r4 = await run("IGV", "igv/", async (p) => {
  await p.fill("#monto", "100");
  await p.selectOption("#modo", "agregar");
}, "#igv-total");

const r5 = await run("Préstamo", "prestamo/", async (p) => {
  await p.fill("#monto", "10000");
  await p.fill("#tea", "35");
  await p.fill("#meses", "24");
}, "#pres-cuota");

const r6 = await run("Sueldo neto", "sueldo-neto/", async (p) => {
  await p.fill("#sueldo", "2000");
  await p.selectOption("#sistema", "onp");
  await p.fill("#meses", "12");
}, "#neto-total");

const r7 = await run("AFP vs ONP", "afp-vs-onp/", async (p) => {
  await p.fill("#sueldo", "2000");
  await p.fill("#edad", "30");
  await p.fill("#jubilacion", "65");
  await p.selectOption("#afp", "0.0147");
}, "#afp-desc");

const r8 = await run("Renta 4ta", "renta-cuarta/", async (p) => {
  await p.fill("#ingreso", "8000");
  await p.fill("#meses", "12");
  await p.selectOption("#retencion", "1");
}, "#r4-retencion");

const r9 = await run("Renta 5ta", "renta-quinta/", async (p) => {
  await p.fill("#sueldo", "3000");
  await p.fill("#meses", "12");
  await p.fill("#gratificaciones", "6000");
}, "#r5-impuesto");

const r10 = await run("Liquidación", "liquidacion/", async (p) => {
  await p.fill("#sueldo", "2000");
  await p.fill("#ingreso", "2026-01-01");
  await p.fill("#cese", "2026-06-30");
}, "#liq-total");

await page.goto(base, { waitUntil: "networkidle" });
await page.fill("#q-sueldo", "3000");
await page.selectOption("#q-sistema", "afp");
await page.waitForTimeout(200);
const r11 = (await page.textContent("#q-neto"))?.trim();
await page.fill("#calc-search", "cts");
await page.waitForTimeout(200);
const filtradas = await page.$$eval("#calc-grid .card:not([hidden])", (els) => els.length);
console.log(`Sueldo rápido (hero): ${r11} | Buscador "cts": ${filtradas} resultado(s)`);

console.log("\nRESULTADOS:");
console.log({ cts: r1, gratificacion: r2, indemnizacion: r3, igv: r4, prestamo: r5, sueldoNeto: r6, afpOnp: r7, renta4: r8, renta5: r9, liquidacion: r10, hero: r11, busqueda: filtradas });
console.log("Errores JS:", errors.length ? errors : "ninguno");

await browser.close();
